import {
  Toolbar,
  Button,
  Grid,
  Alert,
  AlertTitle,
  Stack,
  Card,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import RouteCard from "../components/RouteList/RouteCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import removeRoute from "../modules/routes/actionCreators/removeRoute";
import Map from "../components/TomTomMap";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import useNotification from "../hooks/useNotification";
import { v4 as uuidv4 } from "uuid";
import addRoute from "../modules/routes/actionCreators/addRoute";

const RouteListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = useNotification();

  const routes = useSelector((state) => state.routes.routes || null);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleDeleteClick = (id) => {
    dispatch(removeRoute(id));
  };

  const handleClearAll = () => {
    routes.forEach((item) => {
      dispatch(removeRoute(item.id));
    });
  };

  const handleEditClick = (id) => {
    navigate(`/route/${id}`);
  };

  const handleViewOnMapClick = (routeId) => {
    setSelectedRoute(routes.find((route) => route.id === routeId));
  };

  const handleAddSampleRoute = () => {
    const postData = {
      direction: "up",
      id: uuidv4(),
      is_active: true,
      name: "Sample Route",
      stops: [
        {
          id: uuidv4(),
          latitude: "12.972442",
          longitude: "77.580643",
          name: "Bangalore",
        },
        {
          id: uuidv4(),
          latitude: "15.299326",
          longitude: "74.123993",
          name: "Goa",
        },
        {
          id: uuidv4(),
          latitude: "19.075983",
          longitude: "72.877655",
          name: "Mumbai",
        },
      ],
    };

    dispatch(addRoute(postData)).then(() => {
      notify.success("Sample Route added successfully");
    });
  };

  return (
    <>
      {!!routes && routes.length > 0 && (
        <Toolbar sx={{ justifyContent: "end" }}>
          <Stack direction="row" spacing={2}>
            <Button
              onClick={() => {
                navigate("/route/new");
              }}
              variant="contained"
            >
              Add Route
            </Button>
            <Button
              color="secondary"
              onClick={() => handleClearAll()}
              variant="contained"
            >
              Clear Routes
            </Button>
          </Stack>
        </Toolbar>
      )}
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ my: 2 }}>
          {!!routes && routes.length > 0 ? (
            routes.map((item) => (
              <RouteCard
                details={item}
                onDeleteClick={handleDeleteClick}
                onEditClick={handleEditClick}
                onViewMapClick={
                  !selectedRoute ? handleViewOnMapClick : undefined
                }
              />
            ))
          ) : (
            <>
              <Alert severity="info">
                <AlertTitle>No Route Available!</AlertTitle>
                Add a route by clicking on— <strong>
                  Add route
                </strong> button! <br />
                You can also add a quick sample route by clicking on{" "}
                <strong>Add Sample Route</strong> button.
              </Alert>

              <Stack direction="row" spacing={1} sx={{ my: 2, mx: "auto" }}>
                <Button
                  onClick={() => {
                    navigate("/route/new");
                  }}
                  variant="contained"
                >
                  Add Route
                </Button>
                <Button
                  onClick={() => handleAddSampleRoute()}
                  variant="outlined"
                  color="secondary"
                >
                  Add Sample Route
                </Button>
              </Stack>
            </>
          )}
        </Grid>
        {!!selectedRoute && routes.length > 0 && (
          <Grid item xs={6} sx={{ my: 3 }}>
            <Card>
              <CardHeader
                title={selectedRoute.name}
                action={
                  <IconButton
                    onClick={() => setSelectedRoute(null)}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                }
              />
              <CardContent sx={{ height: "50vh" }}>
                <Map
                  stops={
                    selectedRoute.direction !== "up"
                      ? selectedRoute.stops.reverse()
                      : selectedRoute.stops
                  }
                />
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default RouteListPage;
