import StaticSidebar from "../Utils/Sidebar/Sidebar";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import "./Instructors.css";
import { useEffect, useState } from "react"; // Import useState

function Instructors() {
  const [rows, setRows] = useState([]); // Declare rows as a state variable
  const formattedPhoneNumber = (phoneNumber: string) => {
    const formatted =
      phoneNumber && phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    return formatted || phoneNumber;
  };

  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "Name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 400,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "phoneNum",
      headerName: "Phone Number",
      type: "string",
      width: 400,
      editable: false,
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 400,
      type: "string",
      editable: false,
    },
  ];

  const fetchInstructors = async () => {
    try {
      const instructors = await fetch(
        "http://localhost:5201/api/instructor/get-all",
        { credentials: "include" }
      )
        .then((response) => response.json())
        .then((data) => data);

      // Create a new array of rows based on the instructors data
      const mappedRows = instructors.map((instructor: any, index: number) => {
        const nameParts = instructor.name.split(","); // Split by comma
        return {
          id: index + 1,
          lastName: nameParts[0].trim(),
          firstName: nameParts[1].trim(),
          phoneNum: formattedPhoneNumber(instructor.phone),
          rating: instructor.instructorRatings?.join(", "),
        };
      });

      setRows(mappedRows); // Update the state variable with the mapped rows
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInstructors(); // Call fetchInstructors when the component mounts
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="instructors-page">
      <StaticSidebar />
      <div className="instructors-content">
        <div className="instructors-top-content">
          <h1 className="h3">Instructors</h1>
          <DataGrid
            sx={{ width: "100%", m: 2 }}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 100,
                },
              },
            }}
            autoHeight
            disableRowSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
}

export default Instructors;
