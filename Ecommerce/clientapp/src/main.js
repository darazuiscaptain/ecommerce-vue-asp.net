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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "nprogress/nprogress.css";

import store from "./store";

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

import Catalogue from "./pages/Catalogue.vue";
import Product from "./pages/Product.vue";
import Cart from "./pages/Cart";

library.add([faChevronDown, faSync, faArrowLeft, faTrashAlt]);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

const routes = [
  { path: "/products", component: Catalogue },
  { path: "/products/:slug", component: Product },
  { path: "/cart", component: Cart },
  { path: "*", redirect: "/products" },
];

const router = new VueRouter({ mode: "history", routes: routes });

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
});

new Vue({
  router: router,
  store: store,
  render: (h) => h(App),
}).$mount("#app");
