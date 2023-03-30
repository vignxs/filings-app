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

  const FollowupDate = () => {
    if (values.payment_period === "Task") {
      return new Date();
    } else if (values.payment_period === "Weekly") {
      const lastDayOfWeek = new Date();
      lastDayOfWeek.setDate(
        lastDayOfWeek.getDate() + (6 - lastDayOfWeek.getDay())
      );
      return lastDayOfWeek;
    } else if (values.payment_period === "BiWeekly") {
      const today = new Date();
      const lastDayOfWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + (6 - today.getDay())
      );
      const daysToAdd =
        lastDayOfWeek.getDate() -
        today.getDate() +
        (today.getMonth() % 2 === 0 ? 14 : 15);
      const lastDayOfBiweek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + daysToAdd
      );
      return lastDayOfBiweek;
    } else if (values.payment_period === "Monthly") {
      const today = new Date();
      const lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      );
      return lastDayOfMonth;
    }
  };

  const editedData = {
    id:params.id,
    candidate_name: values.candidate_name,
    mobile: values.mobile,
    technology: values.technology,
    date_of_enquiry: values.date_of_enquiry,
    start_date: moment(new Date()).format("DD-MM-YYYY"),
    followup_date: moment(FollowupDate()).format("DD-MM-YYYY"),
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

  };

  return {
    values,
    handleChange,
    handleSubmit,
  };
};
export default UpdateLogics;
