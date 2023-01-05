import {useEffect} from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import {useMap} from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png"
});

const Routing = (props) => {
    const map = useMap();
    const {position} = props;

    useEffect(() => {
        if (!map) return;
        const routingControl = L.Routing.control({
            waypoints: [L.latLng(position.lat, position.lng), L.latLng(position.lat, position.lng)],
            lineOptions: {
                styles: [
                    {
                        color: "#6FA1EC",
                        weight: 4
                    }
                ]
            },
            show: false,
            collapsible: true,
            routeWhileDragging: true
        }).addTo(map);

        routingControl.on('routeselected', function (e) {
            // var coord = e.route.coordinates;
            // var waypoint = e.route.waypoints;
            // var instr = e.route.instructions;
        });

        return () => map?.removeControl(routingControl);
    }, [map]);

    return null;
}

export default Routing;