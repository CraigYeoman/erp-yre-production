import { Link as RouterLink } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  Link,
} from "@mui/material";
import Header from "../Header";

const VendorEditForm = () => {
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

  const vendorDetail = data;
  const [values, setValues] = useState({
    name: vendorDetail.vendor.name,
    main_contact: vendorDetail.vendor.main_contact,
    phone_number: vendorDetail.vendor.phone_number,
    email: vendorDetail.vendor.email,
    address_line_1: vendorDetail.vendor.address_line_1,
    address_line_2: vendorDetail.vendor.address_line_2,
    city: vendorDetail.vendor.city,
    state: vendorDetail.vendor.state,
    zip_code: vendorDetail.vendor.zip_code,
    customer_number: vendorDetail.vendor.customer_number,
    _id: vendorDetail.vendor._id,
  });
  const theme = useTheme();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      main_contact,
      phone_number,
      email,
      address_line_1,
      address_line_2,
      city,
      state,
      zip_code,
      customer_number,
      _id,
    } = values;
    const vendorData = {
      name,
      main_contact,
      phone_number,
      email,
      address_line_1,
      address_line_2,
      city,
      state,
      zip_code,
      customer_number,
      _id,
    };

    onSubmitPost(vendorData, "vendors", _id, "edit");
  };

  if (isLoading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    );
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Edit Vendor" subtitle="Fill out form below" />
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
            label="Company Name"
            placeholder="Company LLC"
            margin={"normal"}
            required
            value={values.name}
            onChange={handleChange}
            name="name"
            inputProps={{ minLength: 3 }}
          />
          <TextField
            label="Main Contact"
            placeholder="Don John"
            margin={"normal"}
            required
            value={values.main_contact}
            onChange={handleChange}
            name="main_contact"
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
          <TextField
            label="Customer Number"
            placeholder="Customer Number"
            margin={"normal"}
            required
            value={values.customer_number}
            onChange={handleChange}
            name="customer_number"
            inputProps={{ minLength: 3 }}
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
            Vendor Edited
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
                <p>{responseText.updatedVendor.name}</p>
                <p>{responseText.updatedVendor.main_contact}</p>
                <p>
                  {formatPhoneNumber(responseText.updatedVendor.phone_number)}
                </p>
                <p>{responseText.updatedVendor.email}</p>
                <p>{responseText.updatedVendor.address_line_1}</p>
                <p>{responseText.updatedVendor.address_line_2}</p>
                <p>{responseText.updatedVendor.city}</p>
                <p>{responseText.updatedVendor.state}</p>
                <p>{responseText.updatedVendor.zip_code}</p>
                <p>{responseText.updatedVendor.customer_number}</p>
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
                  New
                </Typography>

                <Link
                  component={RouterLink}
                  color="inherit"
                  onClick={() => getDetail(responseText.vendor._id, "vendors")}
                  to={`/vendordetail/${responseText.vendor._id}`}
                >
                  <p>{responseText.vendor.name}</p>
                </Link>
                <p>{responseText.vendor.main_contact}</p>
                <p>{formatPhoneNumber(responseText.vendor.phone_number)}</p>
                <p>{responseText.vendor.email}</p>
                <p>{responseText.vendor.address_line_1}</p>
                <p>{responseText.vendor.address_line_2}</p>
                <p>{responseText.vendor.city}</p>
                <p>{responseText.vendor.state}</p>
                <p>{responseText.vendor.zip_code}</p>
                <p>{responseText.vendor.customer_number}</p>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {responseError && (
        <div>
          <p>{responseTextError.vendor.name} not updated</p>
          {responseTextError.errors.map((error) => {
            const { msg, param, value } = error;
            return (
              <p key={error.value}>
                {msg} in {param} value {value}
              </p>
            );
          })}
        </div>
      )}
    </Box>
  );
};

export default VendorEditForm;
