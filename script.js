
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

