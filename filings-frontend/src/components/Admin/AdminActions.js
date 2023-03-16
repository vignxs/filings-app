import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import InputLabel from "@mui/material/InputLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import QontoConnector from "../Utils/StepperUtils";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import {
  Alert,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress, Stack, IconButton } from "@mui/material";
import {
  CheckOutlined,
  EditOutlined,
  SaveOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { useValue } from "../../Context/ContextProvider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import userContext from "../Context";

export const UsersActions = ({ params, rowId, setRowId }) => {
  // const [heightBox, setheightBox] = React.useState("700px");

  const quaters = ["Q1", "Q2", "Q3", "Q4"];
  const [userinfo, setInfo] = React.useState(params.row);
  //   req_id : params.row.req_id,
  //   first_name: params.row.first_name,
  //   last_name: params.row.last_name,
  //   mobile: params.row.mobile,
  //   email: params.row.email,
  //   address: params.row.address,
  //   city: params.row.city,
  //   pincode: params.row.pincode,
  //   enquired_for: params.row.enquired_for,
  // });

  const handleChangeInfo = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };
  const fileTypes = ["JPEG", "PNG", "GIF"];
  const [file, setFile] = useState(null);
  const handleFileChange = (file) => {
    setFile(file);
  };
  function getSteps() {
    return ["Personal Information", "Services", "Documents"];
  }
  const [output, setOutput] = React.useState({});

  function ServiceFileForm(params) {
    return (
      <>
        <Grid
          style={{
            left: "20px",
            "& .MuiTypographyH6": {
              fontSize: "12px",
              lineHeight: "35px",
              fontWeight: "600",
            },
            flexDirection: "column",
            margin: "20px",
            position: "relative",
          }}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <FileUploader
            multiple={true}
            handleChange={handleFileChange}
            name="file"
            types={fileTypes}
          />
          <p style={{ padding: "20px" }}>
            {file ? `File name: ${file[0].name}` : "No files uploaded yet"}
          </p>
        </Grid>
      </>
    );
  }

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [sbOpen, setsbOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <ValidatorForm onSubmit={handleFileChange}>
            <Grid
              style={{
                left: "20px",
                "& .MuiTypographyH6": {
                  fontSize: "12px",
                  lineHeight: "35px",
                  fontWeight: "600",
                },
                flexDirection: "column",
                position: "relative",
              }}
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid style={{ display: "flex" }}>
                <TextField
                  key={1}
                  // autoFocus
                  label="First name"
                  size="small"
                  type="text"
                  name="first_name"
                  required={true}
                  value={userinfo.first_name}
                  onChange={handleChangeInfo}
                />
                <TextValidator
                  label="Last name"
                  size="small"
                  type="text"
                  name="last_name"
                  required={true}
                  value={userinfo.last_name}
                  onChange={handleChangeInfo}
                />
              </Grid>
              <Grid style={{ display: "flex" }}>
                <TextValidator
                  label="Mobile"
                  name="mobile"
                  validators={["isNumber"]}
                  errorMessages={["Please enter 10 digit Mobile number"]}
                  value={userinfo.mobile}
                  required={true}
                  onChange={handleChangeInfo}
                  size="small"
                  type="text"
                />
                <TextValidator
                  label="Email"
                  onChange={(e) =>
                    setInfo({ ...userinfo, email: e.target.value })
                  }
                  name="email"
                  size="small"
                  // required={true}
                  value={userinfo.email || ""}
                  validators={["isEmail"]}
                  errorMessages={["email is not valid"]}
                />
              </Grid>
              <Grid style={{ display: "flex" }}>
                <TextValidator
                  label="Address"
                  multiline
                  name="address"
                  value={userinfo.address}
                  onChange={handleChangeInfo}
                  size="small"
                  required={true}
                  type="text"
                />
                <TextValidator
                  label="City"
                  size="small"
                  name="city"
                  value={userinfo.city}
                  onChange={handleChangeInfo}
                  required={true}
                  type="text"
                />
              </Grid>
              <Grid style={{ display: "flex" }}>
                <TextValidator
                  label="Pincode"
                  size="small"
                  name="pincode"
                  value={userinfo.pincode}
                  onChange={handleChangeInfo}
                  validators={["isNumber", "matchRegexp:^[1-9][0-9]{5}$"]}
                  errorMessages={[
                    "Please enter 6 digit Pincode",
                    "Please enter 6 digit Pincode",
                  ]}
                  type="text"
                  required={true}
                />
                <TextValidator
                  size="small"
                  id="demo-simple-label"
                  label="Enquired for"
                  value={userinfo.enquired_for || ""}
                  name="enquired_for"
                  required={true}
                />
              </Grid>
            </Grid>
          </ValidatorForm>
        );
      case 1:
        return (
          <>
            <ValidatorForm onSubmit={handleFileChange}>
              <Grid
                style={{
                  left: "20px",
                  "& .MuiTypographyH6": {
                    fontSize: "12px",
                    lineHeight: "35px",
                    fontWeight: "600",
                  },
                  flexDirection: "column",
                  position: "relative",
                }}
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                {userinfo.enquired_for === "GST" && (
                  <Grid>
                    <RadioGroup
                      row
                      name="gst_time"
                      required={true}
                      sx={{ mb: 2, p: 0, position: "relative" }}
                      value={output.gst_time || ""}
                      onChange={(e) =>
                        setOutput({
                          ...output,
                          [e.target.name]: e.target.value,
                        })
                      }
                    >
                      {["Monthly", "Quaterly", "Yearly"].map((period) => (
                        <FormControlLabel
                          key={period}
                          value={period}
                          label={period}
                          labelPlacement="end"
                          control={<Radio required={true} />}
                        />
                      ))}
                    </RadioGroup>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      {output.gst_time === "Yearly" ? (
                        <DatePicker
                          orientation="landscape"
                          openTo="year"
                          views={["year"]}
                          value={output.period || Date()}
                          label="Period"
                          onChange={(e) => {
                            const date = new Date(e);
                            // Extract the year from the date
                            const year = date.getFullYear();
                            setOutput({
                              ...output,
                              period: `${year}`,
                            });
                          }}
                          renderInput={(params) => (
                            <TextValidator
                              size="small"
                              {...params}
                              helperText={null}
                              fullWidth
                            />
                          )}
                        />
                      ) : output.gst_time === "Monthly" ? (
                        <DatePicker
                          orientation="landscape"
                          openTo="month"
                          label="Period"
                          views={["year", "month"]}
                          value={output.period.month}
                          onChange={(e) => {
                            const date = new Date(e);
                            // Extract the month and year from the date
                            const month = date.toLocaleString("default", {
                              month: "short",
                            });
                            const year = date.getFullYear();
                            setOutput({
                              ...output,
                              period: `${year}-${month}`,
                            });
                          }}
                          renderInput={(params) => (
                            <TextValidator
                              size="small"
                              {...params}
                              helperText={null}
                              fullWidth
                            />
                          )}
                        />
                      ) : output.gst_time === "Quaterly" ? (
                        <FormControl
                          sx={{ m: 1.5, minWidth: "23ch" }}
                          size="small"
                        >
                          <InputLabel id="demo-simple-select-label">
                            Period
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={output.period || "Q1"}
                            label="Period"
                            name="period"
                            onChange={(e) => {
                              setOutput({
                                ...output,
                                period: e.target.value,
                              });
                            }}
                          >
                            {quaters.map((val) => (
                              <MenuItem key={val} value={val}>
                                {val}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : null}
                    </LocalizationProvider>
                  </Grid>
                )}
                {userinfo.enquired_for === "GST Registration" && (
                  <>
                    <Grid sx={{ display: "flex" }}>
                      <TextValidator
                        label="Company name"
                        size="small"
                        name="company_name"
                        required={true}
                        value={output.company_name}
                        onChange={(e) =>
                          setOutput({
                            ...output,
                            [e.target.name]: e.target.value,
                          })
                        }
                        type="text"
                        fullWidth
                      />
                      <TextValidator
                        label="Company address"
                        multiline
                        size="small"
                        name="company_address"
                        value={output.company_address}
                        onChange={(e) =>
                          setOutput({
                            ...output,
                            [e.target.name]: e.target.value,
                          })
                        }
                        type="text"
                        fullWidth
                      />
                    </Grid>
                    <Grid sx={{ display: "flex" }}>
                      <TextValidator
                        label="City"
                        name="company_city"
                        value={output.company_city}
                        onChange={(e) =>
                          setOutput({
                            ...output,
                            [e.target.name]: e.target.value,
                          })
                        }
                        size="small"
                        type="text"
                        fullWidth
                      />
                      <TextValidator
                        label="Pincode"
                        name="company_pincode"
                        value={output.company_pincode}
                        onChange={(e) =>
                          setOutput({
                            ...output,
                            [e.target.name]: e.target.value,
                          })
                        }
                        size="small"
                        type="tel"
                        fullWidth
                      />
                    </Grid>
                    <Grid sx={{ display: "flex" }}>
                      <TextValidator
                        label="Email"
                        name="company_email"
                        validators={["required", "isEmail"]}
                        errorMessages={[
                          "this field is required",
                          "email is not valid",
                        ]}
                        value={output.company_email}
                        onChange={(e) =>
                          setOutput({
                            ...output,
                            [e.target.name]: e.target.value,
                          })
                        }
                        size="small"
                        type="email"
                        fullWidth
                      />
                      <TextValidator
                        label="Employer Pan"
                        name="employer_pan"
                        value={output.employer_pan || ""}
                        onChange={(e) =>
                          setOutput({
                            ...output,
                            [e.target.name]: e.target.value,
                          })
                        }
                        size="small"
                        required={true}
                        type="tel"
                        fullWidth
                      />
                    </Grid>
                  </>
                )}

                {userinfo.enquired_for === "PAN Registration" && (
                  <>
                    <Grid style={{ display: "flex" }}>
                      <TextValidator
                        label="Aadhar Number"
                        size="small"
                        validators={[
                          "matchRegexp:^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$",
                        ]}
                        errorMessages={["Please enter 12 digit number "]}
                        name="aadhar"
                        required={true}
                        value={output.aadhar || ""}
                        mask={[
                          /[A-Za-z]/,
                          /[A-Za-z]/,
                          /[A-Za-z]/,
                          /[A-Za-z]/,
                          /[A-Za-z]/,
                          /[0-9]/,
                          /[0-9]/,
                          /[0-9]/,
                          /[0-9]/,
                          /[A-Za-z]/,
                        ]}
                        onChange={(e) =>
                          setOutput({
                            ...output,
                            [e.target.name]: e.target.value,
                          })
                        }
                        type="text"
                      />
                      {/* <Grid style={{ display: "flex" }}>
                        <TextValidator
                          label="Father's Name"
                          size="small"
                          name="father_name"
                          required={true}
                          value={output.father_name}
                          onChange={(e) =>
                            setOutput({ ...output, [e.target.name]: e.target.value })
                          }
                          type="text"
                        />
                        <TextValidator
                          label="Date of Birth"
                          size="small"
                          validators={[
                            "matchRegexp:^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/(19|20)\\d{2}$",
                          ]}
                          errorMessages={[
                            "Please enter a valid date in DD/MM/YYYY format",
                          ]}
                          name="dob"
                          required={true}
                          value={output.dob}
                          onChange={(e) =>
                            setOutput({ ...output, [e.target.name]: e.target.value })
                          }
                          type="text"
                        /> */}
                    </Grid>
                  </>
                )}

                {userinfo.enquired_for === "TAX Registration" && (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <>
                      <Grid sx={{ display: "flex" }}>
                        <DatePicker
                          orientation="landscape"
                          width="inherit"
                          openTo="year"
                          label="Assessment year"
                          views={["year"]}
                          name="assessment_year"
                          value={output.assessment_year || Date()}
                          onChange={(e) => {
                            const date = new Date(e);
                            // Extract the year from the date
                            const year = date.getFullYear();
                            setOutput({
                              ...output,
                              assessment_year: `${year}`,
                            });
                          }}
                          renderInput={(params) => (
                            <TextValidator
                              required={true}
                              size="small"
                              {...params}
                              helperText={null}
                              fullWidth
                            />
                          )}
                        />
                        <TextValidator
                          inputProps={{ style: { textTransform: "uppercase" } }}
                          size="small"
                          label="Pan"
                          required={true}
                          name="pan"
                          validators={[
                            "matchRegexp:^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$",
                          ]}
                          errorMessages={["Please enter valid PAN number"]}
                          value={output.pan || ""}
                          onChange={(e) =>
                            setOutput({
                              ...output,
                              [e.target.name]: e.target.value.toUpperCase(),
                            })
                          }
                          type="text"
                          id="outlined-textarea"
                        />
                      </Grid>
                    </>
                  </LocalizationProvider>
                )}
              </Grid>
            </ValidatorForm>
          </>
        );
      case 2:
        return <ServiceFileForm />;
      default:
        break;
    }
  }

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => setActiveStep(0);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#094067",
      },
      secondary: {
        main: "#094067",
      },
      teritiary: {
        main: "#ef4565",
      },
    },
  });

  const handleClickOpen = () => {
    setOpen(true);

    const endpoints = {
      GST: "req-service-gst",
      "GST Registration": "req-service-gst-rgst",
      "PAN Registration": "req-service-pan-rgst",
      "TAX Registration": "req-service-tax-rgst",
    };

    const endpoint = endpoints[userinfo.enquired_for];

    if (endpoint) {
      fetch(`http://localhost:8000/api/v1/${endpoint}/${params.row.req_id}`)
        .then((res) => res.json())
        .then((result) => {
          setOutput(result);
        });
    }
    console.log(output)
  };

  const handleClose = () => {
    setOpen(false);
  };
  const sbhandleClose = () => {
    setsbOpen(false);
  };
  const { dispatch } = useValue();

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

    // setenqData(enqData.filter((row) => row.id !== enqId.id));
  };
  const handleEdit = async () => {};

  const getMuiTheme = () =>
    createTheme({
      palette: {
        primary: {
          main: "#094067",
        },
        green: {
          main: "#094067",
        },
        secondary: {
          main: "#90b4ce",
        },
        teritiary: {
          main: "#ef4565",
        },
      },
    });
  const handleFormSubmit = async () => {
    setOpen(false);

    console.log(output);
    const endpoints = {
      GST: "/gst-update",
      "GST Registration": "/gst-rgst-update",
      "PAN Registration": "/pan-rgst-update",
      "TAX Registration": "/tax-rgst-update",
    };

    const endpoint = endpoints[userinfo.enquired_for];
    const API_ENDPOINT = "http://localhost:8000/api/v1";

    console.log(userinfo);
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

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

  const inputBox = {
    // margin: "0 auto",
    "& .MuiTextField-root": {
      m: 2,
      // borderRadius:'15px',
      backgroundColor: "#fffffe",
      borderRadius: "2px",
      width: "23ch",
    },
    "& .MuiInputBase-input": {
      borderRadius: "6px",
      backgroundColor: "#fffffe",
    },
    "& .MuiAutocomplete-popupIndicator": {
      display: "none !important",
    },
    "&  .MuiFormHelperText-root.Mui-error": {
      background: "#fffffe",
      margin: 0,
      paddingLeft: 10,
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "6px",
    },
    // marginLeft: "70px",
    justifyContent: "center",
    // boxShadow: `rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px`,
    // bgcolor: "#094067",
    // left: "-170px",
    // top: ".8rem",
    width: "800px",
    // height: {heightBox},
    flexGrow: 1,
    position: "relative",
    borderRadius: "10px",
    // ml:"180px"
  };

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <Box
        sx={{
          m: 0.5,
          position: "relative",
        }}
      >
        <Stack spacing={0} direction="row">
          {success ? (
            <IconButton
              size="small"
              color="primary"
              sx={{
                boxShadow: 0,
                bgcolor: green[500],
                "&:hover": { bgcolor: green[700] },
              }}
            >
              <CheckOutlined />
            </IconButton>
          ) : (
            <IconButton
              size="small"
              color="primary"
              sx={{
                width: 40,
                // boxShadow: 0,
                height: 40,
              }}
              disabled={params.id !== rowId || loading}
              onClick={handleSubmit}
            >
              <SaveOutlined />
              {/* <Icon icon={"eva:save-outline"} /> */}
            </IconButton>
          )}
          {loading && (
            <CircularProgress
              size={40}
              sx={{
                color: green[500],
                position: "absolute",
                //   top: -6,
                left: -1,
                zIndex: 1,
              }}
            />
          )}
          <IconButton
            color="secondary"
            sx={{ boxShadow: 0 }}
            // size="small"
            aria-label="edit"
            onClick={handleClickOpen}
          >
            <EditOutlined />
          </IconButton>
          {/* <ValidatorForm onSubmit={handleFormSubmit}> */}
          <Dialog
            scroll={"body"}
            fullWidth
            maxWidth={"md"}
            open={open}
            onClose={handleClose}
          >
            <DialogTitle
              sx={{
                fontFamily: "PT Sans Caption",
                fontSize: "18px",
                margin: "30px",
                fontWeight: "500",
                position: "relative",
                color: "#ef4565",
              }}
            >
              Update Form
            </DialogTitle>
            <DialogContent sx={{ width: "900px", height: "450px" }}>
              <DialogContentText></DialogContentText>
              <Box>
                <ThemeProvider theme={theme}>
                  <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    connector={<QontoConnector />}
                  >
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  <Box mt={2}>
                    {activeStep === steps.length ? (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          margin: "60px",
                        }}
                      >
                        <Typography>
                          All steps completed , Do you wanna go back? , else
                          update below!
                        </Typography>

                        <Button
                          sx={{ mt: 2 }}
                          variant="contained"
                          color="secondary"
                          onClick={handleReset}
                        >
                          Go Back
                        </Button>
                      </Box>
                    ) : (
                      <Box sx={inputBox}>
                        {getStepContent(activeStep)}
                        <div
                          style={{
                            position: "absolute",
                            left: "20px",
                            width: "100%",
                            display: "flex",
                            marginTop: "20px",
                            justifyContent: "center",
                          }}
                        >
                          <Stack spacing={40} direction="row">
                            <Button
                              variant="contained"
                              color="secondary"
                              disabled={activeStep === 0}
                              onClick={handleBack}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleNext}
                            >
                              {activeStep === steps.length - 1
                                ? "Finish"
                                : "Next"}
                            </Button>
                          </Stack>
                        </div>
                      </Box>
                    )}
                  </Box>
                </ThemeProvider>
              </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "space-between" }}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" onClick={handleFormSubmit}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
          {/* </ValidatorForm> */}
          <IconButton
            color="teritiary"
            sx={{ boxShadow: 0 }}
            size="small"
            aria-label="edit"
            onClick={handleDelete}
          >
            <DeleteOutlined />
          </IconButton>
        </Stack>
      </Box>
      <Snackbar
        open={sbOpen}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={sbhandleClose}
      >
        <Alert
          style={{
            color: "white",
            backgroundColor: "#4caf50",
          }}
          onClose={sbhandleClose}
          severity="success"
        >
          Record updated succesfully!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};
