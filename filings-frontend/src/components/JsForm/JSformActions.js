import React, { useState } from "react";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircularProgress, Stack, IconButton } from "@mui/material";
import {
  DeleteOutlined,
  CheckOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import { green } from "@mui/material/colors";
import UseForm from "./UseForm";

const JSformActions = ({ params, update, setUpdate, editId,check,setCheck }) => {
  const { handleDelete, success, loading, handleEdit, handleSuccess } =
    UseForm(params);

  const getMuiTheme = () =>
    createTheme({
      palette: {
        primary: {
          main: "#094067",
        },
        green: {
          main: "#094067",
        },
        secondary: {
          main: "#90b4ce",
        },
        teritiary: {
          main: "#ef4565",
        },
      },
    });
  return (
    <>
      <ThemeProvider theme={getMuiTheme()}>
        <Box
          sx={{
            m: 0.5,
            position: "relative",
          }}
        >
          <Stack spacing={0} direction="row">
            { check && success && (
              <IconButton
                size="small"
                color="primary"
                sx={{
                  boxShadow: 0,
                  bgcolor: green[500],
                  "&:hover": { bgcolor: green[700] },
                }}
                onClick={() => {
                  handleSuccess();
                  setUpdate(false);
                  setCheck(false)
                }}
              >
                <CheckOutlined />
              </IconButton>
            )}
            {loading || check === false ? (
              <IconButton
                size="small"
                color="primary"
                sx={{
                  width: 40,
                  height: 40,
                }}
                disabled={params.id !== editId || update === false}
                onClick={() => {
                  handleEdit(params);
                  if (params.id === editId){
                    setCheck(true)
                  }
                }}
              >
                <SaveOutlined />
              </IconButton>
            ) : (
              ""
            )}
            {loading && (
              <CircularProgress
                size={40}
                sx={{
                  color: green[500],
                  position: "absolute",
                  //   top: -6,
                  left: -1,
                  zIndex: 1,
                }}
              />
            )}
            <IconButton
              color="teritiary"
              sx={{ boxShadow: 0 }}
              size="small"
              aria-label="edit"
              onClick={handleDelete}
            >
              <DeleteOutlined />
            </IconButton>
          </Stack>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default JSformActions;
