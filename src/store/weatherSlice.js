// features/weatherSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "your API_KEY"; // Fallback for debugging (if needed)
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

// Fetch current weather
export const fetchCurrentWeather = createAsyncThunk(
  "weather/fetchCurrentWeather",
  async (city, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${WEATHER_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      console.log('Current Weather Response:', response.data); // Log the response
      return response.data;
    } catch (error) {
      console.log('Error fetching current weather:', error); // Log the error
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch weather forecast
export const fetchWeatherForecast = createAsyncThunk(
  "weather/fetchWeatherForecast",
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${FORECAST_URL}?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${API_KEY}&units=metric`
      );
      console.log('Weather Forecast Response:', response.data); // Log the response
      return response.data;
    } catch (error) {
      console.log('Error fetching forecast:', error); // Log the error
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    current: null,   // Will hold the current weather data
    forecast: null,  // Will hold the weather forecast data
    status: "idle",  // Represents the loading state
    error: null      // Holds error messages if any
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.current = action.payload;  // Make sure payload structure is correct
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchWeatherForecast.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeatherForecast.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.forecast = action.payload;  // Make sure payload structure is correct
      })
      .addCase(fetchWeatherForecast.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  }
});


export default weatherSlice.reducer;
