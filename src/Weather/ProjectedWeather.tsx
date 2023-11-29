import "./Weather.css"
import PrimaryButton from "../Utils/Buttons/PrimaryButton";
import React, { useEffect, useState } from 'react';
import { Dialog } from "@mui/material";
import { on } from "events";

export interface ProjectedWeatherProp {
    open: boolean;
    onClose: () => void;
    day: string;
}

interface projectedDay {
    Date: string;
    Day: string;
    Conditions: string;
    Temperature: string;
    Winds: string;
}

function ProjectedWeather(props: ProjectedWeatherProp) {
    const {open, onClose, day} = props;
    const [projected, setProjected] = useState<projectedDay | null>(null);

    useEffect(() => {
        const getProjection = async () => {
            try {
                const projectedFetch = await fetch(`http://localhost:5201/api/weather/outlook?date=${encodeURIComponent(day)}`, {
                    credentials: "include",
                })
                .then((response) => response.json())
                .then((data) => data);
                setProjected(projectedFetch);
            } catch (error) {
                console.log(error);
            }
        };

        if (day != "") {
            getProjection();
        }        
    }, [day]);

    const handleClose = () => {
        onClose();
    };

    console.log(day);
    console.log(projected);


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