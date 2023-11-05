import { Link as RouterLink } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import Header from "../Header";
import { Box, useTheme, Link, Typography } from "@mui/material";
import { useEffect } from "react";

const PartCategory = () => {
  const theme = useTheme();
  const { getData, data, isLoading, getDetail } = useAppContext();

  useEffect(() => {
    getData();
  }, []);

  if (!data.partCategories || isLoading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  return (
    <Box>
      <Header title={"Part Categories"} subtitle={""} />
      <Box m="1.5rem 2.5rem">
        <Typography
          variant="h4"
          fontWeight="bold"
          color={theme.palette.secondary.main}
          sx={{ marginBottom: "15px" }}
        >
          <Link
            component={RouterLink}
            color="inherit"
            to={`/partcategoryform/`}
          >
            New Category
          </Link>
        </Typography>
        {data.partCategories.map((partCategory) => {
          const { name, _id } = partCategory;
          return (
            <Box className="job-container" mb="8px" key={_id}>
              <Typography variant="h5" color={theme.palette.secondary.main}>
                <Link
                  component={RouterLink}
                  color="inherit"
                  underline="none"
                  onClick={() => getDetail(_id, "partcategory")}
                  to={`/partcategorydetail/${_id}`}
                >
                  {name}
                </Link>
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default PartCategory;
