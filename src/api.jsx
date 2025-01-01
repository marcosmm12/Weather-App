import axios from 'axios';

const API_BASE_URL = "https://api.open-meteo.com/v1/forecast?";

export const get_temperature = async (lat, lon, mode, quantity) => {
    try {
        let response = '';
        if (mode === "HOURLY") {
            response = await axios.get(`${API_BASE_URL}latitude=${lat}&longitude=${lon}&hourly=temperature_2m,apparent_temperature,weather_code&forecast_hours=${quantity}`);
            return response.data;
        }
        if (mode === "DAILY") {
            response = await axios.get(`${API_BASE_URL}latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min&forecast_days=${quantity}`);
            return response.data;
        }
        return response;
    }
    catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

export const get_precipitation = async (lat, lon, mode, quantity) => {
    try {
        let response = '';
        if (mode === "HOURLY") {
            response = await axios.get(`${API_BASE_URL}latitude=${lat}&longitude=${lon}&hourly=cloud_cover,precipitation,snowfall,precipitation_probability,rain,snow_depth,weather_code&forecast_hours=${quantity}`);
            return response.data;
        }
        if (mode === "DAILY") {
            response = await axios.get(`${API_BASE_URL}latitude=${lat}&longitude=${lon}&daily=precipitation_sum,rain_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,precipitation_probability_max,precipitation_probability_mean,weather_code&forecast_days=${quantity}`);
            return response.data;
        }
        return response;
    }
    catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

export const get_wind = async (lat, lon, mode, quantity) => {
    try {
        let response = '';
        if (mode === "HOURLY") {
            response = await axios.get(`${API_BASE_URL}latitude=${lat}&longitude=${lon}&hourly=wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_direction_180m,weather_code&forecast_hours=${quantity}`);
            return response.data;
        }
        if (mode === "DAILY") {
            response = await axios.get(`${API_BASE_URL}latitude=${lat}&longitude=${lon}&daily=weather_code,wind_speed_10m_max,wind_direction_10m_dominant&forecast_days=${quantity}`);
            return response.data;
        }
        return response;
    }
    catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

