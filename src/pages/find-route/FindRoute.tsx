import React, { useEffect, useContext } from "react";
import RouteCard from "../../components/route-card/RouteCard";
import "../../styles/find-route.scss";
import RouteServices from '../../services/RouteServices'
import { RoutesContext } from "../../context/route/routes-context";

const FindRoute = () => {
  const {routes, setRoutes} = useContext(RoutesContext)

  useEffect(() => {
      RouteServices.getAllRoutes()
        .then((res) => setRoutes(res.data))
        .catch(err => console.error(err))
  }, []);

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
