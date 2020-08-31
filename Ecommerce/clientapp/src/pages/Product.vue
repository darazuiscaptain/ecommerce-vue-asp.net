<template>
    <product-details :product="product"/>
</template>

<script>
import ProductDetails from "../components/product/Details.vue";

export default {
    name: "product",
    components: {
        ProductDetails
    },
    data() {
        return {
            product: {
                name: "Samsung Galaxy S1",
                slug: "samsung-galaxy-s1",
                thumbnail: "https://via.placeholder.com/200x300",
                shortDescription:
                    "Samsung Galaxy S8 Android smartphone with true edge to edge display",
                price: 499.99,
                description:
                    "sdjfa sjd;lkfj ;aejsahd fwejermmc k,sdjfwk eqwh ekfafj;asj d;jd; k;ek4njfd jdcu ygsdf uuayds asdfhehty sdfeh sdbdb.sdhfsa sadhfeh,sdh sdfh ahdse.",
            }
        };
    },
};
</script>

