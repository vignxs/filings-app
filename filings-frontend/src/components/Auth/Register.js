import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import { useSignIn } from "react-auth-kit";
import { NavLink, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "30%",
    margin: "0 auto",
    marginTop: theme.spacing(10),
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

export function SignUpComponent() {
  const classes = useStyles();
  const signIn = useSignIn();
  const [values, setValues] = React.useState({
    email: "",
    user_name: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const post_resp = await res.json();
    if (post_resp) {
      
      navigate(-1);
    }
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        {/* <Typography
          variant="h6"
          color={"#094067"}
          sx={{
            fontWeight: "bold",
            flexGrow: 1,
            fontFamily: "PT Sans Caption",
          }}
          noWrap
          component="div"
        >
          Intellecto Global Services
        </Typography> */}
        <form onSubmit={handleSubmit} className={classes.form}>
          <FormControl>
            <Box mb={2}>
              <TextField
                className={classes.textField}
                label="Username"
                name="user_name"
                variant="outlined"
                size="small"
                type="text"
                value={values.user_name}
                onChange={handleChange}
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                className={classes.textField}
                label="Email"
                name="email"
                variant="outlined"
                size="small"
                type="email"
                value={values.email}
                onChange={handleChange}
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                className={classes.textField}
                label="Password"
                name="password"
                variant="outlined"
                size="small"
                type="password"
                value={values.password}
                onChange={handleChange}
                required
              />
            </Box>
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </FormControl>
        </form>
        <div
          style={{ margin: "20px", display: "flex", justifyContent: "center" }}
        >
          <Typography>
            Already have an account?
            <NavLink to="/login" style={{ color: "primary", marginLeft: 5 }}>
              LogIn
            </NavLink>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
