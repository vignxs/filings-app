import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import moment from "moment";

const UpdateLogics = (params) => {
  const [values, setValues] = useState(params.row);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((preValues) => {
      return { ...preValues, [name]: value };
    });
  };
  
  return {
    values,
    handleChange,
  };
};
export default UpdateLogics;
