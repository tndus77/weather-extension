const OPEN_WEAHTER_API_KEY = "e1aeeb160e946cc9bc8e660be59017b9";

export interface OpenWeatherDataRes {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
}

export async function fetchOpenWeatherData(
  cityName: string
): Promise<OpenWeatherDataRes> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${OPEN_WEAHTER_API_KEY}`
  );

  if (!res.ok) {
    throw new Error("도시를 찾지 못했어요!");
  }

  const data = await res.json();
  return data;
}
