import axios from "axios";

/**
 * useAxios: hook para retornar uma instância do axios
 *
 * @export
 * 
 */
export function useAxios() {
  return {
    axios: axios.create()
  }
}
