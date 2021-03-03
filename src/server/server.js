"use strict";

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

// Empty array to store project data
let projectData = {};

const port = 3000;

// spin up server
const server = app.listen(port, listening);
function listening() {
    console.log(server);
    console.log(`running on localhost: ${port}`);
}


module.exports = app;