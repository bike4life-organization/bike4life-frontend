import React, { useContext, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "../../styles/new-route.scss";
import { MapContext } from "../../context";
import { MapLine } from "../../components/mapbox/MapLineEdit";
import { BtnMyLocation } from "../../components/mapbox";
import Box from "@mui/material/Box";
import { UserContext } from "../../context/user/UserContext";
import { Route } from "../../types/Route";
import { useParams } from "react-router-dom";
import { PlacesContext } from '../../context/places/PlacesContext';

const ViewRoute = () => {
  const { info, points, map, drawLine, getPolyline, showPlaces } =
    useContext(MapContext);
  const { token } = useContext(UserContext);
  const [route, setRoute] = useState<Route>();
  const [coords, setCoords] = useState<any[] | undefined>([]);
  const [name, setName] = useState<string | undefined>("");
  const [userId, setUserId] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [value, setValue] = useState<
    string | number | Date | dayjs.Dayjs | null | undefined
  >(dayjs("2022-04-07"));
  const theme = createTheme();
  const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_ROUTE_API_URL}/routes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setRoute(res));
  }, []);

  useEffect(() => {
    setName(route?.name);
    setCoords(route?.coordinates);
    setDescription(route?.description);
    setValue(route?.date);
    setUserId(route?.userId);
    console.log(route?.interestingPlaces)
    if (route?.coordinates !== undefined && route.interestingPlaces !== undefined) {
      getPolyline(map, route?.coordinates);
      showPlaces(map, route.interestingPlaces)
    }
  }, [route]);

  return (
    <>
      {route === null ? (
        <h1 style={{ marginTop: "300px" }}>Loading...</h1>
      ) : (
        <div>
          <ThemeProvider theme={theme}>
            <div className="create-route-container">
              <div className="new-route-container">
                <Box
                  component="form"
                  noValidate
                  sx={{ mt: 3 }}
                >
                  <div className="new-route">
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                      <DirectionsBikeIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      View route!
                    </Typography>
                    <div className="row">
                      <TextField
                        autoComplete="given-name"
                        name="routeName"
                        required
                        fullWidth
                        id="routeName"
                        autoFocus
                        value={name}
                      />

                      <TextField
                        autoComplete="given-name"
                        name="description"
                        required
                        fullWidth
                        id="description"
                        autoFocus
                        value={description}
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
                  <div className="buttons"></div>
                </Box>
              </div>
              <div className="mapline-container">
                <MapLine />
                <BtnMyLocation />
              </div>
            </div>
          </ThemeProvider>
        </div>
      )}
    </>
  );
};
export default ViewRoute;
