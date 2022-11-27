const logIn = async ({ commit }, payload) => {
  try {
    commit('SET_LOGIN_IN', payload)
  } catch (error) {
    throw new Error('Erro ao logar usuário')
  }
}

const logOut = async ({ commit }) => {
  commit('SET_LOG_OUT')
}

const registerUser = ({ commit }, payload) => {
  commit('REGISTER_USER', payload)
}

export { logIn, logOut, registerUser }
