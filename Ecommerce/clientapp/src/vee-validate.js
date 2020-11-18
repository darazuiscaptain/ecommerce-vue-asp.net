import Vue from "vue";
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
import { required, email, min } from "vee-validate/dist/rules";

localize("en", en);

// Install required rule.
extend("required", required);

// Install email rule.
extend("email", email);

// Install min rule.
extend("min", min);

// Install English and Arabic localizations.
// localize({
//   en: {
//     messages: en.messages,
//     names: {
//       email: "E-mail Address",
//       password: "Password",
//     },
//     fields: {
//       password: {
//         min: "{_field_} is too short, you want to get hacked?",
//       },
//     },
//   },
// });

// Install components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
