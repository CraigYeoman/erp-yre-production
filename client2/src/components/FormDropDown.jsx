import FormDropDownItem from "./FormDropDownItem";
import { useState } from "react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const FormDropDown = ({ name, array, category }) => {
  const [open, setOpen] = useState(false);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = () => {
    setOpen(!open);
  };

  if (!array) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    );
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={`${name}-label`}>{name}</InputLabel>
        <Select
          labelId={`${name}-label`}
          id={`${name}-chip`}
          multiple
          value={category}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {category
            .sort((a, b) => {
              let textA = a.name.toUpperCase();
              let textB = b.name.toUpperCase();
              return textA < textB ? -1 : textA > textB ? 1 : 0;
            })
            .map((option) => (
              <MenuItem key={option._id} name={name}>
                {" "}
                {option.name}{" "}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      {/* <div onClick={() => setOpen(!open)}>
        {name} <MdOutlineArrowDropDownCircle onClick={() => setOpen(!open)} />
      </div>
      {open &&
        category
          .sort((a, b) => {
            let textA = a.name.toUpperCase();
            let textB = b.name.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          })
          .map((option) => {
            return (
              <FormDropDownItem
                key={option._id}
                option={option}
                array={array}
                name={name}
              />
            );
          })} */}

      {/* <div className="container-column">
      <div onClick={() => setOpen(!open)}>
        {name} <MdOutlineArrowDropDownCircle onClick={() => setOpen(!open)} />
      </div>
      {open &&
        category
          .sort((a, b) => {
            let textA = a.name.toUpperCase();
            let textB = b.name.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
          })
          .map((option) => {
            return (
              <FormDropDownItem
                key={option._id}
                option={option}
                array={array}
                name={name}
              />
            );
          })}
    </div> */}
    </div>
  );
};

export default FormDropDown;
