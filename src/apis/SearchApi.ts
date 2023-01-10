import axios from "axios";


const searchApi = axios.create({
    baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
    params:{
        limit: 10,
        language: 'es',
        access_token: 'pk.eyJ1IjoibWFudWVsMTk5NiIsImEiOiJjbGM2a3F0cmgxMTk1M25taDY4bm5vcmtpIn0.hBrgg-zNkvsWEKHG0LHseQ'
    }
})

export default searchApi