import { Toolbar, Button, Grid, Alert, AlertTitle, Stack } from "@mui/material";
// import Map from "../components/Map";
import RouteCard from "../components/RouteList/RouteCard";
// import data from "../components/RouteList/data.json";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import removeRoute from "../modules/routes/actionCreators/removeRoute";
// import { clearStorage } from "../helpers/storage";

const RouteListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const routes = useSelector((state) => state.routes.routes || null);

  // console.log(routes);

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
              />
            ))
          ) : (
            <>
              <Alert severity="info">
                <AlertTitle>No Route Available!</AlertTitle>
                Add a route by clicking on— <strong>Add route</strong> button!
              </Alert>

              <Button
                // fullWidth
                sx={{ my: 2, mx: "auto" }}
                onClick={() => {
                  navigate("/route/new");
                }}
                variant="contained"
              >
                Add Route
              </Button>
            </>
          )}
        </Grid>
        <Grid item xs={6}>
          {/* <Map /> */}
        </Grid>
      </Grid>
    </>
  );
};

export default RouteListPage;
