const time = document.querySelector('.time');
const date = document.querySelector('.date');
const temp = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const icon = document.querySelector('.icon');
const city = document.querySelector('.city');
const description = document.querySelector('.description');
const cities = document.querySelector('.cityName');
const day1 = document.querySelector('.day1');
const day2 = document.querySelector('.day2');
const day3 = document.querySelector('.day3');
const day4 = document.querySelector('.day4');

const temp1 = document.querySelector('.temp1');
const temp2 = document.querySelector('.temp2');
const temp3 = document.querySelector('.temp3');
const temp4 = document.querySelector('.temp4');

const day1Icon = document.querySelector('.day1-icon');
const day2Icon = document.querySelector('.day2-icon');
const day3Icon = document.querySelector('.day3-icon');
const day4Icon = document.querySelector('.day4-icon');

let cityInput = "Salt Lake City";

document.querySelectorAll('.cityName').forEach(item => {
  item.addEventListener('click', (e) => {
    weather.fetchWeather(e.target.innerText);
    document.querySelector('.search-bar').value = '';
  })
})



let weather = {
  apiKey: "92f97e41eef74a309a812137221008",
  fetchWeather: function (city) {
    fetch(
      "https://api.weatherapi.com/v1/forecast.json?key=" +
      this.apiKey +
      "&q=" +
      city +
      "&days=5&aqi=no&alerts=no"
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    city.innerText = data.location.name;
    description.innerText = data.current.condition.text;
    temp.innerText = data.current.temp_c + "°C";
    humidity.innerText = "Humidity: " + data.current.humidity + "%";
    wind.innerText = "Wind speed: " + data.current.wind_kph + " km/h";
    icon.src = "icons/" + data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length)
    day1.innerText = data.forecast.forecastday[2].date;
    const dateNow = data.location.localtime;
    const y = parseInt(dateNow.substr(0, 4));
    const m = parseInt(dateNow.substr(5, 2));
    const d = parseInt(dateNow.substr(8, 2));
    const timeNow = dateNow.substr(11);
    date.innerText = `${dayOfTheWeek(d, m, y)}, ${m}/${d}/${y}`;

    day1.innerText = parseDay(data.forecast.forecastday[1].date);
    day2.innerText = parseDay(data.forecast.forecastday[2].date);
    day3.innerText = parseDay(data.forecast.forecastday[3].date);
    day4.innerText = parseDay(data.forecast.forecastday[4].date);
    temp1.innerText = data.forecast.forecastday[1].day.avgtemp_c + "°C";
    temp2.innerText = data.forecast.forecastday[2].day.avgtemp_c + "°C";
    temp3.innerText = data.forecast.forecastday[3].day.avgtemp_c + "°C";
    temp4.innerText = data.forecast.forecastday[4].day.avgtemp_c + "°C";
    day1Icon.src = "icons/" + data.forecast.forecastday[1].day.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
    day2Icon.src = "icons/" + data.forecast.forecastday[2].day.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
    day3Icon.src = "icons/" + data.forecast.forecastday[3].day.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
    day4Icon.src = "icons/" + data.forecast.forecastday[4].day.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
    time.innerText = timeNow;

    let timeOfDay = "day";
    if (!data.current.is_day) {
      timeOfDay = "night";
    }
    const code = data.current.condition.code;
    setBackground(timeOfDay, code);

  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};
// document.body.style.backgroundImage =
// "url('https://source.unsplash.com/1600x900/?" + data.current.condition.text +"-"+ timeOfDay +"')";
function setBackground(t, c) {
  if (c == 1000) {
    document.body.style.backgroundImage = 'url(images/' + t + '/clear.jpg)'
  }
  else if (
    c == 1003 ||
    c == 1006 ||
    c == 1009 ||
    c == 1030 ||
    c == 1069 ||
    c == 1087 ||
    c == 1135 ||
    c == 1273 ||
    c == 1276 ||
    c == 1279 ||
    c == 1282
  ) {
    document.body.style.backgroundImage = 'url(images/' + t + '/cloudy.jpg)'
  }
  else if (
    c == 1063 ||
    c == 1069 ||
    c == 1072 ||
    c == 1150 ||
    c == 1153 ||
    c == 1180 ||
    c == 1183 ||
    c == 1186 ||
    c == 1189 ||
    c == 1192 ||
    c == 1195 ||
    c == 1204 ||
    c == 1207 ||
    c == 1240 ||
    c == 1243 ||
    c == 1246 ||
    c == 1249 ||
    c == 1252
  ) {
    document.body.style.backgroundImage = 'url(images/' + t + '/rainy.jpg)'
  }
  else {
    document.body.style.backgroundImage = 'url(images/' + t + '/snowy.jpg)'
  }


}

function parseDay(date) {
  const y = parseInt(date.substr(0, 4));
  const m = parseInt(date.substr(5, 2));
  const d = parseInt(date.substr(8, 2));
  return `${dayOfTheWeek(d, m, y).substring(0, 3)}, ${m}/${d}`;
};

function dayOfTheWeek(day, month, year) {
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return weekday[new Date(`${year}/${month}/${day}`).getDay()];
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather(cityInput);

