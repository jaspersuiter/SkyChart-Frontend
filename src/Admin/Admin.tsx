import PrimaryButton from "../Buttons/PrimaryButton";
import StaticSidebar from "../Sidebar/Sidebar";
import './Admin.css'

function Admin() {


    return(

        <div className="mainpage">
            <StaticSidebar/>
            <div className="main-content">
                <PrimaryButton text="Add New Aircraft"/>
            </div>
        </div>
    );
}

export default Admin;