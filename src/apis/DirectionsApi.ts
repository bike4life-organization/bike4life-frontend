import axios from "axios";


const directionsApi = axios.create({
    baseURL: "https://api.mapbox.com/directions/v5/mapbox/cycling",
    params:{
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false, 
        access_token: 'pk.eyJ1IjoibWFudWVsMTk5NiIsImEiOiJjbGM2a3F0cmgxMTk1M25taDY4bm5vcmtpIn0.hBrgg-zNkvsWEKHG0LHseQ'
    }
})

export default directionsApi