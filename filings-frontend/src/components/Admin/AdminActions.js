import MUIDataTable from "mui-datatables";
import React, { useContext, useState, contextProvider } from "react";
import ReactDOM from "react-dom";
import InputLabel from "@mui/material/InputLabel";
import Divider from "@mui/material/Divider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import QontoConnector from "../Utils/StepperUtils";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import { Avatar, FormControlLabel, FormLabel, Grid , MenuItem, Radio, RadioGroup} from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import moment from "moment";
import { grey } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  CircularProgress,
  Fab,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import { CheckRounded, SaveRounded, DeleteRounded } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { useValue } from "../../Context/ContextProvider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import userContext from "../Context";

export const UsersActions = ({ params, rowId, setRowId }) => {
  const [Gstinfo, setGstInfo] = React.useState({ gst_time: "", period: {} });
  const [Paninfo, setPanInfo] = React.useState({});
  const [Taxinfo, setTaxInfo] = React.useState({});
  // const [heightBox, setheightBox] = React.useState("700px");

  const quaters = ["Q1", "Q2", "Q3", "Q4"];
  const [userinfo, setInfo] = React.useState({
    first_name: params.row.first_name,
    last_name: params.row.last_name,
    mobile: params.row.mobile,
    email: params.row.email,
    address: params.row.address,
    city: params.row.city,
    pincode: params.row.pincode,
    enquired_for: params.row.enquired_for
  });

  function getSteps() {
    return ["Personal Information", "Services", "Documents"];
  }
const [output ,setOutput] =React.useState()

   useEffect((props) => {
    if (userinfo.enquired_for === "GST") {
      fetch("http://localhost:8000/enquiry-service-gst/" + rowId)
        .then((res) => res.json())
        .then((result) => {
          setOutput(result);
        });
    }
     
   },[]);


  function PersonalInfo() {
    return (
      <Grid
        style={{
          left:"20px",
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
          <TextValidator
            label="First name"
            size="small"
            type="text"
            name="first_name"
            required={true}
            value={userinfo.first_name}
            // onChange={(e) => handleChangeInfo(e, "user")}
          />
          <TextValidator
            label="Last name"
            size="small"
            type="text"
            name="last_name"
            required={true}
            value={userinfo.last_name}
            // onChange={(e) => handleChangeInfo(e, "user")}
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
            // onChange={(e) => handleChangeInfo(e, "user")}
            size="small"
            type="text"
          />
          <TextValidator
            label="Email"
            // onChange={(e) => handleChangeInfo(e, "user")}
            name="email"
            size="small"
            // required={true}
            value={userinfo.email}
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
            // onChange={(e) => handleChangeInfo(e, "user")}
            size="small"
            required={true}
            type="text"
          />
          <TextValidator
            label="City"
            size="small"
            name="city"
            value={userinfo.city}
            // onChange={(e) => handleChangeInfo(e, "user")}

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
            // onChange={(e) => handleChangeInfo(e, "user")}

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
            labelId="demo-simple-select-label"
            id="demo-simple-label"
            label="Enquired for"
            value={userinfo.enquired_for || ""}
            name="enquired_for"
            required={true}
          />
        </Grid>
      </Grid>
    );
  }
function ServiceForm(params) {
  return (
    <>
      {userinfo.enquired_for === "GST" ? (
        <Grid>
          <RadioGroup
            row
            name="gst_time"
            required={true}
            sx={{ mb: 2, p: 0, left: "20px", position: "relative" }}
            // value={Gstinfo.gst_time || ""}
            // onChange={(e) => handleChangeInfo(e, "gst")}
          >
            <FormLabel
              value="Monthly"
              label="Monthly"
              labelPlacement="end"
              control={<Radio required={true}  />}
            />

            <FormControlLabel
              value="Quaterly"
              label="Quaterly"
              labelPlacement="end"
              control={<Radio required={true}  />}
            />

            <FormControlLabel
              value="Yearly"
              label="Yearly"
              labelPlacement="end"
              control={<Radio required={true}  />}
            />
          </RadioGroup>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {Gstinfo.gst_time === "Yearly" ? (
              <DatePicker
                orientation="landscape"
                openTo="year"
                views={["year"]}
                value={Gstinfo.period.year}
                label="Period"
                onChange={(e) =>
                  setGstInfo({ ...Gstinfo, period: { year: e } })
                }
                renderInput={(params) => (
                  <TextValidator
                    size="small"
                    {...params}
                    helperText={null}
                    fullWidth
                  />
                )}
              />
            ) : Gstinfo.gst_time === "Monthly" ? (
              <DatePicker
                orientation="landscape"
                openTo="month"
                label="Period"
                views={["year", "month"]}
                value={Gstinfo.period.month}
                onChange={(e) =>
                  setGstInfo({ ...Gstinfo, period: { month: e } })
                }
                renderInput={(params) => (
                  <TextValidator
                    size="small"
                    {...params}
                    helperText={null}
                    fullWidth
                  />
                )}
              />
            ) : Gstinfo.gst_time === "Quaterly" ? (
              <FormControl sx={{ m: 1.5, minWidth: "23ch" }} size="small">
                <InputLabel id="demo-simple-select-label">Period</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Gstinfo.period.quater || "Q1"}
                  label="Period"
                  name="period"
                  onChange={(e) => {
                    setGstInfo({
                      ...Gstinfo,
                      period: { quater: e.target.value },
                    });
                  }}
                >
                  {quaters.map((val) => (
                    <MenuItem value={val}>{val}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              false
            )}
          </LocalizationProvider>
        </Grid>
      // ) : userinfo.enquired_for === "GST Registration" ? (
      //   <>
      //     <Grid style={{ display: "flex" }}>
      //       <TextValidator
      //         label="Company name"
      //         size="small"
      //         name="company_name"
      //         required={true}
      //         // value={newGstinfo.company_name}
      //         // onChange={(e) => handleChangeInfo(e, "newgst")}
      //         type="text"
      //       />
      //     </Grid>
      //     <Grid style={{ display: "flex" }}>
      //       <TextValidator
      //         label="Company address"
      //         multiline
      //         size="small"
      //         name="company_address"
      //         // value={newGstinfo.company_address}
      //         // onChange={(e) => handleChangeInfo(e, "newgst")}
      //         color="green"
      //         type="text"
      //       />
      //       <TextValidator
      //         label="City"
      //         name="company_city"
      //         // value={"" || newGstinfo.company_city}
      //         // onChange={(e) => handleChangeInfo(e, "newgst")}
      //         size="small"
      //         color="green"
      //         type="text"
      //       />
      //       <TextValidator
      //         label="Pincode"
      //         name="company_pincode"
      //         // value={newGstinfo.company_pincode}
      //         // onChange={(e) => handleChangeInfo(e, "newgst")}
      //         size="small"
      //         color="green"
      //         type="tel"
      //       />
      //     </Grid>
      //     <Grid style={{ display: "flex" }}>
      //       <TextValidator
      //         label="Email"
      //         name="company_email"
      //         validators={["required", "isEmail"]}
      //         errorMessages={["this field is required", "email is not valid"]}
      //         // value={newGstinfo.company_email}
      //         // onChange={(e) => handleChangeInfo(e, "newgst")}
      //         size="small"
      //         color="green"
      //         type="email"
      //       />
      //       <TextValidator
      //         label="Employer Pan"
      //         name="employer_pan"
      //         // value={newGstinfo.employer_pan}
      //         // onChange={(e) => handleChangeInfo(e, "newgst")}
      //         size="small"
      //         required={true}
      //         color="green"
      //         type="tel"
      //       />
      //     </Grid>
      //   </>
      // ) : userinfo.enquired_for === "PAN Registration" ? (
      //   <Grid
      //     style={{
      //       display: "flex",
      //     }}
      //   >
      //     <TextValidator
      //       label="Aadhar Number"
      //       size="small"
      //       color="green"
      //       validators={["matchRegexp:^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$"]}
      //       errorMessages={["Please enter 12 digit number "]}
      //       name="aadhar"
      //       required={true}
      //       // value={Paninfo.aadhar}
      //       // onChange={(e) => handleChangeInfo(e, "pan")}
      //       type="text"
      //     />
      //   </Grid>
      // ) : userinfo.enquired_for === "TAX Registration" ? (
      //   <LocalizationProvider dateAdapter={AdapterDayjs}>
      //     <Grid style={{ display: "flex" }}>
      //       <DatePicker
      //         orientation="landscape"
      //         width="inherit"
      //         openTo="year"
      //         label="Assessment year"
      //         views={["year"]}
      //         // value={Taxinfo.assessment_year}
      //         // onChange={(e) => setTaxInfo({ ...Taxinfo, assessment_year: e })}
      //         renderInput={(params) => (
      //           <TextValidator
      //             required={true}
      //             size="small"
      //             color="green"
      //             {...params}
      //             helperText={null}
      //             fullWidth
      //           />
      //         )}
      //       />
      //       <TextValidator
      //         inputProps={{ style: { textTransform: "uppercase" } }}
      //         size="small"
      //         label="Pan"
      //         required={true}
      //         color="green"
      //         name="pan"
      //         validators={["matchRegexp:^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$"]}
      //         errorMessages={["Please valid Pan number "]}
      //         // value={Taxinfo.pan}
      //         // onChange={(e) => handleChangeInfo(e, "tax")}
      //         type="text"
      //         id="outlined-textarea"
      //       />
      //     </Grid>
      //   </LocalizationProvider>
      ) : (
        false
      )}
    </>
  );
}
  const services = [
    "GST",
    "GST Registration",
    "PAN Registration",
    "TAX Registration",
  ];
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
      return <PersonalInfo />;
      case 1:
        return <ServiceForm />;
      case 2:
        return `In laoreet, dui vel tristique facilisis, velit dui dictum diam, nec feugiat mi mauris eu nunc. Nullam auctor eget ante ac laoreet. Aliquam et ante ligula. Nam imperdiet augue magna, ac tincidunt neque mollis nec. Sed eu nunc sit amet tellus commodo elementum non sit amet sem. Etiam ipsum nibh, rutrum vel ultrices in, vulputate ac dolor. Morbi dictum lectus id orci dapibus, et faucibus nulla viverra. Nulla consectetur ex vitae pretium vehicula. Quisque varius tempor erat et semper. Vivamus consectetur, eros sit amet ornare facilisis, nulla felis laoreet tortor, sit amet egestas risus ipsum sed eros.`;

      default:
        return `Aenean arcu ligula, porttitor id neque imperdiet, congue convallis erat. Integer libero sapien, convallis a vulputate vel, pretium vulputate metus. Donec leo justo, viverra ut tempor commodo, laoreet eu velit. Donec vel sem quis velit pharetra elementum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam in commodo mauris. Ut iaculis ipsum velit.`;
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
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { state, dispatch } = useValue();

  const handleDelete = async () => {
    const data = params.row;
    const result = await fetch("http://localhost:8000/enq-data-delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data,
      }),
    });
    const id = await result.json();
    dispatch({ type: "DELETE_REQUESTS", payload: id });

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
  const handleSubmit = async () => {
    setLoading(true);
    const data = params.row;
    const result = await fetch("http://localhost:8000/enq-data-update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data,
      }),
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
      borderRadius: "10px",
      width: "23ch",
    },
    "& .MuiInputBase-input": {
      borderRadius: "10px",
      backgroundColor: "#fffffe",
    },
    "& .MuiAutocomplete-popupIndicator": {
      display: "none !important",
    },
    "&  .MuiFormHelperText-root.Mui-error": {
      background: "#d8eefe",
      margin: 0,
      paddingLeft: 10,
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
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
              <CheckRounded />
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
              <SaveRounded />
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
            size="small"
            aria-label="edit"
            onClick={handleClickOpen}
          >
            <EditRoundedIcon />
          </IconButton>
          <Dialog
            scroll={"body"}
            fullWidth
            maxWidth={"md"}
            // sx={{ inputBox }}
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
            <DialogContent style={{ width: "900px", height: "450px" }}>
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
                      <Box>
                        <Typography>All steps completed</Typography>

                        <Button
                          sx={{ mt: 2 }}
                          variant="contained"
                          color="secondary"
                          onClick={handleReset}
                        >
                          Reset
                        </Button>
                      </Box>
                    ) : (
                      <Box sx={inputBox}>
                        <ValidatorForm>
                          {getStepContent(activeStep)}
                        </ValidatorForm>
                        <div
                          style={{
                            position: "absolute",
                            left:"20px",
                            width: "100%",
                            display:"flex",
                            marginTop:"20px",
                            justifyContent:"center",
                            // alignItems:"center"
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
            <DialogActions sx={{ justifyContent:"space-between" }} >
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Subscribe</Button>
            </DialogActions>
          </Dialog>
          <IconButton
            color="teritiary"
            sx={{ boxShadow: 0 }}
            size="small"
            aria-label="edit"
            onClick={handleDelete}
          >
            <DeleteRounded />
          </IconButton>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};
