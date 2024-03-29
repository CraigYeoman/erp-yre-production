import { Link as RouterLink } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { useEffect, useState } from "react";
import Header from "../Header";
import {
  Box,
  useTheme,
  Button,
  TextField,
  Typography,
  Link,
} from "@mui/material";

const LaborCategoryEditForm = () => {
  useEffect(() => {
    editFormLoad();
  }, []);

  const {
    isLoading,
    data,
    getDetail,
    onSubmitPost,
    response,
    responseText,
    responseError,
    responseTextError,
    editFormLoad,
  } = useAppContext();

  const laborCategoryDetail = data.labor_category_detail;

  const [values, setValues] = useState({
    name: laborCategoryDetail.name,
    _id: laborCategoryDetail._id,
  });

  const theme = useTheme();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { name, _id } = values;
    const laborCategoryData = {
      name,
      _id,
    };

    onSubmitPost(laborCategoryData, "laborcategory", _id, "edit");
  };

  if (isLoading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    );
  }

  return (
    <Box>
      <Header title="Edit Labor Category" subtitle="Fill out form below" />
      <form onSubmit={onSubmit}>
        <Box
          m="1.5rem 2.5rem"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "240px",
          }}
        >
          <TextField
            label="Labor Category Name"
            placeholder="Name"
            margin={"normal"}
            required
            value={values.name}
            onChange={handleChange}
            name="name"
          />
          <Button variant="contained" type="submit" sx={{ marginTop: "15px" }}>
            Submit
          </Button>
        </Box>
      </form>
      {response && (
        <Box m="1.5rem 2.5rem">
          <Typography
            variant="h3"
            color={theme.palette.secondary.main}
            fontWeight="bold"
            sx={{ mb: "5px" }}
          >
            Labor Category Edited
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
                  color={theme.palette.secondarymain}
                  fontWeight="bold"
                  sx={{ mb: "5px" }}
                >
                  Previous
                </Typography>
                <p>{responseText.updatedLaborCategory.name}</p>
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
                  color={theme.palette.secondarymain}
                  fontWeight="bold"
                  sx={{ mb: "5px" }}
                >
                  New
                </Typography>
                <p>
                  <Link
                    component={RouterLink}
                    color="inherit"
                    onClick={() =>
                      getDetail(responseText.laborcategory._id, "laborcategory")
                    }
                    to={`/laborcategorydetail/${responseText.laborcategory._id}`}
                  >
                    {responseText.laborcategory.name}
                  </Link>
                </p>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {responseError && (
        <div>
          <p>
            {responseTextError.laborcategory.name}
            not edited
          </p>
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

export default LaborCategoryEditForm;
