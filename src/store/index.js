import { createStore } from "vuex";
import authModule from './modules/auth';
import configModule from './modules/config';

const store = createStore({
  modules:{
    authModule,
    configModule,
  }
});

export default store;