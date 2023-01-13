import { useEffect, useReducer } from 'react';
import { PlacesContext } from './PlacesContext';
import { placeReducer } from './PlacesReducer';
import { getUserLocation } from '../../helpers/index';
import { Feature } from '../../interfaces/places';


export interface PlacesState{
    isLoading: boolean,
    userLocation?:[number, number],
    isLoadingPlaces: boolean,
    places: Feature[]
    customLocation?:[number, number]
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: [],
    customLocation:undefined,
}

interface Props{
    children: JSX.Element | JSX.Element[];
}


export const PlacesProvider = ({children}:Props) => {
    const [state, dispatch] = useReducer(placeReducer, INITIAL_STATE)

    useEffect(() => {
        getUserLocation()
            .then(lngLat => dispatch({type: 'setUserLocation', payload: lngLat}))
    }, [])
    


  
    return (
    <PlacesContext.Provider value={{
        ...state,
    }}>
        {children}
    </PlacesContext.Provider>
  )
}
