const weatherCode = {
0:"Clear Sky",
1:"Mainly Clear",
2:"Partly Cloudy",
3:"Cloudy",
45:"Fog",
48:"Fog",
51:"Light Drizzle",
53:"Drizzle",
55:"Heavy Drizzle",
61:"Light Rain",
63:"Rain",
65:"Heavy Rain",
71:"Snow",
80:"Rain Showers",
95:"Thunderstorm"
};

async function searchCity(){

let city=document.getElementById("city").value;

if(city==""){
alert("Enter City Name");
return;
}

const geoURL=`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;

try{

let geoResponse=await fetch(geoURL);

let geoData=await geoResponse.json();

if(!geoData.results){

alert("City Not Found");

return;

}

let lat=geoData.results[0].latitude;

let lon=geoData.results[0].longitude;

let cityName=geoData.results[0].name;

const weatherURL=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

let weatherResponse=await fetch(weatherURL);

let weatherData=await weatherResponse.json();

document.getElementById("cityName").innerHTML=cityName;

document.getElementById("temp").innerHTML=weatherData.current.temperature_2m+" °C";

document.getElementById("humidity").innerHTML=weatherData.current.relative_humidity_2m;

document.getElementById("wind").innerHTML=weatherData.current.wind_speed_10m;

document.getElementById("condition").innerHTML=
weatherCode[weatherData.current.weather_code] || "Unknown";

document.getElementById("time").innerHTML=
new Date().toLocaleString();

}

catch{

alert("Unable to fetch weather data.");

}

}