import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Box,
  useTheme,
  Link,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import Alert from "./Alert";
import { useAppContext } from "../context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
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
  }, [user, navigate]);

  return (
    <Box mt="2.5rem" sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        width="300px"
        sx={{
          bgcolor: theme.palette.background.alt,
          padding: "20px",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          color={theme.palette.secondary[300]}
          sx={{ marginBottom: "15px" }}
        >
          ERP APP
        </Typography>
        <Typography
          variant="h1"
          fontWeight="bold"
          color={theme.palette.secondary[100]}
          sx={{ marginBottom: "15px" }}
        >
          {values.isMember ? "Login" : "Register"}
        </Typography>
        {showAlert && <Alert />}
        {!values.isMember && (
          <TextField
            label="Name"
            margin={"normal"}
            required
            name="name"
            onChange={handleChange}
            value={values.name}
          />
        )}
        <TextField
          label="Email"
          margin={"normal"}
          required
          name="email"
          onChange={handleChange}
          value={values.email}
        />
        <TextField
          label="Password"
          margin={"normal"}
          required
          name="password"
          type="password"
          onChange={handleChange}
          value={values.password}
        />

        <Button
          sx={{ marginTop: "15px" }}
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
            Submit
          </Link>
        </Button>
        <Typography
          variant="body"
          color={theme.palette.secondary[100]}
          sx={{ marginTop: "15px" }}
        >
          {values.isMember ? "Need to Register?" : "Already Registered?"}
          <Button
            sx={[
              { color: theme.palette.secondary[300] },
              {
                "&:hover": {
                  backgroundColor: theme.palette.background.alt,
                  textDecorationLine: "underline",
                },
              },
            ]}
            onClick={toggleMember}
          >
            {values.isMember ? "Register" : "Login"}
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
