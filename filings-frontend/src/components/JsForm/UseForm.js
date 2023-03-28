import { useEffect, useMemo } from "react";
import { useState } from "react";
import axios from "axios";
import moment from "moment";
import { useValue } from "../../Context/ContextProvider";
import { fsgetRequests } from "../../Context/actions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UseForm = (params) => {
  const [open, setOpen] = useState(false);
  const loginStatus = useSelector((state) => state.login.value);
  // console.log(loginStatus)
  const navigate = useNavigate();
  const date= new Date()
  const Dates = moment(date).format("DD-MM-YYYY");
 
  const parameter = params;
  const {
    state: { fsrequests },
    dispatch,
  } = useValue();
  const [values, setValues] = useState({
    candidate_name: "",
    mobile: "",
    technology: "",
    start_date:"",
    followup_date:"",
    resource: "",
    status: "",
    feedback: "",
    created_by: "admin",
    updated_by: "admin",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevalues) => {
      return {
        ...prevalues,
        [name]: value,
      };
    });
  };

  const enqdata = {
    candidate_name: values.candidate_name,
    mobile: values.mobile,
    technology: values.technology,
    start_date:values.start_date==="" ? Dates : values.start_date,
    followup_date:values.followup_date==="" ?Dates:values.followup_date,
    resource: values.resource,
    status: values.status,
    feedback: values.feedback,
    payment_period:'Nothing',
    created_by: values.created_by,
    updated_by: values.updated_by,
  };

  const postData = () => {
    if (Object.values(values).includes("") === false) {
      axios
        .post("http://127.0.0.1:8000/api/v1/job-support-data", enqdata)
        .then((res) => console.log(res.data));
      setOpen(true);
    }
    navigate("/job-supp-form");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    console.log("I am Working");

    postData();

    setValues({
      candidate_name: "",
      mobile: "",
      technology: "",
      start_date: "",
      followup_date: "",
      resource: "",
      status: "",
      feedback: "",
    });
  };

  const clearFields = () => {
    setValues({
      candidate_name: "",
      mobile: "",
      technology: "",
      start_date: "",
      followup_date: "",
      resource: "",
      status: "",
      feedback: "",
    });
  };

  useEffect(() => {
    fsgetRequests(dispatch);
  }, []);

  const handleDelete = async () => {
    const { id } = parameter.row;
    if (window.confirm("Are you sure to delete this record?")) {
      await axios
        .delete(`http://127.0.0.1:8000/api/v1/job-support-data-delete/${id}`)
        .then((res) => console.log("Employee Data Successfully deleted"))

        .catch((error) => {
          console.log(error);
        });
      dispatch({ type: "FSDELETE_REQUESTS", payload: id });
      fsgetRequests(dispatch);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return {
    handleClose,
    handleChange,
    values,
    handleSubmit,
    setValues,
    handleDelete,
    fsrequests,
    clearFields,
    open,
    setOpen,
  };
};
export default UseForm;
