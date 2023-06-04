import logo from "../assets/img/yeomanRaceEnginesLogo.svg";

import { Link as RouterLink } from "react-router-dom";
import { Box, useTheme, Link, Button, Typography } from "@mui/material";

const Landing = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box width="90vw" mt="3rem">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "3rem",
          }}
        >
          <Box
            width={"300px"}
            sx={{
              bgcolor: theme.palette.background.alt,
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              color={theme.palette.secondary[100]}
              sx={{ marginBottom: "15px" }}
            >
              YRE ERP APP
            </Typography>
            <Typography
              variant="body"
              color={theme.palette.secondary[100]}
              sx={{ marginBottom: "15px" }}
            >
              Please click login or register. To view a demo of the app please
              click guest.
            </Typography>
            <Box
              mt="15px"
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <Button variant="contained" type="submit">
                <Link
                  component={RouterLink}
                  color="inherit"
                  underline="none"
                  to={`/login`}
                >
                  Login/Register
                </Link>
              </Button>
              <Button variant="contained" type="submit">
                Guest
              </Button>
            </Box>
          </Box>
          <Box
            width={"300px"}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <img src={logo} alt="logo" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;
