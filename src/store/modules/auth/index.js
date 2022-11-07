import { logIn, logOut, registerUser, updateToken, updateUsers } from "./actions";
import { SET_LOG_OUT, SET_LOGIN_IN, UPDATE_USERS_LOCAL_STORAGE, REGISTER_USER, UPDATE_TOKEN} from "./mutations";
import { checkEmailRegistered } from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      isLogged: false,
      userLogged: {},
      users: [],
    };
  },
  actions: {
    logIn,
    logOut,
    registerUser,
    updateToken,
    updateUsers,
  },
  mutations: {
    SET_LOG_OUT,
    SET_LOGIN_IN,
    UPDATE_USERS_LOCAL_STORAGE,
    REGISTER_USER,
    UPDATE_TOKEN,
  },
  getters: {
    checkEmailRegistered,
  }
};
