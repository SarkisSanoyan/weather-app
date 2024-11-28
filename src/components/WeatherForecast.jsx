import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherForecast } from "../store/weatherSlice";

const WeatherForecast = ({ lat, lon, unit, showCelsius, showFahrenheit }) => {
    const dispatch = useDispatch();
    const { forecast, status, error } = useSelector((state) => state.weather);

    // Fetch the forecast when the component mounts or when lat/lon changes
    useEffect(() => {
        if (lat && lon) {
            dispatch(fetchWeatherForecast({ lat, lon }));
        }
    }, [lat, lon, dispatch]);

    const convertTemperature = (temp) => {
        return unit === "C" ? temp : ((temp * 9) / 5 + 32).toFixed(1);
    };

    if (status === "loading") {
        return <div>Loading forecast...</div>;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    if (forecast && Array.isArray(forecast.list)) {
        const slicedForecast = forecast.list.slice(0, 5);

        return (
            <div className="weather-forecast-container">
                <h2>Weather Forecast</h2>
                <ul id="ul">
                    {slicedForecast.map((item, index) => (
                        <li key={index}>
                            <div className="weather-forecast-item">
                                <div className="time">
                                    {new Date(item.dt * 1000).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    })}
                                </div>
                                <div className="description">
                                    <p>
                                        {item.weather[0].description[0].toUpperCase() +
                                            item.weather[0].description.slice(1)}
                                    </p>
                                </div>
                                <div className="temperature">
                                    <p>
                                        Temperature: {convertTemperature(item.main.temp)}°{unit}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return null;
};

export default WeatherForecast;
