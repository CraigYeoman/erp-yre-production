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
const { DateTime } = require("luxon");

const CustomerDetail = () => {
  useEffect(() => {
    editFormLoad();
  }, []);

  const theme = useTheme();

  const [deleteCustomer, setDeleteCustomer] = useState(false);
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

  if (isLoading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  const { customer, customer_workorders } = data;

  const {
    _id,
    first_name,
    last_name,
    phone_number,
    email,
    address_line_1,
    address_line_2,
    city,
    state,
    zip_code,
  } = customer;

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={"Customer"} subtitle={first_name + " " + last_name} />

      <Box>
        <p>{formatPhoneNumber(phone_number)}</p>
        <p>{email}</p>
        <p>
          {address_line_1}, {city}, {state} {zip_code}
        </p>
        <p>{address_line_2}</p>
      </Box>
      <Box mt="15px">
        <Button variant="contained">
          <Link
            component={RouterLink}
            color="inherit"
            underline="none"
            onClick={() => getDetail(_id, "customers")}
            to={`/customeredit/${_id}`}
          >
            Edit
          </Link>
        </Button>
        <Button
          variant="contained"
          onClick={() => setDeleteCustomer(true)}
          sx={{ marginLeft: "15px" }}
        >
          Delete
        </Button>
        {deleteCustomer && (
          <Box>
            {customer_workorders.length === 0 ? (
              <Box mt="15px">
                Are you sure you want to delete?
                <Button
                  variant="contained"
                  onClick={() =>
                    onSubmitPost("", "customers", _id, "delete-post")
                  }
                  sx={{ marginLeft: "15px" }}
                >
                  Delete
                </Button>
              </Box>
            ) : (
              <Box mt="10px">
                Please do not delete customers with work orders.
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
          Work Orders
        </Typography>
        {customer_workorders.map((workOrder) => {
          const {
            _id,
            date_received,
            date_due,
            date_finished,
            jobType,
            work_order_number,
            notes,
            complete,
          } = workOrder;
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
                  onClick={() => getDetail(_id, "workorders")}
                  to={`/workorderdetail/${_id}`}
                >
                  {work_order_number}
                </Link>
                <p>{jobType.name}</p>
                <p>
                  Date Recieved: {DateTime.fromISO(date_received).toFormat("D")}
                </p>
                <p>Date Due: {DateTime.fromISO(date_due).toFormat("D")}</p>
                {complete === false ? (
                  <p>Status: Inprocess</p>
                ) : (
                  <div>
                    <p>Status: Complete</p>
                    <p>
                      Date Completed:{" "}
                      {DateTime.fromISO(date_finished).toFormat("D")}
                    </p>
                  </div>
                )}
                <p>{notes}</p>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default CustomerDetail;
