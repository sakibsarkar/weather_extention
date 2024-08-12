async function fetchWeather(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${
      city || "Dhaka"
    }&appid=4af0a8ed4d6e6271c0d441d472d939c4&units=metric`
  );
  const data = await res.json();
  return data;
}

async function displayWeather(city) {
  const weatherInfoDiv = document.getElementById("weatherInfo");
  weatherInfoDiv.innerHTML = "Loading...";
  try {
    const data = await fetchWeather(city);
    if (data.cod === 200) {
      weatherInfoDiv.innerHTML = `
          <p><strong>Country:</strong> ${data.sys.country}</p>
          <p><strong>City:</strong> ${data.name}</p>
          <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
          <p><strong>Weather:</strong> ${data.weather[0].description}</p>
          <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `;
    } else {
      weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    }
  } catch (error) {
    weatherInfoDiv.innerHTML = `<p>Failed to fetch weather data. Please try again later.</p>`;
  }
}

function getWeather() {
  const city = document.getElementById("city").value;
  displayWeather(city);
}

document.getElementById("search-btn").addEventListener("click", getWeather);

// Display Dhaka weather on page load
window.onload = () => {
  displayWeather("Dhaka");
};
