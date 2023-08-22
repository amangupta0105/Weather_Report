const firstScreen = document.querySelector('.yweath');
const secoundScreen = document.querySelector('.sweath');
const firstshow = document.querySelector('.first');
const secoundshow = document.querySelector('.secound');
const thirdshow = document.querySelector('.third');
const head = document.querySelector('.heading');
const loc = document.querySelector('.location');
const name_city = document.querySelector('.city_name');
const searchCity = document.querySelector('#city');
const searchBtn= document.querySelector('#searchWea');
const weather_type = document.querySelector('.type_waether');
const weather_humidity = document.querySelector('.humidity');
const weather_clouds = document.querySelector('.clouds');
const weather_wind = document.querySelector('.windSpeed');
const tempr = document.querySelector('.temp');

secoundshow.classList.add("active");
thirdshow.classList.add("active");
head.addEventListener("click",function () {
    if(firstshow.classList.contains("active")){
        firstshow.classList.remove("active");
        secoundshow.classList.add("active");
        thirdshow.classList.add("active");
    }
    else{
        secoundshow.classList.add("active");
        thirdshow.classList.add("active");
    }
});

function showSecound() {
    if(secoundshow.classList.contains("active")){
        secoundshow.classList.remove("active");
        firstshow.classList.add("active");
        thirdshow.classList.add("active");
    }
    else{
        firstshow.classList.add("active");
        thirdshow.classList.add("active");
    }
}

firstScreen.addEventListener("click",showSecound);

secoundScreen.addEventListener('click',function(){
    if(thirdshow.classList.contains("active")){
        thirdshow.classList.remove("active");
        secoundshow.classList.add("active");
        firstshow.classList.add("active");
    }
    else{
        secoundshow.classList.add("active");
        firstshow.classList.add("active");
    }
});


//Search Screen

searchBtn.addEventListener('click', function () {
    if (searchCity.value == '') {
        alert('Enter Valid City Name...');
    } else {
        city();
    }
});
async function city() {
    let API_key = "02d5a9ca50b83f3acd8d5d974d2bccb9";
    let cityname = searchCity.value;
    const WeatherAns = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_key}`);
    const data = await WeatherAns.json();
    if(data.cod == "404"){
        alert(data.message);
    }
    else{
        showWeather(data);
    }
}
function showWeather(data){
    showSecound();
    name_city.textContent = data.name;
    weather_wind.textContent  =Math.floor(data.wind.speed *3.6 )+ `km/hr`;
    weather_type.textContent = data.weather[0].main;
    weather_humidity.textContent = data.main.humidity + `%`;
    weather_clouds.textContent = data.clouds.all + `%`;
    const kelvinTemperature =(data.main.temp);
    function kelvinToCelsius(kelvin) {
        if (kelvin < 0) {
          throw new Error("Temperature cannot be negative in Kelvin.");
        }
        return kelvin - 273.15;
      }
    tempr.textContent =Math.floor(kelvinToCelsius(kelvinTemperature)) + "°C";
}


// Your Screen
loc.addEventListener("click",function(){
    geoloc();
});
function geoloc() {
    function pos1(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        async function yourWeather() {
            let API_key = "02d5a9ca50b83f3acd8d5d974d2bccb9";
            const WeatherAns = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`);
            const data = await WeatherAns.json();
            if(data.cod == "404"){
                alert(data.message);
            }
            else{
                showWeather(data);
            }
        }
        yourWeather();
    }
    
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(pos1);
    } else {
        console.log("Geolocation is not available.");
    }
}

