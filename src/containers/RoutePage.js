import {
  Toolbar,
  Button,
  Grid,
  TextField,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  ToggleButton,
  CardActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useNotification from "../hooks/useNotification";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import addRoute from "../modules/routes/actionCreators/addRoute";
import editRoute from "../modules/routes/actionCreators/editRoute";

const initialValue = {
  name: "",
  id: uuidv4(),
  direction: "up",
  is_active: true,
  stops: [
    { id: uuidv4(), name: "", latitude: "", longitude: "" },
    { id: uuidv4(), name: "", latitude: "", longitude: "" },
  ],
};

const RoutePage = () => {
  const navigate = useNavigate();
  const notify = useNotification();
  const dispatch = useDispatch();
  const params = useParams();
  const routeId = params.routeId;

  const [routeDetails, setRouteDetails] = useState(initialValue);

  const routes = useSelector((state) => state.routes.routes);

  useEffect(() => {
    if (!!routeId && !!routes && routes.length > 0) {
      setRouteDetails(routes.find((route) => route.id === routeId));
    }
  }, [routeId]);

  const handleChange = (field) => (value) => {
    if (routeDetails[field] !== value) {
      setRouteDetails({ ...routeDetails, [field]: value });
    }
  };

  const handleStopChange = (index) => (field) => (value) => {
    setRouteDetails({
      ...routeDetails,
      stops: routeDetails.stops.map((item, i) => {
        return i !== index ? item : { ...item, [field]: value };
      }),
    });
  };

  const deleteStop = (index) => {
    if (routeDetails.stops.length < 3) {
      return;
    }
    setRouteDetails({
      ...routeDetails,
      stops: routeDetails.stops.filter((item, i) => i !== index),
    });
  };

  const addStop = () => {
    setRouteDetails({
      ...routeDetails,
      stops: [...routeDetails.stops, initialValue.stops],
    });
  };

  const handleSubmit = () => {
    routeId
      ? dispatch(editRoute(routeId, routeDetails)).then(() => {
          notify.success("Route edited successfully");
          navigate("/route-list");
        })
      : dispatch(addRoute(routeDetails)).then(() => {
          notify.success("New Route added successfully");
          navigate("/route-list");
        });
  };

  return (
    <>
      <Toolbar sx={{ justifyContent: "end" }}>
        <Button
          onClick={() => {
            navigate("/route-list");
          }}
          variant="contained"
        >
          Back to Routes
        </Button>
      </Toolbar>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ my: 2 }}>
          <Card
            sx={{
              my: 2,
              backgroundColor: "#f7fafd",
              borderRadius: 2,
            }}
            elevation={0}
          >
            <CardHeader title="Add/Edit Route" />
            <CardContent>
              <TextField
                size="small"
                autoFocus
                value={routeDetails.name}
                fullWidth
                required
                label="Route Name"
                sx={{ my: 1 }}
                onChange={(e) => handleChange("name")(e.target.value)}
              />
              <FormControl sx={{ py: 1, width: "100%" }}>
                <FormLabel>Direction?</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={routeDetails.direction}
                  onChange={(e) => handleChange("direction")(e.target.value)}
                >
                  <FormControlLabel value="up" control={<Radio />} label="Up" />
                  <FormControlLabel
                    value="down"
                    control={<Radio />}
                    label="Down"
                  />
                </RadioGroup>
              </FormControl>

              <ToggleButton
                size="small"
                sx={{ py: 1 }}
                color={!routeDetails.is_active ? "warning" : "success"}
                value={routeDetails.is_active}
                selected={routeDetails.is_active}
                onChange={() => {
                  handleChange("is_active")(!routeDetails.is_active);
                }}
              >
                {routeDetails.is_active ? "Active" : "Inactive"}
              </ToggleButton>

              {routeDetails.stops.map((stop, index) => (
                <Card
                  sx={{
                    my: 2,
                    p: 2,
                    borderRadius: 2,
                  }}
                  elevation={0}
                  key={`stops-${index}`}
                >
                  <CardHeader
                    title={`Stop ${index + 1}`}
                    action={
                      index !== 0 && index !== 1 ? (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => deleteStop(index)}
                          size="small"
                        >
                          Delete
                        </Button>
                      ) : null
                    }
                  />
                  <TextField
                    size="small"
                    fullWidth
                    required
                    id="outlined-required"
                    label="Stop Name"
                    margin="dense"
                    value={stop.name}
                    onChange={(e) => {
                      handleStopChange(index)("name")(e.target.value);
                    }}
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      {" "}
                      <TextField
                        size="small"
                        fullWidth
                        required
                        id="outlined-required"
                        label="Latitude"
                        margin="dense"
                        value={stop.latitude}
                        onChange={(e) => {
                          handleStopChange(index)("latitude")(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        size="small"
                        fullWidth
                        required
                        id="outlined-required"
                        label="Longitude"
                        margin="dense"
                        value={stop.longitude}
                        onChange={(e) => {
                          handleStopChange(index)("longitude")(e.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Card>
              ))}

              <Button
                variant="outlined"
                onClick={() => addStop()}
                fullWidth
                sx={{ my: 2 }}
                size="small"
              >
                Add Stop
              </Button>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleSubmit()}
              >
                Submit
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default RoutePage;
