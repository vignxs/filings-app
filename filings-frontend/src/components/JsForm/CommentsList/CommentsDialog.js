import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  createTheme,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Grid,
} from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { CommentsDataTable } from "./CommentsDataTable";
import { cmdgetRequests } from "../../../Context/actions";
import axios from "axios";
import moment from "moment";
import { useValue } from "../../../Context/ContextProvider";

const CommentsDialog = ({ cmdopen, setcmdOpen,filteredcmd, params }) => {
  const [values, setValues] = useState({
    comment: "",
    comment_date: "",
  });
    // console.log("CommentsDialog", filteredcmd);
  const {
    state: { cmdrequests },
    dispatch,
  } = useValue();
  const theme = createTheme({
    palette: {
      primary: {
        main: "#094067",
      },
      green: {
        main: "#094067",
      },
      success: {
        main: green[600],
      },
      secondary: {
        main: "#094067",
      },
    },
  });
  const today = new Date().toLocaleDateString("en-GB");
  const cmd = {
    job_support_id: params.row.id,
    comments: values.comment,
    commented_at: today,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/v1/job-support-comment-data", cmd)
      .then((res) => console.log("data", res));
      cmdgetRequests(dispatch);
      setValues({
        comment: "",
        comment_date: "",
      });
  };

  useEffect(() => {
    cmdgetRequests(dispatch);
  }, []);
  //   const { handleChange, handleSubmit, values, setValues } = UseForms(params);
  //   console.log("qwertyui", params);
  return (
    <>
      <Dialog scroll={"body"} fullWidth maxWidth={"sm"} open={cmdopen}>
        <DialogTitle
          sx={{
            fontFamily: "PT Sans Caption",
            fontSize: "18px",
            // margin: "30px",
            fontWeight: "500",
            position: "relative",
            color: "#ef4565",
            top: "1rem",
          }}
        >
          Comments List
        </DialogTitle>
        <DialogContent sx={{ height: "550px" }}>
          <DialogContentText></DialogContentText>
          <Box mt={2}>
            <ThemeProvider theme={theme}>
              <ValidatorForm onSubmit={""}>
                <Stack spacing={40} direction="row" mt="1rem">
                  <Grid
                    style={{
                      "& .MuiTypographyH6": {
                        fontSize: "12px",
                        lineHeight: "35px",
                        fontWeight: "600",
                      },
                      flexDirection: "column",
                      position: "relative",
                      marginTop: "1rem",
                      gap: "2rem",
                    }}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    // mt="3"
                  >
                    <CommentsDataTable
                      filteredcmd={filteredcmd}
                      params={params.row}
                    />
                    <TextValidator
                      label="New Comment"
                      size="small"
                      type="text"
                      name="comment"
                      value={values.comment}
                      onChange={(e) =>
                        setValues((presvalue) => {
                          return {
                            ...presvalue,
                            [e.target.name]: e.target.value,
                          };
                        })
                      }
                    />
                    <Grid style={{ display: "flex" }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ left: "-10rem", top: ".5rem" }}
                        onClick={() => {
                          //   if (window.confirm("Do You Want Discard Changes")) {
                          setcmdOpen(false);
                          //   }
                        }}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSubmit}
                        style={{ left: "10rem", top: ".5rem" }}
                      >
                        Add
                      </Button>{" "}
                    </Grid>
                  </Grid>
                </Stack>
              </ValidatorForm>
            </ThemeProvider>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommentsDialog;
