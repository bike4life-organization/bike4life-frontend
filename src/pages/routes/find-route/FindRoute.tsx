import { useContext } from "react";
import RouteCard from "../../../components/route-card/RouteCard";
import { RoutesContext } from "../../../contexts/routes-context";

import "../../../styles/find-route.scss";
import { Route } from "../../../types/Route";

const FindRoute = () => {
  const { routes } = useContext(RoutesContext);

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
