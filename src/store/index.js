import { createStore } from "vuex";
import authModule from './modules/auth';
import collaboratorModule from './modules/collaborator';
import itemsModule from './modules/item';
import configModule from './modules/config';

const store = createStore({
  modules:{
    authModule,
    collaboratorModule,
    itemsModule,
    configModule,
  }
});

export default store;