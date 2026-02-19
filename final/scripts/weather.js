const currentTemp = document.querySelector("#current-temp");
const icon = document.querySelector("weather-icon");
const caption = document.querySelector("figcaption");
const url = 'https://api.openweathermap.org/data/2.5/weather?lat={49.883747030894135}&lon={-119.45456583590112}&units=metric&appid={232ddc3d81c2d3f3a43c13abfe699830}';

//49.883747030894135, -119.45456583590112

function display(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;C`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather.icon}.png`;
  caption.textContent = `${data.weather[0].icon}? A perfect day to skate!`;
  icon.setAttribute('loading', 'lazy');
}

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      display(data);
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

apiFetch();

