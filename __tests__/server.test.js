const app = require('../src/server/server'); // Link to your server file
const supertest = require('supertest');
const request = supertest(app);