import React, { useState } from "react";
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
import FeedIcon from "@mui/icons-material/Feed";
import "../../styles/route-form.scss";
import MapBox from "../map-box/MapBox";

const RouteForm = ({ msg, routeSelected, handlerUpdateRoute }: any) => {
  const theme = createTheme();
  const [value, setValue] = useState<Dayjs | null>(dayjs("2022-04-07"));

  const [route, setRoute] = useState(routeSelected);

  return (
    <ThemeProvider theme={theme}>
      <div className="new-route-container">
        <div className="new-route">
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <DirectionsBikeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {msg}
          </Typography>
          <div className="row">
            <div className="col">
              <TextField
                required
                fullWidth
                name="start-place"
                label="Start Place"
                value={null}
                id="start-place"
              />
              <TextField
                autoComplete="given-name"
                name="routeName"
                required
                fullWidth
                id="routeName"
                label={route.name}
                value={route.name}
                onChange={(event) =>
                  setRoute({ ...route, name: event.target.value })
                }
                autoFocus
              />
            </div>
            <div className="col">
              <TextField
                required
                fullWidth
                name="end-place"
                label="End place"
                value={null}
                id="end-place"
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Fecha y hora"
                  value={route.date}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="row" style={{ width: "100%" }}>
            <div className="col" style={{ width: "100%" }}>
              <MapBox />
            </div>
          </div>
          <div className="row">
            <TextField
              label="Description"
              id="description"
              variant="outlined"
              value={route.description}
              sx={{ m: 3, width: "73ch" }}
              onChange={(event) =>
                setRoute({ ...route, description: event.target.value })
              }
              InputProps={{
                startAdornment: <FeedIcon />,
              }}
            />
          </div>
        </div>
        <Button
          className="submit-btn"
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handlerUpdateRoute}
        >
          {msg}
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default RouteForm;
