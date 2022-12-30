import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";
import { Route } from "../../types/Route";
import Link from "@mui/material/Link";
import FindRoute from "../../pages/find-route/FindRoute";

const RouteCard = ({ route }: any) => {
  /**
   *
   * const deleteHandler = (routeId) => {
   *  deleteRoute(routeId)
   *      .then(res => console.log(res))
   *      .catch(err => console.error(err));
   *      .finally(() => getAllRoutes())
   * }
   */

  return (
    <Card sx={{ width: 545 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {route.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {route.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined">More information</Button>
        <Button
          onClick={FindRoute.deleteRoute(route.routeId)}
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default RouteCard;
