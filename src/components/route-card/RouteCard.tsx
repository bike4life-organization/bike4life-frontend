import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import RouteServices from "../../services/RouteServices";
import { RoutesContext } from "../../context/route/routes-context";

const RouteCard = ({ route }: any) => {
  const { routes, setRoutes } = useContext(RoutesContext);
  const deleteHandler = (routeId: any) => {
    RouteServices.remove(routeId).then((res) => {
      if (res.data == "OK") {
        const newRoutes = routes?.filter((route: any) => route._id !== routeId);
        setRoutes(newRoutes);
      }
    });
  };
  console.log(route._id);
  return (
    <Card sx={{ width: 545 }} style={{ backgroundColor: "#F9FBFa" }}>
      <CardContent style={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`Name: ${route.name}`}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {`Description: ${route.description}`}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {`Estimated duration: ${route.estimatedDuration} min`}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "center" }}>
        <Button variant="outlined">
          <Link
            style={{ textDecoration: "none" }}
            to={`/view-route/` + route._id}
          >
            {" "}
            More information
          </Link>
        </Button>
        <Button variant="outlined">
          <Link
            style={{ textDecoration: "none" }}
            to={`/edit-route/` + route._id}
          >
            {" "}
            Edit
          </Link>
        </Button>
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
