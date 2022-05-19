const SET_LOGIN_IN = (state, payload) => {
    state.userLogged = payload;
    state.isLogged = true;
    const token = {
        id: payload.id,
        email: payload.email,
    }
    localStorage.setItem('token', JSON.stringify(token));
}

const SET_LOG_OUT = (state) => {
    state.isLogged = false;
    state.userLogged = {};
    localStorage.removeItem('token');
}

const UPDATE_USERS_LOCAL_STORAGE = (state) => {
    state.users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
}

const REGISTER_USER = (state, payload) => {
    state.users.push(payload);
    localStorage.setItem("users", JSON.stringify(state.users));
}

export {SET_LOGIN_IN, UPDATE_USERS_LOCAL_STORAGE, REGISTER_USER, SET_LOG_OUT}