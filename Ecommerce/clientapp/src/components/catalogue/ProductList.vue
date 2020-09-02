<template>
  <div class="products">
    <h1>Products</h1>
    <div class="list">
      <div class="item" v-for="product in products" :key="product.slug">
        <h3 @click="select(product)">{{ product.name }}</h3>
        <img
          :src="product.thumbnail"
          :alt="product.name"
          @click="select(product)"
        />
        <p @click="select(product)">{{ product.shortDescription }}</p>
        <p @click="select(product)">{{ product.price }}</p>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "product-list",
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  methods: {
    select(product) {
      this.$router.push(`/products/${product.slug}`);
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box !important;
}
.products {
  padding: 1.25rem;
  max-width: 75rem;
  margin: 0 auto;
}
/* .list,
.details {
  width: 50%;
  float: left;
} */
.list .item {
  width: 25%;
  float: left;
  padding: 1.25rem 0.625rem 1.25rem 0;
}
.list img,
.list h3,
.list p {
  cursor: pointer;
}
.list img {
  width: 6.25rem;
}
</style>
