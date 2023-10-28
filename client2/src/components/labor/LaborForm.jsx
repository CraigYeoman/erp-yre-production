import { useAppContext } from "../../context/appContext";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Header from "../Header";
import Response from "../Response";

const LaborForm = () => {
  useEffect(() => {
    editFormLoad();
    getFormData("labor");
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
    formData,
    getFormData,
  } = useAppContext();

  const laborInfo = formData;

  const [values, setValues] = useState({
    name: "",
    price: "",
    laborCategory: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, price, laborCategory } = values;
    const laborData = { name, price, laborCategory };
    onSubmitPost(laborData, "labor", "", "create");
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
      <Header title="New Labor" subtitle="Fill out form below" />
      <form onSubmit={onSubmit}>
        <Box
          mt="1rem"
          mb="1rem"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "240px",
          }}
        >
          <TextField
            label="Labor Name"
            placeholder="Labor Name"
            margin={"normal"}
            required
            value={values.name}
            onChange={handleChange}
            name="name"
          />
          <TextField
            label="Price"
            placeholder="$$$"
            margin={"normal"}
            required
            value={values.price}
            onChange={handleChange}
            name="price"
            type="number"
          />
          <FormControl sx={{ minWidth: 80, mt: "16px", mb: "8px" }}>
            <InputLabel id="laborCategory">Labor Category</InputLabel>
            <Select
              name="laborCategory"
              required={true}
              onChange={handleChange}
              value={values.laborCategory}
              labelId="laborCategory"
              label="Labor Category"
            >
              {(laborInfo.labor_category_list || [])
                .sort((a, b) => {
                  let textA = a.name.toUpperCase();
                  let textB = b.name.toUpperCase();
                  return textA < textB ? -1 : textA > textB ? 1 : 0;
                })
                .map((laborCategory) => {
                  return (
                    <MenuItem value={laborCategory._id} key={laborCategory._id}>
                      {laborCategory.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Box>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      <Response
        response={response}
        responseText={responseText}
        selectFunction={getDetail}
        item="labor"
        path={"labordetail"}
        responseError={responseError}
        responseTextError={responseTextError}
        schema={"labor"}
      />
    </Box>
  );
};

export default LaborForm;
