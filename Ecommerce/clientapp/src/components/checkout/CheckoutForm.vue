<template>
  <form @submit.prevent="submit">
<h4 class="mb-4">Delivery address</h4>
<b-row>
  <b-col>
    <b-form-group>
      <label>First name</label>
      <b-form-input v-model="firstName" data-vv-name="first name" v-validate="'required|min:3'" :state="state('first name')" />
      <b-form-invalid-feedback>
        {{ errors.first('first name') }}
      </b-form-invalid-feedback>
    </b-form-group>
  </b-col>
  <b-col>
    <b-form-group>
      <label>Last name</label>
      <b-form-input v-model="lastName" data-vv-name="last name" v-validate="'required|min:3'" :state="state('last name')" />
      <b-form-invalid-feedback>
        {{ errors.first('last name') }}
      </b-form-invalid-feedback>
    </b-form-group>
  </b-col>
</b-row>

</template>
