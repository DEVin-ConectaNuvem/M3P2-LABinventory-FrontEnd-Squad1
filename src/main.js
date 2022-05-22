import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueGravatar from "vue3-gravatar";
import VueTheMask from "vue-the-mask";
import VueLoading from "vue-loading-overlay";
import Toast from "vue-toastification";
import Paginate from "vuejs-paginate-next";
import {moment} from 'moment'
import "vue-loading-overlay/dist/vue-loading.css";
import "vue-toastification/dist/index.css";
import "./validators/validators";

const app = createApp(App);

app.directive('focus', {
  mounted: (el) => el.focus(),
})

app.use(moment);
app.use(Paginate)
app.use(router);
app.use(store);
app.use(Toast, {
  shareAppContext: true,
  maxToasts: 20,
});
app.use(VueGravatar);
app.use(VueTheMask);
app.use(VueLoading);

app.mount("#app");
