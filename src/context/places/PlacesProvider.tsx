import { useEffect, useReducer } from 'react';
import { PlacesContext } from './PlacesContext';
import { placeReducer } from './PlacesReducer';
import { getUserLocation } from '../../helpers/index';
import { searchApi } from '../../apis';
import { PlacesResponse, Feature } from '../../interfaces/places';


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
    

    const searchPlacesByTerm = async(query: string): Promise<Feature[]>=>{
        if(query.length === 0) {
            dispatch({type: 'setPlaces', payload: []})
            return [];
        }
        if(!state.userLocation) throw new Error('No user Location')

        dispatch({type: 'setLoadingPlaces'});

        const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
            params:{
                proximity: state.userLocation.join(',')
            }
        });
        dispatch({type: 'setPlaces', payload: resp.data.features});
        return resp.data.features
    }
  
    return (
    <PlacesContext.Provider value={{
        ...state,
        //Methods
        searchPlacesByTerm
    }}>
        {children}
    </PlacesContext.Provider>
  )
}
