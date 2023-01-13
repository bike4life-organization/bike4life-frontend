/* eslint import/no-webpack-loader-syntax: off */
//@ts-ignore
import { Map } from "!mapbox-gl";
import { createContext } from "react";

interface MapContextProps {
  isMapReady: boolean;
  map?: Map;
  marker?: Map;
  points?: any[] | undefined;
  markers?: any[];
  info?: { min: number; km: number };

  //Methods
  setMap: (map: Map) => void;
  getInfo: (start: [number, number], end: [number, number]) => Promise<void>;
  getLine: (map: Map) => void;
  setCoords: (map: Map) => void;
  drawLine: (map: Map, coord: any[]) => void;
  getPolyline: (map: Map, coord: any[] ) => void
  getLineEdit: (map: Map, coord: any[]) => void
}

export const MapContext = createContext({} as MapContextProps);
