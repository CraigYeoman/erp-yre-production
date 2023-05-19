import { Link as RouterLink } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import Header from "../Header";
import { Box, useTheme, Link, Typography } from "@mui/material";
import { useEffect } from "react";

const LaborCategory = () => {
  const theme = useTheme();

  const { getData, data, isLoading, getDetail } = useAppContext();

  useEffect(() => {
    getData();
  }, []);

  if (!data.laborCategories || isLoading) {
    return (
      <section className="section">
        <h4>Loading...</h4>{" "}
      </section>
    );
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={"Labor Categories"} subtitle={""} />
      <Typography
        variant="h4"
        fontWeight="bold"
        color={theme.palette.secondary[300]}
        sx={{ marginBottom: "15px" }}
      >
        <Link component={RouterLink} color="inherit" to={`/laborcategoryform/`}>
          New Category
        </Link>
      </Typography>
      {data.laborCategories.map((laborCategory) => {
        const { name, _id } = laborCategory;
        return (
          <Box className="job-container" mb="5px" key={_id}>
            <Typography variant="h5" color={theme.palette.secondary[100]}>
              <Link
                component={RouterLink}
                color="inherit"
                underline="none"
                onClick={() => getDetail(_id, "laborcategory")}
                to={`/laborcategorydetail/${_id}`}
              >
                {name}
              </Link>
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default LaborCategory;
