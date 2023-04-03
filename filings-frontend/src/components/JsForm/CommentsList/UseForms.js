import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useValue } from "../../../Context/ContextProvider";
import { cmdgetRequests } from "../../../Context/actions";

const UseForms = (params) => {
//   const {
//     state: { cmdrequests },
//     dispatch,
//   } = useValue();
//   const [values, setValues] = useState({
//     comment: "",
//     comment_date: new Date(),
//   });

//   useEffect(() => {
//     cmdgetRequests(dispatch);
//   }, []);

  //   console.log("wertyuiknbvcxserty", cmdrequests);

//   const cmd = {
//     job_support_id: params.row.id,
//     comments: values.comment,
//     commented_at: moment(values.comment_date).format("DD-MM-YYYY"),
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axios
//       .post("http://localhost:8000/api/v1/job-support-comment-data", cmd)
//       .then((res) => console.log(res.data));
//     cmdgetRequests(dispatch);
//   };

//   return {    values, setValues };
};
export default UseForms;
