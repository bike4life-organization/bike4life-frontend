import axios from "axios";

const BASE_URL = "http://localhost:3333/routes";
const validToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvbnRhY3RqYXZpcnVpejI3QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiamF2aTI3MTEiLCJfaWQiOiI2M2I0NmZhNGUwZDI4NmYxY2E4ZDk2NmYiLCJpYXQiOjE2NzI4NTYyNjgsImV4cCI6MTY3Mjg1OTg2OH0.dBR_AZEUD-IC7EaeqskoJJBmYWZvfz6WYl1-mA4H-2g";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + validToken,
  },
});
