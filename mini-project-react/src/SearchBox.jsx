import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({ updateWeatherInfo }) {
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "17d14a61d8ba54297d78c60eea09778d";

    const getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}`);
            if (!response.ok) {
                throw new Error("City not found");
            }
            let jsonResponse = await response.json();
            console.log("API Response:", jsonResponse); // Debugging: log the API response
            
            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                feelsLike: jsonResponse.main.feels_like,
                humidity: jsonResponse.main.humidity,
                weather: jsonResponse.weather[0].description,
            };
            setError(""); // Clear any previous errors
            return result;
        } catch (error) {
            console.error("Error fetching the weather data:", error); // Log the error
            setError("No such place in our API");
            return null; // Return null if there's an error
        }
    };

    const handleChange = (evt) => {
        setCity(evt.target.value);
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        console.log("Form submitted"); // Debugging: check if this is logged
        const weatherData = await getWeatherInfo();
        console.log("Weather Data:", weatherData); // Debugging: check if data is retrieved
        if (weatherData) {
            updateWeatherInfo(weatherData); // Check if this function is being called
            console.log("Weather info updated");
        }
        setCity(""); // Clear the input field
    };

    return (
        <div className='SearchBox'>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="City Name"
                    variant="outlined"
                    value={city}
                    onChange={handleChange}
                    required
                />
                <br /><br />
                <Button variant="contained" type="submit">
                    SEARCH
                </Button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Display the error message */}
        </div>
    );
}
