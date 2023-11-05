import { useAppContext } from "../../context/appContext";
import { useEffect, useState } from "react";
import Header from "../Header";
import Response from "../Response";
import { Box, Button, TextField } from "@mui/material";

const PartCategoryForm = () => {
  useEffect(() => {
    editFormLoad();
  }, []);

  const {
    isLoading,
    getDetail,
    onSubmitPost,
    response,
    responseText,
    responseError,
    responseTextError,
    editFormLoad,
  } = useAppContext();

  const [values, setValues] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name } = values;
    const partCategoryData = {
      name,
    };
    onSubmitPost(partCategoryData, "partcategory", "", "create");
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
      <Header title="New Part Category" subtitle="Fill out form below" />
      <form onSubmit={onSubmit}>
        <Box
          m="0rem 2.5rem"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "240px",
          }}
        >
          <TextField
            label="Part Category Name"
            placeholder="Name"
            margin={"normal"}
            required
            value={values.name}
            onChange={handleChange}
            name="name"
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              marginTop: "15px",
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
      <Response
        response={response}
        responseText={responseText}
        selectFunction={getDetail}
        item="partcategory"
        path={"partcategorydetail"}
        responseError={responseError}
        responseTextError={responseTextError}
        schema={"partcategory"}
      />
    </Box>
  );
};

export default PartCategoryForm;
