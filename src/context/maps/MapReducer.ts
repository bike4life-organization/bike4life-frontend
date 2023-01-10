/* eslint import/no-webpack-loader-syntax: off */
//@ts-ignore
import { Map, Marker } from '!mapbox-gl';
import { MapState } from "./MapProvider";


type MapAction = 
|{type: 'setMap', payload: Map}
|{type: 'setMarkers', payload: Marker[]}
|{type: 'setCustomMarker', payload: [number, number]}
|{type: 'setInfo', payload: {min: any, km: any}}
|{type: 'setPoints', payload: any[]}

export const mapReducer=(state: MapState, action: MapAction): MapState=>{
    switch (action.type) {
        case 'setMap':
         return{
            ...state,
            isMapReady: true,
            map: action.payload
         }
         case 'setMarkers':
            return {
                ...state,
                markers: action.payload
            }

        case 'setCustomMarker':
            return {
                ...state,
                marker: action.payload
            }
    
        case 'setInfo':
            return {
                ...state,
                info: action.payload
            }
        case 'setPoints':
            return {
                ...state,
                points: action.payload
            }
        default:
           return state
    }
}