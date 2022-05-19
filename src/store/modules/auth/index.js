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
    logIn({ commit }, payload) {
      commit("SET_LOGIN_IN", payload);
    },
    logOut({ commit }) {
      commit("SET_LOGIN_OUT");
    },
    setUsers({ commit }, payload) {
      commit("SET_USERS", payload);
    },
    getUsers({ commit }) {
      const users = localStorage.getItem("users");
      if (users) {
        commit("SET_USERS", JSON.parse(users));
      }
    },
  },
};
