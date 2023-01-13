import axios from "axios";


const directionsApi = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    params:{
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false, 
        access_token: `${process.env.REACT_APP_ACCESS_TOKEN}`
    }
})

export default directionsApi