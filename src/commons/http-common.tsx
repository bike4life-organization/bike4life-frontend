import axios from "axios";

const BASE_URL = "http://localhost:3333/routes";
const validToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvbnRhY3RqYXZpcnVpejI3QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiamF2aTI3MTEiLCJfaWQiOiI2M2I0NmZhNGUwZDI4NmYxY2E4ZDk2NmYiLCJpYXQiOjE2NzI3NzUwMjksImV4cCI6MTY3Mjc3ODYyOX0.VaVV3g1HNN8GJZV1IJTZJ9DbMyTMqDl-9X6ZCMm75KE";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + validToken,
  },
});
