import http from "../commons/http-common";
import { Route } from "../types/Route";

const getAllRoutes = () => {
  return http().get<Route[], any>("/");
};

const create = (data: Route) => {
  return http().post("/", data);
};

const update = (id: string|undefined, data: Route) => {
  return http().put(`/${id}`, data);
};

const remove = (id: string) => {
  return http().delete(`/${id}`);
};

const RouteServices = {
  getAllRoutes,
  create,
  update,
  remove,
};
export default RouteServices;
