import "./Weather.css"
import PrimaryButton from "../Utils/Buttons/PrimaryButton";
import { Dialog } from "@mui/material";

export interface ProjectedWeatherProp {
    
}

function ProjectedWeather(props: ProjectedWeatherProp) {
    return (
        <Dialog onClose={()=>{}} open={true}>
            <div className="weather">
                <h1>Predicted Conditions for KLAF on 11-16</h1>
                
                <div className="weather-row">
                    <span className="weather-header">Conditions: </span><span className="weather-data">Partly Cloudy</span>
                </div>
                <div className="weather-row">
                    <span className="weather-header">Wind: </span><span className="weather-data">10mph SSE</span><br></br>
                </div>

                <div className="weather-btn">
                    <PrimaryButton text="OK" onClick={() => {}}/>
                </div>
            </div>
        </Dialog>
    )
}

export default ProjectedWeather;