import { Link as RouterLink } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import Header from "../Header";
import { useEffect, useState } from "react";
import { Box, Link, Button, Typography, useTheme } from "@mui/material";

const PartCategoryDetail = () => {
  useEffect(() => {
    editFormLoad();
  }, []);

  const theme = useTheme();

  const {
    data,
    isLoading,
    onSubmitPost,
    response,
    responseText,
    getDetail,
    editFormLoad,
    responseError,
    responseErrorText,
  } = useAppContext();

  const [deletePart, setDeletePart] = useState(false);

  if (isLoading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  const { name, _id } = data.part_category_detail;

  return (
    <Box>
      <Header title="Part Category Detail" subtitle={""} />
      <Box m="1.5rem 2.5rem">
        <Box>
          <Typography
            variant="h3"
            fontWeight="bold"
            color={theme.palette.secondary.main}
            sx={{ marginBottom: "15px" }}
          >
            {name}
          </Typography>
          <Button variant="contained">
            <Link
              component={RouterLink}
              color="inherit"
              underline="none"
              onClick={() => getDetail(_id, "partcategory")}
              to={`/partcategoryeditform/${_id}`}
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
                onClick={() =>
                  onSubmitPost("", "partcategory", _id, "delete-post")
                }
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
    </Box>
  );
};

export default PartCategoryDetail;
