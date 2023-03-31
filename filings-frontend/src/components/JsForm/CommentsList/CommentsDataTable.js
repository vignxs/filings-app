import { DataGrid } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import UseForms from "./UseForms";
import { useValue } from "../../../Context/ContextProvider";

export const CommentsDataTable = ({ params }) => {
  const columns = useMemo(() => [
    {
      field: "comment_date",
      headerAlign: "center",
      align: "center",
      editable: true,
      headerName: "Comment Date",
      width: 150,
    },
    {
      field: "comments",
      headerAlign: "center",
      align: "center",
      editable: true,
      headerName: "Comments",
      width: 350,
    },
  ]);
  const {
    state: { cmdRequest },
    dispatch,
  } = useValue();
  const cmdData = cmdRequest.filter(
    (list) => list.job_support_id === params.row.id
  );
  return (
    <Box sx={{ height: 330, width: "100%" }}>
      <DataGrid
        rows={cmdData}
        columns={columns}
        sx={{
          "& .css-17jjc08-MuiDataGrid-footerContainer": {
            display: "none",
          },
        }}
      />
    </Box>
  );
};
