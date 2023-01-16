import { useContext } from 'react';
import { MapContext, PlacesContext } from '../../context'
import '../../styles/map-btns.scss'
import MyLocationIcon from '@mui/icons-material/MyLocation';


export const BtnMyLocation = () => {

    const {map, isMapReady} = useContext(MapContext)
    const {userLocation} = useContext(PlacesContext)
    const onClick = () => {
        if(!isMapReady) throw new Error('Map is not ready');
        if(!userLocation) throw new Error('User Location not found');

        map?.flyTo({
            zoom: 14,
            center: userLocation
        })
    }

  return (
    <button className="btn-map btn_location btn btn-primary"
        onClick={onClick}
        style={{top: '16rem'}}

    >
    <MyLocationIcon color='action'/>
    </button>
  )
}
