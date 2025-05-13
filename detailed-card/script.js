const apiKey = "7b4dc2f210bd5f1d2af21e35e0016bdc";

async function getWeatherDetail(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    return {
      success: true,
      cityName: data.name || city,
      description: data.weather?.[0]?.description || "N/A",
      icon: data.weather?.[0]?.icon || "01d",
      temperature: Math.round(data.main?.temp) || 0,
      feelsLike: Math.round(data.main?.feels_like) || 0,
      minTemp: Math.round(data.main?.temp_min) || 0,
      maxTemp: Math.round(data.main?.temp_max) || 0,
      pressure: Math.round(data.main?.pressure) || 0,
      humidity: Math.round(data.main?.humidity) || 0,
      visibility: Math.round(data.visibility) || 0,
      wind: data.wind?.speed || 0,
    };
  } catch (error) {
    console.error("Error fetching weather:", error.message);

    return {
      success: false,
      message: error.message || "Something went wrong. Please try again.",
    };
  }
}

function renderErrorCard(message) {
  const weatherCard = document.getElementById("weather-card");
  weatherCard.innerHTML = `
    <div class="error-card">
      <h2>⚠️ Oops!</h2>
      <p>${message}</p>
      <a href="/" class="back-btn">← Try another city</a>
    </div>
  `;
}

// Main IIFE
(async () => {
  const city = new URL(window.location.href).searchParams.get("city");
  const data = await getWeatherDetail(city);
  const weatherCard = document.getElementById("weather-card");

  if (!data.success) {
    renderErrorCard(data.message);
    return;
  }

  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

  weatherCard.innerHTML = `
    <div class="weather-header">
      <div class="weather-info">
        <h2>${data.cityName}</h2>
        <p>${data.description}</p>
      </div>
      <div class="weather-icon">
        <img src="${iconUrl}" alt="weather icon" />
      </div>
    </div>

    <div class="temperature">
      <h1>${data.temperature}°C</h1>
      <p>Feels like: ${data.feelsLike}°C</p>
    </div>

    <div class="weather-details">
      <div><span>Min Temp:</span><span>${data.minTemp}°C</span></div>
      <div><span>Max Temp:</span><span>${data.maxTemp}°C</span></div>
      <div><span>Humidity:</span><span>${data.humidity}%</span></div>
      <div><span>Pressure:</span><span>${data.pressure} hPa</span></div>
      <div><span>Visibility:</span><span>${data.visibility} m</span></div>
      <div><span>Wind:</span><span>${data.wind} m/s</span></div>
    </div>
  `;
})();
