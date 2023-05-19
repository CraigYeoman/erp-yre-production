import { Link as RouterLink } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { useEffect, useState } from "react";
import Header from "../Header";
import { Box, useTheme, Link, Button, Typography } from "@mui/material";
const { DateTime } = require("luxon");

const WorkOrderDetail = () => {
  useEffect(() => {
    editFormLoad();
  }, []);

  const [deleteOrder, setDeleteOrder] = useState(false);

  const {
    data,
    isLoading,
    getDetail,
    getFormData,
    onSubmitPost,
    response,
    responseText,
    sumTotal,
    editFormLoad,
    formatPhoneNumber,
    responseError,
    responseErrorText,
  } = useAppContext();

  const { work_order } = data;

  const theme = useTheme();

  if (isLoading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }
  const {
    work_order_number,
    jobType,
    date_received,
    date_due,
    complete,
    date_finished,
    customer,
    notes,
    accessories,
    labor,
    parts,
    deposit,
    _id,
    images,
  } = work_order;
  labor.forEach((value) => {
    value.price = Number(value.price);
  });
  parts.forEach((value) => {
    value.customer_price = Number(value.customer_price);
  });
  let laborPrice = sumTotal(labor, "price");
  let partsPrice = sumTotal(parts, "customer_price");
  let total = laborPrice + partsPrice;
  let tax = total * 0.09;
  let grandTotal = total + tax;

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={work_order_number} subtitle={jobType.name} />
      <Box mt="15px">
        <Button variant="contained">
          <Link
            component={RouterLink}
            color="inherit"
            underline="none"
            onClick={() => {
              getDetail(_id, "workorders");
              getFormData("workorders");
            }}
            to={`/workordereditform/${_id}`}
          >
            Edit
          </Link>
        </Button>
        <Button
          variant="contained"
          onClick={() => setDeleteOrder(true)}
          sx={{ marginLeft: "15px" }}
        >
          Delete
        </Button>
        {deleteOrder && (
          <Box mt="15px">
            Are you sure you want to delete?
            <Button
              variant="contained"
              onClick={() => onSubmitPost("", "workorders", _id, "delete-post")}
              sx={{ marginLeft: "15px" }}
            >
              Delete
            </Button>
          </Box>
        )}
        {response && <Box>{responseText.msg}</Box>}
        {responseError && <Box>{responseErrorText.msg}</Box>}
      </Box>
      <Box
        mt="15px"
        sx={{
          borderRadius: "5px",
          border: 1,
          padding: "8px",
          bgcolor: theme.palette.background.alt,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color={theme.palette.secondary[300]}
        >
          Dates
        </Typography>

        <p>Date Received: {DateTime.fromISO(date_received).toFormat("D")}</p>
        <p>Date Due: {DateTime.fromISO(date_due).toFormat("D")}</p>
        <p>Status: {complete ? "Complete" : "In Process"}</p>
        {complete ? <p>{date_finished}</p> : ""}
      </Box>
      <Box
        mt="15px"
        sx={{
          borderRadius: "5px",
          border: 1,
          padding: "8px",
          bgcolor: theme.palette.background.alt,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color={theme.palette.secondary[300]}
        >
          Customer
        </Typography>
        <p>
          <Link
            component={RouterLink}
            color="inherit"
            onClick={() => getDetail(customer._id, "customers")}
            to={`/customerdetail/${customer._id}`}
          >
            {customer.first_name} {customer.last_name}
          </Link>
        </p>
        <p>Phone Number : {formatPhoneNumber(customer.phone_number)}</p>
        <p>Email: {customer.email}</p>
      </Box>
      <Box
        mt="15px"
        sx={{
          borderRadius: "5px",
          border: 1,
          padding: "8px",
          bgcolor: theme.palette.background.alt,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color={theme.palette.secondary[300]}
        >
          Totals
        </Typography>
        <p>Labor Total - ${laborPrice.toFixed(2)}</p>
        <p>Parts Total - ${partsPrice.toFixed(2)}</p>
        <p>Total - ${total.toFixed(2)}</p>
        <p>Tax - ${tax.toFixed(2)}</p>
        <p>Grand Total - ${grandTotal.toFixed(2)}</p>
        <p>Deposit - ${deposit.toFixed(2)}</p>
        <p>Est. Due - ${(grandTotal - deposit).toFixed(2)}</p>
      </Box>
      <Box mt="15px">
        <Typography
          variant="h5"
          fontWeight="bold"
          color={theme.palette.secondary[300]}
        >
          Notes
        </Typography>
        <p>{notes}</p>
      </Box>
      {labor.length === 0 ? (
        <option></option>
      ) : (
        <Box
          mt="15px"
          sx={{
            borderRadius: "5px",
            border: 1,
            padding: "8px",
            bgcolor: theme.palette.background.alt,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color={theme.palette.secondary[300]}
          >
            Labor
          </Typography>
          {labor.map((labor) => {
            return (
              <p key={labor.name}>
                {labor.name} - ${labor.price.toFixed(2)}
              </p>
            );
          })}
        </Box>
      )}
      {parts.length === 0 ? (
        <option></option>
      ) : (
        <Box
          mt="15px"
          sx={{
            borderRadius: "5px",
            border: 1,
            padding: "8px",
            bgcolor: theme.palette.background.alt,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color={theme.palette.secondary[300]}
          >
            Parts
          </Typography>
          {parts.map((part) => {
            return (
              <p key={parts.name}>
                {part.name} - ${part.customer_price.toFixed(2)}
              </p>
            );
          })}
        </Box>
      )}
      {accessories.length === 0 ? (
        <option></option>
      ) : (
        <Box
          mt="15px"
          sx={{
            borderRadius: "5px",
            border: 1,
            padding: "8px",
            bgcolor: theme.palette.background.alt,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color={theme.palette.secondary[300]}
          >
            Customer Accessories
          </Typography>
          {accessories.map((accessory) => {
            return <p key={accessory._id}>{accessory.name}</p>;
          })}
        </Box>
      )}
      {images.length === 0 ? (
        <option></option>
      ) : (
        <Box
          mt="15px"
          mb="15px"
          sx={{
            display: "flex",
            gap: "15px",
          }}
        >
          {images.map((pic) => {
            return (
              <img
                src={`http://localhost:5000/${pic}`}
                alt="img"
                width="250px"
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default WorkOrderDetail;
