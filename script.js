const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiId = "643b88c76724a11d2d25da7dde1768ed";

const inputValue = document.getElementById("inputBox");
const searchBtn = document.getElementById("searchButton");

const cityName = document.getElementById("cityName");
const weatherImage = document.getElementById("weatherImg");
const description = document.getElementById("description");

const currentTemp = document.getElementById("currentTemp");
const maxTemp = document.getElementById("maxTemp");
const minTemp = document.getElementById("minTemp");

const pressure = document.getElementById("pressure");
const humidity = document.getElementById("humidity");
const visibility = document.getElementById("visibility");

const sunriseTime = document.getElementById("sunriseTime");
const sunsetTime = document.getElementById("sunsetTime");

const weatherChange = document.getElementById("weatherchange")
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiId}`);
  if (response.status == 404) {
    document.querySelector(".errorBox").style.display = "block";
    document.querySelector(".info").style.display = "none";

  } 
  else {
    let data = await response.json();

    // if(!response.ok){
    //     document.getElementsByClassName("errorBox").style.display = "block";
    // }
    cityName.innerHTML = inputValue.value.toUpperCase();
    description.innerHTML = data.weather.at(0).description.toUpperCase();

    console.log(data.weather.at(0).description);

    currentTemp.innerHTML = data.main.temp + "°C";
    maxTemp.innerHTML = data.main.temp_max + "°C";
    minTemp.innerHTML = data.main.temp_min + "°C";

    pressure.innerHTML = data.main.pressure + "atm";
    humidity.innerHTML = data.main.humidity + "%";
    visibility.innerHTML = data.visibility + "m";

    const time1 = new Date(data.sys.sunrise);
    const time2 = new Date(data.sys.sunset);
    sunriseTime.innerHTML = time1.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    sunsetTime.innerHTML = time2.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    console.log(sunriseTime.innerHTML, sunsetTime.innerHTML);

    if(data.weather.at(0).main == "Haze"){
        weatherChange.src="haze.png"
    }
    else if(data.weather.at(0).main == "Clouds"){
        weatherChange.src="clouds.png"
    }
    else if(data.weather.at(0).description == "drizzle"){
        weatherChange.src="drizzle.png"
    }
    else if (data.weather.at(0).description == "rain"){
        weatherChange.src="rain.png"
    }
    else if(data.weather.at(0).description == "snow"){
        weatherChange.src="snow.png"
    }
    else if(data.weather.at(0).description == "mist"){
        weatherChange.src="mist.png"
    }
    else if(data.weather.at(0).description == "Clear"){
        weatherChange.src="clear.png"
    }
    console.log(data);

  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputValue.value);
});
