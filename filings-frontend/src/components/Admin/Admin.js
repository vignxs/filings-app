import React, { useContext, useState, contextProvider } from "react";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {  useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import  {UsersActions} from "./AdminActions";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
// import userContext  from "../Context";
const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});



export const EnqAdmin = (props) => {
    const inputBox = {
      margin: "0 auto",
      width: "100%",
      "& .MuiTextField-root": {
        m: 2,
        // borderRadius:'15px',
        backgroundColor: "#fffffe",
        borderRadius: "10px",
        width: "30ch",
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
      boxShadow: `rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px`,
      // bgcolor: "#094067",
      // left: "-170px",
      // top: ".8rem",
      // width: "1300px",
      height: "650px",   
      flexGrow: 1,
      position: "relative",
      borderRadius: "10px",
    };
  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("500px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("500px");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);


  const options = {
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    },
  };
  
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

const [pageSize, setPageSize] = useState(10);
const [rowId, setRowId] = useState(null);
const [enqData, setenqData] = useState([]);
const enqColumns = useMemo(
  () => [
    {
      field: "actions",
      headerName: "",
      type: "actions",
      width: 110,
      renderCell: (params) => <UsersActions {...{ params, rowId, setRowId }} />,
    },
    {
      field: "enq_id",
      headerName: "EnqID",
      width: 200,
      sortable: false,
      filterable: false,
    },
    { field: "first_name", headerName: "Name", width: 120 },
    // "last_name",
    // "mobile",
    { field: "email", headerName: "Email", width: 180 },
    // "address",
    // "city",
    // "pincode",
    {
      field: "enquired_for",
      headerName: "Enquired For",
      width: 180,
      sortable: true,
      filterable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      type: "singleSelect",
      valueOptions: ["In-Progress", "Created", "Closed"],
      editable: true,
      // currentUser?.role === "admin",
    },
  ],
  [rowId]
);


React.useEffect(() => {
  (async () => {
    const response = await fetch("http://localhost:8000/enq-data");
    const content = await response.json();
    setenqData(content);
    console.log(content)
  })();
}, []);

  return (
        <ThemeProvider theme={getMuiTheme()}>

    {/* // <userContext.Provider value={enqData}> */}
    <Box border={1} borderColor="#094067" sx={inputBox}>
      <div style={{ display: "inline-flex" }}>
        <Typography
          variant="h6"
          color={"#ef4565"}
          sx={{
            p: 2,
            fontWeight: "500",
            fontSize: "18px",
            flexGrow: 1,
            fontFamily: "PT Sans Caption",
          }}
          noWrap
          component="h3"
        >
          Enquiry List
        </Typography>
        <Button to="/enq-form"
        component={Link}
          size="small"
          color="primary"
          sx={{ height: "30px", top: "15px" }}
          startIcon={<AddIcon />}
          variant="outlined"
        >
          Add
        </Button>
      </div>
      <Divider />
      <CacheProvider value={muiCache}>
          <DataGrid
            columns={enqColumns}
            rows={enqData}
            getRowId={(row) => row.enq_id}
            rowsPerPageOptions={[10, 20, 30]}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            // getRowSpacing={(params) => ({
            //   top: params.isFirstVisible ? 0 : 5,
            //   bottom: params.isLastVisible ? 0 : 5,
            // })}
            // sx={{
            //   [`& .${gridClasses.row}`]: {
            //     bgcolor: (theme) =>
            //       theme.palette.mode === "light" ? grey[200] : grey[900],
            //   },
            // }}
            onCellEditCommit={(params) => setRowId(params.id)}
          />
      </CacheProvider>
    </Box>
        </ThemeProvider>

    // </userContext.Provider>
  );
};

