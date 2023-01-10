import { useContext } from 'react';
import { MapContext, PlacesContext } from '../context'



export const addMarker = () => {

    const {map, isMapReady} = useContext(MapContext)
    const {userLocation} = useContext(PlacesContext)
    
    const onClick = () => {
        if(!isMapReady) throw new Error('Map is not ready');
        if(!userLocation) throw new Error('User Location not found');

        map.on('click', (e:any) => {
            //console.log(`A click event has occurred at ${e.lngLat.lat}`);
            //@ts-ignore
            setMarker(e.lngLat)
            });
    }}