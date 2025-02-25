import { getStoredCities } from "../utils/storage";

const OPEN_WEAHTER_API_KEY = "e1aeeb160e946cc9bc8e660be59017b9";
let lastWeatherByCity: Record<string, string | null> = {};

const fetchWeather = async () => {
  try {
    const cities = await getStoredCities();
    if (!cities) return;

    for (const city of cities) {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEAHTER_API_KEY}`
      );

      const data = await res.json();

      if (data.weather) {
        const currentWeather = data.weather[0].main;
        const lastWeather = lastWeatherByCity[city];
        // const lastWeather = 'Clear';

        // 이전 날씨와 비
        if (lastWeather && lastWeather !== currentWeather) {
          chrome.notifications.create({
            type: "basic",
            iconUrl: "icon.png",
            title: "날씨 변경 알림",
            message: `${city}의 날씨가 '${lastWeather}' -> '${currentWeather}'로 변경되었습니다.`,
          });

          // content로 전달
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
              type: "WEATHER_UPDATE",
              city: city,
              weather: currentWeather,
            });
          });
        }

        lastWeatherByCity[city] = currentWeather;
      }
    }
  } catch (e) {
    console.log("e", e);
  }
};

// 일정 주기로 날씨 체크
chrome.alarms.create("weatherCheck", { periodInMinutes: 0.5 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "weatherCheck") {
    fetchWeather();
  }
});

// 초기 실행
// fetchWeather();
