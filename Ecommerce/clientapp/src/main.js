import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import NProgress from "nprogress";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faSync,
  faArrowLeft,
  faTrashAlt,
  faShoppingCart,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import VueToastr from "vue-toastr";
Vue.component("vue-toastr", VueToastr);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "nprogress/nprogress.css";

import store from "./store";
import { currency } from "./filters";

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

import Catalogue from "./pages/Catalogue.vue";
import Product from "./pages/Product.vue";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

library.add([
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faSync,
  faArrowLeft,
  faTrashAlt,
  faShoppingCart,
  faUser,
  faSignOutAlt,
]);
Vue.component("font-awesome-icon", FontAwesomeIcon);

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from "vee-validate";
import zh_CN from "vee-validate/dist/locale/zh_CN.json";
import * as rules from "vee-validate/dist/rules";
// install rules and localization
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
localize("zh_CN", zh_CN);
// Install components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.filter("currency", currency);

Vue.config.productionTip = false;

import axios from "axios";
const initialStore = localStorage.getItem("store");
if (initialStore) {
  store.commit("initialise", JSON.parse(initialStore));
  if (store.getters.isAuthenticated) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${store.state.auth.access_token}`;
  }
}

const routes = [
  { path: "/products", component: Catalogue },
  { path: "/products/:slug", component: Product },
  { path: "/cart", component: Cart },
  { path: "/checkout", component: Checkout, meta: { requiresAuth: true } },
  { path: "*", redirect: "/products" },
];

const router = new VueRouter({ mode: "history", routes: routes });

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      store.commit("showAuthModal");
      next({ path: from.path, query: { redirect: to.path } });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  NProgress.done();
});

new Vue({
  router: router,
  store: store,
  render: (h) => h(App),
}).$mount("#app");
