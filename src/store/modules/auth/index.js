
const user = JSON.parse(localStorage.getItem('token'));

export default {
  namespaced: true,
  state() {
    return {
      isLogged: user ?  true : false,
      userLogged: {},
      users: [],
    };
  },
  getters: {
    getUserEmail(state, payload){
      commit("UPDATE_USERS_LOCAL_STORAGE");
      return state.users.find(user => user.email === payload.email );
      
    }
  },
  mutations: {
    SET_LOGIN_IN(state, payload) {
      state.userLogged = payload;
      state.isLogged = true;
      localStorage.setItem('token', JSON.stringify(payload));
    },
    UPDATE_USERS_LOCAL_STORAGE(state) {
      state.users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
    },
    REGISTER_USER(state, payload) {
      state.users.push(payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    SET_LOG_OUT(state) {
      state.isLogged = false;
      state.userLogged = {};
      localStorage.removeItem('token');
    }
  },
  actions: {
    async logIn({ commit }, payload) {
      commit("SET_LOG_OUT");

      let users = localStorage.getItem("users")
        ? JSON.parse(localStorage.getItem("users"))
        : [];

      let user = users.find(
        (user) => user.email === payload.email && user.password === payload.password
      );
        console.log(user)
      if (user) {
        await commit("SET_LOGIN_IN", payload);
        return true
      } else {
        return false
      }
    },
    async logOut({ commit }) {
      commit("SET_LOG_OUT");
    },
    RegisterUser({ commit }, payload) {
      commit("UPDATE_USERS_LOCAL_STORAGE");
      commit("REGISTER_USER", payload);
      return 'success';
    },
  },
};
