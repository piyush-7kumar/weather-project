
async function getWeatherDetail(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7b4dc2f210bd5f1d2af21e35e0016bdc`;
    
    try {
        
        const response = await fetch(apiUrl);
       
        const data = await response.json();

        return {
             cityName : city,
             country : data.sys?.country,
             description : data.weather?.[0]?.description,
             mainDescription : data.weather?.[0]?.main,
             icon : data.weather?.[0].icon,
             temperature : Math.round(data.main?.temp),
             feelsLike : Math.round(data.main?.feels_like),
             minTemp : Math.round(data.main?.temp_min),
             maxTemp : Math.round(data.main?.temp_max),
             pressure : Math.round(data.main?.pressure),
             humidity : Math.round(data.main?.humidity),
             seaLevel : data.main?.sea_level,
             groundLevel : data.main?.grnd_level,
             visibility : Math.round(data?.visibility),
             wind : data.wind?.speed,
        }

    } catch (error) {
        console.error("Error fetching weather:", error);
        return null; // Return null if API fails
    }
}



// Default cities to display
const defaultCities = ["Paris", "Delhi", "Tokyo"];

// Process each city
defaultCities.forEach(async (city) => {
  const weatherData = await getWeatherDetail(city); 
  defaultCards(weatherData); // Pass API data to the card function 
});


function defaultCards (weatherData){

    // if (!weatherData) return; // Skip if API failed

    const cardContainer = document.getElementById("card-container")
    const cityCard = document.createElement("div")
    cityCard.className = "default-card"

    const iconUrl = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;

    cityCard.innerHTML = `
    <div class="city">${weatherData.cityName}, ${weatherData.country}</div>
    <div class="description">
      <div class="icon"><img src="${iconUrl}" alt="weather icon"></div>
      <div>
        <div class="temp">${weatherData.temperature}°C</div>
        <div class="description">${weatherData.mainDescription}</div>
      </div>
    </div>
    <div class="details">
      <p>High ${weatherData.maxTemp}°C</p>
      <p>Humidity ${weatherData.humidity}%</P>
    </div>
  `;

  cardContainer.appendChild(cityCard);


}
