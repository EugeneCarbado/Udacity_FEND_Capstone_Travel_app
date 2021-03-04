// All required server elements
const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

// Middleware
app.use(bodyParser.urlencoded({ extended: false}));
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
const weatherBitRoot = 'https://api.weatherbit.io/v2.0/forecast/daily?city=';
// const weatherBitParams = ;

const pixabayApiKey = `?key=${process.env.PIXABAY_API}`;
const pixabayRoot = 'https://pixabay.com/api/';
// const pixabayParams = ;

// spin up server
app.listen(3000, () => console.log('running on localhost 3000'));

// Empty array to store project data
let projectData = {};

// Post route that collects user data and stores it in "projectData" object
app.post('/clientData', (req, res) => {
    const data = req.body;
    projectData = data;
    console.log(projectData);
})

// Get routes for all api's
app.get('/getGeonames', (req, res) => {
    console.log('Get geonamesData')
    const urlPath = geoNamesRoot + projectData.city + geoNamesApiKey + geoNamesParams;
    console.log(urlPath);
    fetch(urlPath)
        .then(res => res.json())
            .then(response => {
                try {
                    console.log('Goenames Data');
                    console.log(response);
                    projectData['long'] = response.geonames[0].lng;
                    projectData['lat'] = response.geonames[0].lat;
                    projectData['name'] = response.geonames[0].name;
                    projectData['country'] = response.geonames[0].country;
                    projectData['code'] = response.geonames[0].countryCode;
                    res.send(true);
                } catch (e) {
                    console.log('Error: ', e)
                }
            })
            .catch(error => {
                res.send(JSON.stringify({error: error}));
            })
})

app.get('/getData', (req, res) => {
    console.log(projectData);
    res.send(projectData);
})


module.exports = app;