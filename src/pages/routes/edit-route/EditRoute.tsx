import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import RouteForm from "../../../components/route-form/RouteForm";
import { RoutesContext } from "../../../contexts/routes-context";
import { Route } from "../../../types/Route";

const EditRoute = () => {
  const { routes } = useContext(RoutesContext);
  const { id } = useParams();

  const [selectedRoute, setSelectedRoute] = useState(
    routes.find((el: Route) => el._id === id)
  );

  return (
    <RouteForm
      msg="Edit route"
      route={selectedRoute}
      setSelectedRoute={setSelectedRoute}
    />
  );
};

export default EditRoute;
