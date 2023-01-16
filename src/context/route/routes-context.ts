import { createContext } from "react";

export const routesContextInitialValue = {
  routes: [],
  setRoutes: () => {
    /* do nothing */
  },
};
export const RoutesContext = createContext<any>(routesContextInitialValue);
