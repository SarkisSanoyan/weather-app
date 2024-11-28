import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentWeather, fetchWeatherForecast } from './store/weatherSlice';
import CurrentWeather from './components/CurrentWeather';

function App() {
  const dispatch = useDispatch();
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (!city.trim()) {
      setError('Please enter a valid city name.');
      return;
    }

    setError(null);
    setIsLoading(true); // Start loading

    dispatch(fetchCurrentWeather(city))
      .then((action) => {
        if (action.payload && action.payload.weather && action.payload.weather.length > 0) {
          dispatch(fetchWeatherForecast({ lat: action.payload.coord.lat, lon: action.payload.coord.lon }));
        } else {
          setError('Unable to retrieve weather data for this city. Please check the city name and try again.');
        }
      })
      .catch(() => {
        setError('Something went wrong. Please try again later.');
      })
      .finally(() => setIsLoading(false)); // End loading
  };

  return (
    <div id="my_app" style={{ height: '100vh', transition: 'background 2s ease' }}>
      <header>
        <h1>Weather App</h1>
      </header>

      <div className="input-container">
        <input
          type="text"
          value={city}
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch} disabled={isLoading}>
          Search
        </button>
      </div>

      {/* Display error message if there is one */}
      {error && <div className="error-message">{error}</div>}

      {/* Display weather information */}
      <CurrentWeather />

      <footer>
        © 2024 App created by <a href="https://github.com/SarkisSanoyan " target="_blank" rel="noopener noreferrer">Sarkis Sanoyan</a><span>All rights reserved</span>
      </footer>
    </div>
  );
}

export default App;
