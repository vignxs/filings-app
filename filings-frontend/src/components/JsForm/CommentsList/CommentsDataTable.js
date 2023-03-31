import { DataGrid } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import { UseForms } from "./UseForms";

export const CommentsDataTable = () => {
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
  const rows = [
    { id: 1, comment_date: 1, comments: "Snow" },
    { id: 2, comment_date: 2, comments: "Lannister" },
    { id: 3, comment_date: 3, comments: "Lannister" },
    { id: 4, comment_date: 4, comments: "Stark" },
    { id: 5, comment_date: 5, comments: "Targaryen" },
    { id: 6, comment_date: 6, comments: "Melisandre" },
    { id: 7, comment_date: 7, comments: "Clifford" },
    { id: 8, comment_date: 8, comments: "Frances" },
    { id: 9, comment_date: 9, comments: "Roxie" },
  ];


  return (
    <Box sx={{ height: 330, width: "100%" }}>
      <DataGrid
        rows={rows}
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
