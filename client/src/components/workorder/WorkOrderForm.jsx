import { useAppContext } from "../../context/appContext";
import { useState, useEffect } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import {
  Box,
  useTheme,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Typography,
} from "@mui/material";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Header from "../Header";
import Response from "../Response";
import { MdDeleteOutline } from "react-icons/md";
import Compress from "compress.js";

const WorkOrderForm = () => {
  useEffect(() => {
    editFormLoad();
    getFormData("workorders");
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
    sumTotal,
    getFormData,
  } = useAppContext();

  const [values, setValues] = useState({
    customer: "",
    date_received: "",
    date_due: "",
    jobtype: "",
    parts: "",
    labor: "",
    work_order_number: "",
    notes: "",
  });
  const compress = new Compress();
  const [customerParts, setCustomerParts] = useState([]);
  const [customerLabor, setCustomerLabor] = useState([]);
  const [customerAccessories, setCustomerAccessories] = useState([]);
  const [customerImg, setCustomerImg] = useState([]);
  // eslint-disable-next-line
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState("");

  const workOrderInfo = formData;
  const theme = useTheme();

  const handleClick = (index) => {
    if (selectedIndex === index) {
      setSelectedIndex("");
    } else {
      setSelectedIndex(index);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeCheckBox = (array, func, event, info) => {
    if (event.target.checked === true) {
      const updatedValues = [...array, info];
      func(updatedValues);
    } else if (event.target.checked === false) {
      const updatedValues = array.filter((a) => a._id !== info._id);
      func(updatedValues);
    }
  };

  const handleChangeArray = (array, func, info) => {
    const updatedValues = [...array, info];
    func(updatedValues);
  };

  const fileSelect = (array, func, event) => {
    let files = Array.from(event.target.files);
    compress
      .compress(files, {
        size: 0.25, // the max size in MB, defaults to 2MB
        quality: 1, // the quality of the image, max is 1,
        maxWidth: 1920, // the max width of the output image, defaults to 1920px
        maxHeight: 1920, // the max height of the output image, defaults to 1920px
        resize: true, // defaults to true, set false if you do not want to resize the image width and height
        rotate: false, // See the rotation section below
      })
      .then((data) => {
        let files = [];
        data.forEach((img) => {
          const base64str = img.data;
          const imgExt = img.ext;
          const name = img.alt;
          const resizedBlob = Compress.convertBase64ToFile(base64str, imgExt);
          const resizedFile = new File([resizedBlob], name, {
            type: imgExt,
          });
          files.push(resizedFile);
        });
        const updatedValues = [...array, ...files];
        func(updatedValues);
      });

    event.target.value = "";
  };

  const fileRemove = (array, func, info) => {
    const updatedValues = array.filter((a) => a.name !== info.name);

    func(updatedValues);
  };

  const deleteItem = (id, array, func) => {
    const updatedValues = array.filter((a) => a._id !== id);
    func(updatedValues);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const {
      customer,
      date_received,
      date_due,
      jobtype,
      work_order_number,
      notes,
    } = values;

    let accessories = customerAccessories;
    let parts = customerParts;
    let labor = customerLabor;

    let formData = new FormData();

    if (customerImg) {
      customerImg.forEach((file) => {
        formData.append("images", file);
      });
    }

    formData.append("customer", customer);
    formData.append("date_received", date_received);
    formData.append("date_due", date_due);
    formData.append("jobtype", jobtype);
    formData.append("work_order_number", work_order_number);
    if (accessories.length > 0) {
      accessories.forEach((obj, index) => {
        Object.entries(obj).forEach(([key, value]) => {
          formData.append(`accessories[${index}][${key}]`, value);
        });
      });
    }

    if (parts.length > 0) {
      parts.forEach((obj, index) => {
        Object.entries(obj).forEach(([key, value]) => {
          formData.append(`parts[${index}][${key}]`, value);
        });
      });
    }
    if (labor.length > 0) {
      labor.forEach((obj, index) => {
        Object.entries(obj).forEach(([key, value]) => {
          formData.append(`labor[${index}][${key}]`, value);
        });
      });
    }

    if (notes) {
      formData.append("notes", notes);
    }

    onSubmitPost(formData, "workorders", "", "create");
  };

  if (isLoading || !workOrderInfo) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    );
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Create Work Order" subtitle="Fill out form below" />
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
            label="Work Order Number"
            placeholder="XXXXX"
            margin={"normal"}
            required
            value={values.work_order_number}
            onChange={handleChange}
            name="work_order_number"
          />
          <FormControl sx={{ minWidth: 80, mt: "16px", mb: "8px" }}>
            <InputLabel id="customer">Customer</InputLabel>
            <Select
              name="customer"
              required={true}
              onChange={handleChange}
              value={values.customer}
              labelId="customer"
              label="Customer"
            >
              {(workOrderInfo.customers || [])
                .sort((a, b) => {
                  let textA = a.first_name.toUpperCase();
                  let textB = b.first_name.toUpperCase();
                  return textA < textB ? -1 : textA > textB ? 1 : 0;
                })
                .map((customer) => {
                  return (
                    <MenuItem value={customer._id} key={customer._id}>
                      {customer.first_name} {customer.last_name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <TextField
            label="Date Received"
            margin={"normal"}
            required
            value={values.date_received}
            onChange={handleChange}
            name="date_received"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Due Date"
            margin={"normal"}
            required
            value={values.date_due}
            onChange={handleChange}
            name="date_due"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <FormControl sx={{ minWidth: 80, mt: "16px", mb: "8px" }}>
            <InputLabel id="jobtype">Job Type</InputLabel>
            <Select
              name="jobtype"
              required={true}
              onChange={handleChange}
              value={values.jobtype}
              labelId="jobtype"
              label="Job Type"
            >
              {(workOrderInfo.jobtypes || [])
                .sort((a, b) => {
                  let textA = a.name.toUpperCase();
                  let textB = b.name.toUpperCase();
                  return textA < textB ? -1 : textA > textB ? 1 : 0;
                })
                .map((jobtype) => {
                  return (
                    <MenuItem value={jobtype._id} key={jobtype._id}>
                      {jobtype.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          {workOrderInfo.partsCategory && (
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: theme.palette.background.default,
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  sx={{
                    bgcolor: theme.palette.background.default,
                    fontWeight: "bold",
                    fontSize: "16px",
                    paddingLeft: "0px",
                  }}
                  color="inherit"
                >
                  Parts
                </ListSubheader>
              }
            >
              {workOrderInfo.partsCategory.map((category) => {
                return (
                  <>
                    <ListItemButton
                      key={category._id}
                      onClick={() => {
                        handleClick(category._id);
                      }}
                    >
                      <ListItemText primary={category.name} />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse
                      in={category._id === selectedIndex}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {workOrderInfo.parts
                          .filter(
                            ({ partCategory }) => partCategory === category._id
                          )
                          .map((part) => {
                            let info = {
                              name: part.name,
                              customer_price: part.customer_price,
                              _id: part._id,
                              manufacture: part.manufacture,
                              part_number: part.part_number,
                            };
                            return (
                              <ListItemButton key={part._id} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                  <MdAddCircleOutline
                                    onClick={() =>
                                      handleChangeArray(
                                        customerParts,
                                        setCustomerParts,
                                        info
                                      )
                                    }
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  sx={{
                                    alignContent: "",
                                    display: "block",
                                  }}
                                  primary={part.name}
                                  secondary={
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <Typography
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                      >
                                        {`$${part.customer_price}`}
                                      </Typography>
                                      <Typography>{`Part #:${part.part_number}`}</Typography>
                                      <Typography>
                                        {part.manufacture}
                                      </Typography>
                                    </Box>
                                  }
                                />
                              </ListItemButton>
                            );
                          })}
                      </List>
                    </Collapse>
                  </>
                );
              })}
            </List>
          )}
          <Box>
            {customerParts
              .sort((a, b) => {
                let textA = a.name.toUpperCase();
                let textB = b.name.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
              })
              .map((part) => {
                return (
                  <Box
                    mb="15px"
                    ml="16px"
                    key={part._id}
                    sx={{ borderRadius: "4px", border: 1, padding: "8px" }}
                  >
                    <Typography variant="body1">
                      Part#: {part.part_number}
                    </Typography>
                    <Typography variant="body1">Name: {part.name}</Typography>{" "}
                    <Typography variant="body1">
                      Manufacture: {part.manufacture}
                    </Typography>
                    <Typography variant="body1">
                      Price: ${part.customer_price}
                    </Typography>
                    <MdDeleteOutline
                      onClick={() =>
                        deleteItem(part._id, customerParts, setCustomerParts)
                      }
                    />
                  </Box>
                );
              })}
            <Typography
              variant="h6"
              color={theme.palette.secondary[300]}
              sx={{ mb: "10px", ml: "15px" }}
              fontWeight="bold"
            >
              Parts Total: ${sumTotal(customerParts, "customer_price")}
            </Typography>
          </Box>

          {workOrderInfo.laborCategory && (
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: theme.palette.background.default,
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  sx={{
                    bgcolor: theme.palette.background.default,
                    fontWeight: "bold",
                    fontSize: "16px",
                    paddingLeft: "0px",
                  }}
                  color="inherit"
                >
                  Labor
                </ListSubheader>
              }
            >
              {workOrderInfo.laborCategory.map((category) => {
                return (
                  <>
                    <ListItemButton
                      key={category._id}
                      onClick={() => {
                        handleClick(category._id);
                      }}
                    >
                      <ListItemText primary={category.name} />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse
                      in={category._id === selectedIndex}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {workOrderInfo.labors
                          .filter(
                            ({ laborCategory }) =>
                              laborCategory === category._id
                          )
                          .map((labor) => {
                            let info = {
                              name: labor.name,
                              price: labor.price,
                              _id: labor._id,
                            };
                            return (
                              <ListItemButton key={labor._id} sx={{ pl: 4 }}>
                                <ListItemIcon>
                                  <MdAddCircleOutline
                                    onClick={() =>
                                      handleChangeArray(
                                        customerLabor,
                                        setCustomerLabor,
                                        info
                                      )
                                    }
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  primary={labor.name}
                                  secondary={`$${labor.price}`}
                                />
                              </ListItemButton>
                            );
                          })}
                      </List>
                    </Collapse>
                  </>
                );
              })}
            </List>
          )}
          <Box mb="5px">
            <Typography
              variant="h6"
              color={theme.palette.secondary[300]}
              sx={{ mb: "10px", ml: "15px" }}
              fontWeight="bold"
            >
              Labor Total: ${sumTotal(customerLabor, "price")}
            </Typography>

            {customerLabor
              .sort((a, b) => {
                let textA = a.name.toUpperCase();
                let textB = b.name.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
              })
              .map((labor) => {
                return (
                  <Box
                    mb="15px"
                    ml="16px"
                    sx={{ borderRadius: "4px", border: 1, padding: "8px" }}
                    key={labor._id}
                  >
                    <Typography variant="body1">Labor: {labor.name}</Typography>
                    <Typography variant="body1">
                      Price: ${labor.price}
                    </Typography>
                    <MdDeleteOutline
                      onClick={() =>
                        deleteItem(labor._id, customerLabor, setCustomerLabor)
                      }
                    />
                  </Box>
                );
              })}
          </Box>
          <FormControl
            sx={{ minWidth: 80, mt: "16px", mb: "8px" }}
            component="fieldset"
          >
            <FormLabel component="legend">Customer Accessories</FormLabel>
            <FormGroup>
              {(workOrderInfo.accessories || [])
                .sort((a, b) => {
                  let textA = a.name.toUpperCase();
                  let textB = b.name.toUpperCase();
                  return textA < textB ? -1 : textA > textB ? 1 : 0;
                })
                .map((accessory) => {
                  let info = {
                    name: accessory.name,
                    _id: accessory._id,
                  };
                  return (
                    <FormControlLabel
                      key={info._id}
                      control={
                        <Checkbox
                          onChange={(event) =>
                            handleChangeCheckBox(
                              customerAccessories,
                              setCustomerAccessories,
                              event,
                              info
                            )
                          }
                          name={accessory.name}
                        />
                      }
                      label={accessory.name}
                    />
                  );
                })}
            </FormGroup>
          </FormControl>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Notes"
            style={{ width: 200 }}
            name="notes"
            value={values.notes}
            onChange={handleChange}
          />
        </Box>
        <Box mb="15px">
          <Button variant="contained" component="label">
            Upload
            <input
              id="files"
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={(event) => {
                fileSelect(customerImg, setCustomerImg, event);
              }}
            />
          </Button>
          {(customerImg || []).map((img) => {
            return (
              <Box mt="15px">
                <img
                  alt="not found"
                  width={"250px"}
                  src={URL.createObjectURL(img)}
                />
                <Button
                  onClick={() => fileRemove(customerImg, setCustomerImg, img)}
                >
                  Remove
                </Button>
              </Box>
            );
          })}
        </Box>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      <Response
        response={response}
        responseText={responseText}
        selectFunction={getDetail}
        item="workOrder"
        path={"workorderdetail"}
        responseError={responseError}
        responseTextError={responseTextError}
        schema={"workorders"}
      />
    </Box>
  );
};

export default WorkOrderForm;
