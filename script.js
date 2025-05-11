
async function getWeatherDetail(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7b4dc2f210bd5f1d2af21e35e0016bdc`;
    
    try {
        
        const response = await fetch(apiUrl);
       
        if(!response.ok) throw new Error ("City Not Found");
       
        const data = await response.json();

        return {
             cityName : city,
             country : data.sys?.country,
             description : data.weather?.[0]?.description,
             mainDescription : data.weather?.[0]?.main,
             icon : data.weather?.[0].icon,
             temperature : data.main?.temp,
             feelsLike : data.main?.feels_like,
             minTemp : data.main?.temp_min,
             maxTemp : data.main?.temp_max,
             pressure : data.main?.pressure,
             humidity : data.main?.humidity,
             seaLevel : data.main?.sea_level,
             groundLevel : data.main?.grnd_level,
             visibility : data?.visibility,
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
    console.log(weatherData)
    if (!weatherData) return; // Skip if API failed

    const cardContainer = document.getElementById("card-container")
    const cityCard = document.createElement("div")
    cityCard.className = "default-card"

    const iconUrl = `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;

    cityCard.innerHTML = `
    <h3 class="city-name">${weatherData.cityName}, ${weatherData.country}</h3>
    <img src="${iconUrl}" class="icon">
    <div class="temp">${weatherData.temperature}°C</div>
    <div class="mainDescription">${weatherData.mainDescription}</div>
    <div class="details">
      Humidity ${weatherData.humidity}%
    </div>
  `;

  cardContainer.appendChild(cityCard);


}
