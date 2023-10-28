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

const JobTypeEditForm = () => {
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

  useEffect(() => {
    editFormLoad();
  }, []);

  const jobTypeDetail = data.job_type_detail;

  const [values, setValues] = useState({
    name: jobTypeDetail.name,
    _id: jobTypeDetail._id,
  });
  const theme = useTheme();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { name, _id } = values;
    const jobtypeData = {
      name,
      _id,
    };

    onSubmitPost(jobtypeData, "jobtypes", _id, "edit");
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
      <Header title="Edit Job Type" subtitle="Fill out form below" />
      <form onSubmit={onSubmit}>
        <Box
          mt="1rem"
          mb="1rem"
          sx={{
            display: "flex",
          }}
        >
          <TextField
            label="Job Type Name"
            placeholder="Name"
            name="name"
            required
            value={values.name}
            onChange={handleChange}
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
            Job Type Edited
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
                  width: "125px",
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
                <p>{responseText.updatedJobType.name}</p>
              </Box>
              <Box
                sx={{
                  bgcolor: theme.palette.background.alt,
                  padding: "10px",
                  borderRadius: "4px",
                  border: 1,
                  width: "125px",
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
                <p>
                  <Link
                    component={RouterLink}
                    color="inherit"
                    onClick={() =>
                      getDetail(responseText.jobtype._id, "jobtypes")
                    }
                    to={`/jobtypedetail/${responseText.jobtype._id}`}
                  >
                    {responseText.jobtype.name}
                  </Link>
                </p>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {responseError && (
        <Box>
          <p>
            {responseTextError.jobtype.name}
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
        </Box>
      )}
    </Box>
  );
};

export default JobTypeEditForm;
