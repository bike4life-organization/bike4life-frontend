import http from "../commons/http-common";

const getAllRoutes = () => {
  return http.get("/listRoutes");
};

const create = (data: any) => {
  return http.post("/createRoute", data);
};

const update = (id: any, data: any) => {
  return http.put(`/updateRoute/${id}`, data);
};

const remove = (id: any) => {
  return http.delete(`/removeRoute/${id}`);
};

const RouteServices = {
  getAllRoutes,
  create,
  update,
  remove,
};
export default RouteServices;
