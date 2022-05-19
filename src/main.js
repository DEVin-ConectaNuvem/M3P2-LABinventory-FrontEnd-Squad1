import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueGravatar from "vue3-gravatar";
import './validators/validators'



const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueGravatar);

app.mount("#app");
