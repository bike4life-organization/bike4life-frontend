import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "../../styles/new-route.scss";
import { MapContext } from "../../context";
import { MapLine } from "../../components/mapbox/MapLine";
import { BtnMyLocation } from "../../components/mapbox";
import Box from "@mui/material/Box";
import { UserContext } from "../../context/user/UserContext";

const CreateRoute = () => {
  const { info, points } = useContext(MapContext);
  const { token } = useContext(UserContext);
  const theme = createTheme();
  const [value, setValue] = useState<Dayjs | null>(dayjs("2022-04-07"));

  const submitPostRoute = (route: any) => {
    fetch(`${process.env.REACT_APP_ROUTE_API_URL}/routes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(route),
    }).then((res) => {
      if (res.status === 200) {
        console.log("Route Created");
        alert("Route Created");
      } else if (res.status === 409) {
        console.log("Route already exists");
        console.log("Route already exists");
      }
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (points?.length === undefined || points.length < 2) {
      return;
    }
    const route = {
      estimatedDuration: info?.min,
      name: data.get("routeName"),
      description: data.get("description"),
      date: value,
      coordinates: points,
    };
    console.log(route);
    submitPostRoute(route);
    console.log(window.sessionStorage.getItem("token"));
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="create-route-container">
        <div className="new-route-container">
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <div className="new-route">
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <DirectionsBikeIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Create a route!
              </Typography>
              <div className="row">
                <TextField
                  autoComplete="given-name"
                  name="routeName"
                  required
                  fullWidth
                  id="routeName"
                  label="Route Name"
                  autoFocus
                />

                <TextField
                  autoComplete="given-name"
                  name="description"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  autoFocus
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="DateTimePicker"
                    value={value}
                    onChange={(newValue: any) => {
                      setValue(newValue);
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className="buttons">
              <Button
                className="submit-btn"
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send
              </Button>
            </div>
          </Box>
        </div>
        <div className="mapline-container">
          <MapLine />
          <BtnMyLocation />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CreateRoute;
