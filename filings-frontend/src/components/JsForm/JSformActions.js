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
// import { useValue } from "../../Context/ContextProvider";
import UseForm from "./UseForm"

const JSformActions = ({ params }) => {

  const {handleDelete} = UseForm()
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
  return (
    <>
      <ThemeProvider theme={getMuiTheme()}>
        <Box
          sx={{
            m: 0.5,
            position: "relative",
          }}
        >
          <Stack spacing={0} direction="row">
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
      </ThemeProvider>
    </>
  );
};

export default JSformActions;
