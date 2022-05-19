export default {
  namespaced: true,
  state() {
    return {
      isLogged: false,
      logginError: null,
      userLogged: {
        username: null,
        email: null,
      },
      users: [],
    };
  },
  getter: {
    GET_LOGIN_USER(state) {
      return state.users.find((user) => user.isLogged);
    },
  },
  mutations: {
    SET_LOGIN_IN(state, payload) {
      state.isLogged = true;
      state.logginError = payload;
    },
    SET_LOGIN_OUT(state) {
      state.isLogged = false;
    },
    SET_USERS(state, payload) {
      state.users = payload;
    },
  },
  actions: {
   
  },
};
