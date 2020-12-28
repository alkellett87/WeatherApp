function displayTemperature(response){
    console.log(response.data);
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
    dateTimeElement.innerHTML=response.data.coord.proto.dt;
    
}

let apiKey="fd8290157d5eeba71b9dabe5d7447fd1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=fd8290157d5eeba71b9dabe5d7447fd1&units=imperial`;

axios.get(apiUrl).then(displayTemperature);
 