import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const UseForm = () => {
  const [fsdata, setFsdata] = useState([]);
  const [values, setValues] = useState({
    candidatename: "",
    mobile: "",
    technology: "",
    startdate: null,
    followupdate: null,
    resource: "",
    status: "",
    feedback: "",
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
    candidatename: values.candidatename,
    mobile: values.mobile,
    technology: values.technology,
    startdate: values.startdate,
    followupdate: values.followupdate,
    resource: values.resource,
    status: values.status,
    feedback: values.feedback,
  };

  const postData = () => {
    if (Object.values(values).includes("") === false) {
      axios
        .post("https://enq-form-api.onrender.com/enq/EnquiryData", enqdata)
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
      candidatename: "",
      mobile: "",
      technology: "",
      startdate: "",
      followupdate: "",
      resource: "",
      status: "",
      feedback: "",
    });
  };

  const getdata = () => {
    axios.get("https://enq-form-api.onrender.com/enq").then((res) => {
      setFsdata(res.data);
    });
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleEdit = (params) => {
    const { id, field, value } = params;
    const updatedRow = { ...params.row, [field]: value };
    axios
      .put(
        `https://enq-form-api.onrender.com/enq/update-enqdata/${id}`,
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
    const { id } = params;
    console.log(params)
    await axios.delete(`https://enq-form-api.onrender.com/enq/delete-enqdata/${id}`)
      .then((res) => console.log("Employee Data Successfully deleted"))

      .catch((error) => {
        console.log(error);
      });
    const index = fsdata.findIndex((row) => row.id === id);
    const newRows = [...fsdata];
    newRows.splice(index, 1);
    setFsdata(newRows);
  };
  return { handleChange, values, handleSubmit, setValues, fsdata, handleEdit,handleDelete };
};
export default UseForm;
