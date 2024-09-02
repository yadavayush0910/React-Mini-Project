import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';

export default function SearchBox({ updateWeatherInfo }) {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
  const API_KEY = "17d14a61d8ba54297d78c60eea09778d"; // Use environment variable for API key

  const getWeatherInfo = async () => {
    try {
      let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      let jsonResponse = await response.json();
      console.log('API Response:', jsonResponse);

      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        feelsLike: jsonResponse.main.feels_like,
        humidity: jsonResponse.main.humidity,
        weather: jsonResponse.weather[0].description,
      };
      setError('');
      return result;
    } catch (error) {
      console.error('Error fetching the weather data:', error);
      setError('No such place in our API');
      return null;
    }
  };

  const handleChange = (evt) => {
    setCity(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log('Form submitted');
    const weatherData = await getWeatherInfo();
    console.log('Weather Data:', weatherData);
    if (weatherData) {
      updateWeatherInfo(weatherData);
      console.log('Weather info updated');
    }
    setCity('');
  };

  return (
    <div className='SearchBox'>
      <form onSubmit={handleSubmit}>
        <TextField
          id='city'
          label='City Name'
          variant='outlined'
          value={city}
          onChange={handleChange}
          required
        />
        <br /><br />
        <Button variant='contained' type='submit'>
          SEARCH
        </Button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
