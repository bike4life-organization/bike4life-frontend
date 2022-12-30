import {MapContainer, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LocationMarker from "../location-marker/LocationMarker";

const MapBox = () => {
    return (
        <MapContainer center={[40.463667, -3.74922]} zoom={14} style={{height: "60vh"}}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker/>
        </MapContainer>
    );
}

export default MapBox;

