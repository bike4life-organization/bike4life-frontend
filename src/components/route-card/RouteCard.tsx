import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";
import RouteServices from "../../services/RouteServices";
import { RoutesContext } from "../../contexts/routes-context";

const RouteCard = ({ route }: any) => {
  const { setRoutes } = useContext(RoutesContext);

  const deleteHandler = (routeId: string) => {
    RouteServices.remove(routeId)
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
      .finally(() => {
        RouteServices.getAllRoutes()
          .then((response) => setRoutes(response.data))
          .catch((error) => console.error(error));
      });
  };

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
          onClick={() => deleteHandler(route._id)}
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
