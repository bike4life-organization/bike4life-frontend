import { useContext, useEffect } from "react";
import RouteCard from "../../../components/route-card/RouteCard";
import { RoutesContext } from "../../../contexts/routes-context";
import RouteServices from "../../../services/RouteServices";

import "../../../styles/find-route.scss";
import { Route } from "../../../types/Route";
import EditRoute from "../edit-route/EditRoute";

const FindRoute = () => {
  const { routes, setRoutes } = useContext(RoutesContext);
  useEffect(() => {
    RouteServices.getAllRoutes()
      .then((result) => setRoutes(result.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="find-route">
      <div className="find-route-container">
        {routes.map((e: Route, index: number) => {
          return <RouteCard key={index} route={e} />;
        })}
      </div>
    </div>
  );
};

export default FindRoute;
