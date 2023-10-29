import { NODE_ENV, PUBLIC_URL } from "./constants";
let API_ROUTE: string;

NODE_ENV === 'development'
  ? API_ROUTE = 'http://localhost:8888/api'
  : API_ROUTE = `https://${PUBLIC_URL}/api`


export default API_ROUTE