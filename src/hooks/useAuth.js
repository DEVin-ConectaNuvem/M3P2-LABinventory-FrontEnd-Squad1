export function useAuth() {
  const storedToken = localStorage.getItem('token')
  let token = ''
  if (storedToken) {
    token = JSON.parse(storedToken ? storedToken : '')
  }

  if (token && token.token) {
    return 'Bearer ' + token.token
  } else {
    return false
  }
}
