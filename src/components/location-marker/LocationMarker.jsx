import {useMapEvents} from "react-leaflet";
import Routing from "../routing/Routing";
import {useState, useEffect} from "react";

const LocationMarker = () => {

    const [position, setPosition] = useState(null)

    const map = useMapEvents({
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    useEffect(() => {
        map.locate()
    }, []);

    return position === null ? null : (
        <Routing position={position} />
    )
}

export default LocationMarker;

