import {
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
  Chip,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AirlineStopsIcon from "@mui/icons-material/AirlineStops";

import get from "lodash/get";
import Accordion from "../Accordion";

const RouteCard = ({ details, onDeleteClick, onEditClick }) => {
  return (
    <Card
      sx={{
        maxWidth: "500px",
        my: 2,
        backgroundColor: "#f7fafd",
        borderRadius: 2,
      }}
      elevation={0}
      key={details.id}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {get(details, "name")}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h5">
            {get(details, "stops[0].name")}
            {!get(details, "direction") === "up" ? (
              <EastIcon
                sx={{ verticalAlign: "sub", color: "ThreeDHighlight" }}
              />
            ) : (
              <WestIcon
                sx={{ verticalAlign: "sub", color: "ThreeDHighlight" }}
              />
            )}{" "}
            {get(details, `stops[${details.stops.length - 1}].name`)}
          </Typography>
          <Chip
            size="small"
            label={get(details, "is_active") ? "Active" : "Inactive"}
            variant="outlined"
            color={get(details, "is_active") ? "success" : "error"}
            sx={{ mx: 1 }}
          />
        </Box>

        <Accordion
          disableGutters
          elevation={0}
          sx={{ background: "transparent", px: 0, my: 1 }}
        >
          <Accordion.Summary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="stop-details"
            id="stop-header"
          >
            All Stops
          </Accordion.Summary>
          <Accordion.Details>
            <List dense={true}>
              {details.stops.map((item, index) => (
                <ListItem key={`stop${index}`}>
                  <ListItemIcon>
                    <AirlineStopsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    secondary={`(${item.latitude} , ${item.longitude})`}
                  />
                </ListItem>
              ))}
            </List>
          </Accordion.Details>
        </Accordion>
      </CardContent>
      <CardActions sx={{ paddingX: 2 }}>
        <Grid container>
          <Grid item xs={8}>
            <Button
              onClick={() => onEditClick(details.id)}
              size="small"
              color="info"
            >
              Edit
            </Button>

            <Button
              onClick={() => onDeleteClick(details.id)}
              size="small"
              color="error"
            >
              Delete
            </Button>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "end" }}>
            <Button variant="contained" size="small" color="secondary">
              View on Map
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default RouteCard;
