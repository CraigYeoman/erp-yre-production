import { Link as RouterLink } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import Header from "../Header";
import { useEffect, useState } from "react";
import {
  Box,
  useTheme,
  Link,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const VendorDetail = () => {
  useEffect(() => {
    editFormLoad();
  }, []);

  const [deleteVendor, setDeleteVendor] = useState(false);

  const theme = useTheme();
  const {
    data,
    isLoading,
    getDetail,
    onSubmitPost,
    response,
    responseText,
    formatPhoneNumber,
    editFormLoad,
    responseError,
    responseErrorText,
  } = useAppContext();

  if (isLoading || !data.vendor) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  const {
    _id,
    main_contact,
    phone_number,
    name,
    email,
    address_line_1,
    address_line_2,
    city,
    state,
    zip_code,
    customer_number,
  } = data.vendor;
  return (
    <Box m="1.5rem 2.5rem">
      <Header title={"Vendor"} subtitle={name} />
      <Box>
        <p>{main_contact}</p>
        <p>{formatPhoneNumber(phone_number)}</p>
        <p>{email}</p>
        <p>
          {address_line_1}, {city}, {state} {zip_code}
        </p>
        <p>{address_line_2}</p>
        <p>Customer Number: {customer_number}</p>
      </Box>
      <Box mt="15px">
        <Button variant="contained">
          <Link
            component={RouterLink}
            color="inherit"
            underline="none"
            onClick={() => getDetail(_id, "vendors")}
            to={`/vendoreditform/${_id}`}
          >
            Edit
          </Link>
        </Button>
        <Button
          variant="contained"
          component={RouterLink}
          onClick={() => setDeleteVendor(true)}
          sx={{ marginLeft: "15px" }}
        >
          Delete
        </Button>
        {deleteVendor && (
          <Box>
            {data.vendor_parts ? (
              <Box mt="10px">Please do not delete vendors with parts.</Box>
            ) : (
              <Box mt="15px">
                Are you sure you want to delete?
                <Button
                  variant="contained"
                  onClick={() =>
                    onSubmitPost("", "vendors", _id, "delete-post")
                  }
                  sx={{ marginLeft: "15px" }}
                >
                  Delete
                </Button>
              </Box>
            )}
          </Box>
        )}
        {response && <Box>{responseText.msg}</Box>}
        {responseError && <Box>{responseErrorText.msg}</Box>}
      </Box>
      <Box mt="15px">
        <Typography
          variant="h5"
          fontWeight="bold"
          color={theme.palette.secondary[300]}
        >
          Parts
        </Typography>
        {data.vendor_parts.map((part) => {
          const { _id, name, customer_price, cost, part_number, manufacture } =
            part;
          return (
            <Card
              variant="outlined"
              sx={{
                bgcolor: theme.palette.background.alt,
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              <CardContent>
                <Link
                  component={RouterLink}
                  color="inherit"
                  onClick={() => getDetail(_id, "parts")}
                  to={`/partdetail/${_id}`}
                >
                  {name}
                </Link>
                <p>Cost: ${cost}</p>
                <p>Customer Price: ${customer_price}</p>
                <p>Part Number: {part_number}</p>
                <p>Manufacture: {manufacture}</p>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default VendorDetail;
