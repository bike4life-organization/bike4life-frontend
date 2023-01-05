import React, { useContext, useMemo } from "react";
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

  const selected = useMemo(() => {
    return routes.find((el: Route) => el._id === id);
  }, [routes, id]);

  const handlerUpdateRoute = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    RouteServices.update(selected._id, selected)
      .then((result) => console.log(result))
      .catch((err) => console.error(err))
      .finally(() => navigate("/routes"));
  };

  return selected ? (
    <RouteForm
      msg="Edit route"
      routeSelected={selected}
      handlerUpdateRoute={handlerUpdateRoute}
    />
  ) : null;
};

export default EditRoute;
