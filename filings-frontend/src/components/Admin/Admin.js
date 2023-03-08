import React, { useEffect, useState, contextProvider } from "react";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { CacheProvider } from "@emotion/react";
import moment from "moment";
import createCache from "@emotion/cache";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { UsersActions } from "./AdminActions";
import { Button, Paper, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import LineChart from "./AnalysisCharts";
import {
  AccessTimeRounded,
  ArrowRightAltRounded,
  GroupRounded,
  PersonRounded,
  SupportAgentRounded,
  VerifiedRounded,
} from "@mui/icons-material";
import { useValue } from "../../Context/ContextProvider";
import { getRequests } from "../../Context/actions";

// inspiration
// https://www.figcomponents.com?id=62cf946b12847cc9ecafe6b2

// import userContext  from "../Context";
const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

export const EnqAdmin = (props) => {
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

  const {
    state: { requests },
    dispatch,
  } = useValue();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  const [pageSize, setPageSize] = useState(10);
  const [rowId, setRowId] = useState(null);
  const enqColumns = useMemo(
    () => [
      {
        field: "actions",
        headerName: "",
        type: "actions",
        width: 130,
        filterable: true,
        renderCell: (params) => (
          <UsersActions {...{ params, rowId, setRowId }} />
        ),
      },
      {
        field: "req_id",
        headerName: "ReqId",
        width: 100,
        sortable: false,
        headerAlign: "center",
        align: "center",
        filterable: true,
      },
      {
        field: "first_name",
        headerAlign: "center",
        align: "center",
        filterable: true,
        headerName: "Name",
        width: 120,
      },
      // "last_name",
      // "mobile",
      {
        field: "mobile",
        headerAlign: "center",
        align: "center",
        headerName: "Mobile",
        width: 100,
        filterable: false,
      },
      {
        field: "email",
        headerAlign: "center",
        align: "center",
        headerName: "Email",
        width: 160,
        filterable: true,
      },
      // "address",
      // "city",
      // "pincode",
      {
        field: "enquired_for",
        headerName: "Enquired For",
        headerAlign: "center",
        align: "center",
        width: 160,
        sortable: true,
        filterable: true,
      },
      {
        field: "status",
        headerName: "Status",
        width: 100,
        type: "singleSelect",
        headerAlign: "center",
        align: "center",
        valueOptions: ["In-Progress", "Created", "Closed"],
        editable: true,
        filterable: false,
        // currentUser?.role === "admin",
      },
      {
        field: "created_at",
        headerName: "CreatedAt",
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
        field: "updated_at",
        headerName: "UpdatedAt",
        width: 180,
        headerAlign: "center",
        align: "center",
        filterable: false,
        // valueFormatter: (params) => formatDate(params.value),
        // renderCell: (params) =>
        //   moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
        // currentUser?.role === "admin",
      },
    ],
    [rowId]
  );

  useEffect(() => {
    if (requests.length === 0) getRequests(dispatch);
  }, []);

  console.log(requests);
  // .MuiDataGrid-cell:focus {
  //     outline: solid #094067 1px;
  //     border-radius: 12px;
  // }
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
    <ThemeProvider theme={getMuiTheme()}>
      {/* <Box p={5}>
        <Typography
          variant="h6"
          color={"#094067"}
          sx={{
            p: 2,
            fontWeight: "bold",
            fontSize: "17px",
            flexGrow: 1,
            fontFamily: "PT Sans Caption",
          }}
          noWrap
          component="h3"
        >
          Overview
        </Typography>
        <Grid
          style={{
            "& .MuiTypographyH6": {
              fontSize: "12px",
              lineHeight: "35px",
              fontWeight: "600",
            },
            flexDirection: "row",
            position: "relative",
            justifyContent: "space-evenly",
          }}
          container
          direction="row"
          alignItems="inherit"
        >
          <Grid>
            <Paper elevation={3} sx={PaperStyle(`rgb(200, 250, 205)`)}>
              <GroupRounded color="green" sx={analyticsBoxIcon} />
              <Typography
                sx={{ fontWeight: "600", fontSize: "2.2rem" }}
                variant="h3"
                color={`rgb(0, 123, 85)`}
                noWrap
                component="h3"
              >
                100k
              </Typography>
              <Tooltip title="View Details" placement="bottom">
                <Button
                  size="small"
                  color="primary"
                  sx={{ height: "30px", textTransform: "none", top: "15px" }}
                  endIcon={<ArrowRightAltRounded />}
                  // variant="outlined"
                >
                  <Typography
                    variant="h6"
                    sx={buttonText}
                    noWrap
                    component="h6"
                  >
                    Total requests
                  </Typography>
                </Button>
              </Tooltip>
            </Paper>
          </Grid>{" "}
          <Grid>
            <Paper elevation={3} sx={PaperStyle(`rgb(202, 253, 245)`)}>
              <AccessTimeRounded
                color="green"
                sx={{
                  ...analyticsBoxIcon,
                  color: `rgb(0, 108, 156)`,
                  background: `linear-gradient(135deg, rgba(0, 108, 156, 0) 0%, rgba(0, 108, 156, 0.24) 100%)`,
                }}
              />
              <Typography
                sx={{
                  fontWeight: "600",
                  color: `rgb(0, 108, 156)`,
                  fontSize: "2.2rem",
                }}
                variant="h3"
                color={`rgb(0, 123, 85)`}
                noWrap
                component="h3"
              >
                100k
              </Typography>
              <Tooltip title="View Details" placement="bottom">
                <Button
                  size="small"
                  color="primary"
                  sx={{ height: "30px", textTransform: "none", top: "15px" }}
                  endIcon={<ArrowRightAltRounded />}
                  // variant="outlined"
                >
                  <Typography
                    variant="h6"
                    sx={buttonText}
                    noWrap
                    component="h6"
                  >
                    {dayjs(date).format("DD-MM-YYYY")} requests
                  </Typography>
                </Button>
              </Tooltip>
            </Paper>
          </Grid>{" "}
          <Grid>
            <Paper elevation={3} sx={PaperStyle(`rgb(255, 245, 204)`)}>
              <SupportAgentRounded
                color="green"
                sx={{
                  ...analyticsBoxIcon,
                  color: `rgb(183, 110, 0)`,
                  background: `linear-gradient(135deg, rgba(183, 110, 0, 0) 0%, rgba(183, 110, 0, 0.24) 100%)`,
                }}
              />
              <Typography
                sx={{
                  fontWeight: "600",
                  color: `rgb(122, 65, 0)`,
                  fontSize: "2.2rem",
                }}
                variant="h3"
                color={`rgb(0, 123, 85)`}
                noWrap
                component="h3"
              >
                100k
              </Typography>
              <Tooltip title="View Details" placement="bottom">
                <Button
                  size="small"
                  color="primary"
                  sx={{ height: "30px", textTransform: "none", top: "15px" }}
                  endIcon={<ArrowRightAltRounded />}
                  // variant="outlined"
                >
                  <Typography
                    variant="h6"
                    sx={buttonText}
                    noWrap
                    component="h6"
                  >
                    Follow-ups
                  </Typography>
                </Button>
              </Tooltip>
            </Paper>
          </Grid>{" "}
          <Grid>
            <Paper elevation={3} sx={PaperStyle(`rgb(255, 233, 213)`)}>
              <VerifiedRounded
                color="green"
                sx={{
                  ...analyticsBoxIcon,
                  color: `rgb(183, 29, 24)`,
                  background: `linear-gradient(135deg, rgba(183, 29, 24, 0) 0%, rgba(183, 29, 24, 0.24) 100%)`,
                }}
              />
              <Typography
                sx={{
                  fontWeight: "600",
                  color: `rgb(183, 29, 24)`,
                  fontSize: "2.2rem",
                }}
                variant="h3"
                color={`rgb(0, 123, 85)`}
                noWrap
                component="h3"
              >
                100k
              </Typography>
              <Tooltip title="View Details" placement="bottom">
                <Button
                  size="small"
                  color="primary"
                  sx={{ height: "30px", textTransform: "none", top: "15px" }}
                  endIcon={<ArrowRightAltRounded />}
                  // onClick={console.log("yes")}
                >
                  <Typography
                    variant="h6"
                    sx={buttonText}
                    noWrap
                    component="h6"
                  >
                    Closed
                  </Typography>
                </Button>
              </Tooltip>
            </Paper>
          </Grid>
        </Grid>
      </Box> */}

      {/* <Box
        width={900}
        height={400}
        // bgcolor={`rgb(200, 250, 205)`}
        sx={{
          display: openChart ? "block" : "none",
          ml: "252px",
          borderRadius: "16px",
          mb: "30px",
          boxShadow: `0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)`,
        }}
      >
        <LineChart height="350px" color="#094067" />
      </Box> */}

      <Paper
        elevation={3}
        // border={1} borderColor="#094067"
        sx={inputBox}
      >
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
              Request List
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
              to="/enq-form"
              component={Link}
              size="small"
              color="primary"
              sx={{ height: "30px", width: "40px" }}
              startIcon={<AddIcon />}
              onClick={window.scrollTo(0, 0)}
              variant="contained"
            >
              Add
            </Button>
          </div>
        </div>
        {/* <Divider /> */}
        <CacheProvider value={muiCache}>
          <Box height={595}>
            <DataGrid
              sx={{ border: 0 }}
              columns={enqColumns}
              rows={requests}
              getRowId={(row) => row.req_id}
              rowsPerPageOptions={[10, 20, 30]}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              components={{ Toolbar: CustomToolbar }}
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
              // experimentalFeatures={{ newEditingApi: true }}
              // getRowSpacing={(params) => ({
              //   top: params.isFirstVisible ? 0 : 5,
              //   bottom: params.isLastVisible ? 0 : 5,
              // })}
              onCellEditCommit={(params) => setRowId(params.id)}
            />
          </Box>
        </CacheProvider>
      </Paper>
    </ThemeProvider>

    // </userContext.Provider>
  );
};
