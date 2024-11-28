// components/CurrentWeather.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import WeatherForecast from './WeatherForecast';

const CurrentWeather = () => {
  const { current, status, error } = useSelector((state) => state.weather);
  const [temp, setTemp] = useState('');
  const [unit, setUnit] = useState('C');

  useEffect(() => {
    if (current?.main?.temp) {
      setTemp(current.main.temp.toFixed(1));
    }
  }, [current]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    // console.error(error.message);
    return <p>Error: {error}</p>;
  }

  const showCelsius = () => {
    setTemp(current.main.temp.toFixed(1));
    setUnit('C');
  };

  const showFahrenheit = () => {
    setTemp(((current.main.temp * 9) / 5 + 32).toFixed(1));
    setUnit('F');
  };

  return (
    <div className="container">
      {current && (
        <div id="current_weather">
          <h2 style={{ textAlign: 'center' }}>Current weather in {current.name}</h2>
          <p>
            {current.weather[0].description
              .slice(0, 1)
              .toUpperCase() + current.weather[0].description.slice(1)}
          </p>
          <div className="btn-container" style={{ display: 'flex', gap: '10px' }}>
            <button className="btn" onClick={showCelsius} disabled={unit === 'C'}>
              °C
            </button>
            <button className="btn" onClick={showFahrenheit} disabled={unit === 'F'}>
              °F
            </button>
          </div>
          <p>
            Temperature: {temp}°{unit}
          </p>
          <p>Humidity: {current.main.humidity}%</p>
        </div>
      )}

      <WeatherForecast
        unit={unit}
        showCelsius={showCelsius}
        showFahrenheit={showFahrenheit}
      />
    </div>
  );
};

export default CurrentWeather;
