import { Link as RouterLink } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import Header from "../Header";
import { useEffect, useState } from "react";
import { Box, useTheme, Link, Button, Typography } from "@mui/material";
import IndexGrid from "../IndexGrid";

const JobTypeDetail = () => {
  useEffect(() => {
    editFormLoad();
  }, []);

  const theme = useTheme();

  const [deleteJobType, setDeleteJobType] = useState(false);

  const {
    data,
    isLoading,
    onSubmitPost,
    response,
    responseText,
    editFormLoad,
    getDetail,
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

  const { name, _id } = data.job_type_detail;

  return (
    <Box>
      <Box m="1.5rem 2.5rem">
        <Header title={"Job Type"} subtitle={"Detail"} />
        <Box mt="15px">
          <Typography
            variant="h4"
            fontWeight="bold"
            color={theme.palette.secondary[100]}
          >
            {name}
          </Typography>
        </Box>
        <Box mt="15px">
          <Button variant="contained">
            <Link
              component={RouterLink}
              color="inherit"
              underline="none"
              onClick={() => getDetail(_id, "jobtypes")}
              to={`/jobtypeeditform/${_id}`}
            >
              Edit
            </Link>
          </Button>
          <Button
            variant="contained"
            onClick={() => setDeleteJobType(true)}
            sx={{ marginLeft: "15px" }}
          >
            Delete
          </Button>
        </Box>

        {deleteJobType && (
          <Box>
            {data.job_type_workorders ? (
              <Box mt="10px">
                Please do not delete job type with work orders.
              </Box>
            ) : (
              <Box mt="15px">
                Are you sure you want to delete?
                <Button
                  variant="contained"
                  onClick={() =>
                    onSubmitPost("", "jobtypes", _id, "delete-post")
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
      <IndexGrid name={""} data={data.job_type_workorders} />
    </Box>
  );
};

export default JobTypeDetail;
