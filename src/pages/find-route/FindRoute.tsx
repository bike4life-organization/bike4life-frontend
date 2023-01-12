import React, { useState, useEffect, useContext } from "react";
import RouteCard from "../../components/route-card/RouteCard";
import "../../styles/find-route.scss";
import { Route } from "../../types/Route";
import dayjs from "dayjs";
import RouteServices from '../../services/RouteServices'
import { RoutesContext } from "../../context/route/routes-context";

const FindRoute = () => {
  const [routesState, setRoutesState] = useState<Route[]>();
  const {routes, setRoutes} = useContext(RoutesContext)

  useEffect(() => {
    /*fetch(`http://localhost:3333/routes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setRoutes(res));*/
      RouteServices.getAllRoutes()
        .then((res) => setRoutes(res.data))
        .catch(err => console.error(err))
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
        {routes?.map((e: any) => {
          return <RouteCard key={e._id} route={e} userId={e.userId}/>;
        })}
      </div>
    </div>
  );
};

export default FindRoute;
