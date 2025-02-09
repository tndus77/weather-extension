import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './popup.css';
import WeatherCard from './WeatherCard';
import { Box, IconButton, InputBase, Paper } from '@mui/material';
import { Add as AddIcon } from '@material-ui/icons';

const App: React.FC<{}> = () => {
	const [cities, setCities] = React.useState<{ lat: number; lon: number }[]>([
		{ lat: 37.566, lon: 126.9784 },
		{ lat: 33.431441, lon: 126.874237 },
		{ lat: 40.711967, lon: -74.006076 },
	]);
	const [cityInput, setCityInput] = useState<{ lat: number; lon: number }>();

	const handleCityButtonClick = () => {
		if (cityInput.lat === 0 && cityInput.lon === 0) return;

		setCities([...cities, cityInput]);
		setCityInput({ lat: 0, lon: 0 });
	};
	return (
		<Box mx={'8px'} my={'16px'}>
			<Paper>
				<Box px={'15px'} py={'5px'}>
					<Box flex={1} display={'flex'} flexDirection={'row'}>
						<InputBase
							placeholder="위도"
							onChange={(event) =>
								setCityInput((prev) => ({
									...prev,
									lat: Number(event.target.value),
								}))
							}
						/>
						<InputBase
							placeholder="경도"
							onChange={(event) =>
								setCityInput((prev) => ({
									...prev,
									lon: Number(event.target.value),
								}))
							}
						/>
						<IconButton onClick={handleCityButtonClick}>
							<AddIcon />
						</IconButton>
					</Box>
				</Box>
			</Paper>
			{cities.map((city) => (
				<WeatherCard key={`index-${city}`} lat={city.lat} lon={city.lon} />
			))}
		</Box>
	);
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);
