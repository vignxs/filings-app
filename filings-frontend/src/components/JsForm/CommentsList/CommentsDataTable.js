import { DataGrid } from "@mui/x-data-grid";
import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { useValue } from "../../../Context/ContextProvider";
import { cmdgetRequests } from "../../../Context/actions";
import UseForm from "../UseForm";

export const CommentsDataTable = ({ filteredcmd, params }) => {
  const columns = useMemo(() => [
    {
      field: "commented_at",
      headerAlign: "center",
      align: "center",
      headerName: "Comment Date",
      width: 150,
      renderCell: (params) => {
        const date = params.row.commented_at;
        console.log("dateee", date);
        const color = date === today ? "" : "#80808045";
        return (
          <div
            style={{
              backgroundColor: color,
              border: "1px",
              padding: "15px",
              width: "60rem",
              position: "absolute",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {date}
          </div>
        );
      },
    },
    {
      field: "comments",
      headerAlign: "center",
      align: "center",
      headerName: "Comments",
      width: 350,
    },
  ]);

  const today = new Date().toLocaleDateString("en-GB");

  return (
    <Box sx={{ height: 330, width: "100%" }}>
      <DataGrid
        rows={filteredcmd}
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
