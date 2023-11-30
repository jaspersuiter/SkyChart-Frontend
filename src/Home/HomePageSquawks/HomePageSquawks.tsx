import { useEffect, useState } from "react";
import { Plane } from "../../Home/Home";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SquawkInfo from "../../Aircraft/AllSquawks/SquawkInfo";
import { Box, TextField } from "@mui/material";

export interface AllSquawkProps {
  planes: Array<Plane>;
}

function HomePageSquawks(props: AllSquawkProps) {
  // Define Columns of Squawk Grid
  const columns: GridColDef[] = [
    {
      field: "date_opened",
      headerName: "Date Opened",
      type: "string",
      editable: false,
      width: 140,
    },
    {
      field: "plane_name",
      headerName: "Plane",
      type: "string",
      editable: true,
      width: 180,
    },
    {
      field: "description",
      headerName: "Description",
      type: "string",
      editable: true,
      width: 303,
    },
  ];
  const [rows, setRows] = useState([]);

  const getSquawks = async () => {
    try {
      if (props.planes.length > 0) {
        const squawks = await fetch(
          `http://localhost:5201/api/squawks/get-all`,
          { credentials: "include" }
        )
          .then((response) => response.json())
          .then((data) => data);
        const mappedRows = squawks.map((squawk: any, index: number) => {
          const date = new Date(squawk.dateOpened);
          return {
            id: index,
            squawkId: squawk.squawkId,
            plane_name: `${props.planes.find(
              (o) => o.planeId === squawk.planeId
            )?.nickName} 
                        - [${props.planes.find(
                          (o) => o.planeId === squawk.planeId
                        )?.tailNumber}]`,
            date_opened: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`,
            description: squawk.description
          };
        });
        setRows(mappedRows);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSquawks();
  }, [props.planes]);

  const [openPopup, setOpenPopup] = useState(false);
  const [currSquawk, setCurrSquawk] = useState("");
  const handleRowClick = (clicked: any) => {
    setCurrSquawk(clicked.row.squawkId);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

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
        onRowClick={handleRowClick}
      />
      <SquawkInfo
        open={openPopup}
        onClose={handleClosePopup}
        squawkId={currSquawk}
      />
    </div>
  );
}

export default HomePageSquawks;
