export function useAuth() {
  let storedToken = localStorage.getItem('token')

  storedToken = JSON.parse(storedToken) || null

  return 'Bearer ' + storedToken?.token
}
