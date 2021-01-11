<template>
  <div class="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">PhoneShop</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto mr-4">
          <b-nav-item to="/products">Products</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto mr-4">
          <!-- <b-nav-item to="/cart">Cart</b-nav-item> -->
          <b-button variant="primary" @click="testUser">测试</b-button>
          <cart-summary v-if="isCustomer"></cart-summary>
          <auth-nav-item></auth-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <auth-modal :show="showAuthModal"></auth-modal>
  </div>
</template>

<script>
import axios from "axios";
import CartSummary from "./components/cart/CartSummary.vue";
import AuthNavItem from "./components/app/AuthNavItem.vue";
import AuthModal from "./components/app/AuthModal.vue";

export default {
  name: "app",
  components: {
    AuthNavItem,
    AuthModal,
    CartSummary,
  },
  computed: {
    showAuthModal() {
      return this.$store.state.showAuthModal;
    },
    isCustomer() {
      return (
        this.$store.getters.isInRole("Customer") ||
        !this.$store.getters.isAuthenticated
      );
    },
  },
  methods: {
    testUser() {
      console.log("TestUser!");
      axios.post("/WeatherForecast", { test: "测试" }).then((re) => {
        console.log(re.data);
      });
    },
  },
  // beforeCreate() {
  //   this.$store.commit("initialise");
  // },
};
</script>

<style lang="scss">
html,
body {
  height: 100vh;
}

div.app,
div.page {
  height: 100% !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
