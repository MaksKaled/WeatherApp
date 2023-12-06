const responseBlock = document.getElementById('responseBlock');
const input = document.getElementById('input')
const myAPI = '27e4ca54067b08e5e89bbc5d310a86ea'
const getResponsesBtn = document.getElementById('getResponse')
const windCondition = document.getElementById('windCondition');
const humidityCondition = document.getElementById('humidityCondition');
// const temperature = document.getElementById('temperature');
const locationBtn = document.getElementById('locationWeather');
const weatherConditionVector = document.getElementById('weatherConditionVector')


getResponsesBtn.addEventListener('click',()=>{
    let lat,lon;
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=1&appid=${myAPI}`)
    .then(response=>{ if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return response.json();

})
       
    .then(data=>{
        const location = data[0];
        lat = location.lat;
        lon = location.lon;

        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ru&appid=${myAPI}&units=metric`);
    }).catch(error =>{
        console.error(`error in the first fetch: ${error}`)
    })
        .then(response =>response.json())
        .then(data=>{
        console.log(data)
        const temp = Math.floor(data.main.temp);
        const city = data.name;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const weatherCondition = data.weather[0].main;

        switch (weatherCondition) {
            case 'Clouds':
                weatherConditionVector.src = './images/cloudy-min.png'
                break;
            case 'Clear': 
            weatherConditionVector.src = './images/clear-min.png'
break;

            case 'Thunderstorm':
                weatherConditionVector.src = './images/thunderstorm-min.png'
                break;
            case 'Snow': 
            weatherConditionVector.src = './images/snow-min.png'
break;

            case 'Rain':
                weatherConditionVector.src = './images/rain-min.png'
                break;
            case 'Drizzle': 
            weatherConditionVector.src = './images/drizzle-min.png'
                break
            default:
                break;
        }
        temperature.textContent = ` ${city} : ${temp}°C`;
        humidityCondition.textContent = `${humidity}%`;
        windCondition.textContent = `${windSpeed}м/с`;
        
        })
        .catch(error=> console.error(error))
    
})

locationBtn.addEventListener('click',()=>{
    let lat,lon;
    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition((position)=>{
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            console.log(lat, lon)
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ru&appid=${myAPI}&units=metric`)
    .then(response =>response.json())
    .then(data=>{
    console.log(data)
    const temp = Math.floor(data.main.temp);
    const city = data.name;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    temperature.textContent = ` ${city} : ${temp}°C`;
    humidityCondition.textContent = `${humidity}%`;
    windCondition.textContent = `${windSpeed}м/с`;
    const weatherCondition = data.weather[0].main;

        switch (weatherCondition) {
            case 'Clouds':
                weatherConditionVector.src = './images/cloudy-min.png'
                break;
            case 'Clear': 
            weatherConditionVector.src = './images/clear-min.png'
            case 'Thunderstorm':
                weatherConditionVector.src = './images/thunderstorm-min.png'
                break;
            case 'Snow': 
            weatherConditionVector.src = './images/snow-min.png'
            case 'Rain':
                weatherConditionVector.src = './images/rain-min.png'
                break;
            case 'Drizzle': 
            weatherConditionVector.src = './images/drizzle-min.png'
                break
            default:
                break;
        }
})
        })
    }
    

})
