import logo from "../assets/img/yeomanRaceEnginesLogo.svg";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Box, useTheme, Link, Button, Typography } from "@mui/material";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";

const Landing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, setupUser, isLoading } = useAppContext();

  const currentUser = {
    name: "guest",
    email: "guest@gmail.com",
    password: "secret",
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setupUser({
      currentUser,
      endPoint: "login",
      alertText: "Login Successful! Redirecting...",
    });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

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
              <Button
                variant="contained"
                type="submit"
                disable={isLoading.toString()}
              >
                <Link
                  component={RouterLink}
                  color="inherit"
                  underline="none"
                  onClick={onSubmit}
                >
                  Guest
                </Link>
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
