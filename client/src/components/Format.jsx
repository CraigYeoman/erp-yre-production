import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const Format = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const theme = useTheme();
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Nav />
      <Box flexGrow={1} sx={{ backgroundColor: theme.palette.background.alt,
        borderRadius: "8px",}}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Format;
