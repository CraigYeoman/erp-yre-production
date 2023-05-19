import { Link as RouterLink } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  useTheme,
} from "@mui/material";
import Header from "../Header";

const CustomerEditForm = () => {
  const {
    isLoading,
    data,
    getDetail,
    formatPhoneNumber,
    onSubmitPost,
    response,
    responseText,
    responseError,
    responseTextError,
    editFormLoad,
  } = useAppContext();

  useEffect(() => {
    editFormLoad();
  }, []);

  const customerDetail = data;

  const [values, setValues] = useState({
    first_name: customerDetail.customer.first_name,
    last_name: customerDetail.customer.last_name,
    phone_number: customerDetail.customer.phone_number,
    email: customerDetail.customer.email,
    address_line_1: customerDetail.customer.address_line_1,
    address_line_2: customerDetail.customer.address_line_2,
    city: customerDetail.customer.city,
    state: customerDetail.customer.state,
    zip_code: customerDetail.customer.zip_code,
    _id: customerDetail.customer._id,
  });

  const theme = useTheme();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const {
      first_name,
      last_name,
      phone_number,
      email,
      address_line_1,
      address_line_2,
      city,
      state,
      zip_code,
      _id,
    } = values;
    const customerData = {
      first_name,
      last_name,
      phone_number,
      email,
      address_line_1,
      address_line_2,
      city,
      state,
      zip_code,
      _id,
    };

    onSubmitPost(customerData, "customers", _id, "edit");
  };

  if (isLoading || !customerDetail) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    );
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Edit Customer" subtitle="Edit form below" />
      <form onSubmit={onSubmit}>
        <Box
          mt="1rem"
          mb="1rem"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "240px",
          }}
        >
          <TextField
            label="First Name"
            placeholder="First Name"
            margin={"normal"}
            required
            value={values.first_name}
            onChange={handleChange}
            name="first_name"
            inputProps={{ minLength: 3 }}
          />
          <TextField
            label="Last Name"
            placeholder="Last Name"
            margin={"normal"}
            required
            value={values.last_name}
            onChange={handleChange}
            name="last_name"
            inputProps={{ minLength: 3 }}
          />
          <TextField
            label="Phone Number"
            placeholder="9999999999"
            margin={"normal"}
            required
            value={values.phone_number}
            onChange={handleChange}
            name="phone_number"
            inputProps={{ minLength: 10, maxLength: 10 }}
          />
          <TextField
            label="Email"
            placeholder="blank@blankmail.com"
            margin={"normal"}
            required
            value={values.email}
            onChange={handleChange}
            name="email"
            type="email"
          />
          <TextField
            label="Address Line 1"
            placeholder="Address"
            margin={"normal"}
            required
            value={values.address_line_1}
            onChange={handleChange}
            name="address_line_1"
            inputProps={{ minLength: 3 }}
          />
          <TextField
            label="Address Line 2"
            placeholder="Address Line 2"
            margin={"normal"}
            value={values.address_line_2}
            onChange={handleChange}
            name="address_line_2"
          />
          <TextField
            label="City"
            placeholder="City"
            margin={"normal"}
            required
            value={values.city}
            onChange={handleChange}
            name="city"
            inputProps={{ minLength: 3 }}
          />
          <TextField
            label="State Abbreviation"
            placeholder="MO, KS, CO"
            margin={"normal"}
            required
            value={values.state}
            onChange={handleChange}
            name="state"
            inputProps={{ minLength: 2, maxLength: 2 }}
          />
          <TextField
            label="Zip Code"
            placeholder="Zip Code"
            margin={"normal"}
            required
            value={values.zip_code}
            onChange={handleChange}
            name="zip_code"
            inputProps={{ minLength: 5, maxLength: 5 }}
          />
        </Box>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      {response && (
        <Box mt="20px">
          <Typography
            variant="h3"
            color={theme.palette.secondary[300]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
          >
            Customer Updated
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              mt="10px"
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
              }}
            >
              <Box
                sx={{
                  bgcolor: theme.palette.background.alt,
                  padding: "10px",
                  borderRadius: "4px",
                  border: 1,
                }}
              >
                <Typography
                  variant="h3"
                  color={theme.palette.secondary[100]}
                  fontWeight="bold"
                  sx={{ mb: "5px" }}
                >
                  Previous
                </Typography>
                <p>
                  {responseText.updatedCustomer.first_name}{" "}
                  {responseText.updatedCustomer.last_name}
                </p>
                <p>
                  {formatPhoneNumber(responseText.updatedCustomer.phone_number)}
                </p>
                <p>{responseText.updatedCustomer.email}</p>
                <p>{responseText.updatedCustomer.address_line_1}</p>
                <p>{responseText.updatedCustomer.address_line_2}</p>
                <p>{responseText.updatedCustomer.city}</p>
                <p>{responseText.updatedCustomer.state}</p>
                <p>{responseText.updatedCustomer.zip_code}</p>
              </Box>
              <Box
                sx={{
                  bgcolor: theme.palette.background.alt,
                  padding: "10px",
                  borderRadius: "4px",
                  border: 1,
                }}
              >
                <Typography
                  variant="h3"
                  color={theme.palette.secondary[100]}
                  fontWeight="bold"
                  sx={{ mb: "5px" }}
                >
                  Updated
                </Typography>
                <p>
                  <Link
                    component={RouterLink}
                    color="inherit"
                    onClick={() =>
                      getDetail(responseText.customer._id, "customers")
                    }
                    to={`/customerdetail/${responseText.customer._id}`}
                  >
                    {responseText.customer.first_name}{" "}
                    {responseText.customer.last_name}
                  </Link>
                </p>
                <p>{formatPhoneNumber(responseText.customer.phone_number)}</p>
                <p>{responseText.customer.email}</p>
                <p>{responseText.customer.address_line_1}</p>
                <p>{responseText.customer.address_line_2}</p>
                <p>{responseText.customer.city}</p>
                <p>{responseText.customer.state}</p>
                <p>{responseText.customer.zip_code}</p>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {responseError && (
        <Box>
          <p>{responseTextError.customer.first_name} not updated</p>
          {responseTextError.errors.map((error) => {
            const { msg, param, value } = error;
            return (
              <p key={error.value}>
                {msg} in {param} value {value}
              </p>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default CustomerEditForm;
