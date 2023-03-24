import { useState, useEffect } from "react";
import axios from "axios";
import { useValue } from "../../Context/ContextProvider";
import { enqgetRequests } from "../../Context/actions";

const UseForm = (params) => {
  const parameter = params;
  const {
    state: { enqrequests },
    dispatch,
  } = useValue();

  const [values, setValues] = useState({
    name: "",
    followup_call_date: "",
    followup_status: "",
    enquiry_by: "",
    mobile: "",
    location: "",
    course: "",
    fee_structure: "",
    experience_by: "",
    info_source: "",
    purpose: "",
    mode: "",
    comments: "",
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
    name: values.name,
    followup_call_date: values.followup_call_date,
    followup_status: values.followup_status,
    enquiry_by: values.enquiry_by,
    mobile: values.mobile,
    location: values.location,
    course: values.course,
    fee_structure: values.fee_structure,
    experience_by: values.experience_by,
    info_source: values.info_source,
    purpose: values.purpose,
    mode: values.mode,
    comments: values.comments,
  };

  useEffect(() => {
    enqgetRequests(dispatch);
  }, []);

  const postData = () => {
    if (Object.values(values).includes("") === false) {
      axios
        .post("http://127.0.0.1:8000/api/v1/course-enquiry", enqdata)
        .then((res) => console.log(res.data));
      console.log("success", Object.values(values));
    }
  };

  const handleDelete = async () => {
    const { id } = parameter.row;
    if (window.confirm("Are you sure to delete this record?")) {
      await axios
        .delete(`http://127.0.0.1:8000/api/v1/course-enquiry-delete/${id}`)
        .then((res) => console.log("Employee Data Successfully deleted"))

        .catch((error) => {
          console.log(error);
        });
      dispatch({ type: "ENQDELETE_REQUESTS", payload: id });
      enqgetRequests(dispatch);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    console.log("I am Working");

    postData();

    setValues({
      name: "",
      followup_call_date: "",
      followup_status: "",
      enquiry_by: "",
      mobile: "",
      location: "",
      course: "",
      fee_structure: "",
      experience_by: "",
      info_source: "",
      purpose: "",
      mode: "",
      comments: "",
    });
  };

  const clearFields = () => {
    setValues({
      name: "",
      followup_call_date: "",
      followup_status: "",
      enquiry_by: "",
      mobile: "",
      location: "",
      course: "",
      fee_structure: "",
      experience_by: "",
      info_source: "",
      purpose: "",
      mode: "",
      comments: "",
    });
  };

  return {
    handleChange,
    values,
    handleSubmit,
    setValues,
    handleDelete,
    enqrequests,
    clearFields,
  };
};

export default UseForm;
