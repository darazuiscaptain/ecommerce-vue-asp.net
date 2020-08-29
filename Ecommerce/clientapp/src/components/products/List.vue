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

    <product-details class="details" v-if="selectedProduct" :product="selectedProduct"/>
  </div>
</template>

<script>
import ProductDetails from './Details.vue'

export default {
  name: "product-list",
  components:{
    ProductDetails
  },
  data() {
    return {
      products: [
        // product omitted for brevity
        {
          name: "Samsung Galaxy S1",
          slug: "samsung-galaxy-s1",
          thumbnail: "https://via.placeholder.com/200x300",
          shortDescription:
            "Samsung Galaxy S8 Android smartphone with true edge to edge display",
          price: 499.99,
          description:
            "sdjfa sjd;lkfj ;aejsahd fwejermmc k,sdjfwk eqwh ekfafj;asj d;jd; k;ek4njfd jdcu ygsdf uuayds asdfhehty sdfeh sdbdb.sdhfsa sadhfeh,sdh sdfh ahdse.",
        },
        {
          name: "Samsung Galaxy S2",
          slug: "samsung-galaxy-s2",
          thumbnail: "https://via.placeholder.com/200x300",
          shortDescription:
            "Samsung Galaxy S8 Android smartphone with true edge to edge display",
          price: 499.99,
          description:
            "sdjfa sjd;lkfj ;aejsahd fwejermmc k,sdjfwk eqwh ekfafj;asj d;jd; k;ek4njfd jdcu ygsdf uuayds asdfhehty sdfeh sdbdb.sdhfsa sadhfeh,sdh sdfh ahdse.",
        },
        {
          name: "Samsung Galaxy S3",
          slug: "samsung-galaxy-s3",
          thumbnail: "https://via.placeholder.com/200x300",
          shortDescription:
            "Samsung Galaxy S8 Android smartphone with true edge to edge display",
          price: 499.99,
          description:
            "sdjfa sjd;lkfj ;aejsahd fwejermmc k,sdjfwk eqwh ekfafj;asj d;jd; k;ek4njfd jdcu ygsdf uuayds asdfhehty sdfeh sdbdb.sdhfsa sadhfeh,sdh sdfh ahdse.",
		},
		{
          name: "Samsung Galaxy S4",
          slug: "samsung-galaxy-s4",
          thumbnail: "https://via.placeholder.com/200x300",
          shortDescription:
            "Samsung Galaxy S8 Android smartphone with true edge to edge display",
          price: 499.99,
          description:
            "sdjfa sjd;lkfj ;aejsahd fwejermmc k,sdjfwk eqwh ekfafj;asj d;jd; k;ek4njfd jdcu ygsdf uuayds asdfhehty sdfeh sdbdb.sdhfsa sadhfeh,sdh sdfh ahdse.",
        },
      ],
      selectedProduct: null,
    };
  },
  methods: {
    select(product) {
      this.selectedProduct = product;
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
.list,
.details {
  width: 50%;
  float: left;
}
.list .item {
  width: 50%;
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
