import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useValue } from "../../../Context/ContextProvider";
import { cmdRequests } from "../../../Context/actions";

const UseForms = (params) => {
  const {
    state: { cmdRequest },
    dispatch,
  } = useValue();
  const [values, setValues] = useState({
    comment: "",
    comment_date: new Date(),
  });

  useEffect(() => {
    cmdRequests(dispatch);
  }, []);
   
    // console.log("wertyuiknbvcxserty", params.row.id);

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

  return { handleSubmit, values, setValues  };
};
export default UseForms;
