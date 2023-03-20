import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useValue } from "../../Context/ContextProvider";
import { useSignIn } from "react-auth-kit";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function SignInComponent() {

   const { dispatch } = useValue();
   const signIn = useSignIn();
   const [values, setValues] = React.useState({
     email: "",
     password: "",
   });
   const navigate = useNavigate();

   const handleChange = (event) => {
     setValues({ ...values, [event.target.name]: event.target.value });
   };

   const handleSubmit = async (event) => {
     event.preventDefault();
     const res = await fetch("http://127.0.0.1:8000/api/login", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(values),
     });
     const post_resp = await res.json();
     if (post_resp) {
       signIn({
         token: post_resp.token,
         expiresIn: 3600,
         tokenType: "Bearer",
         authState: { user: values.user_name },
         // refreshToken: res.data.refreshToken, // Only if you are using refreshToken feature
         // refreshTokenExpireIn: res.data.refreshTokenExpireIn, // Only if you are using refreshToken feature
       });
       sessionStorage.setItem("user", JSON.stringify(values.user_name));

       dispatch({ type: "LOGGED_IN", payload: false });

       navigate("/");
     }
   };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          borderRadius: "12px",
          width: "40vw",
          margin: "auto",
          marginTop: "5vw",
        }}
        elevation={3}
      >
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "4vw",
              paddingTop: "2vw",
              borderRadius: "20px",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{
                fontSize: "2.5vw",
              }}
            >
              Sign in
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <Grid
                container
                spacing={2}
                sx={{
                  marginTop: "5vw",

                  "& .MuiGrid-item": { paddingTop: "0px" },
                }}
              >
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    variant="filled"
                    value={values.email}
                    onChange={handleChange}
                    sx={{
                      border: "1px solid #d8eefe",

                      "&:hover": { border: "1px solid blue" },

                      "&:active": {
                        "&:before": {
                          borderBottom: "0px",
                        },
                      },
                      "&:hover": {
                        border: "1px solid blue",

                        "& .css-2y464i-MuiInputBase-root-MuiFilledInput-root": {
                          "&:before": {
                            borderBottom: "0px",
                          },
                        },
                      },
                      "&:hover:before": { borderBottom: "0px" },

                      borderRadius: "20px 20px 0px 0px",
                      "& .css-2y464i-MuiInputBase-root-MuiFilledInput-root": {
                        backgroundColor: "#00000000",

                        "before:& .css-2y464i-MuiInputBase-root-MuiFilledInput-root":
                          {
                            borderBottom: "none",
                          },
                        "&:before": {
                          borderBottom: "0px",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    value={values.password}
                    onChange={handleChange}
                    label="Password"
                    type="password"
                    name="password"
                    variant="filled"
                    sx={{
                      border: "1px solid #d8eefe",

                      "&:hover": { border: "1px solid blue" },

                      "&:active": {
                        "&:before": {
                          borderBottom: "0px",
                        },
                      },
                      "&:hover": {
                        border: "1px solid blue",

                        "& .css-2y464i-MuiInputBase-root-MuiFilledInput-root": {
                          "&:before": {
                            borderBottom: "0px",
                          },
                        },
                      },
                      "&:hover:before": { borderBottom: "0px" },

                      borderRadius: "0px 0px 20px 20px",
                      "& .css-2y464i-MuiInputBase-root-MuiFilledInput-root": {
                        backgroundColor: "#00000000",

                        "before:& .css-2y464i-MuiInputBase-root-MuiFilledInput-root":
                          {
                            borderBottom: "none",
                          },
                        "&:before": {
                          borderBottom: "0px",
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Link
                    style={{
                      color: "blue",
                      fontSize: "1rem",
                      position: "absolute",
                      textDecoration: "none",
                      marginTop: "1.5rem",
                    }}
                    to="#"
                  >
                    Forgot password?
                  </Link>
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
                  onClick={handleSubmit}
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 10,
                    mb: 2,
                    border: "1px",
                    borderRadius: "2vw",
                    width: "10vw",
                    height: "3vw",
                    fontSize: "6rm",
                    backgroundColor: "#3da9fc",
                  }}
                >
                  Sign in
                </Button>
              </Box>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/register" style={{ textDecoration: "none" }}>
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Paper>
    </ThemeProvider>
  );
}
