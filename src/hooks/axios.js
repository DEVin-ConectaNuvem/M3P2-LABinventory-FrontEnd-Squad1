import axios from 'axios'
import { useAuth } from './useAuth'

/**
 * useAxios: hook to use axios instance
 *
 * @export
 *
 */
export function useAxios() {
  const token = useAuth()

  if (token) {
    axios.defaults.headers.common['Authorization'] = token
  }

  return {
    axios: axios.create({
      baseURL: 'https://labinventary-ow6376zhsq-uc.a.run.app',
      timeout: 8000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
