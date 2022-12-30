import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3333/routes",
  headers: {
    "Content-type": "application/json",
  },
});
