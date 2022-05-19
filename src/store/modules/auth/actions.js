const logIn = async ({ commit }, payload) => {
  commit("SET_LOG_OUT");

  let users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  let user = users.find(
    (user) => user.email === payload.email && user.password === payload.password
  );
  console.log(user);
  if (user) {
    await commit("SET_LOGIN_IN", payload);
    return true;
  } else {
    return false;
  }
};

const logOut = async ({ commit }) => {
  commit("SET_LOG_OUT");
};

const RegisterUser = ({ commit }, payload) => {
  commit("UPDATE_USERS_LOCAL_STORAGE");
  commit("REGISTER_USER", payload);
  return "success";
};

export { logIn, logOut, RegisterUser };
