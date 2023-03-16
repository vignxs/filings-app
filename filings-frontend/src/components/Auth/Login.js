import React from "react";
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

// -------------------

// import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function SignInComponent() {
  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ borderRadius: "12px" }} elevation={3}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              // marginTop: "20%",
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
            <Box component="form" noValidate>
              <Grid
                container
                spacing={2}
                sx={{
                  paddingTop: "0px",
                  "& .MuiGrid-item": { paddingTop: "0px" },
                }}
              >
                <Grid item xs={12}>
                  <TextField
                    inputProps={{ underline: "none" }}
                    required
                    fullWidth
                    name="username"
                    label="Username"
                    type="username"
                    id="username"
                    variant="filled"
                    sx={{
                      border: "2.5px solid #d8eefe",
                      "&:hover": { border: "2.5px solid #094067" },
                      borderRadius: "20px 20px 0px 0px",
                      "& .css-2y464i-MuiInputBase-root-MuiFilledInput-root": {
                        backgroundColor: "#00000000",
                        "before& .css-2y464i-MuiInputBase-root-MuiFilledInput-root":
                          {
                            borderBottom: "none",
                          },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    inputProps={{ style: { borderBottom: "none" } }}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    variant="filled"
                    sx={{
                      border: "1px solid #ffff",
                      "&:hover": { border: "1px solid #ffff" },
                      borderRadius: "0px 0px 20px 20px",
                      "& .css-2y464i-MuiInputBase-root-MuiFilledInput-root": {
                        backgroundColor: "#00000000",
                        "before& .css-2y464i-MuiInputBase-root-MuiFilledInput-root":
                          {
                            borderBottom: "none",
                          },
                      },
                    }}
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
