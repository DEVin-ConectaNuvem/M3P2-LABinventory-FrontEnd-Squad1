const checkEmailRegistered = (state, email) => {
  return state.authModule.users.find(user => user.email === email)
}

const expToken = state => {
  return state.authModule.token.exp
}

export { checkEmailRegistered, expToken }
