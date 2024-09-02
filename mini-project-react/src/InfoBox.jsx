import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './infoBox.css';

export default function InfoBox({ info }) {
  const INIT_URL = 'https://images.unsplash.com/photo-1579003593419-98f949b9398f?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const HOT_URL = 'https://plus.unsplash.com/premium_photo-1689298477277-7e488d5ecc10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90JTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D';
  const COLD_URL = 'https://plus.unsplash.com/premium_photo-1671658221576-8d9a4b04bd8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29sZCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D';
  const RAIN_URL = 'https://plus.unsplash.com/premium_photo-1670002482706-29a3ba4059a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cmFpbiUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D';

  return (
    <div className='InfoBox'>
      <div className='cardContainer'>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={info.humidity > 80 ? RAIN_URL : (info.temp > 15 ? HOT_URL : COLD_URL)}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {info.city}
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }} component='span'>
              <div>Temperature: {info.temp} &deg;C</div>
              <div>Humidity: {info.humidity}%</div>
              <p>Min Temp: {info.tempMin} &deg;C</p>
              <p>Max Temp: {info.tempMax} &deg;C</p>
              <p>The weather is described as {info.weather} and feels like {info.feelsLike} &deg;C.</p>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
