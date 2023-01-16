import { useReducer } from "react";
import { RoutesContext } from "./routes-context";

export const createReducer =
  (defaultState: any, conditions: any) =>
  (state = defaultState, action: any) => {
    if (conditions[action.type]) {
      return conditions[action.type](state, action);
    }   
    return state;
  };

export const RoutesProvider = ({ children }: any) => {
  const reducer = createReducer([], {
    save: (_state: any, action: any) => [...action.payload],
    /**
     * delete, add, edit, etc...
     */
  });

  const [routes, dispatch] = useReducer(reducer, []);
  const setRoutes = (payload: any) => {
    dispatch({ type: "save", payload });
  };
  return (
    <RoutesContext.Provider value={{ routes, setRoutes }}>
      {children}
    </RoutesContext.Provider>
  );
};
