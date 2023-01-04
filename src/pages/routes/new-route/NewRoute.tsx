import React, { useState } from "react";
import RouteForm from "../../../components/route-form/RouteForm";
import { Route } from "../../../types/Route";

export const emptyRoute = {
  coordinates: null,
  date: new Date(),
  name: "",
  description: "",
  estimatedDuration: 35,
  userId: "",
  _id: "",
};

const NewRoute = () => {
  const [route, setRoute] = useState<Route | any>(emptyRoute);

  return <RouteForm msg="Create Route" route={route} setRoute={setRoute} />;
};

export default NewRoute;
