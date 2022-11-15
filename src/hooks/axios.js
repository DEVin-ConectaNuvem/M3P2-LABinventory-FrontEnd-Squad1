import axios from "axios";

/**
 * useAxios: hook to use axios instance
 *
 * @export
 * 
 */
export function useAxios() {
  return {
    axios: axios.create({
      baseURL: "http://localhost:3004",
      timeout: 8000,
    }),
  };
}
