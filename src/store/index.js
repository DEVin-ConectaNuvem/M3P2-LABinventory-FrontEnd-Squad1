import { createStore } from "vuex";
import authModule from './modules/auth';

const store = createStore({
  modules:{
    authModule,
  }
});

export default store;