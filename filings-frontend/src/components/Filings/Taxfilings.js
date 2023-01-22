import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { useSnackbar } from "notistack";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { Skeleton } from "@mui/material";



const inputBox = {
  margin: "0 auto",
  width: "50%",
  left:"450px",
  "& .MuiTextField-root": { m: 2, width: "20ch" },
  marginLeft: "20px",
  // boxShadow: `rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px`,
  // bgcolor: "#EFEBCE",
  top: "7rem",
  // width: "700px",
  height: "500px",
  position: "absolute",
  borderRadius: "6px",
};

const uploadBox = {
  margin: "0 auto",
  width: "50%",
  // left: "250px",
  bgcolor: "#BBC7C8",
  boxShadow: `rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px`,
  top: "18rem",
  position: "relative",
  // right: "-38rem",
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

    const [extractedData, setED] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [fname, setFname] = React.useState("");
    const navigate = useNavigate();



  


  const submit = async (e) => {
    // e.preventDefault();
    var data = new FormData();
    data.append("file", e.target.files[0]);
    const resp = await fetch("https://filings.deta.dev/uploadfile", {
      method: "POST",
      headers: { Accept: "multipart/form-data" },
      body: data,
    });
    const post_resp = await resp.json();
    setED(post_resp);
    first.Fname = extractedData.First_name;
    first.Lname = extractedData.Last_name;
    first.Hno = extractedData.House_no;
    first.addres = extractedData.Address;
    first.pincode = extractedData.Post_code;
    first.city = extractedData.City;
    first.country = extractedData.Country;
    first.favClr = extractedData.Favorite_color;
    first.drivinglicence = extractedData.Driving_Licence;
    console.log(extractedData.First_name);
    setLoading(true);
  };


  // React.useEffect(() => {
  //   setFirst(extractedData.First_name);
  //   console.log("rst");
  // }, [extractedData.First_name]);

  const fileChange = (e) => {
    console.log(e.target.files[0]);
    setFname(e.target.files[0].name);
    if (e.target.files[0]) {
      submit(e);
    }
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
          <input type="file" hidden onChange={fileChange} />
        </Button>
      </React.Fragment>
    );
  }
    const [first, setFirst] = React.useState(
      {Fname: "" ,
      Lname:"",
       Hno : 0,
       addres: "",
       pincode:'',
       favClr :'',
       drivinglicence : '',
      country:"",
    city:'' 
   });
const handleChange = (event) => {
  event.persist();
  setFirst({ ...first, [event.target.name]: event.target.value });
};

  return (
    <Container>
      <CssBaseline />

      <h1
        style={{
          position: "relative",
          top: "20px",
          bottom: "20px",
          left: "-100px",
        }}
      >
        Tax Registration
      </h1>
      <Box component="form" sx={inputBox} noValidate autoComplete="off">
        <div
          style={
            {
              //   alignItems: "center",
              //   paddingTop: "45px",
              //   paddingLeft: "13px",
              //   paddingBottom: "45px",
            }
          }
        >
          <TextField
            label="First name"
            size="small"
            type="text"
            value={first.Fname || ""}
            onChange={(e) => {
              setFirst({ ...first, Fname: e.target.value });
            }}
          />
          <TextField
            size="small"
            label="Last name"
            type="text"
            value={first.Lname || ""}
          />
          <TextField
            label="House No"
            size="small"
            type="number"
            value={first.Hno || ""}
          />
          <TextField
            label="Address"
            size="small"
            type="text"
            value={first.addres || ""}
          />
          <TextField
            label="Post Code"
            type="text"
            size="small"
            value={first.pincode || ""}
          />
          <TextField
            label="Country"
            size="small"
            type="text"
            value={first.country || ""}
          />
          <TextField
            label="City"
            type="text"
            size="small"
            value={first.city || ""}
          />
          <TextField
            label="Favorite Color"
            size="small"
            type="text"
            value={first.favClr || ""}
          />
          <TextField
            label="Driving Licence"
            size="small"
            type="text"
            value={first.drivinglicence || ""}
          />
        </div>
      </Box>
      <Box sx={uploadBox}>
        <ThemeProvider theme={theme}>
          <h4 style={textStyl}> {fname} </h4>
          <MyApp />
        </ThemeProvider>
      </Box>
    </Container>
  );
};
