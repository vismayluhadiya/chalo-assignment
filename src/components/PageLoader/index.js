import { CircularProgress, Box } from "@mui/material";

const PageLoader = () => (
  <Box
    sx={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      flexdirection: "column",
      alignItems: "center"
    }}
  >
    <CircularProgress />
  </Box>
);

export default PageLoader;
