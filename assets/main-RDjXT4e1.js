import"./modulepreload-polyfill-B5Qt9EMX.js";const p="7b4dc2f210bd5f1d2af21e35e0016bdc";async function u(e){var n,a,c,r,o,d,s,m;const i=`https://api.openweathermap.org/data/2.5/weather?q=${e}&units=metric&appid=${p}`;try{const t=await(await fetch(i)).json();return{cityName:e,country:(n=t.sys)==null?void 0:n.country,mainDescription:(c=(a=t.weather)==null?void 0:a[0])==null?void 0:c.main,icon:(r=t.weather)==null?void 0:r[0].icon,temperature:Math.round((o=t.main)==null?void 0:o.temp),feelsLike:Math.round((d=t.main)==null?void 0:d.feels_like),maxTemp:Math.round((s=t.main)==null?void 0:s.temp_max),humidity:Math.round((m=t.main)==null?void 0:m.humidity)}}catch(l){return console.error("Error fetching weather:",l),null}}const y=["Paris","Delhi","Tokyo"];y.forEach(async e=>{const i=await u(e);h(i)});function h(e){const i=document.getElementById("card-container"),n=document.createElement("div");n.className="default-card";const a=`https://openweathermap.org/img/wn/${e.icon}@2x.png`;n.innerHTML=`
    <div class="city">${e.cityName}, ${e.country}</div>
    
    <div class="icon"><img src="${a}" alt="weather icon"></div>
     
    <div>
        <div class="temp">${e.temperature}°C</div>
        <div class="description">${e.mainDescription}</div>
    </div>
    
  `,i.appendChild(n)}document.getElementById("searchBtn").addEventListener("click",()=>{const e=document.getElementById("input-field").value.trim();e?window.location.href=`/detailed-card?city=${encodeURIComponent(e)}`:alert("Please enter a city name first!")});document.getElementById("input-field").addEventListener("keypress",e=>{e.key==="Enter"&&document.getElementById("searchBtn").click()});
