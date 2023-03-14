// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import TextField from "@material-ui/core/TextField";
// import Paper from '@mui/material/Paper';
// import Button from "@material-ui/core/Button";
// import FormControl from "@material-ui/core/FormControl";
// import Box from "@material-ui/core/Box";
// import { useSignIn } from "react-auth-kit";
// import {  NavLink , useNavigate } from "react-router-dom";
// import { Typography } from "@material-ui/core";
// import bg from  "../../Assets/LR_dhanush.jpg"

// const useStyles = makeStyles((theme) => ({
//   card: {
//     width: "30%",
//     margin: "0 auto",
//     marginTop: theme.spacing(10),
//     padding: theme.spacing(2),
//     borderRadius: theme.shape.borderRadius,
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   textField: {
//     marginBottom: theme.spacing(2),
//   },
// }));

// export  function SignInComponent() {
//   const classes = useStyles();
//   const signIn = useSignIn();
//   const [values, setValues] = React.useState({
//     email: "",
//     user_name:"",
//     password: "",
//   });
//   const navigate = useNavigate();

//   const handleChange = (event) => {
//     setValues({ ...values, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
   
//     const res =  await fetch("http://127.0.0.1:8000/api/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(values)
//     });
//     const post_resp = await res.json();
//     if (post_resp) {
//       console.log(post_resp);
//       signIn({
//         token: post_resp.token,
//         expiresIn: 3600,
//         tokenType: "Bearer",
//         authState: {user:values.user_name},
//         // refreshToken: res.data.refreshToken, // Only if you are using refreshToken feature
//         // refreshTokenExpireIn: res.data.refreshTokenExpireIn, // Only if you are using refreshToken feature
//       });
//     sessionStorage.setItem("user", JSON.stringify(values.user_name));

//       sessionStorage.setItem("logged-out", "false");
      
//     navigate("/");
//     }
    
//   };

//   return (
//     <div className="login-container" style={{position:'absolute',left:'35%',minHeight:"100vh !important",}}>
//     <div style={{width:"100vw",height:'90%',position:'absolute',zIndex:'8',left:'-35vw',top:"-20vh"}}
//     >
//       <img style={{width:"100vw",height:'90%'}}  src={bg} alt=''/>
//     </div>
//     <Paper  elevation={10} sx={{ height:"500px",left:"2.5vw",top:"5vh", width:"400px", display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexWrap:'wrap',
//     zIndex:"10!important",
//     position:'relative'
//    }} >
   
//     {/* <Card className={classes.card}> */}
//       {/* <CardContent> */}
//         {/* <Typography
//           variant="h6"
//           color={"#094067"}
//           sx={{
//             fontWeight: "bold",
//             flexGrow: 1,
//             fontFamily: "PT Sans Caption",
//           }}
//           noWrap
//           component="div"
//         >
//           Intellecto Global Services
//         </Typography> */}
//         <form onSubmit={handleSubmit} className={classes.form}>
//           <FormControl>
//             <Box mb={2}>
//               <TextField
//                 className={classes.textField}
//                 label="Username"
//                 name="user_name"
//                 variant="outlined"
//                 size="small"
//                 type="text"
//                 value={values.user_name}
//                 onChange={handleChange}
//                 required
//               />
//             </Box>
//             <Box mb={2}>
//               <TextField
//                 className={classes.textField}
//                 label="Email"
//                 name="email"
//                 variant="outlined"
//                 size="small"
//                 type="email"
//                 value={values.email}
//                 onChange={handleChange}
//                 required
//               />
//             </Box>
//             <Box mb={2}>
//               <TextField
//                 className={classes.textField}
//                 label="Password"
//                 name="password"
//                 variant="outlined"
//                 size="small"
//                 type="password"
//                 value={values.password}
//                 onChange={handleChange}
//                 required
//               />
//             </Box>
//             <Button type="submit" variant="contained" color="primary">
//               Login
//             </Button>
//           </FormControl>
//         </form>
//         <div style={{ margin: "20px", display: "flex", justifyContent: "center" }}>
//           <Typography>
//             Don't have an account?
//             <NavLink to="/register" style={{ color: "primary", marginLeft: 5 }}>
//               Register
//             </NavLink>
//           </Typography>
//         </div>
//       {/* </CardContent> */}
//     </Paper>

//      </div>
//   );
// }



// -------------------


import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom";



const theme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function SignInComponent() {
    
    
  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ borderRadius: "12px",}} elevation={3}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "20%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // backgroundColor: "#80808066",
            padding: "4vw",
            paddingTop: "2vw",
            borderRadius: "20px",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "secondary.main",
              width: "5rem",
              height: "5rem",
              margin: "1vw",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              fontSize: "2.5vw",
            }}
          >
            Sign in
          </Typography>
          <Box component="form" noValidate  >
            <Grid container spacing={2} sx={{paddingTop:"0px","& .MuiGrid-item":{paddingTop:"0px"}}}>
              <Grid item xs={12}  >
              <TextField
                  inputProps={{ underline : "none" }}
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  type="username"
                  id="username"
                  variant="filled"
                  sx={{border:"2.5px solid #d8eefe", "&:hover" : { border:"2.5px solid #094067"}, 
                borderRadius:"30px 30px 0px 0px" ,'& .css-2y464i-MuiInputBase-root-MuiFilledInput-root':{
                  backgroundColor:"#00000000","before& .css-2y464i-MuiInputBase-root-MuiFilledInput-root":{
                    borderBottom:"none"
                  }
                }}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputProps={{ style:{ borderBottom : "none" }}}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  variant="filled"
                  sx={{border:"2.5px solid #d8eefe", "&:hover" : { border:"2.5px solid #094067" }, 
                borderRadius:"0px 0px 30px 30px" ,'& MuiInputBase-root':{
                  backgroundColor:"#00000000","&:before -MuiFilledInput-root":{
                    borderBottom:"none"
                  }
                }}}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I Agree to the terms and conditions"
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  border: "1px",
                  borderRadius: "2vw",
                  width: "15vw",
                  height: "3vw",
                  fontSize: "1vw",
                }}
              >
                Sign in
              </Button>
            </Box>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/"> Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </Paper>
    </ThemeProvider>
  );
}
