import { DataGrid } from "@mui/x-data-grid";
import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import UseForms from "./UseForms";
import { useValue } from "../../../Context/ContextProvider";
import { cmdgetRequests } from "../../../Context/actions";

export const CommentsDataTable = ({ params, rowId }) => {
  const columns = useMemo(() => [
    {
      field: "commented_at",
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
    state: { cmdrequests },
  } = useValue();

  let cmdData = cmdrequests.filter((list) => list.job_support_id === rowId);

  console.log("cmd", rowId);
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
