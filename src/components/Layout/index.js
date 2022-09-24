import { Container, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./header";

const Layout = ({ title }) => {
  return (
    <div id="main">
      <Header title={title} />

      <Box
        sx={{
          backgroundColor: "rgb(255, 255, 255)",
          mt: "100px",
        }}
      >
        <Container fixed>
          <Outlet />
        </Container>
      </Box>
    </div>
  );
};

export default Layout;
