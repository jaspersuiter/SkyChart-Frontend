import PrimaryButton from "../Buttons/PrimaryButton";
import StaticSidebar from "../Sidebar/Sidebar";
import AddNewAircraft from "./AddNewAircraft";
import React from 'react';
import './Admin.css'

function Admin() {

    const [open, setOpenAddAircraft] = React.useState(false);

    const handleClickOpenAddAircraft = () => {
        setOpenAddAircraft(true);
    };

    const handleCloseAddAircraft = () => {
        setOpenAddAircraft(false);
    };


    return(

        <div className="mainpage">
            <StaticSidebar/>
            <div className="main-content">
                <PrimaryButton text="Add New Aircraft" onClick={handleClickOpenAddAircraft}/>

                <AddNewAircraft 
                    open={open}
                    onClose={handleCloseAddAircraft}
                />
            </div>
        </div>
    );
}

export default Admin;