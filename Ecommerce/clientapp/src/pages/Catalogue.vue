<template>
  <b-container fluid class="page">
    <b-row>
      <b-col cols="3">
        <filters v-if="filters.brands.length" :filters="filters" />
      </b-col>
      <b-col cols="9">
        <product-list :products="products" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import ProductList from "../components/catalogue/ProductList.vue";
import Filters from "../components/catalogue/Filters.vue";

export default {
  name: "catalogue",
  components: {
    ProductList,
    Filters,
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
  // mounted(){
  // 	fetch("/api/products")
  // 	.then(response => {
  // 		return response.json();
  // 	})
  // 	.then(products => {
  // 		this.products = products;
  // 	});
  // }

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
