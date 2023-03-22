import { useEffect, useMemo } from "react";
import { useState } from "react";
import axios from "axios";
import { useValue } from "../../Context/ContextProvider";
import { fsgetRequests } from "../../Context/actions";

const UseForm = (params) => {
  const parameter = params;
  const {
    state: { fsrequests },
    dispatch,
  } = useValue();
  

  const [values, setValues] = useState({
    candidate_name: "",
    mobile: "",
    technology: "",
    start_date: null,
    followup_date: null,
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
    start_date: values.start_date,
    followup_date: values.followup_date,
    resource: values.resource,
    status: values.status,
    feedback: values.feedback,
    created_by:values.created_by,
    updated_by:values.updated_by
  };

  const postData = () => {
    if (Object.values(values).includes("") === false) {
      axios
        .post("http://127.0.0.1:8000/api/v1/job-support-data", enqdata)
        .then((res) => console.log(res.data));
      console.log("success", Object.values(values));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event)
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
 
const clearFields = () =>{
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
}

  useEffect(() => {
    fsgetRequests(dispatch);
  }, []);
 
  const handleEdit = (params) => {
    const { id, field, value } = params;
    const updatedRow = { ...params.row, [field]: value };
    axios
      .put(
        `http://127.0.0.1:8000/api/v1/job-support-data-update/${id}`,
        updatedRow
      )
      .then((res) => {
        console.log(res.data);
        console.log("Empdata Successfully updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = async (params) => {
    // console.log(parameter);
    const { id } = parameter.row;
    console.log(params);
    if (window.confirm("Are you sure to delete this record?")) {
    await axios
      .delete(`http://127.0.0.1:8000/api/v1/job-support-data-delete/${id}`)
      .then((res) => console.log("Employee Data Successfully deleted"))

      .catch((error) => {
        console.log(error);
      });
      dispatch({ type: "FSDELETE_REQUESTS", payload: id });
    }
  
  };

  return {
    handleChange,
    values,
    handleSubmit,
    setValues,
    handleEdit,
    handleDelete,
    fsrequests,
    clearFields
  };
};
export default UseForm;
