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
        console.log('apiData ++++>', data)
        res.send(data);
    } catch (err) {
        console.log("error", err);
    }
    
});


module.exports = app;