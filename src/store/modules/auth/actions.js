const logIn = async ({ state, commit }, payload) => {
  commit('SET_LOGIN_IN', payload)
}

const logOut = async ({ commit }) => {
  commit('SET_LOG_OUT')
}

const registerUser = ({ commit }, payload) => {
  commit('REGISTER_USER', payload)
}

export { logIn, logOut, registerUser }
