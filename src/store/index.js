import { createStore } from "vuex";
import authModule from './modules/auth';
import collaboratorModule from './modules/collaborator';


const store = createStore({
  modules:{
    authModule,
    collaboratorModule,
  }
});

export default store;