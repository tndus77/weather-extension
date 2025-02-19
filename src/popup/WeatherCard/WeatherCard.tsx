import React from 'react';
import { fetchOpenWeatherData, OpenWeatherDataRes } from '../../utils/api';
import CardMedia from '@mui/material/CardMedia';
import {
	Box,
	Card,
	CardContent,
	Typography,
	InputBase,
	Button,
} from '@mui/material';

const convertToCelsius = (fahrenheit: number) => {
	const celsius = fahrenheit - 273.15;
	return Math.round(celsius);
};

const WeatherCard: React.FC<{ city: string; onDelete: () => void }> = ({
	city,
	onDelete,
}) => {
	const [weatherData, setWeatherData] = React.useState<OpenWeatherDataRes>();
	React.useEffect(() => {
		fetchOpenWeatherData(city).then((data) => {
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
							🌡️ 현재 온도: {convertToCelsius(weatherData.main.temp)}°C
						</Typography>
						<Typography variant="body1">
							💨 체감 온도: {convertToCelsius(weatherData.main.feels_like)}°C
						</Typography>
						<Typography variant="body1">
							🌞 날씨: {weatherData.weather[0].main}
						</Typography>
						<Button onClick={onDelete}>삭제</Button>
					</CardContent>
				</CardMedia>
			</Card>
		</Box>
	);
};

export default WeatherCard;
