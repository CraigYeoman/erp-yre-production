import { useAppContext } from "../../context/appContext";
import { useEffect, useState } from "react";
import Header from "../Header";
import Response from "../Response";
import { Box, Button, TextField } from "@mui/material";

const LaborCategoryForm = () => {
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
    const laborCategoryData = {
      name,
    };

    onSubmitPost(laborCategoryData, "laborcategory", "", "create");
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
      <Header title="New Labor Category" subtitle="Fill out form below" />
      <form onSubmit={onSubmit}>
        <Box
          mt="1rem"
          mb="1rem"
          sx={{
            display: "flex",
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
        </Box>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      <Response
        response={response}
        responseText={responseText}
        selectFunction={getDetail}
        item="laborcategory"
        path={"laborcategorydetail"}
        responseError={responseError}
        responseTextError={responseTextError}
        schema={"laborcategory"}
      />
    </Box>
  );
};

export default LaborCategoryForm;
