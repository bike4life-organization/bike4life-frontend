/* eslint import/no-webpack-loader-syntax: off */
import { useContext, useLayoutEffect, useRef } from "react";
import { MapContext, PlacesContext } from "../../context";
import { Loading } from ".";
//@ts-ignore
import mapboxgl from "!mapbox-gl";
import "../../styles/mapbox.scss";

export const MapLine = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);
  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new mapboxgl.Map({
        container: mapDiv.current!, // container ID
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 11, // starting zoom
      });
      setMap(map);
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div
        ref={mapDiv}
        className="mapbox-container"
        style={{
          height: "100vh",
          position: "relative",
          width: "100%",
          right: 0,
          top: 0,
        }}
      ></div>
    </div>
  );
};
