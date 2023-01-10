import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

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
  console.log(route._id);
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
          /* onClick={deleteHandler(route.routeId)} */ variant="outlined"
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
