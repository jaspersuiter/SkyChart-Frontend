import "./Weather.css"
import PrimaryButton from "../Utils/Buttons/PrimaryButton";
import { Dialog } from "@mui/material";
import { on } from "events";

export interface ProjectedWeatherProp {
    open: boolean;
    onClose: () => void;
    day: string;
}

function ProjectedWeather(props: ProjectedWeatherProp) {
    const {open, onClose, day} = props;

    const handleClose = () => {
        onClose();
    };

    console.log(day);


    return (
        <Dialog onClose={handleClose} open={open}>
            <div className="weather">
                <h1>Predicted Conditions for KLAF on 11-16</h1>
                
                <div className="weather-row">
                    <span className="weather-header">Conditions: </span><span className="weather-data">Partly Cloudy</span>
                </div>
                <div className="weather-row">
                    <span className="weather-header">Wind: </span><span className="weather-data">10mph SSE</span><br></br>
                </div>

                <div className="weather-btn">
                    <PrimaryButton text="OK" onClick={handleClose}/>
                </div>
            </div>
        </Dialog>
    )
}

export default ProjectedWeather;