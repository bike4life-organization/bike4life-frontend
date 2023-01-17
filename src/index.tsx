/* eslint import/no-webpack-loader-syntax: off */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//@ts-ignore
import mapboxgl from '!mapbox-gl'
import App from './App';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFudWVsMTk5NiIsImEiOiJjbGM2a3F0cmgxMTk1M25taDY4bm5vcmtpIn0.hBrgg-zNkvsWEKHG0LHseQ';

if(!navigator.geolocation){
  alert("Sorry, Your browser does not have a geolocator :(")
  throw new Error("Your browser does not have a geolocator")
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

