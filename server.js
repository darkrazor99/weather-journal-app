// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 3000;

const server = app.listen(port, callBack);
// Callback to debug
function callBack(){
    console.log(`server is running on localhost:${port}`);
}

// Initialize all route with a callback function
app.get('/all', getData);

// Callback function to complete GET '/all'
function getData(request, response){
    response.send(projectData);
}

// Post Route
app.post('/add', addData);

// Callback function to complete post '/add'
function addData(request, response){
    const newEntity = {
        temperature: request.body.temperature,
        date: request.body.date,
        userResponse: request.body.userResponse
    }
    projectData = newEntity;
}