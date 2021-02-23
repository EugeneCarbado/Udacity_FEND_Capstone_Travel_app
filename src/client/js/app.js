// openweather url address
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// const baseCityURL = 'http://api.openweathermap.org/data/2.5/weather?q=';


// New date stored in a variable to be displayed
let d = new Date()
let dateToday =  d.getDate() + '/' + d.getMonth() + 1 + '/' + d.getFullYear();

// Event listener for the click
document.getElementById('generate').addEventListener('click', getWeather);

// Function that fires off when the click has been registered
function getWeather(e) {
    e.preventDefault();
    const zipCode = document.getElementById('zip-input').value;
    const userFeeling = document.getElementById('user-feeling').value;
    getWeatherInfo(baseURL, zipCode, apiKey)
    .then(function (weatherData) {
        const temperature = weatherData.main.temp;
        const city = weatherData.name;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const windSpeed = weatherData.wind.speed;
        const humidity = weatherData.main.humidity;
        const feeling = userFeeling;
        const country = weatherData.sys.country;
        // Weather info posted to the server
        postData('/add', {
            temperature, 
            city, 
            description, 
            icon, 
            windSpeed,
            humidity,
            feeling,
            country
        }).then(() => {updateUI();})
        // updateUI function to be called after the click is fired off and the weather info is gathered
    });
}

// Takes the url + zip + API and calls the API for the data
const getWeatherInfo = async (baseURL, zipCode, apiKey) => {

    const response = await fetch(baseURL + zipCode + apiKey)
    try {
        const newData = await response.json();
        console.log(newData)
        return newData;
    } 
    catch(error) {
        console.log("error", error);
    }
};

// POST function to server
async function postData(url, data) {
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
}

async function updateUI() {
    // GET function that takes the info from the server
    const response = await fetch('/retrieve');
    const lastEntry = await response.json();
    console.log(lastEntry);
    document.querySelector('.city').innerText = "Weather in " + lastEntry.city;
    document.querySelector('.country').innerText = lastEntry.country;
    document.querySelector('.temperature').innerText = Math.floor(lastEntry.temperature) + "°C";
    document.querySelector('.description').innerText = lastEntry.description;
    document.querySelector('.humidity').innerText = "Humidity: " + lastEntry.humidity + "%";
    document.querySelector('.wind').innerText = "Wind speed: " + lastEntry.windSpeed + "km/H";
    document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + lastEntry.icon +"@2x.png";
    document.querySelector('.date').innerText = dateToday;
    document.querySelector('.content').innerText = lastEntry.feeling;
}