import { useAppContext } from "../../context/appContext";
import { useState } from "react";
import Header from "../Header";
import Response from "../Response";
import { Box, Button, TextField } from "@mui/material";

const JobTypeForm = () => {
  const {
    isLoading,
    getDetail,
    onSubmitPost,
    response,
    responseText,
    responseError,
    responseTextError,
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
    const jobtypeData = {
      name,
    };
    onSubmitPost(jobtypeData, "jobtypes", "", "create");
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
      <Header title="New Job Type" subtitle="Fill out form below" />
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
      <Response
        response={response}
        responseText={responseText}
        selectFunction={getDetail}
        item="jobtype"
        path={"jobtypedetail"}
        responseError={responseError}
        responseTextError={responseTextError}
        schema={"jobtypes"}
      />
    </Box>
  );
};

export default JobTypeForm;
