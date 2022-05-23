import { createStore } from "vuex";
import authModule from './modules/auth';
import collaboratorModule from './modules/collaborator';
import itemsModule from './modules/item';

const store = createStore({
  modules:{
    authModule,
    collaboratorModule,
    itemsModule,
  }
});

export default store;