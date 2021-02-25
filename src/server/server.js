"use strict";

// Empty array to store project data
let projectData = {};

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

// const weatherBitApiKey = ;
// const weatherBitRoot = ;
// const weatherBitParams = ;

// const pixabayApiKey = ;
// const pixabayRoot = ;
// const pixabayParams = ;


// Get route
app.get('/retrieve', getData);

function getData (request, response) {
    response.send(projectData);
}

// POST route
app.post('/add', postData)

function postData(request, response)  {
    projectData = request.body;
    response.send({ message: "Post recieved"})
    console.log(request);
}

module.exports = app;