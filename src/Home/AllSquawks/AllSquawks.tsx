import { useEffect, useState } from "react";
import { Plane } from "../Home";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export interface AllSquawkProps {
    planes: Array<Plane>
}

function AllSquawks(props: AllSquawkProps) {
    console.log(props.planes);
    // Define Columns of Squawk Grid
    const columns: GridColDef[] = [
        {
            field: 'date_opened',
            headerName: 'Date Opened',
            type: 'string',
            editable: false,
            width: 160,
        },
        {
            field: 'plane_name',
            headerName: 'Plane',
            type: 'string',
            editable: true,
            width: 240,
        },
        {
            field: 'description',
            headerName: 'Description',
            type: 'string',
            editable: true,
            width: 640,
        },
        {
            field: 'type',
            headerName: 'Type',
            type: 'singleSelect',
            editable: true,
            width: 128,
            valueOptions: ["Planned", "Unplanned", "100 Hour", "Annual"]
        }
    ];

    // Get Squawks
    const SquawkLabel = [{label: "Planned", value: 1}, {label: "Unplanned", value: 2}, {label: "100 Hour", value: 3}, {label: "Annual", value: 4}]
    const [rows, setRows] = useState([]);
    const getSquawks = async () => {
        try {
            if (props.planes.length > 0) {
                const squawks = await fetch(`http://localhost:5201/api/squawks/get-all`,
                {credentials: 'include'})
                    .then((response) => response.json())
                    .then((data) => data);
                const mappedRows = squawks.map((squawk: any, index: number) => {
                    const date = new Date(squawk.dateOpened);
                    return {
                        id: index,
                        mxId: squawk.mxId,
                        plane_name: `${props.planes.find(o => o.planeId === squawk.planeId)?.nickName} 
                        - [${props.planes.find(o => o.planeId === squawk.planeId)?.tailNumber}]`,
                        date_opened: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`,
                        description: squawk.description,
                        type: SquawkLabel.find((object) => object.value == squawk.type)
                    };
                });
                setRows(mappedRows);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSquawks();
    }, [props.planes]);

    return(
        <DataGrid
            sx={{width: "90em", m: 2 }}
            rows={rows}
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
        />
    )
}

export default AllSquawks;