/* eslint import/no-webpack-loader-syntax: off */
import { useReducer, useContext, useEffect, useState } from "react";
//@ts-ignore
import { Map, Marker, Popup } from "!mapbox-gl";
import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";
import { PlacesContext } from "../places/PlacesContext";
import directionsApi from "../../apis/DirectionsApi";
import { DirectionsResponse } from "../../interfaces/directions";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
  distance: number;
  minuts: number;
  marker?: [number, number];
  points?: any[];
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
    state.markers.forEach((marker) => marker.remove());
    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [lon, lat] = place.center;
      const popup = new Popup().setHTML(`
                <h6>${place.place_name}</h6>
                <p>${place.text}</p>
                `);
      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lon, lat])
        .addTo(state.map!);
      newMarkers.push(newMarker);
    }
    //limpiar polyline
    dispatch({ type: "setMarkers", payload: newMarkers });
    //@ts-ignore
  }, [places]);

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
    // GeoJSON object to hold our measurement features
    const geojson: any = {
      type: "FeatureCollection",
      features: [],
    };

    // Used to draw a line between points
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

      // Add styles to the map
      map.addLayer({
        id: "measure-points",
        type: "circle",
        source: "geojson",
        paint: {
          "circle-radius": 7,
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

        // Remove the linestring from the group
        // so we can redraw it based on the points collection.
        if (geojson.features.length > 1) geojson.features.pop();

        // Clear the distance container to populate it with a new value.

        // If a feature was clicked, remove it from the map.
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
          //listOfCoords.push();
          //console.log(geojson.features)
          listOfCoords = linestring.geometry.coordinates;
          console.log(listOfCoords);
          dispatch({ type: "setPoints", payload: listOfCoords });
          if (listOfCoords.length >= 2) {
            getInfo(listOfCoords[0], listOfCoords[listOfCoords.length - 1]);
          }
          // Populate the distanceContainer with total distance
        }
        map.getSource("geojson").setData(geojson);
      });
    });

    map.on("mousemove", (e: any) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["measure-points"],
      });
      // Change the cursor to a pointer when hovering over a point on the map.
      // Otherwise cursor is a crosshair.
      map.getCanvas().style.cursor = features.length ? "pointer" : "crosshair";
    });
  };

  const drawLine = (map: Map, coord: any[] | undefined) => {
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

  const getPolyline = (map: Map, coord: any[]|undefined)=>{
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

      const pointsLayers = coord?.map((point: any) =>{
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
      })
        geojson.features.push(linestring);
      map.getSource("georoute").setData(geojson);
    })
  }

  const getLineEdit = (map: Map, coord:any[]) => {
    let listOfCoords: any[] = [];
    // GeoJSON object to hold our measurement features
    const geojson: any = {
      type: "FeatureCollection",
      features: [],
    };

    // Used to draw a line between points
    const linestring = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [],
      },
    };
    geojson.features.push(linestring)
    map.on("load", () => {
      map.addSource("geojson", {
        type: "geojson",
        data: geojson,
      });

      // Add styles to the map
      map.addLayer({
        id: "measure-points",
        type: "circle",
        source: "geojson",
        paint: {
          "circle-radius": 7,
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

      
      const pointsLayers = coord?.map((point: any) =>{
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
      })

      map.on("click", (e: any) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["measure-points"],
        });


        // If a feature was clicked, remove it from the map.
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
          //listOfCoords.push();
          //console.log(geojson.features)
          listOfCoords = linestring.geometry.coordinates;
          console.log(listOfCoords);
          dispatch({ type: "setPoints", payload: listOfCoords });
          if (listOfCoords.length >= 2) {
            getInfo(listOfCoords[0], listOfCoords[listOfCoords.length - 1]);
          }
          // Populate the distanceContainer with total distance
        }
        map.getSource("geojson").setData(geojson);
      });
    });

    map.on("mousemove", (e: any) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["measure-points"],
      });
      // Change the cursor to a pointer when hovering over a point on the map.
      // Otherwise cursor is a crosshair.
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
        getLineEdit
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
