import axios from "axios";


const BASE_URL = "http://localhost:3333/routes";
const validToken = window.sessionStorage.getItem("token");

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + validToken,
  },
});
