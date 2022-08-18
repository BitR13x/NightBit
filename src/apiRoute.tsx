const { NODE_ENV, PUBLIC_URL } = require("./config.json");
let API_ROUTE : string;

NODE_ENV === 'development'
  ? API_ROUTE = 'http://127.0.0.1:8888/api/v1'
  : API_ROUTE = `https://${PUBLIC_URL}/api/v1`


export default API_ROUTE