import Vue from 'vue';
import VueRouter from "vue-router";
import App from './App.vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import  NProgress from 'nprogress';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'nprogress/nprogress.css'

Vue.use(VueRouter);
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

import Catalogue from './pages/Catalogue.vue'
import Product from './pages/Product.vue'

Vue.config.productionTip = false;

const routes = [
	{ path: "/products", component: Catalogue },
	{ path: "/products/:slug", component: Product },
	{ path: "*", redirect: "/products" }
];

const router = new VueRouter({mode: "history", routes: routes});

router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
});

router.afterEach((to, from) => {
    NProgress.done();
});

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
