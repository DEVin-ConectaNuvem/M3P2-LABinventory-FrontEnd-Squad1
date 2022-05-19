import { logIn, logOut, RegisterUser } from "./actions";
import { SET_LOG_OUT, SET_LOGIN_IN, UPDATE_USERS_LOCAL_STORAGE, REGISTER_USER } from "./mutations";

const token = JSON.parse(localStorage.getItem('token'));


export default {
  namespaced: true,
  state() {
    return {
      isLogged: token ?  true : false,
      userLogged: token ?  token : {},
      users: [],
    };
  },
  getters: {
  },
  mutations: {
    SET_LOG_OUT,
    SET_LOGIN_IN,
    UPDATE_USERS_LOCAL_STORAGE,
    REGISTER_USER,
  },
  actions: {
    logIn,
    logOut,
    RegisterUser,
  },
};
