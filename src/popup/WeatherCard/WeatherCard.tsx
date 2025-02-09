import React from 'react';
import { fetchOpenWeatherData, OpenWeatherDataRes } from '../../utils/api';
import CardMedia from '@mui/material/CardMedia';
import { Box, Card, CardContent, Typography, InputBase } from '@mui/material';

const convertToCelsius = (fahrenheit: number) => {
	const celsius = fahrenheit - 273.15;
	return Math.round(celsius);
};

const WeatherCard: React.FC<{ lat: number; lon: number }> = ({ lat, lon }) => {
	const [weatherData, setWeatherData] = React.useState<OpenWeatherDataRes>();
	React.useEffect(() => {
		fetchOpenWeatherData(lat, lon).then((data) => {
			console.log('data', data);
			setWeatherData(data);
		});
	}, []);

	if (!weatherData) {
		return <div>Loading...</div>;
	}

	return (
		<Box mx={'4px'} my={'4px'}>
			<Card>
				<CardMedia>
					<CardContent>
						<Typography variant="h5">{weatherData.name}</Typography>
						<Typography variant="body1">
							{convertToCelsius(weatherData.main.temp)}
						</Typography>
						<Typography variant="body1">
							체감 온도: {convertToCelsius(weatherData.main.feels_like)}
						</Typography>
						<Typography variant="body1">
							날씨: {weatherData.weather[0].main}
						</Typography>
					</CardContent>
				</CardMedia>
			</Card>
		</Box>
	);
};

export default WeatherCard;
