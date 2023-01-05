import React, { useContext, useEffect } from "react";
import Header from "../components/header/Header";
import { RoutesContext } from "../contexts/routes-context";
import RouteServices from "../services/RouteServices";

const MainLayaout = ({ children }: any) => {
  const { setRoutes } = useContext(RoutesContext);
  useEffect(() => {
    RouteServices.getAllRoutes()
      .then((result) => setRoutes(result.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default MainLayaout;
