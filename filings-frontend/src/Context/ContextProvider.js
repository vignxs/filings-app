import { useContext, useReducer, createContext, useState } from "react";
import UserInfoForm from "../components/Admin/Forms/UserInfoForm";
import reducer from "./reducer";
import { getSteps, ServiceFileForm } from "../components/Admin/Services";
import ServiceInfoForm from "../components/Admin/Forms/ServiceInfoForm";

const initialState = {
  requests: [],
  isAdmin: 0,
  currentUser: "",
  apps: [],
  isLogged: false,
};

export const Context = createContext();
export default Context;
export const useValue = () => {
  return useContext(Context);
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
 
//   const [output, setOutput] = useState();

//   const [sbOpen, setsbOpen] = useState(false);
//   const [activeStep, setActiveStep] = useState(0);
 

//   const steps = getSteps();

   
//   const handleNext = () =>
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);

//   const handleReset = () => setActiveStep(0);

//   function getStepContent(stepIndex) {
//     switch (stepIndex) {
//       case 0:
//         return <UserInfoForm />;
//       case 1:
//         return (
//           <ServiceInfoForm
//             userinfo={userinfo}
//             output={output}
//             setOutput={setOutput}
//           />
//         );
//       case 2:
//         return <ServiceFileForm />;
//       default:
//         break;
//     }
//   }

//   const handleClose = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const compHandleClose = () => {
//     setOpen(false);
//   };

//   const sbhandleClose = () => {
//     setsbOpen(false);
//   };

//   const handleBack = () => {
//     return;
//   };
//   const handleChangeInfo = (e) => {
//     const { name, value } = e.target;
//     setInfo((prev) => ({ ...prev, [name]: value }));
//   };
//   //   const { dispatch } = useValue();

//   //   const handleDelete = async () => {
//   //     const data = params.row;
//   //     if (window.confirm("Are you sure to delete this record?")) {
//   //       const result = await fetch(
//   //         "http://localhost:8000/api/v1/req-data-delete",
//   //         {
//   //           method: "DELETE",
//   //           headers: { "Content-Type": "application/json" },
//   //           body: JSON.stringify(data),
//   //         }
//   //       );
//   //       const id = await result.json();
//   //       dispatch({ type: "DELETE_REQUESTS", payload: id });
//   //     }
//   //   };
//   const handleFormSubmit = async () => {
//     setOpen(false);
//     console.log("user1", output);
//     const endpoints = {
//       GST: "/gst-update",
//       "GST Registration": "/gst-rgst-update",
//       "PAN Registration": "/pan-rgst-update",
//       "TAX Registration": "/tax-rgst-update",
//     };

//     const endpoint = endpoints[userinfo.enquired_for];
//     const API_ENDPOINT = "http://localhost:8000/api/v1";

//     console.log("user2", userinfo);
//     // Send POST request to save user info
//     fetch(`${API_ENDPOINT}/req-data-update`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(userinfo),
//     });

//     if (endpoint) {
//       fetch(`${API_ENDPOINT}${endpoint}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(output),
//       });
//     }
//     setsbOpen(true);
//   };


  const contextData = {
    state: state,
    dispatch: dispatch,

//     userinfo: userinfo,
//     setInfo: setInfo,
//  setOpen:setOpen,
//     steps:steps,
 
 
 
//     handleFormSubmit: handleFormSubmit,
//     // handleDelete: handleDelete,
//     handleChangeInfo: handleChangeInfo,
//     handleClose: handleClose,
//     getStepContent: getStepContent,
//     handleReset: handleReset,
//     handleNext: handleNext,
//     compHandleClose: compHandleClose,
//     sbhandleClose: sbhandleClose,
//     handleBack: handleBack,
  };
  return <Context.Provider value={contextData}> {children} </Context.Provider>;
};
