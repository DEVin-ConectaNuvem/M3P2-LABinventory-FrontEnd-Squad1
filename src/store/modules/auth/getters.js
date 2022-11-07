const checkEmailRegistered = (state, email) => {
    return state.authModule.users.find(user => user.email === email)
}



export { checkEmailRegistered }