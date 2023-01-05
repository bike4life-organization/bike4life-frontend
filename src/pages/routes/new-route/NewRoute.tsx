import React, { useState } from "react";
import RouteForm from "../../../components/route-form/RouteForm";
import { Route } from "../../../types/Route";

const nuevoArray = new Array(2);
//En cada posición de nuevoArray guardamos un nuevo array
nuevoArray[0] = new Array(2);
nuevoArray[1] = new Array(2);

export const emptyRoute = {
  coordinates: nuevoArray,
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
