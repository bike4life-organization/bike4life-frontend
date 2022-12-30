import React, { useState, useEffect } from "react";
import RouteCard from "../../components/route-card/RouteCard";
import "../../styles/find-route.scss";
import RouteServices from "../../services/RouteServices";
import axios from "axios";
import http from "../../commons/http-common";

const baseURL = "http://localhost:3000/routes";
const routesMock = [
  {
    routeId: 1,
    name: "Salida con los chabales",
    description: "hola",
  },
  {
    routeId: 2,
    name: "Salida con los chabales",
    description: "hola",
  },
  {
    routeId: 3,
    name: "Salida con los chabales",
    description: "hola",
  },
  {
    routeId: 4,
    name: "Salida con los chabales",
    description: "hola",
  },
  {
    routeId: 5,
    name: "Salida con los chabales",
    description: "hola",
  },
];

function App() {
  const [post, setAllRoutes] = React.useState(null);

  const deleteRoute = ({ route }: any) => {
    RouteServices.remove(route.id)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  React.useEffect(() => {
    RouteServices.getAllRoutes().then((response) => {
      setAllRoutes(response.data);
    });
  }, []);

  return (
    <div className="find-route">
      <div className="find-route-container">
        {setAllRoutes.map((e, index) => {
          return <RouteCard key={index} route={e} />;
        })}
      </div>
    </div>
  );
}
const RouteService = {
  App,
  deleteRoute,
};
export default RouteService;
