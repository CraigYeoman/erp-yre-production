import { Link as RouterLink } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { useEffect, useState } from "react";
import Header from "../Header";
import { Box, Link, Button } from "@mui/material";

const LaborCategoryDetail = () => {
  useEffect(() => {
    editFormLoad();
  }, []);

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

  const [deleteCategory, setDeleteCategory] = useState(false);

  if (isLoading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  const { name, _id } = data.labor_category_detail;

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={name} subtitle={""} />

      <Box mt="15px">
        <Button variant="contained">
          <Link
            component={RouterLink}
            color="inherit"
            underline="none"
            onClick={() => getDetail(_id, "laborcategory")}
            to={`/laborcategoryedit/${_id}`}
          >
            Edit
          </Link>
        </Button>
        <Button
          variant="contained"
          onClick={() => setDeleteCategory(true)}
          sx={{ marginLeft: "15px" }}
        >
          Delete
        </Button>

        {deleteCategory && (
          <Box mt="15px">
            Are you sure you want to delete?
            <Button
              variant="contained"
              onClick={() =>
                onSubmitPost("", "laborcategory", _id, "delete-post")
              }
              sx={{ marginLeft: "15px" }}
            >
              Delete
            </Button>
          </Box>
        )}
      </Box>
      {response && <Box>{responseText.msg}</Box>}
      {responseError && <Box>{responseErrorText.msg}</Box>}
    </Box>
  );
};

export default LaborCategoryDetail;
