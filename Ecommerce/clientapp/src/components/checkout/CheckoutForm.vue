<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(onSubmit)">
      <h4 class="mb-4">Delivery address</h4>
      <b-row>
        <b-col>
          <ValidationProvider
            rules="required|min:3"
            name="first name"
            v-slot="{ errors }"
          >
            <b-form-group>
              <label>First name</label>
              <b-form-input
                v-model="firstName"
                :state="errors[0] ? false : valid ? true : null"
              />
              <b-form-invalid-feedback id="inputLiveFeedback">{{
                errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col>
        <b-col>
          <ValidationProvider
            rules="required|min:3"
            name="last name"
            v-slot="{ errors }"
          >
            <b-form-group>
              <label>Last name</label>
              <b-form-input
                v-model="lastName"
                :state="errors[0] ? false : valid ? true : null"
              />
              <b-form-invalid-feedback id="inputLiveFeedback">{{
                errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
        </b-col>
      </b-row>
      <ValidationProvider rules="required" name="address" v-slot="{ errors }">
        <b-form-group>
          <label>Address</label>
          <b-form-input
            v-model="address"
            :state="errors[0] ? false : valid ? true : null"
          />
          <b-form-invalid-feedback id="inputLiveFeedback">{{
            errors[0]
          }}</b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider name="address 2" v-slot="{ errors }">
        <b-form-group>
          <label>Address 2 <span class="text-muted">(Optional)</span></label>
          <b-form-input
            v-model="address2"
            :state="errors[0] ? false : valid ? true : null"
          />
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider rules="required" name="town/city" v-slot="{ errors }">
        <b-form-group>
          <label>Town / city</label>
          <b-form-input
            v-model="townCity"
            :state="errors[0] ? false : valid ? true : null"
          />
          <b-form-invalid-feedback id="inputLiveFeedback">{{
            errors[0]
          }}</b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider rules="required" name="county" v-slot="{ errors }">
        <b-form-group>
          <label>County</label>
          <b-form-input
            v-model="county"
            :state="errors[0] ? false : valid ? true : null"
          />
          <b-form-invalid-feedback id="inputLiveFeedback">{{
            errors[0]
          }}</b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider rules="required" name="postcode" v-slot="{ errors }">
        <b-form-group>
          <label>Postcode</label>
          <b-form-input
            v-model="postcode"
            v-
            :state="errors[0] ? false : valid ? true : null"
          />
          <b-form-invalid-feedback id="inputLiveFeedback">{{
            errors[0]
          }}</b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider
        rules="required"
        name="name on card"
        v-slot="{ errors }"
      >
        <h4 class="mb-4">Payment details</h4>
        <b-form-group>
          <label>Name on card</label>
          <b-form-input
            v-model="nameOnCard"
            :state="errors[0] ? false : valid ? true : null"
          />
          <b-form-invalid-feedback id="inputLiveFeedback">{{
            errors[0]
          }}</b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <b-form-group>
        <label>Credit/debit card details</label>
        <div ref="card" class="form-control"></div>
      </b-form-group>
      <b-button
        :disabled="loading"
        type="submit"
        variant="primary"
        size="lg"
        block
        class="mt-4 mb-4"
      >
        Checkout
        <span v-if="loading" class="fas fa-spinner fa-spin"></span>
      </b-button>
    </form>
  </ValidationObserver>
</template>

<script>
import axios from "axios";

let stripe = Stripe(
    `pk_test_51HkfibBfV7lz1ouiraM73l7NPthENq4eHC94cp82jSb1UudULaBdObfsCyylxB8KOHNvKy3p0gVNlYTp5PyGBODZ00EVfef35y`
  ),
  elements = stripe.elements(),
  card = null,
  style = {
    base: {
      lineHeight: "24px",
    },
  };

export default {
  name: "checkout-form",
  mounted() {
    card = elements.create("card", { style: style });
    card.mount(this.$refs.card);
    this.firstName = this.$store.state.auth.firstName;
    this.lastName = this.$store.state.auth.lastName;
  },
  beforeDestroy() {
    card.destroy();
  },
  data() {
    return {
      nameOnCard: "",
      firstName: "",
      lastName: "",
      address: "",
      address2: "",
      townCity: "",
      county: "",
      postcode: "",
      loading: false,
    };
  },
  methods: {
    state(field) {
      if (this.errors.has(field)) {
        return false;
      } else {
        return this.fields[field] && this.fields[field].dirty ? true : null;
      }
    },
    onSubmit() {
      this.loading = true;
      const details = {
        name: this.nameOnCard,
      };

      stripe.createToken(card, details).then((result) => {
        if (result.error) {
          this.loading = false;
        } else {
          const order = {
            stripeToken: result.token.id,
            firstName: this.firstName,
            lastName: this.lastName,
            address1: this.address,
            address2: this.address2,
            townCity: this.townCity,
            county: this.county,
            postcode: this.postcode,
            items: this.$store.state.cart.map((item) => {
              return {
                productId: item.productId,
                colourId: item.colourId,
                storageId: item.storageId,
                quantity: item.quantity,
              };
            }),
          };

          axios
            .post("/api/orders", order)
            .then((response) => {
              this.$store.commit("clearCartItems");
              this.$emit("success", response.data);
              this.loading = false;
            })
            .catch((error) => {
              //process server errors
              console.log(error.response);
              this.loading = false;
            });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.StripeElement--focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
