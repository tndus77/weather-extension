chrome.runtime.onMessage.addListener((message) => {
	if (message.type === 'WEATHER_UPDATE') {
		const banner = document.createElement('div');
		banner.innerText = `🌦 날씨 변경: ${message.weather}`;
		banner.style.position = 'fixed';
		banner.style.top = '10px';
		banner.style.left = '50%';
		banner.style.transform = 'translateX(-50%)';
		banner.style.backgroundColor = 'black';
		banner.style.color = 'white';
		banner.style.padding = '10px 20px';
		banner.style.borderRadius = '5px';
		banner.style.zIndex = '9999';
		document.body.appendChild(banner);

		setTimeout(() => banner.remove(), 5000);
	}
});
