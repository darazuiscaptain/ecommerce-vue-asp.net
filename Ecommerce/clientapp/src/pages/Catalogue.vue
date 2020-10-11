<template>
  <b-container fluid class="page">
    <b-row>
      <b-col cols="3">
        <filters v-if="products.length" :filters="filters" />
      </b-col>
      <b-col cols="9">
        <div class="mt-4 flex">
          <search-bar class="search"/>
          <product-sort class="ml-4"/>
        </div>
        <product-list v-if="products.length" :products="sortedProducts" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import ProductList from "@/components/catalogue/ProductList.vue";
import Filters from "@/components/catalogue/Filters.vue";
import ProductSort from "@/components/catalogue/ProductSort";
import SearchBar from "@/components/catalogue/SearchBar.vue";

export default {
  name: "catalogue",
  components: {
    ProductList,
    Filters,
    ProductSort,
    SearchBar
  },

  data() {
    return {
      products: [],
      filters: {
        brands: [],
        capacity: [],
        colours: [],
        os: [],
        features: [],
      },
    };
  },
  computed: {
    sort() {
      return this.$route.query.sort || 0;
    },
    sortedProducts() {
      var newProducts = [...this.products];
      switch (this.sort) {
        case 1:
          return newProducts.sort((a, b) => {
            return b.price > a.price;
          });
        case 2:
          return newProducts.sort((a, b) => {
            return a.name > b.name;
          });
        case 3:
          return newProducts.sort((a, b) => {
            return b.name > a.name;
          });
        default:
          return newProducts.sort((a, b) => {
            return a.price > b.price;
          });
      }
    },
  },

  beforeRouteEnter(to, from, next) {
    axios
      .all([
        axios.get("/api/products", { params: to.query }),
        axios.get("/api/filters"),
      ])
      .then(
        axios.spread((products, filters) => {
          next((vm) => vm.setData(products.data, filters.data));
        })
      );
  },

  beforeRouteUpdate(to, from, next) {
    axios.get("/api/products", { params: to.query }).then((response) => {
      this.products = response.data;
      next();
    });
  },

  methods: {
    setData(products, filters) {
      this.products = products;
      this.filters = filters;
    },
  },
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-direction: row;
  .search {
    flex: 1;
  }
}
</style>
