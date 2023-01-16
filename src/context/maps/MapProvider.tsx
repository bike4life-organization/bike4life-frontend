/* eslint import/no-webpack-loader-syntax: off */
import { useReducer, useContext, useEffect, useState } from "react";
//@ts-ignore
import { Map, Marker, Popup } from "!mapbox-gl";
import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";
import { PlacesContext } from "../places/PlacesContext";
import directionsApi from "../../apis/DirectionsApi";
import { DirectionsResponse } from "../../interfaces/directions";
import { InterestingPlaces } from "../../types/Route";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
  distance: number;
  minuts: number;
  marker?: [number, number];
  points?: any[];
  geojson?: any;
  info: { min: number; km: number };
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
  distance: 0,
  minuts: 0,
  marker: undefined,
  points: [],
  info: { min: 0, km: 0 },
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);
  const [marker, setMarker] = useState<number[]>([0, 0]);



  useEffect(() => {
    if (state.marker) {
      state.marker = undefined;
      return;
    }
    //@ts-ignore
    dispatch({ type: "setCustomMarker", payload: marker });
  });

  const setMap = (map: Map) => {
    const myLocationPopup = new Popup().setHTML(`
            <h4>Here you are<h4>
            `);

    new Marker({
      color: "red",
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);

    dispatch({ type: "setMap", payload: map });
  };

  const getLine = (map: Map) => {
    let listOfCoords: any[] = [];
    const geojson: any = {
      type: "FeatureCollection",
      features: [],
    };
    const linestring = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [],
      },
    };

    map.on("load", () => {
      map.addSource("geojson", {
        type: "geojson",
        data: geojson,
      });
      map.addLayer({
        id: "measure-points",
        type: "circle",
        source: "geojson",
        paint: {
          "circle-radius": 5,
          "circle-color": "#000",
        },
        filter: ["in", "$type", "Point"],
      });
      map.addLayer({
        id: "measure-lines",
        type: "line",
        source: "geojson",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#000",
          "line-width": 2.5,
        },
        filter: ["in", "$type", "LineString"],
      });

      map.on("click", (e: any) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["measure-points"],
        });
        if (geojson.features.length > 1) geojson.features.pop();
        if (features.length) {
          const id = features[0].properties.id;
          geojson.features = geojson.features.filter(
            (point: any) => point.properties.id !== id
          );
        } else {
          const point: any = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [e.lngLat.lng, e.lngLat.lat],
            },
            properties: {
              id: String(new Date().getTime()),
            },
          };
          geojson.features.push(point);
        }
        if (geojson.features.length > 1) {
          linestring.geometry.coordinates = geojson.features.map(
            (point: any) => point.geometry.coordinates
          );
          geojson.features.push(linestring);
          listOfCoords = linestring.geometry.coordinates;
          dispatch({ type: "setGeojson", payload: geojson });
          dispatch({ type: "setPoints", payload: listOfCoords });

          if (listOfCoords.length >= 2) {
            getInfo(listOfCoords[0], listOfCoords[listOfCoords.length - 1]);
          }
        }

        console.log(geojson);
        map.getSource("geojson").setData(geojson);
      });
    });

    map.on("mousemove", (e: any) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["measure-points"],
      });
      map.getCanvas().style.cursor = features.length ? "pointer" : "crosshair";
    });
  };

  const drawLine = (map: Map, coord: any[] | undefined) => {
    if(!map) return;
    map.on("load", () => {
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coord,
          },
        },
      });
      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#808080",
          "line-width": 2.5,
        },
      });
      map.addLayer({
        id: "route",
        type: "circle",
        source: "geojson",
        paint: {
          "circle-radius": 7,
          "circle-color": "#000",
        },
      });
    });
  };

  const getPolyline = (map: Map, coord: any[] | undefined) => {
    if(!map) return;
    const geojson: any = {
      type: "FeatureCollection",
      features: [],
    };
    const linestring = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: coord,
      },
    };

    map.on("load", () => {
      map.addSource("georoute", {
        type: "geojson",
        data: geojson,
      });

      map.addLayer({
        id: "points",
        type: "circle",
        source: "georoute",
        paint: {
          "circle-radius": 7,
          "circle-color": "#808080",
        },
        filter: ["in", "$type", "Point"],
      });
      map.addLayer({
        id: "lines",
        type: "line",
        source: "georoute",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#808080",
          "line-width": 2.5,
        },
        filter: ["in", "$type", "LineString"],
      });

      const pointsLayers = coord?.map((point: any) => {
        const p: any = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [point[0], point[1]],
          },
          properties: {
            id: String(new Date().getTime()),
          },
        };
        geojson.features.push(p);
      });
      geojson.features.push(linestring);
      map.getSource("georoute").setData(geojson);
    });
  };

  const getGeojson = (coord: any[]) => {
    const geojson: any = {
      type: "FeatureCollection",
      features: [],
    };

    const linestring = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: coord,
      },
    };
    for (let index = 0; index < coord.length; index++) {
      const point = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: coord[index],
        },
        properties: {
          id: String(new Date().getTime() * Math.random()),
        },
      };
      geojson.features.push(point);
    }
    geojson.features.push(linestring);
    console.log(geojson)
    return geojson
  };

  const getLineEdit = (map: Map, coord: any[]) => {
    if(!map) return;
    let listOfCoords: any[] = [];

    let info = getGeojson(coord)
    let features = map.queryRenderedFeatures(info.features[info.features.length], {
      layers: ["measure-points"],
    });
    const geojson: any = {
      type: "FeatureCollection",
      features: info.features,
    };
    const linestring = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: coord,
      },
    };

    map.on("load", () => {
      map.addSource("geojson", {
        type: "geojson",
        data: geojson,
      });
      map.addLayer({
        id: "measure-points",
        type: "circle",
        source: "geojson",
        paint: {
          "circle-radius": 5,
          "circle-color": "#000",
        },
        filter: ["in", "$type", "Point"],
      });
      map.addLayer({
        id: "measure-lines",
        type: "line",
        source: "geojson",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#000",
          "line-width": 2.5,
        },
        filter: ["in", "$type", "LineString"],
      });

      map.on("click", (e: any) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["measure-points"],
        });
        if (geojson.features.length > 1) geojson.features.pop();
        if (features.length) {
          const id = features[0].properties.id;
          geojson.features = geojson.features.filter(
            (point: any) => point.properties.id !== id
          );
        } else {
          const point: any = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [e.lngLat.lng, e.lngLat.lat],
            },
            properties: {
              id: String(new Date().getTime()),
            },
          };
          geojson.features.push(point);
        }
        if (geojson.features.length > 1) {
          console.log(geojson.features)
          linestring.geometry.coordinates = geojson.features.map(
            (point: any) => point.geometry.coordinates
          );
          geojson.features.push(linestring);
          listOfCoords = linestring.geometry.coordinates;
          dispatch({ type: "setGeojson", payload: geojson });
          dispatch({ type: "setPoints", payload: listOfCoords });

          if (listOfCoords.length >= 2) {
            getInfo(listOfCoords[0], listOfCoords[listOfCoords.length - 1]);
          }
        }
        console.log(geojson);
        map.getSource("geojson").setData(geojson);
      });
    });

    map.on("mousemove", (e: any) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["measure-points"],
      });
      map.getCanvas().style.cursor = features.length ? "pointer" : "crosshair";
    });
  };

  const getInfo = async (start: [number, number], end: [number, number]) => {
    let newInfo = { min: 0, km: 0 };
    const resp = await directionsApi.get<DirectionsResponse>(
      `/${start.join(",")};${end.join(",")}`
    );
    const { distance, duration } = resp.data.routes[0];
    let kms = distance / 1000;
    kms = Math.round(kms * 100);
    kms /= 100;
    const minuts = Math.floor(duration / 60);
    newInfo = { min: minuts, km: kms };
    dispatch({ type: "setInfo", payload: newInfo });
  };

  const setCoords = (points: any[]) => {
    dispatch({ type: "setPoints", payload: points });
  };

  const showPlaces = (map: Map, places: InterestingPlaces[]) => {
    if(!map) return;
    for (let index = 0; index < places.length; index++) {
      const myPlacePopUp = new Popup().setHTML(`
            <p>${places[index].name}<p>
            `);
      new Marker()
      .setLngLat([places[index].point.lon,places[index].point.lat ])
      .setPopup(myPlacePopUp)
      .addTo(map);
    }
    dispatch({ type: "setMap", payload: map });

  }

  if (state.map?.getLayer("RouteString")) {
    state.map.removeLayer("RouteString");
    state.map.removeSource("RouteString");
  }

  return (
    <MapContext.Provider
      value={{
        ...state,
        //Methods
        setMap,
        getInfo,
        getLine,
        setCoords,
        drawLine,
        getPolyline,
        getLineEdit,
        showPlaces
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
