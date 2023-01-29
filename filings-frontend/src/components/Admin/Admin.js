import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import InputLabel from "@mui/material/InputLabel";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import { Avatar } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import moment from "moment";
import { grey } from "@mui/material/colors";
import {
  CircularProgress,
  Fab,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Check, Save, Edit, Delete } from "@mui/icons-material";
import { green } from "@mui/material/colors";
// import  UsersActions from "./actions";
const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

const [enqData, setenqData] = [];

const UsersActions = ({ params, rowId, setRowId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleDelete = async () => {
    const data = params.row;
    const enqId = await fetch("http://localhost:8000/enq-data-delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data,
      }),
    });
    console.log(enqId)
    setenqData(enqData.filter((row) => row.id !== enqId.id));
  };    
  const handleEdit = async () => {
  
  }

  const handleSubmit = async () => {
    setLoading(true);
    const data = params.row;
    const result = await fetch("http://localhost:8000/enq-data-update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data,
      }),
    });
    if (result) {
      setSuccess(true);
      setRowId(null);
      // const user = users.find(user=>user._id === _id)
      // user.role = role
      // user.active = active
      //   getUsers(dispatch, currentUser);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      <Stack spacing={2} direction="row">
        {success ? (
          <IconButton
            size="small"
            color="primary"
            sx={{
              boxShadow: 0,
              bgcolor: green[500],
              "&:hover": { bgcolor: green[700] },
            }}
          >
            <Check />
          </IconButton>
        ) : (
          <IconButton
            size="small"
            color="primary"
            sx={{
              width: 40,
              boxShadow: 0,
              height: 40,
            }}
            disabled={params.id !== rowId || loading}
            onClick={handleSubmit}
          >
            <Save />
          </IconButton>
        )}
        {loading && (
          <CircularProgress
            size={42}
            sx={{
              color: green[500],
              position: "absolute",
              //   top: -6,
              left: -17,
              zIndex: 1,
            }}
          />
        )}
        <IconButton
          color="secondary"
          sx={{ boxShadow: 0 }}
          size="small"
          aria-label="edit"
          onClick={handleEdit}
        >
          <Edit />
        </IconButton>
        <IconButton
          color="teritiary"
          sx={{ boxShadow: 0 }}
          size="small"
          aria-label="edit"
          onClick={handleDelete}
        >
          <Delete />
        </IconButton>
      </Stack>
    </Box>
  );
};



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
const enqColumns = useMemo(() => [
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
    editable: true
    // currentUser?.role === "admin",
  },

  {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        width:250,
        renderCell: (params) => (
          <UsersActions {...{ params, rowId, setRowId }} />
        ),
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
    <Box border={1} borderColor="#094067" sx={inputBox}>
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
        Admin Panel
      </Typography>
      <Divider />
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={getMuiTheme()}>
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
        </ThemeProvider>
      </CacheProvider>
    </Box>
  );
};

