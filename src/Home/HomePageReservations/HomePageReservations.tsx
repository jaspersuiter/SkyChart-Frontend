import { useEffect, useState } from "react";
import { Plane, Instructor } from "../../Home/Home";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SquawkInfo from "../../Aircraft/AllSquawks/SquawkInfo";
import { Box, TextField } from "@mui/material";
import dayjs from "dayjs";

interface HomePageReservationProps {
    planes: Array<Plane>;
    instructors: Array<Instructor>;
}

function HomePageReservations(props: HomePageReservationProps) {
  const [userId, setUserId] = useState("");
  const getUser = async () => {
    try {
      const user = await fetch(`http://localhost:5201/api/user/get-current`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => data);
      setUserId(user.id);
    } catch (error) {
      console.log(error);
    }
  };

  // Define Columns of Squawk Grid
  const columns: GridColDef[] = [
    {
      field: "start_time",
      headerName: "Start Time",
      type: "string",
      editable: false,
      width: 180,
    },
    {
      field: "plane",
      headerName: "Plane",
      type: "string",
      editable: false,
      width: 200,
    },
    {
      field: "instructor",
      headerName: "Instructor",
      type: "string",
      editable: false,
      width: 200,
    }
  ];
  const [rows, setRows] = useState([]);

  const getReservations = async () => {
    const startDate = dayjs().format("MM/DD/YYYY");
    const endDate = dayjs().add(21, 'day').format("MM/DD/YYYY");

    try {
        console.log(props.instructors)
        const reservations = await fetch(
            `http://localhost:5201/api/reservation/get?startDate=${startDate}&endDate=${endDate}&userId=${userId}`,
            { credentials: "include" }
        )
            .then((response) => response.json())
            .then((data) => data);
        
        console.log(reservations);
        const mappedRows = reservations.map((reservation: any, index: number) => {
            return {
                id: index,
                start_time: reservation.startTime,
                
                instructor: `${props.instructors.find(
                    (o) => o.userId === reservation.instructorId)?.name}`,

                plane: `${props.planes.find(
                    (o) => o.planeId === reservation.planeId
                  )?.nickName} - [${props.planes.find(
                    (o) => o.planeId === reservation.planeId
                    )?.tailNumber}]`
                
            };
        });
        setRows(mappedRows);
    } catch (error) {
    console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getReservations();
  }, [userId])

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1em"}}>
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

export default HomePageReservations;
