import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import createCache from "@emotion/cache";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Button, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import UseForm from "./UseForm";
import JSformActions from "./JSformActions";

const JobSupportDataTable = () => {
  const inputBox = {
    "& .MuiDataGrid-toolbarQuickFilter": {
      "& .MuiTextField-root": {
        // m: 2,
        // borderRadius:'15px',
        backgroundColor: "#fffffe",
        borderRadius: "2px",
        width: "70ch",
      },
      borderRadius: "5px",
      width: "70ch",
    },
    "& .MuiPopperUnstyled-root": {
      inset: `-125px auto auto 350px`,
    },
    "& .MuiDataGrid-panel": {
      inset: `-125px auto auto 350px`,
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      opacity: ".8",
      // backgroundColor: "rgba(255, 7, 0, 0.55)",
      fontWeight: "700",
    },
    "& .MuiDataGrid-toolbarContainer ": {
      // top: "-69px",
      // left: "808px",
      justifyContent: "space-between",
      backgroundColor: "rgba(145, 158, 171, 0.12)",
      borderRadius: "10px",
      // position: "relative",
    },
    "& .MuiDataGrid-main ": {
      // top: "-38px",
      // backgroundColor: "rgba(255, 7, 0, 0.55)",
      // position: "relative",
    },
    margin: "0 auto",
    width: "100%",
    "& .MuiTextField-root": {
      m: 2,
      // borderRadius:'15px',
      backgroundColor: "#fffffe",
      borderRadius: "2px",
      width: "40ch",
    },
    "& .MuiInputBase-input": {
      borderRadius: "10px",
      backgroundColor: "#fffffe",
    },
    "& .MuiAutocomplete-popupIndicator": {
      display: "none !important",
    },
    "&  .MuiFormHelperText-root.Mui-error": {
      background: "#d8eefe",
      margin: 0,
      paddingLeft: 10,
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
    },
    // marginLeft: "70px",
    justifyContent: "center",
    // boxShadow: `rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px`,
    // boxShadow: `rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px`,
    // bgcolor: "#094067",
    // left: "-170px",
    // top: ".8rem",
    // width: "1300px",
    height: "700px",
    flexGrow: 1,
    position: "relative",
    borderRadius: "12px",
    padding: "30px",
  };

  const date = new Date();
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
  const { handleEdit, fsrequests } = UseForm();
  const enqColumns = useMemo(() => [
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 80,
      filterable: true,
      renderCell: (params) => <JSformActions {...{ params }} />,
    },
    {
      field: "id",
      headerName: "ID",
      width: 100,
      sortable: false,
      headerAlign: "center",
      align: "center",
      filterable: true,
    },
    {
      field: "start_date",
      headerAlign: "center",
      align: "center",
      editable: true,
      filterable: true,
      headerName: "Start Date",
      width: 120,
    },
    {
      field: "candidate_name",
      headerAlign: "center",
      editable: true,
      align: "center",
      headerName: "Name",
      width: 100,
      filterable: false,
    },
    {
      field: "mobile",
      headerAlign: "center",
      align: "center",
      editable: true,
      headerName: "Mobile",
      width: 100,
      filterable: true,
    },
    {
      field: "technology",
      headerName: "Technology",
      editable: true,
      headerAlign: "center",
      align: "center",
      width: 160,
      sortable: true,
      filterable: true,
    },
    {
      field: "resource",
      headerName: "Resource",
      editable: true,
      headerAlign: "center",
      align: "center",
      width: 100,
      sortable: true,
      filterable: true,
    },
    {
      field: "status",
      headerName: "Status",
      editable: true,
      width: 100,
      type: "singleSelect",
      headerAlign: "center",
      align: "center",
      valueOptions: [
        "Cannot Provide Support",
        "Confrimed",
        "Demo Completed",
        "Demo Scheduled",
        "Demo Yet to Schedule",
        "Follow Up",
        "Not Interested",
        "Resource Not Available",
        "Waiting For Response",
      ],
      filterable: false,
      // currentUser?.role === "admin",
    },
    {
      field: "feedback",
      editable: true,
      headerName: "Feedback",
      width: 180,
      headerAlign: "center",
      filterable: false,
      align: "center",
      // valueFormatter: (params) => formatDate(params.value),
      // renderCell: (params) =>
      //   moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
      // currentUser?.role === "admin",
    },
    {
      field: "followup_date",
      editable: true,
      headerName: "Followup Date",
      width: 180,
      headerAlign: "center",
      align: "center",
      filterable: false,
      // valueFormatter: (params) => formatDate(params.value),
      // renderCell: (params) =>
      //   moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
      // currentUser?.role === "admin",
    },
  ]);

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ background: "#000000" }}>
        <GridToolbarQuickFilter sx={{ marginRight: "auto" }} />
        {/* <GridToolbarColumnsButton /> */}
        <GridToolbarFilterButton
          PopperProps={{ color: "#000000", inset: `-125px auto auto 350px` }}
          sx={{ m: 2, bgcolor: "#FFFFFF", marginLeft: "auto" }}
        />
        {/* <GridToolbarDensitySelector /> */}
        <GridToolbarExport sx={{ m: 2, bgcolor: "#FFFFFF" }} />
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <ThemeProvider theme={getMuiTheme()}>
        <Paper elevation={3} sx={inputBox}>
          <div
            style={{
              display: "inline-flex",
              flexDirection: "row",
              position: "relative",
              right: "3px",
              width: "100%",
              paddingBottom: "5px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography
                variant="h6"
                color={"#ef4565"}
                sx={{
                  padding: "4px",
                  fontWeight: "bold",
                  fontSize: "23px",
                  flexGrow: 1,
                  fontFamily: "Nunito Sans",
                }}
                noWrap
                component="h3"
              >
                Job Support List
              </Typography>

              <Typography
                variant="p"
                color={"#000000"}
                sx={{
                  paddingLeft: "4px",
                  fontWeight: "400",
                  fontSize: "15px",
                  opacity: ".8",
                  flexGrow: 1,
                  fontFamily: "Nunito Sans",
                }}
                noWrap
                component="h3"
              >
                Manage your requests detail and status
              </Typography>
            </div>
            <div>
              <Button
                to="/job-supp-form"
                component={Link}
                size="small"
                color="secondary"
                sx={{ height: "30px", width: "40px", color: "#FFFFFE" }}
                startIcon={<AddIcon />}
                onClick={window.scrollTo(0, 0)}
                variant="contained"
              >
                Add
              </Button>
            </div>
          </div>
          {/* <CacheProvider value={muiCache}> */}
          <Box height={595}>
            <DataGrid
              sx={{ border: 0 }}
              columns={enqColumns}
              rows={fsrequests}
              getRowId={(row) => row.id}
              rowsPerPageOptions={[10, 20, 30]}
              //   pageSize={pageSize}
              //   onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              components={{ Toolbar: CustomToolbar }}
              disableColumnMenu
              componentsProps={{
                toolbar: {
                  csvOptions: { disableToolbarButton: true },
                  printOptions: { disableToolbarButton: true },
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 250 },
                },
                panel: {
                  sx: {
                    "& .MuiDataGrid-filterForm": {
                      // inset: `-125px auto auto 350px`,
                    },
                    "& .MuiDataGrid-paper": {
                      boxShadow: "none !important",
                    },
                    inset: `-125px auto auto 448px !important`,
                  },
                },
              }}
              onCellEditCommit={handleEdit}
            />
          </Box>
          {/* </CacheProvider> */}
        </Paper>
      </ThemeProvider>
    </>
  );
};

export default JobSupportDataTable;
