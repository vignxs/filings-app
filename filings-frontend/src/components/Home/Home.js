import { useValue } from "../../Context/ContextProvider";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import fillings from "../../Assets/tax.png";
import jobSupport from "../../Assets/jobsupport.png";
import courseEnq from "../../Assets/courseEnq.png";
import { motion } from "framer-motion";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 10,
  },
  title: {
    flexGrow: 1,
  },
  hero: {
    backgroundSize: "fill",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  heroTitle: {
    fontSize: "5rem",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "1rem",
  },
  heroButton: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#3E54AC",
    padding: ".8vw",
    borderRadius: "13px",
    "&:hover": {
      backgroundColor: "#2C3333",
    },
  },
  imgContainer: {
    display: "flex",
    gap: "10vw",
    marginBottom: "10vw",
  },
  img: {
    width: "10vw",
    height: "10vw",
    color: "#FFF2CC",
  },
}));

function HomePage() {
  const classes = useStyles();
  const { state, dispatch } = useValue();

  // Set the state for the home page
  //   React.useEffect(() => {
  //     dispatch({ type: "HOME", payload: true });
  //   }, []);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  return (
    <div className={classes.root}>
      <AppBar
        sx={{
          "& .MuiAppBar-colorPrimary": {
            backgroundColor: "red!important",
          },
        }}
        position="fixed"
        color="background"
      >
        <Toolbar>
          <Grid
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100vw",
            }}
          >
            <Grid style={{ display: "flex" }}>
              <img
                style={{
                  width: "58px",
                  height: "60px",
                  margin: "1vw",
                }}
                src="https://naukrirecruiter.naukri.com/profilePic/getpic?pid=1657171204rp4517760_medium4"
              />
              <h1 style={{ fontSize: "1.5rem", padding: "1vw 0vw" }}>
                Intellecto Global Services
              </h1>
            </Grid>
            <Grid>
              <Button color="inherit">
                <a
                  href="https://intellecto.co.in/"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Contact Us
                </a>
              </Button>
              <Button color="inherit">About Us</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.hero}>
        <Typography variant="h1" className={classes.heroTitle}>
          Enquiry-Hub
        </Typography>
        <div className={classes.imgContainer}>
          <motion.img
            initial={{ opacity: 0, transform: "translateY(-25vw)" }}
            animate={{ opacity: 1, transform: "translateY(0vw)" }}
            transition={{
              duration: 2,
              type: "spring",
              stiffness: 70,
              dumbing: 5,
            }}
            className={classes.img}
            alt="fillings"
            src={fillings}
          />
          <motion.img
            initial={{ opacity: 0, transform: "translateY(-25vw)" }}
            animate={{ opacity: 1, transform: "translateY(0vw)" }}
            transition={{
              duration: 2,
              type: "spring",
              stiffness: 70,
              dumbing: 5,
              delay: 0.5,
            }}
            className={classes.img}
            alt="jobsupport"
            src={jobSupport}
          />
          <motion.img
            initial={{ opacity: 0, transform: "translateY(-25vw)" }}
            animate={{ opacity: 1, transform: "translateY(0vw)" }}
            transition={{
              duration: 2,
              type: "spring",
              stiffness: 70,
              dumbing: 5,
              delay: 1,
            }}
            className={classes.img}
            alt="courseenq"
            src={courseEnq}
          />
        </div>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 3,
            type: "spring",
            stiffness: 70,
            dumbing: 5,
          }}
          variant="contained"
          className={classes.heroButton}
          onClick={handleClick}
        >
          Sign In
        </motion.button>
      </div>
    </div>
  );
}

export default HomePage;
