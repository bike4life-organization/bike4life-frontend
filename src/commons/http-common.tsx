import axios from "axios";

const BASE_URL = "http://localhost:3333/routes";
const validToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvbnRhY3RqYXZpcnVpejI3QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiamF2aTI3MTEiLCJfaWQiOiI2M2I0NmZhNGUwZDI4NmYxY2E4ZDk2NmYiLCJpYXQiOjE2NzI4NDg5ODIsImV4cCI6MTY3Mjg1MjU4Mn0.3KlYxiQHOUE4iS2KipJ03Rr5Dv_8Q16fsk3l-UhS07E";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + validToken,
  },
});
