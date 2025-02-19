import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './popup.css';
import WeatherCard from './WeatherCard';
import { Box, IconButton, InputBase, Paper } from '@mui/material';
import { Add as AddIcon } from '@material-ui/icons';
import { getStoredCities, setStoredCities } from '../utils/storage';

const App: React.FC<{}> = () => {
	const [cities, setCities] = React.useState<string[]>([]);
	const [cityInput, setCityInput] = useState<string>();

	const handleCityButtonClick = () => {
		if (cityInput === '') return;

		const updatedCities = [...cities, cityInput];
		setStoredCities(updatedCities).then(() => {
			setCities(updatedCities);
			setCityInput('');
		});
	};

	const onDelete = (city: string) => {
		const updatedCities = cities.filter((i) => i !== city);
		setStoredCities(updatedCities).then(() => {
			setCities(updatedCities);
		});
	};

	useEffect(() => {
		getStoredCities().then((cities) => {
			setCities(cities);
		});
	}, []);

	return (
		<Box mx={'8px'} my={'16px'}>
			<Paper>
				<Box px={'15px'} py={'5px'}>
					<Box flex={1} display={'flex'} flexDirection={'row'}>
						<InputBase
							value={cityInput}
							placeholder="도시"
							onChange={(event) => setCityInput(event.target.value)}
						/>
						<IconButton onClick={handleCityButtonClick}>
							<AddIcon />
						</IconButton>
					</Box>
				</Box>
			</Paper>
			{cities.map((city) => (
				<WeatherCard
					key={`index-${city}`}
					city={city}
					onDelete={() => onDelete(city)}
				/>
			))}
		</Box>
	);
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);
