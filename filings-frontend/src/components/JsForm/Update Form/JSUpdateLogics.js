import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import moment from "moment";
import { useValue } from "../../../Context/ContextProvider";
import { fsgetRequests } from "../../../Context/actions";

const UpdateLogics = ({ params, page }) => {
  const [values, setValues] = useState(params.row);
  const { dispatch } = useValue();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((preValues) => {
      return { ...preValues, [name]: value };
    });
  };

  const FollowupDate = () => {
    if (values.payment_period === "Task") {
      return new Date();
    } else if (values.payment_period === "Weekly") {
      let currentDate = new Date();
      let Weekly = new Date(currentDate.getTime() + 6 * 24 * 60 * 60 * 1000);
      return Weekly;
    } else if (values.payment_period === "BiWeekly") {
      let currentDate = new Date();
      let biWeekly = new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000);
      return biWeekly;
    } else if (values.payment_period === "Monthly") {
      let currentDate = new Date();
      let Monthly = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
      return Monthly;
    }
  };

  const editedData = {
    id: params.id,
    candidate_name: values.candidate_name,
    mobile: values.mobile,
    technology: values.technology,
    date_of_enquiry: values.date_of_enquiry,
    start_date:
      values.status === "Confrimed"
        ? moment(new Date()).format("DD-MM-YYYY")
        : "",
    followup_date:
      values.status === "Confrimed" && values.payment_period !== ""
        ? moment(FollowupDate()).format("DD-MM-YYYY")
        : "",
    resource: values.resource,
    status: values.status,
    feedback: values.feedback,
    charges: values.charges,
    payment_period: values.payment_period,
    created_by: values.created_by,
    updated_by: values.updated_by,
  };

  const handleSubmit = () => {
    axios
      .put(`http://127.0.0.1:8000/api/v1/job-support-data-update`, editedData)
      .then((res) => {
        console.log(res.data);
        console.log("Empdata Successfully updated");
      })
      .catch((error) => {
        console.log(error);
      });

    fsgetRequests(dispatch);
  };

  return {
    values,
    handleChange,
    handleSubmit,
  };
};
export default UpdateLogics;
