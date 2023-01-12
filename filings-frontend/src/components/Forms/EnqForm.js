import { Box  } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import { PersonalInfo } from "./PersonalInfo";
import Sidebar from "../Sidebar/Sidebar";



export const EnqForm = (props) => {
  
 

  const inputBox = {
    "& .MuiTextField-root": {
      m: 2,
      backgroundColor: "#fbfbfb",
      width: "30ch",
    },
    "& .MuiInputBase-input": {
      backgroundColor: "#fbfbfb",
    },
    "& .MuiAutocomplete-popupIndicator": {
      display: "none !important",
    },
    "&  .MuiFormHelperText-root.Mui-error": {
      background: "white",
      margin: 0,
      paddingLeft: 10,
    },
    marginLeft: "70px",
    // boxShadow: `rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px`,
    bgcolor: "white",
    left: "-170px",
    top: "3rem",
    width: "1300px",
    height: "700px",
    position: "relative",
    borderRadius: "6px",
  };
      const theme = createTheme({
        palette: {
          primary: {
            main: "#2FA0A4",
          },
          green: {
            main: "#2FA0A4",
          },
        },
      });

    return (
        <Container>
          <FormControl>
            <h1
              style={{
                position: "relative",
                top: "20px",
                bottom: "20px",
                left: "-100px",
              }}
            >
              Enquiry Form
            </h1>
            <Box sx={inputBox}>
              <ThemeProvider theme={theme}>
                <PersonalInfo />
              </ThemeProvider>
            </Box>
          </FormControl>
        </Container>
    );
  };



