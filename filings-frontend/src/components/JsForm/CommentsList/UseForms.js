import axios from "axios";
import React, { useState } from "react";
import moment from "moment";

const UseForms = (params) => {
  const [values, setValues] = useState({
    comment: "",
    comment_date: new Date(),
  });

  const cmd = {
    job_support_id: params.id,
    comments: values.comment,
    commented_at: moment(values.comment_date).format("DD-MM-YYYY"),
  };
  const handleSubmit = (event) => {
    console.log("values", values);
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/v1/job-support-comment-data", cmd)
      .then((res) => console.log(res.data));
  };

  return { handleSubmit, values, setValues };
};
export default UseForms;
