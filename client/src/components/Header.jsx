import { Typography, Box, useTheme, Button } from "@mui/material";
import { FaAlignLeft, FaUserCircle } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import { useState } from "react";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const { toggleSidebar, user, logoutUser } = useAppContext();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Button
          sx={{ mr: "5px" }}
          startIcon={<FaAlignLeft />}
          onClick={toggleSidebar}
        ></Button>
        <Box>
          <Typography
            variant="h2"
            color={theme.palette.secondary[100]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
          >
            {title}
          </Typography>
          <Typography variant="h5" color={theme.palette.secondary[300]}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ position: "relative" }}>
        <Button
          variant="contained"
          sx={{ position: "relative", width: "90px" }}
          startIcon={<FaUserCircle />}
          onClick={() => setShowLogout(!showLogout)}
        >
          {user?.name}
        </Button>
        {showLogout ? (
          <Box sx={{ position: "absolute", top: "40px", left: "0" }}>
            <Button
              sx={{ width: "90px" }}
              variant="contained"
              onClick={logoutUser}
            >
              Log out
            </Button>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default Header;
