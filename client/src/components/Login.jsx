import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppContext } from "../context/appContext";
import logo from "../assets/img/yeomanRaceEnginesLogo.svg";
import Prism from "../assets/img/subtle-prism.png"
import Loading from "./Loading"

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const guest = {
  name: "guest",
  email: "guest@gmail.com",
  password: "secret",
  isMember: true,
};
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const [loading, SetLoading] = useState(false)
  const { user, isLoading, displayAlert, setupUser } = useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const guestLogin = (e) => {
    e.preventDefault();
    SetLoading(true)
    const { name, email, password, isMember } = guest;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      SetLoading(false)
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "User Created! Redirecting...",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    SetLoading(true)
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      SetLoading(false)
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "User Created! Redirecting...",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate, loading]);

  if(loading === true) {
    
    return (
      <Loading />
    )
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{
        backgroundImage: `url(${Prism})`, 
        height: "100vh", 
        backgroundRepeat: "no-repeat", 
        backgroundSize: "cover", 
        border: "none rgb(230, 235, 241)"
        }}>
      <Box 
        sx={{
          padding: "25px"
          }} 
        >    
            <img src={logo} height="40px" alt="logo"/>
        </Box>
      <Container component="main" maxWidth="xs" 
        sx={{
          backgroundColor: "rgb(238, 242, 246)", 
          padding: "25px",
          boxShadow: "rgba(0, 0, 0, 0.08) 0px 1px 4px",
          borderRadius: "6px"
          }}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              value={values.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              value={values.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disable={isLoading.toString()}
              sx={{ mt: 3, mb: 2, justifySelf: "right" }}
              onClick={guestLogin}
            >
              Guest
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disable={isLoading.toString()}
              sx={{ mt: 3, mb: 2 }}
            >
              <Link
                component={RouterLink}
                color="inherit"
                underline="none"
                onClick={handleSubmit}
              >
                Sign In
              </Link>
            </Button>
          </Box>
        </Box>
      </Container>
      </Box>
    </ThemeProvider>
  );
}
