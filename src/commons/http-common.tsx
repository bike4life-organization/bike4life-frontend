import axios from "axios";

const BASE_URL = "http://localhost:3333/routes";
const validToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvbnRhY3RqYXZpcnVpejI3QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiamF2aTI3MTEiLCJfaWQiOiI2M2I0NmZhNGUwZDI4NmYxY2E4ZDk2NmYiLCJpYXQiOjE2NzI5MTY0NjUsImV4cCI6MTY3MjkyMDA2NX0.lfLyCVTbCBvP8lo2f6Gl-ZvOmk4evE3Z8VRwz_9E0SU";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + validToken,
  },
});
