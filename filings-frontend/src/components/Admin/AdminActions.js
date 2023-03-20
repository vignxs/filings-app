import React from "react";
import QontoConnector from "../Utils/StepperUtils";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";
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
import { inputBoxAdminAction } from "../Utils/MuiStyles";
import UseForm from "./UseForm";

export const UsersActions = ({ params, rowId, setRowId }) => {
 
  const {
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
    open,
  } = UseForm({ params});

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

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

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
                      <Box sx={inputBoxAdminAction}>
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
                              onClick={handleClose}
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
              <Button onClick={compHandleClose}>Cancel</Button>
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
