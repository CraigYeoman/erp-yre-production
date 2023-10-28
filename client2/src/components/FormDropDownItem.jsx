import { useState } from "react";
import {
  MdOutlineArrowDropDownCircle,
  MdAddCircleOutline,
} from "react-icons/md";
import { useGlobalContext } from "../context";

const FormDropDownItem = ({ option, array, name }) => {
  const [open, setOpen] = useState(false);

  const {
    handleChangeArray,
    customerParts,
    setCustomerParts,
    customerLabor,
    setCustomerLabor,
  } = useGlobalContext();
  if (name === "Parts") {
    return (
      <div className="dropdown" key={option._id} value={option._id}>
        {option.name}{" "}
        <MdOutlineArrowDropDownCircle onClick={() => setOpen(!open)} />
        {open &&
          array
            .filter(({ partCategory }) => partCategory === option._id)
            .map((part) => {
              let info = {
                name: part.name,
                customer_price: part.customer_price,
                _id: part._id,
                manufacture: part.manufacture,
                part_number: part.part_number,
              };
              return (
                <div className="dropdown-item" value={part._id} key={part._id}>
                  <div>
                    <p>Part#: {part.part_number}</p> <p>Name: {part.name}</p>{" "}
                    <p>Manufacture: {part.manufacture}</p>
                    <p>Price: ${part.customer_price}</p>
                  </div>
                  <div className="icon-add">
                    <MdAddCircleOutline
                      onClick={() =>
                        handleChangeArray(customerParts, setCustomerParts, info)
                      }
                    />
                  </div>
                </div>
              );
            })}
      </div>
    );
  } else {
    return (
      <div className="dropdown" key={option._id} value={option._id}>
        {option.name}{" "}
        <MdOutlineArrowDropDownCircle onClick={() => setOpen(!open)} />
        {open &&
          array
            .filter(({ laborCategory }) => laborCategory === option._id)
            .map((labor) => {
              let info = {
                name: labor.name,
                price: labor.price,
                _id: labor._id,
              };
              return (
                <div
                  className="dropdown-item"
                  value={labor._id}
                  key={labor._id}
                >
                  <div>
                    <p>Labor: {labor.name}</p>
                    <p>Price: ${labor.price}</p>
                  </div>
                  <div className="icon-add">
                    <MdAddCircleOutline
                      onClick={() =>
                        handleChangeArray(customerLabor, setCustomerLabor, info)
                      }
                    />
                  </div>
                </div>
              );
            })}
      </div>
    );
  }
};

export default FormDropDownItem;
