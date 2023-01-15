import { createContext } from "react";
import { Feature } from '../../interfaces/places';
import { Map } from "mapbox-gl";
import { InterestingPlaces } from "../../types/Route";


export interface PlacesContextProps {
    isLoading: boolean;
    userLocation?: [number, number];
    isLoadingPlaces: boolean;
    places: Feature[];
    customLocation?: [number, number];
}

export const PlacesContext = createContext<PlacesContextProps>({} as PlacesContextProps);