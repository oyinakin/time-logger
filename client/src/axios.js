import axios from "axios"; //imports axios
var config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
  },
};
const instance = axios.create({
  baseURL: "http://localhost:3001/",
  config,
});
export default instance;
