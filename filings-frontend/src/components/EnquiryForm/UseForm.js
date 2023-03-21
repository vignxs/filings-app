import { useState, useEffect } from "react";
import axios from "axios";
import { useValue } from "../../Context/ContextProvider";
import { fsgetRequests } from "../../Context/actions";

const UseForm = (params) => {
  const parameter = params;
  const {
    state: { enqrequests },
    dispatch,
  } = useValue();
  const [values, setValues] = useState({
    name: "",
    followup_call_date: null,
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
    follow_up_calldate: values.followupcalldate,
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
    fsgetRequests(dispatch);
  }, []);

  const postData = () => {
    if (Object.values(values).includes("") === false) {
      axios
        .post("http://127.0.0.1:8000/api/v1/course-enquiry", enqdata)
        .then((res) => console.log(res.data));
      console.log("success", Object.values(values));
    }
  };

  const handleEdit = (params) => {
    const { id, field, value } = params;
    const updatedRow = { ...params.row, [field]: value };
    axios
      .put(
        `http://127.0.0.1:8000/api/v1/course-enquiry-update/${id}`,
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
        .delete(`http://127.0.0.1:8000/api/v1/course-enquiry-delete/${id}`)
        .then((res) => console.log("Employee Data Successfully deleted"))

        .catch((error) => {
          console.log(error);
        });
      dispatch({ type: "ENQDELETE_REQUESTS", payload: id });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event)
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

  return {
    handleChange,
    values,
    handleSubmit,
    setValues,
    handleEdit,
    handleDelete,
    enqrequests,
  };
};
export default UseForm;
