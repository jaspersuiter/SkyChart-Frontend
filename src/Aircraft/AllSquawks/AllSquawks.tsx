import { useEffect, useState } from "react";
import { Plane } from "../../Home/Home";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SquawkInfo from "./SquawkInfo";
import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export interface AllSquawkProps {
  planes: Array<Plane>;
}

function AllSquawks(props: AllSquawkProps) {
  // Define Columns of Squawk Grid
  const columns: GridColDef[] = [
    {
      field: "date_opened",
      headerName: "Date Opened",
      type: "string",
      editable: false,
      width: 160,
    },
    {
      field: "plane_name",
      headerName: "Plane",
      type: "string",
      editable: true,
      width: 240,
    },
    {
      field: "description",
      headerName: "Description",
      type: "string",
      editable: true,
      width: 640,
    },
    {
      field: "type",
      headerName: "Type",
      type: "singleSelect",
      editable: true,
      width: 128,
      valueOptions: ["Planned", "Unplanned", "100 Hour", "Annual"],
    },
  ];

  // Get Squawks
  const SquawkLabel = [
    { label: "Planned", value: 1 },
    { label: "Unplanned", value: 2 },
    { label: "100 Hour", value: 3 },
    { label: "Annual", value: 4 },
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
            description: squawk.description,
            type: SquawkLabel.find((object) => object.value == squawk.type),
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
  const [searchQuery, setSearchQuery] = useState("");
  const handleRowClick = (clicked: any) => {
    setCurrSquawk(clicked.row.squawkId);
    setOpenPopup(true);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
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
          <SearchIcon sx={{ mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Search..."
            variant="standard"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>
      </div>

      <DataGrid
        sx={{ width: "90em", m: 2 }}
        rows={filteredRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
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

export default AllSquawks;
