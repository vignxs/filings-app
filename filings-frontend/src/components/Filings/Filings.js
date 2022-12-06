import Sidebar from "../Sidebar/Sidebar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { useSnackbar } from "notistack";
import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";
import { display } from "@mui/system";
import { useNavigate } from "react-router-dom";


const inputBox = {
  "& .MuiTextField-root": { m: 2, width: "20ch" },
  marginLeft: "20px",
  boxShadow: `rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px`,
  bgcolor: "#D2DFFF",
  top: "6rem",
  width: "700px",
  height: "500px",
  position: "absolute",
  borderRadius: "6px",
};

const uploadBox = {
  bgcolor: "#3A3560",
  boxShadow: `rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px`,
  top: "18rem",
  position: "relative",
  right: "-38rem",
  width: "300px",
  height: "150px",
  borderRadius: "6px",
};

const uploaadBtn = {
  margin: "0",
  position: "absolute",
  top: "50%",
  backgroundColor: "#F0F4F7",
  borderColor: "#D2DFFF",
  right: "18px",
};

const textStyl = {
                color: "white",
                margin: "0",
                position: "absolute",
                top: "25%",
                left: "95px",
              }

export const Filings = (props) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#F0F4F7",
      },
    },
  });

  const [img, setImage] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [fname, setFname] = React.useState('');

    const navigate = useNavigate();

 const submit = async (file) => {
        var data = new FormData();
        data.append("file", file);
        await fetch('http://localhost:8000/products', {
            method: 'POST', headers: { 'Accept': 'multipart/form-data' },body: data });
        await navigate(-1);
 }

 const fileChange = (e) => {
   setImage(e.target.files[0]);
   setFname(e.target.files[0].name);
   submit(e.target.files[0])
   console.log(e.target.files[0]);
 };


 function MyApp() {
   const { enqueueSnackbar } = useSnackbar();

   const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("File uploaded successfuly!", { variant });
  };
    
   return (
     <React.Fragment>
       <Button
         color="primary"
         style={uploaadBtn}
         variant="contained"
         component="label"
         endIcon={<FileUploadOutlinedIcon />}
         onChange={handleClickVariant("success")}
       >
         Click here to Upload File
         <input
           type="file"
           hidden
           onChange={fileChange}
         />
       </Button>
     </React.Fragment>
   );
 }


  return (
    <Sidebar>
      <div style={{ display: "flex", position: "absolute", zIndex: "-1" }}>
        <CssBaseline />

        <h1 style={{ position: "relative", top: "20px", bottom: "20px" }}>
          Tax Registration
        </h1>
        <Box component="form" sx={inputBox} noValidate autoComplete="off">
          <div
            style={{
              alignItems: "center",
              paddingTop: "45px",
              paddingLeft: "13px",
              paddingBottom: "45px",
            }}
          >
            {" "}
            <TextField
              required
              id="outlined-required"
              label="Name"
              defaultValue="Hello World"
            />
            <TextField
              margin="normal"
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <TextField
              id="outlined-read-only-input"
              label="Read Only"
              defaultValue="Hello World"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="outlined-search"
              label="Search field"
              type="search"
            />
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="outlined-search"
              label="Search field"
              type="search"
            />
          </div>
        </Box>
        <Box sx={uploadBox}>
          <ThemeProvider theme={theme}>
            <h4 style={textStyl}> {fname} </h4>
            <MyApp />
          </ThemeProvider>
        </Box>
      </div>
    </Sidebar>
  );
};
