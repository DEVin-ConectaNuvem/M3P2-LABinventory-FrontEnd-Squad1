import { useAxios } from "../../../hooks";

const { axios } = useAxios();

const SET_LOGIN_IN = (state, payload) => {
    state.email = payload["email"];
    state.userLogged = payload['email'].split('@')[0]
    state.isLogged = true;
    state.token = payload["exp"];
    localStorage.setItem('token', JSON.stringify(payload))
}

const SET_LOG_OUT = (state) => {
    state.isLogged = false;
    state.userLogged = {};
    localStorage.removeItem('token');
}

const REGISTER_USER = async (state, payload) => {
    try {
      const res = await axios.post(
        "/users",
        payload
      );
    } catch (error) {
        throw new Error("Erro ao registrar usuário");
    }
}



export {SET_LOGIN_IN, REGISTER_USER, SET_LOG_OUT}