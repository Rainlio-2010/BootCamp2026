const apiKey = '';
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');

async function getWeather() {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m,weather_code,relative_humidity_2m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max');
    const data = await response.json();
    console.log(data);
    getTemperature(data);
    getDescription(data);
    getHourlyWeather(data);
    getDailyWeather(data);
    getAirHumidity(data);
    getWindSpeed(data);
    return data;
}

async function getCity() {
    const response = await fetch('https://api.openweathermap.org/geo/1.0/direct?q=oakville&limit=5&appid=' + apiKey);
    const data = await response.json();
    console.log(data);
    displayGeocoding(data);
    return data;
}

function displayGeocoding(data) {
    if (data && data.length > 0) {
        const city = data[0];
        document.getElementById('latitude').textContent = "Latitude: " + city.lat;
        document.getElementById('longitude').textContent = "Longitude: " + city.lon;
    }
}

getCity();
getWeather();


function getTemperature(data) {
    const tempValue = data.current.temperature_2m;
    temperature.textContent = tempValue + '°C';
}

function getDescription(data) {
    const descValue = data.current.weather_code;
    description.textContent = weatherCodeToText(descValue);
}

function getHourlyWeather(data) {
    const hourlyData = data.hourly;
    const hourlyTemp = hourlyData.temperature_2m;
    for (let i = 1; i <= 12; i++) {
        document.getElementById('hour-' + i).textContent = "hour" + i + ": " + hourlyTemp[i] + '°C';
    }
}

function getDailyWeather(data) {
    const dailyData = data.daily;
    const dailyTemp = dailyData.temperature_2m_max;
    for (let i = 1; i <= 5; i++) {
        document.getElementById('day-' + i).textContent = "day" + i + ": " + dailyTemp[i] + '°C';
    }
}
function getAirHumidity(data) {
    const airHumidity = data.current.relative_humidity_2m;
    document.getElementById('air-humidity').textContent = airHumidity + '%';
}
function getWindSpeed(data) {
    const windSpeed = data.current.wind_speed_10m;
    document.getElementById('wind-speed').textContent = windSpeed + 'km/h';
}

function weatherCodeToText(code) {
    const weatherCodes = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Light Drizzle',
        53: 'Moderate Drizzle',
        55: 'Dense Drizzle',
        56: 'Light Freezing Drizzle',
        57: 'Dense Freezing Drizzle',
        61: 'Slight Rain',
        63: 'Moderate Rain',
        65: 'Heavy Rain',
        66: 'Light Freezing Rain',
        67: 'Heavy Freezing Rain',
        71: 'Slight Snow fall',
        73: 'Moderate Snow fall',
        75: 'Heavy Snow fall',
        77: 'Snow grains',
        80: 'Slight Rain showers',
        81: 'Moderate Rain showers',
        82: 'Violent Rain showers',
        85: 'Slight Snow showers',
        86: 'Heavy Snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with light hail',
        99: 'Thunderstorm with heavy hail',
    };
    return weatherCodes[code] || 'Unknown';
}
