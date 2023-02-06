import MUIDataTable from "mui-datatables";
import React, { useContext, useState, contextProvider } from "react";
import ReactDOM from "react-dom";
import InputLabel from "@mui/material/InputLabel";
import Divider from "@mui/material/Divider";
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
import { Avatar, Grid , MenuItem} from "@mui/material";
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
// import userContext from "../Context";

export const UsersActions = ({ params, rowId, setRowId }) => {
  
   const services = [
     "GST",
     "GST Registration",
     "PAN Registration",
     "TAX Registration",
   ];
  function getSteps() {
    return ["Personal Information", "Services", "Documents"];
  }
  // let data = userContext()

  function PersonalInfo() {
    return (
      <Grid
                style={{
                  paddingTop: "10px",
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
                alignItems="inherit"
              >
                <Grid style={{ display: "flex" }}>
                  <TextValidator
                    label="First name"
                    size="small"
                    
                    type="text"
                    name="first_name"
                    required={true}
                    // value={userinfo.first_name}
                    // onChange={(e) => handleChangeInfo(e, "user")}
                  />
                  <TextValidator
                    label="Last name"
                    size="small"
                    
                    type="text"
                    name="last_name"
                    required={true}
                    // value={userinfo.last_name}
                    // onChange={(e) => handleChangeInfo(e, "user")}
                  />
                </Grid>
                <Grid style={{ display: "flex" }}>
                  <TextValidator
                    label="Mobile"
                    name="mobile"
                    validators={["isNumber"]}
                    errorMessages={["Please enter 10 digit Mobile number"]}
                    // value={userinfo.mobile}
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
                    // value={userinfo.email}
                    validators={["isEmail"]}
                    errorMessages={["email is not valid"]}
                  />
                </Grid>
                <Grid style={{ display: "flex" }}>
                  <TextValidator
                    label="Address"
                    multiline
                    name="address"
                    // value={userinfo.address}
                    // onChange={(e) => handleChangeInfo(e, "user")}
                    size="small"
                    required={true}
                    
                    type="text"
                  />
                  <TextValidator
                    label="City"
                    size="small"
                    name="city"
                    // value={userinfo.city}
                    // onChange={(e) => handleChangeInfo(e, "user")}
                    
                    // required={true}
                    type="text"
                  />
                  <TextValidator
                    label="Pincode"
                    size="small"
                    name="pincode"
                    // value={userinfo.pincode}
                    // onChange={(e) => handleChangeInfo(e, "user")}
                    
                    validators={["isNumber", "matchRegexp:^[1-9][0-9]{5}$"]}
                    errorMessages={[
                      "Please enter 6 digit Pincode",
                      "Please enter 6 digit Pincode",
                    ]}
                    type="text"
                    // required={true}
                  />
                </Grid>
                <Grid style={{ display: "flex" }}>
                  <FormControl sx={{ m: 1.5, minWidth: "23ch" }} size="small">
                    <InputLabel  id="demo-simple-select-label">
                      Enquired for*
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-label"
                      label="Enquired for*"
                      
                      // value={userinfo.enquired_for || ""}
                      name="enquired_for"
                      required={true}
                      // onChange={(e) => handleChangeInfo(e, "user")}
                    >
                      {services.map((val) => (
                        <MenuItem value={val}>{val}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                </Grid>
    );
  }
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
      return <PersonalInfo/>
      case 1:
        return `Integer euismod dapibus sapien, a interdum augue blandit eget. Donec pellentesque, sapien iaculis dignissim sagittis, risus nulla auctor eros, sed suscipit eros mauris id lorem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer porttitor mauris egestas consequat molestie. Nam egestas iaculis malesuada. Praesent sagittis venenatis finibus. Praesent porttitor ipsum et sapien cursus, eu mattis augue ornare.`;

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
    margin: "0 auto",
    "& .MuiTextField-root": {
      m: 1.5,
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
    // width: "1300px",
    // height: {heightBox},
    flexGrow: 1,
    position: "relative",
    borderRadius: "10px",
    ml:"120px"
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
            sx={{ inputBox }}
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
            <DialogContent style={{ width: "1000px", height: "450px" }}>
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

                  <Box mt={4} sx={{ paddingTop: "30px" }}>
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

                        <Box
                          pt={2}
                          sx={{
                            ml: 2,
                            display: "flex",
                            justifyContent: "space-evenly",
                            top: "90px",
                            position: "relative",
                          }}
                        >
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
                        </Box>
                      </Box>
                    )}
                  </Box>
                </ThemeProvider>
              </Box>
            </DialogContent>
            <DialogActions>
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
