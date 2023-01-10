import React, { useState, useEffect } from "react";
import RouteCard from "../../components/route-card/RouteCard";
import "../../styles/find-route.scss";
import { Route } from "../../types/Route";
import dayjs from "dayjs";

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
  const [routes, setRoutes] = useState<Route[]>();

  useEffect(() => {
    fetch(`http://localhost:3333/routes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setRoutes(res));
  }, []);

  useEffect(() => {
    //llamar a la api
    /*getAllRoutes()
      .then(result => setRoutes(result))
      .catch(err => console.error(err);
    */
  }, []);

  console.log(routes);
  return (
    <div className="find-route">
      <div className="find-route-container">
        {routes?.map((e) => {
          console.log(e.userId);
          return <RouteCard key={e._id} route={e} userId={e.userId} />;
        })}
      </div>
    </div>
  );
};

export default FindRoute;
