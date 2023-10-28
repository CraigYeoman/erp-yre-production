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

const LaborDetail = () => {
  useEffect(() => {
    editFormLoad();
  }, []);

  const [deleteLabor, setDeleteLabor] = useState(false);

  const theme = useTheme();

  const {
    data,
    isLoading,
    onSubmitPost,
    response,
    responseText,
    getDetail,
    getFormData,
    editFormLoad,
    responseError,
    responseErrorText,
  } = useAppContext();

  if (isLoading || !data) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  const { name, price, _id, laborCategory } = data.labor_detail;

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={"Labor Detail"} subtitle={""} />
      <Box component="span" sx={{ display: "inline-block", mx: "2px" }}>
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
              sx={{ marginBottom: "5px" }}
              variant="h5"
              fontWeight="bold"
              color={theme.palette.secondary[300]}
            >
              {name}
            </Typography>
            <Typography
              sx={{ marginBottom: "5px" }}
              variant="body"
              color={theme.palette.secondary[100]}
            >
              Customer Price: ${price}
              <br />
            </Typography>
            <Typography
              sx={{ marginBottom: "5px" }}
              variant="body"
              color={theme.palette.secondary[100]}
            >
              Category: {laborCategory.name}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box mt="15px">
        <Button variant="contained">
          <Link
            component={RouterLink}
            color="inherit"
            underline="none"
            onClick={() => {
              getDetail(_id, "labor");
              getFormData("labor");
            }}
            to={`/laboredit/${_id}`}
          >
            Edit
          </Link>
        </Button>
        <Button
          variant="contained"
          onClick={() => setDeleteLabor(true)}
          sx={{ marginLeft: "15px" }}
        >
          Delete
        </Button>
      </Box>

      {deleteLabor && (
        <Box mt="15px">
          Are you sure you want to delete?
          <Button
            variant="contained"
            onClick={() => onSubmitPost("", "labor", _id, "delete-post")}
            sx={{ marginLeft: "15px" }}
          >
            Delete
          </Button>
        </Box>
      )}
      {response && <Box>{responseText.msg}</Box>}
      {responseError && <Box>{responseErrorText.msg}</Box>}
    </Box>
  );
};

export default LaborDetail;
