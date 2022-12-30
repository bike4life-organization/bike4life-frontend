import React, { useState, useEffect } from "react";
import RouteCard from "../../components/route-card/RouteCard";
import "../../styles/find-route.scss";
import RouteServices from "../../services/RouteServices";
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

const FindRoute = () => {
  const [routes, setRoutes] = useState(RouteServices.getAllRoutes);

  useEffect(() => {
    //llamar a la api
    /*getAllRoutes()
      .then(result => setRoutes(result))
      .catch(err => console.error(err);
    */
  }, []);

  return (
    <div className="find-route">
      <div className="find-route-container">
        {routes.map((e, index) => {
          return <RouteCard key={index} route={e} />;
        })}
      </div>
    </div>
  );
};

export default FindRoute;
