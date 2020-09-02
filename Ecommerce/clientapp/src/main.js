import Vue from 'vue';
import VueRouter from "vue-router";
import App from './App.vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

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

new Vue({
  router: new VueRouter({mode: "history", routes: routes}),
  render: h => h(App),
}).$mount('#app')
