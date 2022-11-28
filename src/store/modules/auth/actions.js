import axios from "axios"

const logIn = async ({ commit }, payload) => {
  try {
    commit('SET_LOGIN_IN', payload)
  } catch (error) {
    throw new Error('Erro ao logar usuário')
  }
}

const getCurrentUser = async ({ commit }, token) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }

  const currentUser = await axios.get('/users/me', headers)

  commit('SET_LOGIN_IN', currentUser)
}

const logOut = async ({ commit }) => {
  commit('SET_LOG_OUT')
}

const registerUser = ({ commit }, payload) => {
  commit('REGISTER_USER', payload)
}

export { logIn, logOut, registerUser, getCurrentUser }
