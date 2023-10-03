import PrimaryButton from "../Buttons/PrimaryButton";
import StaticSidebar from "../Sidebar/Sidebar";
import AddNewAircraft from "./AddNewAircraft";
import InviteNewUser from "./InviteNewUser";
import React from 'react';
import './Admin.css'

function Admin() {

    const [open, setOpenAddAircraft] = React.useState(false);
    const [openInviteUser, setOpenInviteUser] = React.useState(false);

    const handleClickOpenAddAircraft = () => {
        setOpenAddAircraft(true);
    };

    const handleCloseAddAircraft = () => {
        setOpenAddAircraft(false);
    };

    const handleClickOpenInviteUser = () => {
        setOpenInviteUser(true);
    };

    const handleCloseInviteUser = () => {
        setOpenInviteUser(false);
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

                <PrimaryButton text="Invite New User" onClick={handleClickOpenInviteUser} />

                <InviteNewUser
                    open={openInviteUser}
                    onClose={handleCloseInviteUser}
                />
            </div>
        </div>
    );
}

export default Admin;