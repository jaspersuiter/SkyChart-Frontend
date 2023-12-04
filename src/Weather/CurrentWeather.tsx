import "./Weather.css"
import React, { useEffect, useState } from 'react';

interface metarResponse {
    Airport: string;
    ObservationTime: string;
    TempDewp: string;
    Clouds: string;
    Winds: string;
    Altimeter: string;
    FlightCategory: string;
}

function CurrentWeather() {
    const [metar, setMetar] = useState<metarResponse | null>(null);

    useEffect(() => {
        const getMetar = async () => {
            try {
                const metarFetch = await fetch(`http://localhost:5201/api/weather/metar`, {
                    credentials: "include",
                })
                    .then((response) => response.json())
                    .then((data) => data);
                setMetar(metarFetch);
            } catch (error) {
                console.log(error);
            }
        };
        getMetar();

    }, []);


    return (
        <div>
            {metar ? (
                <div className={"weather " + metar.FlightCategory}>
                    <p className="weather-title">Current Weather</p>
                    <div className="weather-row">
                        <span className="weather-header">Airport: </span><span className="weather-data">{metar.Airport}</span>
                    </div>
                    <div className="weather-row">
                        <span className="weather-header">Observation Time: </span><span className="weather-data">{metar.ObservationTime}</span><br></br>
                    </div>
                    <div className="weather-row">
                        <span className="weather-header">Clouds: </span><span className="weather-data">{metar.Clouds}</span><br></br>
                    </div>
                    <div className="weather-row">
                        <span className="weather-header">Altimeter: </span><span className="weather-data">{metar.Altimeter}</span><br></br>
                    </div>
                    <div className="weather-row">
                        <span className="weather-header">Winds: </span><span className="weather-data">{metar.Winds}</span><br></br>
                    </div>
                </div>
            ) : (
                <p>loading...</p>
            )}
        </div>
    )
}

export default CurrentWeather;