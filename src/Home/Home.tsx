import '../App.css';
import './Home.css';
import StaticSidebar from '../Utils/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AllSquawks from './AllSquawks/AllSquawks';

export interface Plane {
    planeId: string;
    nickName: string;
    tailNumber: string;
}

function Home() {
    // Get All Planes
    const [planes, setPlanes] = useState<Plane[]>([]);
    const getPlanes = async () => {
        try {
            const planeFetch = await fetch(`http://localhost:5201/api/plane/get-all`,
            {credentials: 'include'})
                .then((response) => response.json())
                .then((data) => data) as Array<Plane>;
            setPlanes(planeFetch);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPlanes();
    }, []);

    return (
        <div className="home-page">
            <StaticSidebar />
            <div className="home-page-content">
                <p className="home-page-header">All Squawks</p>
                <AllSquawks planes={planes}/>
            </div>
        </div>      
    )}

export default Home;