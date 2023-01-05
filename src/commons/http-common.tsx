import axios from "axios";

const BASE_URL = "http://localhost:3333/routes";
const validToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvbnRhY3RqYXZpcnVpejI3QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiamF2aTI3MTEiLCJfaWQiOiI2M2I0NmZhNGUwZDI4NmYxY2E4ZDk2NmYiLCJpYXQiOjE2NzI5MjM3ODAsImV4cCI6MTY3MjkyNzM4MH0.KAU8OaPIUy42Bjx3Mlz83KDIAWU4M04ckqXtPMJ38cA";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + validToken,
  },
});
