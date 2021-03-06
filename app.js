function formatDate(timestamp){
    let date=new Date(timestamp);

    let days=["Sunday", "Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day=days[date.getDay()];
    return `${day} ${formatHours(timestamp)}`;
    }

function formatHours(timestamp) {
    let date=new Date(timestamp);
    let hours=date.getHours();
        if (hours<10) {
            hours=`0${hours}`;
        }
    let minutes=date.getMinutes()
        if (minutes<10) {
            minutes=`0${minutes}`;
        }
    return `${hours}:${minutes}`;
}
function displayTemperature(response){

    celsiusTemperature=response.data.main.temp;
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML= Math.round (celsiusTemperature);
    
    let cityElement=document.querySelector("#city");
    cityElement.innerHTML=response.data.name;
    
    let descriptionElement=document.querySelector("#description");
    descriptionElement.innerHTML=response.data.weather[0].description;
    
    let humidityElement=document.querySelector("#humidity");
    humidityElement.innerHTML=response.data.main.humidity;
    
    let windElement=document.querySelector("#wind");
    windElement.innerHTML= Math.round (response.data.wind.speed);
    
    let dateTimeElement=document.querySelector("#dateTime");
    dateTimeElement.innerHTML=formatDate(response.data.dt*1000);

    let weatherIconElement=document.querySelector("#weatherIcon");
    weatherIconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    weatherIconElement.setAttribute("alt",response.data.weather[0].description);
}

function displayForecast(response){
    let forecastElement=document.querySelector("#forecast");
    forecastElement.innerHTML=null;
    let forecast=null;

    for(let index=0; index<6;index++){
    forecast=response.data.list[index];    
    forecastElement.innerHTML+= `
    <div class="col-2">
        <h3>
        ${formatHours(forecast.dt*1000)}
        </h3>
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
        <div class="weather-forecast-temperature">
            <strong>${Math.round(forecast.main.temp_max)}°
            </strong> 
            ${Math.round(forecast.main.temp_min)}°
        </div>
    </div>
`;
    }
}

function search(city){
let apiKey="fd8290157d5eeba71b9dabe5d7447fd1";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement=document.querySelector("#cityInput");
    search(cityInputElement.value);
}
function displayFahrenheitTemperature(event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature=(celsiusTemperature*9)/5+32;
    temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#temperature");
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    temperatureElement.innerHTML=Math.round(celsiusTemperature);
}

let celsiusTemperature=null;

let form=document.querySelector("#citySearchForm");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink=document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink=document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");