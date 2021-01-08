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
  faMobile,
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
import { currency, date } from "./filters";
import "./vee-validate";

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

import Catalogue from "./pages/Catalogue.vue";
import Product from "./pages/Product.vue";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account.vue";
//import admin pages
import AdminIndex from "./pages/admin/Index.vue";
import AdminOrders from "./pages/admin/Orders.vue";
import AdminProducts from "./pages/admin/Products.vue";
import AdminCreateProduct from "./pages/admin/CreateProduct.vue";

library.add([
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faSync,
  faArrowLeft,
  faTrashAlt,
  faShoppingCart,
  faMobile,
  faUser,
  faSignOutAlt,
]);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.filter("currency", currency);
Vue.filter("date", date);

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
  { path: "/cart", component: Cart, meta: { role: "Customer" } },
  {
    path: "/checkout",
    component: Checkout,
    meta: { requiresAuth: true, role: "Customer" },
  },
  {
    path: "/account",
    component: Account,
    meta: { requiresAuth: true, role: "Customer" },
  },
  {
    path: "/admin",
    component: AdminIndex,
    meta: { requiresAuth: true, role: "Admin" },
    redirect: "/admin/orders",
    children: [
      {
        path: "orders",
        component: AdminOrders,
      },
      {
        path: "products",
        component: AdminProducts,
      },
      {
        path: "products/create",
        component: AdminCreateProduct,
      },
    ],
  },
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
      if (
        to.matched.some(
          (route) => route.meta.role && store.getters.isInRole(route.meta.role)
        )
      ) {
        next();
      } else if (!to.matched.some((route) => route.meta.role)) {
        next();
      } else {
        next({ path: "/" });
      }
    }
  } else {
    if (
      to.matched.some(
        (route) =>
          route.meta.role &&
          (!store.getters.isAuthenticated ||
            store.getters.isInRole(route.meta.role))
      )
    ) {
      next();
    } else {
      if (to.matched.some((route) => route.meta.role)) {
        next({ path: "/" });
      }
      next();
    }
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
