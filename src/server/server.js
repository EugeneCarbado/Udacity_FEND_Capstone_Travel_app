
// All required server elements
const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cross origin allowance
app.use(cors());

//  Initializing the main project folder
app.use(express.static('dist'));

// 3 URL'S and there API keys
const geoNamesApiKey = `&username=${process.env.GEONAMES_API}`;
const geoNamesRoot = 'http://api.geonames.org/searchJSON?q=';
const geoNamesParams = "&maxRows=1";

const weatherBitApiKey = `&key=${process.env.WEATHERBIT_API}`;
const weatherBitRoot = 'https://api.weatherbit.io/v2.0/forecast/daily?';
// const weatherBitParams = ;

const pixabayApiKey = `?key=${process.env.PIXABAY_API}`;
const pixabayRoot = 'https://pixabay.com/api/';
const pixabayParams = '&image_type=photo&orientation=horizontal&safesearch=true&per_page=100';

// spin up server
app.listen(3000, () => console.log('running on localhost 3000'));

// Empty array to store project data
let projectData = {};

app.get('/', function (req, res) {
    res.send('dist/index.html');
});

// Post route that collects user data and stores it in "projectData" object
app.post('/clientData', async (req, res) => {
    const data = req.body;
    projectData = data;
    console.log(projectData);

    const geonamesData = await fetch(`${geoNamesRoot}${data.city}${geoNamesApiKey}${geoNamesParams}`, {
        method: 'POST'
    });

    try {
        const data = await geonamesData.json();
        projectData['long'] = data.geonames[0].lng;
        projectData['lat'] = data.geonames[0].lat;
        projectData['name'] = data.geonames[0].name; //toponymName
        projectData['countryName'] = data.geonames[0].countryName;
        projectData['code'] = data.geonames[0].countryCode;
        console.log('apiData ++++>', projectData)
        res.send(projectData);
    } catch (err) {
        console.log("error", err);
    }

});

app.get('/getWeatherbit', async (req, res) => {
    console.log(`Request latitude is ${projectData.lat}`);
    console.log(`Request longitude is ${projectData.long}`);
    const lat = projectData.lat;
    const long = projectData.long;
    const weatherbitURL = `${weatherBitRoot}lat=${lat}&lon=${long}${weatherBitApiKey}`;
    console.log(`Weatherbit URL is ${weatherbitURL}`);
    try {
        const response = await fetch(weatherbitURL);
        
        // Checks for failed data transfer from API, returns null
        if (!response.ok) {
            console.log(`Error connecting to Weatherbit API. Response status ${response.status}`);
            res.send(null);
        }
        const weatherbitData = await response.json();
        projectData['icon'] = weatherbitData[0].weather.icon;
        projectData['description'] = weatherbitData[0].weather.description;
        projectData['temp'] = weatherbitData[0].temp;
        res.send(weatherbitData);
        console.log(weatherbitData);
        // If failed connection to API, return null
    } catch (error) {
        console.log(`Error connecting to server: ${error}`)
        res.send(null)
    }
})

// Endpoint for the Pixabay API
app.get('/getPix', async (req, res) => {
    console.log(`Pixabay request city is ${projectData.name}`);
    const city = projectData.name;
    let pixabayURL = `${pixabayRoot}${pixabayApiKey}&q=${city}${pixabayParams}`;
    console.log(`Pixabay URL is ${pixabayURL}`);
    try {
        let response = await fetch(pixabayURL);
        // Checks for failed data transfer from API, returns null
        if (!response.ok) {
            console.log(`Error connecting to Pixabay API. Response status ${response.status}`);
            res.send(null);
        }
        let pixData = await response.json();
        projectData['image1'] = pixData.hits[0].webformatURL;
        projectData['image2'] = pixData.hits[1].webformatURL;
        projectData['image3'] = pixData.hits[2].webformatURL;
        res.send(pixData);
        console.log(image1, image2, image3);
        image1, image2, image3 = projectData;

        // If no photo was returned for city, get one for the country instead
        if (responseJSON.total == 0) {
            const country = projectData.countryName;
            console.log(`No photo available for ${city}. Finding photo for ${country}.`);
            pixabayURL = `${pixabayRoot}${country}${pixabayApiKey}${pixabayParams}`;
            console.log(`Pixabay country search URL is ${pixabayURL}`);
            response = await fetch(pixabayURL)
            // Checks for failed data transfer from API, returns null
            if (!response.ok) {
                console.log(`Error connecting to Pixabay. Response status ${response.status}`)
                res.send(null)
            }
            responseJSON = await response.json()
        }

        res.send(responseJSON)
        // If failed connection to API, return null
    } catch (error) {
        console.log(`Error connecting to server: ${error}`)
        res.send(null)
    }
})

app.get('/getData', (req, res) => {
    console.log(projectData);
    res.send(projectData);
})


module.exports = app;