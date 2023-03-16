import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function SignUpComponent() {
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
              Sign Up
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <Grid
                container
                spacing={2}
                sx={{
                  marginTop: "4vw",
                  "& .MuiGrid-item": { paddingTop: "0px" },
                }}
              >
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Username"
                    type="text"
                    variant="filled"
                    sx={{
                      border: "1px solid #d8eefe",
                      "&:hover": {
                        border: "1px solid blue",
                        "& .css-2y464i-MuiInputBase-root-MuiFilledInput-root": {
                          "&:before": {
                            borderBottom: "0px",
                          },
                        },
                      },
                      borderRadius: "20px 20px 0px 0px",
                      "& .css-2y464i-MuiInputBase-root-MuiFilledInput-root": {
                        backgroundColor: "#00000000",
                        "&:hover": {
                          backgroundColor: "#00000000",
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
                    label="Email"
                    type="text"
                    variant="filled"
                    sx={{
                      border: "1px solid #d8eefe",
                      "&:hover": {
                        border: "1px solid blue",
                        "& .css-2y464i-MuiInputBase-root-MuiFilledInput-root": {
                          "&:before": {
                            borderBottom: "0px",
                          },
                        },
                      },

                      "& .css-2y464i-MuiInputBase-root-MuiFilledInput-root": {
                        backgroundColor: "#00000000",

                        "&:hover": {
                          backgroundColor: "#00000000",
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
                    label="Password"
                    type="pasword"
                    variant="filled"
                    security="*"
                    sx={{
                      border: "1px solid #d8eefe",
                      "&:hover::active": {
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
                    mt: 5,
                    mb: 2,
                    border: "1px",
                    borderRadius: "2vw",
                    width: "10vw",
                    height: "3vw",
                    fontSize: "6rm",
                    backgroundColor: "#1f8fff",
                  }}
                >
                  Sign Up
                </Button>
              </Box>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    Already have an account? Sign In
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
