function formatDate(timestamp){
    let date=new Date(timestamp);
    let hours=date.getHours();
        if (hours<10) {
            hours=`0${hours}`;
        }
    let minutes=date.getMinutes()
        if (minutes<10) {
            minutes=`0${minutes}`;
        };
    let days=["Sunday", "Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day=days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response){

    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML= Math.round (response.data.main.temp);
    
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

function search(city){
let apiKey="fd8290157d5eeba71b9dabe5d7447fd1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fd8290157d5eeba71b9dabe5d7447fd1&units=imperial`;

axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement=document.querySelector("#cityInput");
    search(cityInputElement.value);
}

let form=document.querySelector("#citySearchForm");
form.addEventListener("submit", handleSubmit);
