import React from "react";
import { useValue } from "../../Context/ContextProvider";
import ServiceInfoForm from "./Forms/ServiceInfoForm";
import UserInfoForm from "./Forms/UserInfoForm";
import { getSteps, ServiceFileForm } from "./Services";

const UseForm = (params,userinfo,setInfo) => {
    
  const [open, setOpen] = React.useState(false);
  const [output, setOutput] = React.useState({});
//   const [userinfo, setInfo] = React.useState( );
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [sbOpen, setsbOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [rowId, setRowId] = React.useState(null);
  const steps = getSteps();
 
  console.log("user info", userinfo );
  //   let value = userinfo;

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleReset = () => setActiveStep(0);

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
            return <UserInfoForm {...{params}}  />;
      case 1:
        return (
          <ServiceInfoForm
            userinfo={userinfo}
            output={output}
            setOutput={setOutput}
          />
        );
      case 2:
        return <ServiceFileForm />;
      default:
        break;
    }
  }

  const handleClose = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const compHandleClose = () => {
    setOpen(false);
  };

  const sbhandleClose = () => {
    setsbOpen(false);
  };

  const handleBack = () => {
    return;
  };
  const handleChangeInfo = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };
  const { dispatch } = useValue();

  const handleClickOpen = () => {
    setOpen(true);
    console.log("handle userinfo", userinfo);
    const endpoints = {
      GST: "req-service-gst",
      "GST Registration": "req-service-gst-rgst",
      "PAN Registration": "req-service-pan-rgst",
      "TAX Registration": "req-service-tax-rgst",
    };

    const endpoint = endpoints[userinfo.enquired_for];

    if (endpoint) {
      const output = fetch(
        `http://localhost:8000/api/v1/${endpoint}/${userinfo.req_id}`
      )
        .then((res) => res.json())
        .then((result) => {
          setOutput(result);
          setInfo(result)
        });
      console.log("handleclickOpen", output);
    }
  };

  const handleDelete = async () => {
    const data = params.row;
    if (window.confirm("Are you sure to delete this record?")) {
      const result = await fetch(
        "http://localhost:8000/api/v1/req-data-delete",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const id = await result.json();
      dispatch({ type: "DELETE_REQUESTS", payload: id });
    }
  };
  const handleFormSubmit = async () => {
    setOpen(false);
    console.log("user1", output);
    const endpoints = {
      GST: "/gst-update",
      "GST Registration": "/gst-rgst-update",
      "PAN Registration": "/pan-rgst-update",
      "TAX Registration": "/tax-rgst-update",
    };

    const endpoint = endpoints[userinfo.enquired_for];
    const API_ENDPOINT = "http://localhost:8000/api/v1";

    console.log("user2", userinfo);
    // Send POST request to save user info
    fetch(`${API_ENDPOINT}/req-data-update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userinfo),
    });

    if (endpoint) {
      fetch(`${API_ENDPOINT}${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(output),
      });
    }
    setsbOpen(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = params.row;
    const result = await fetch("http://localhost:8000/api/v1/req-data-update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (result) {
      setSuccess(true);
      setRowId(null);
    }
    setLoading(false);
  };

  return {
    handleClickOpen,
    sbhandleClose,
    sbOpen,
    handleDelete,
    handleSubmit,
    handleFormSubmit,
    compHandleClose,
    steps,
    activeStep,
    handleClose,
    handleNext,
    getStepContent,
    success,
    loading,
    setSuccess,
    handleReset,
    rowId,
    setRowId,
    pageSize,
    setPageSize,
    open,
    setInfo,
    handleChangeInfo,
    handleBack,
  };
};
export default UseForm;
