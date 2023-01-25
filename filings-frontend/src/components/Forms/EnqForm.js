import { Box  } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import { PersonalInfo } from "./PersonalInfo";
import Sidebar from "../Sidebar/Sidebar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";



export const EnqForm = (props) => {
  
 

  const inputBox = {
    margin: "0 auto",
    width: "100%",
    "& .MuiTextField-root": {
      m: 2,
      // borderRadius:'15px',
      backgroundColor: "#fffffe",
      borderRadius: "10px",
      width: "30ch",
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
    boxShadow: `rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px`,
    // bgcolor: "#094067",
    // left: "-170px",
    // top: ".8rem",
    // width: "1300px",
    height: "700px",
    flexGrow:1,
    position: "relative",
    borderRadius: "10px",
  };
      const theme = createTheme({
        palette: {
          primary: {
            main: "#2FA0A4",
          },
          green: {
            main: "#094067",
          },
        },
      });

    return (
      <>
        <Box
          border={1}
          // borderLeft={4}
          // borderRight={4}
          borderColor="#094067"
          sx={inputBox}
        >
          <Typography
            variant="h6"
            color={"#ef4565"}
            sx={{
              p: 2,
              fontWeight: "500",
              fontSize: "18px",
              flexGrow: 1,
              fontFamily: "PT Sans Caption",
            }}
            noWrap
            component="h3"
          >
            Enquiry Form
          </Typography>
          <Divider />
          <ThemeProvider theme={theme}>
            <PersonalInfo />
          </ThemeProvider>
        </Box>
      </>
    );
  };



