import { useEffect, useState } from "react";
import { Plane } from "../../Home/Home";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SquawkInfo from "../../Aircraft/AllSquawks/SquawkInfo";
import { Box, TextField } from "@mui/material";

function HomePageNotices() {
  // Define Columns of Squawk Grid
  const columns: GridColDef[] = [
    {
      field: "date_posted",
      headerName: "Date Posted",
      type: "string",
      editable: false,
      width: 140,
    },
    {
      field: "description",
      headerName: "Description",
      type: "string",
      editable: false,
      width: 400,
    },
  ];
  const [rows, setRows] = useState([]);

  const getNotices = async () => {
    try {
        const notices = await fetch(
          `http://localhost:5201/api/notice/get-all-notices`,
          { credentials: "include" }
        )
          .then((response) => response.json())
          .then((data) => data);
        const mappedRows = notices.map((notice: any, index: number) => {
          const date = new Date(notice.datePosted);
          console.log(date);
          return {
            id: index,
            date_posted: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`,
            description: notice.description
          };
        });
        setRows(mappedRows);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotices();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2em"}}>
        <Box
          className="box"
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-start",
          }}
        >
        </Box>
      </div>

      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 3,
            },
          },
        }}
        autoHeight
        disableRowSelectionOnClick
      />
    </div>
  );
}

export default HomePageNotices;
