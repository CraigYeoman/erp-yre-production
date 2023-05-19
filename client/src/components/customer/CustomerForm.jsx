import { useAppContext } from "../../context/appContext";
import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import Header from "../Header";
import Response from "../Response";

const CustomerForm = () => {
  const {
    isLoading,
    getDetail,
    onSubmitPost,
    response,
    responseText,
    responseError,
    responseTextError,
  } = useAppContext();

  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    zip_code: "",
  });

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
    };
    onSubmitPost(customerData, "customers", "", "create");

    setValues({
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      address_line_1: "",
      address_line_2: "",
      city: "",
      state: "",
      zip_code: "",
    });
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
      <Header title="New Customer" subtitle="Fill out form below" />
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
      <Response
        response={response}
        responseText={responseText}
        selectFunction={getDetail}
        item="customer"
        path={"customerdetail"}
        responseError={responseError}
        responseTextError={responseTextError}
        schema={"customers"}
      />
    </Box>
  );
};

export default CustomerForm;
