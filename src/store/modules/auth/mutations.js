const SET_LOGIN_IN = (state, payload) => {
  state.userLogged = payload;
  state.isLogged = true;
  const token = {
    id: payload.id,
  };
  localStorage.setItem("token", JSON.stringify(token));
};

const SET_LOG_OUT = (state) => {
  state.isLogged = false;
  state.userLogged = {};
  localStorage.removeItem("token");
};

const UPDATE_USERS_LOCAL_STORAGE = (state) => {
  state.users = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];
};

const REGISTER_USER = (state, payload) => {
  state.users.push(payload);
  localStorage.setItem("users", JSON.stringify(state.users));
};

const UPDATE_TOKEN = (state) => {
  const token = JSON.parse(localStorage.getItem("token"));

  if (token) {
    const user = state.users.find((user) => user.id === token.id);
    state.userLogged = token ? token : {};
    state.userLogged = user ? user : {};
  }
  state.isLogged = token ? true : false;
};

export {
  SET_LOGIN_IN,
  UPDATE_USERS_LOCAL_STORAGE,
  REGISTER_USER,
  SET_LOG_OUT,
  UPDATE_TOKEN,
};
