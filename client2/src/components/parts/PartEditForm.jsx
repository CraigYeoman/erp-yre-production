import { Link as RouterLink } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { useState, useEffect } from "react";
import {
  Box,
  useTheme,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Typography,
  NativeSelect,
  Link,
} from "@mui/material";
import Header from "../Header";

const PartEditForm = () => {
  useEffect(() => {
    editFormLoad();
  }, []);

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
    formData,
  } = useAppContext();

  const partDetail = data.part;
  const partInfo = formData;

  const theme = useTheme();

  const [values, setValues] = useState({
    name: partDetail.name,
    customer_price: partDetail.customer_price,
    cost: partDetail.cost,
    part_number: partDetail.part_number,
    vendor: partDetail.vendor._id,
    manufacture: partDetail.manufacture,
    partCategory: partDetail.partCategory._id,
    _id: partDetail._id,
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      customer_price,
      cost,
      part_number,
      vendor,
      manufacture,
      _id,
      partCategory,
    } = values;
    const partData = {
      name,
      customer_price,
      cost,
      part_number,
      vendor,
      manufacture,
      _id,
      partCategory,
    };

    onSubmitPost(partData, "parts", _id, "edit");
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
      <Header title="Edit Part" subtitle="Edit form below" />
      <form onSubmit={onSubmit}>
        <Box
          mt="1rem"
          mb="1rem"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "240px",
            gap: "5px;",
          }}
        >
          <TextField
            label="Part Name"
            placeholder="3/8 8740 ARP Rod Bolt"
            margin={"normal"}
            required
            value={values.name}
            onChange={handleChange}
            name="name"
          />
          <TextField
            label="Customer Price"
            placeholder="$$$"
            margin={"normal"}
            required
            value={values.customer_price}
            onChange={handleChange}
            name="customer_price"
            type="number"
          />
          <TextField
            label="Cost"
            placeholder="$$$"
            margin={"normal"}
            required
            value={values.cost}
            onChange={handleChange}
            name="cost"
            type="number"
          />
          <TextField
            label="Part Number"
            placeholder="XYZ"
            margin={"normal"}
            required
            value={values.part_number}
            onChange={handleChange}
            name="part_number"
          />
          <FormControl sx={{ minWidth: 80, mt: "16px", mb: "8px" }}>
            <InputLabel id="vendor">Vendor</InputLabel>
            <NativeSelect
              name="vendor"
              required={true}
              onChange={handleChange}
              value={values.vendor}
              label="Vendor"
            >
              <option value={partDetail.vendor._id}>
                {partDetail.vendor.name}
              </option>
              {(partInfo.vendor_list || [])
                .sort((a, b) => {
                  let textA = a.name.toUpperCase();
                  let textB = b.name.toUpperCase();
                  return textA < textB ? -1 : textA > textB ? 1 : 0;
                })
                .map((vendor) => {
                  if (vendor._id !== partDetail.vendor._id) {
                    return (
                      <option value={vendor._id} key={vendor._id}>
                        {vendor.name}
                      </option>
                    );
                  }
                  return "";
                })}
            </NativeSelect>
          </FormControl>
          <FormControl sx={{ minWidth: 80, mt: "16px", mb: "8px" }}>
            <InputLabel id="partCategory">Part Category</InputLabel>
            <NativeSelect
              name="partCategory"
              required={true}
              onChange={handleChange}
              value={values.partCategory}
              label="Part Category"
            >
              <option value={partDetail.partCategory._id}>
                {partDetail.partCategory.name}
              </option>
              {(partInfo.part_category_list || [])
                .sort((a, b) => {
                  let textA = a.name.toUpperCase();
                  let textB = b.name.toUpperCase();
                  return textA < textB ? -1 : textA > textB ? 1 : 0;
                })
                .map((partCategory) => {
                  if (partCategory._id !== partDetail.partCategory._id) {
                    return (
                      <option value={partCategory._id} key={partCategory._id}>
                        {partCategory.name}
                      </option>
                    );
                  }
                  return "";
                })}
            </NativeSelect>
          </FormControl>
          <TextField
            label="Manufacture"
            placeholder="Manufacture"
            margin={"normal"}
            value={values.manufacture}
            onChange={handleChange}
            name="manufacture"
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
            Part Updated
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
                <p>{responseText.updatedPart.name}</p>
                <p>
                  Customer Price - ${responseText.updatedPart.customer_price}
                </p>
                <p>Cost - ${responseText.updatedPart.cost}</p>
                <p>Part # {responseText.updatedPart.part_number}</p>
                <p>{responseText.updatedPart.vendor.name}</p>
                <p>{responseText.updatedPart.partCategory.name}</p>
                <p>{responseText.updatedPart.manufacture}</p>
              </Box>
              <Box
                sx={{
                  bgcolor: theme.palette.background.alt,
                  padding: "10px",
                  borderRadius: "4px",
                  border: 1,
                }}
              >
                <Typography
                  variant="h3"
                  color={theme.palette.secondary[100]}
                  fontWeight="bold"
                  sx={{ mb: "5px" }}
                >
                  Updated
                </Typography>
                <p>
                  <Link
                    component={RouterLink}
                    color="inherit"
                    onClick={() => getDetail(responseText.part._id, "parts")}
                    to={`/partdetail/${responseText.part._id}`}
                  >
                    {responseText.part.name}
                  </Link>
                </p>
                <p>Customer Price - ${responseText.part.customer_price}</p>
                <p>Cost - ${responseText.part.cost}</p>
                <p>Part # {responseText.part.part_number}</p>
                <p>{responseText.part.vendor.name}</p>
                <p>{responseText.part.partCategory.name}</p>
                <p>{responseText.part.manufacture}</p>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {responseError && (
        <Box>
          <p>{responseTextError.part.name} not updated</p>
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

export default PartEditForm;
