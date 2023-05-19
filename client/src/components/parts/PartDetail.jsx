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

const PartDetail = () => {
  useEffect(() => {
    editFormLoad();
  }, []);

  const [deletePart, setDeletePart] = useState(false);

  const theme = useTheme();
  const {
    isLoading,
    response,
    responseText,
    onSubmitPost,
    data,
    getFormData,
    getDetail,
    editFormLoad,
    responseError,
    responseErrorText,
  } = useAppContext();

  if (!data || isLoading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  const { name, part_number, manufacture, customer_price, cost, _id, vendor } =
    data.part;

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={"Part Detail"} />
      <Card
        variant="outlined"
        sx={{
          bgcolor: theme.palette.background.alt,
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            fontWeight="bold"
            color={theme.palette.secondary[300]}
          >
            {name}
          </Typography>

          <p>Part Number: {part_number}</p>
          <p>Manufacture: {manufacture}</p>
          <p>Customer Price: ${customer_price}</p>
          <p>Cost: ${cost}</p>
          <p>
            Vendor:{" "}
            <Link
              component={RouterLink}
              color="inherit"
              onClick={() => getDetail(vendor._id, "vendors")}
              to={`/vendordetail/${vendor._id}`}
            >
              {vendor.name}
            </Link>
          </p>
        </CardContent>
      </Card>
      <Box mt="15px">
        <Button variant="contained">
          <Link
            component={RouterLink}
            color="inherit"
            underline="none"
            onClick={() => {
              getDetail(_id, "parts");
              getFormData("parts");
            }}
            to={`/parteditform/${_id}`}
          >
            Edit
          </Link>
        </Button>
        <Button
          variant="contained"
          onClick={() => setDeletePart(true)}
          sx={{ marginLeft: "15px" }}
        >
          Delete
        </Button>
        {deletePart && (
          <Box mt="15px">
            Are you sure you want to delete?
            <Button
              variant="contained"
              onClick={() => onSubmitPost("", "parts", _id, "delete-post")}
              sx={{ marginLeft: "15px" }}
            >
              Delete
            </Button>
          </Box>
        )}
        {response && <Box>{responseText.msg}</Box>}
        {responseError && <Box>{responseErrorText.msg}</Box>}
      </Box>
    </Box>
  );
};

export default PartDetail;
