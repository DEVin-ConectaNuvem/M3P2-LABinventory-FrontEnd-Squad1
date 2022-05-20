

const logIn = async ({ state, commit }, payload) => {
  await commit("UPDATE_USERS_LOCAL_STORAGE");
  let user =  state.users.find(
    (user) => user.email === payload.email && user.password === payload.password
  )
  if (user !== undefined && user) {
    commit("SET_LOGIN_IN", user);
    return true;
  } else {
     
    return false;
  }
};

const logOut = async ({ commit }) => {
  commit("SET_LOG_OUT");
};

const registerUser = ({ commit }, payload) => {
  commit("UPDATE_USERS_LOCAL_STORAGE");
  commit("REGISTER_USER", payload);
};

const updateToken = ({ commit }) => {
  commit("UPDATE_USERS_LOCAL_STORAGE");
  commit("UPDATE_TOKEN");
}

const updateUsers = ({ commit }) => {
  commit("UPDATE_USERS_LOCAL_STORAGE");
}


export { logIn, logOut, registerUser, updateToken, updateUsers };
