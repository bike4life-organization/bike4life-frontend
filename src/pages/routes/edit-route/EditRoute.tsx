import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import RouteForm from "../../../components/route-form/RouteForm";
import { RoutesContext } from "../../../contexts/routes-context";
import RouteServices from "../../../services/RouteServices";
import { Route } from "../../../types/Route";
import { useNavigate } from "react-router-dom";

const EditRoute = () => {
  const { routes } = useContext(RoutesContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedRoute, setSelectedRoute] = useState(
    routes.find((el: Route) => el._id === id)
  );

  const handlerUpdateRoute = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    RouteServices.update(selectedRoute._id, selectedRoute)
      .then((result) => console.log(result))
      .catch((err) => console.error(err))
      .finally(() => navigate("/routes"));
  };

  return (
    <RouteForm
      msg="Edit route"
      route={selectedRoute}
      setRoute={setSelectedRoute}
      handlerUpdateRoute={handlerUpdateRoute}
    />
  );
};

export default EditRoute;
