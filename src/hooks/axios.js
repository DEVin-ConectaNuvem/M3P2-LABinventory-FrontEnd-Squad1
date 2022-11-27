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
      baseURL: 'http://localhost:5000',
      timeout: 8000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
