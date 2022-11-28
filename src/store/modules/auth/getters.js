const checkEmailRegistered = (state, email) => {
  return state.authModule.users.find(user => user.email === email)
}

const expToken = state => {
  return state.authModule.token.exp
}

const token = state => {
  return state.authModule.token
}

export { checkEmailRegistered, expToken, token }
