import { logIn, logOut, registerUser } from "./actions";
import { SET_LOG_OUT, SET_LOGIN_IN, REGISTER_USER} from "./mutations";
import { checkEmailRegistered } from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      isLogged: false,
      userLogged: {},
      email: "",
      token: {}
    };
  },
  actions: {
    logIn,
    logOut,
    registerUser
  },
  mutations: {
    SET_LOG_OUT,
    SET_LOGIN_IN,
    REGISTER_USER
  },
  getters: {
    checkEmailRegistered,
  }
};
