import axios from "axios";


const BASE_URL = `${process.env.REACT_APP_ROUTE_API_URL}/routes`;
const validToken = () => window.sessionStorage.getItem("token");

export default () => axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + validToken(),
    },
});
