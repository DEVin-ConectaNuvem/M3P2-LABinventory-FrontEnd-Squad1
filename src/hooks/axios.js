import axios from "axios";

/**
 * useAxios: hook to use axios instance
 *
 * @export
 * 
 */
export function useAxios() {
  return {
    axios: axios.create()
  }
}
