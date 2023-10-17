// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
const bodyParser = require('body-parser')

/* Middleware*/
const cors = require('cors');
app.use(cors());
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;
const server = app.listen(port, listening);
function listening() {
    console.log(`listening on localhost: ${port}`);
}
app.get('/retrieve', retrieve);

function retrieve(req, res) {
    res.send(projectData);
}

app.post('/post', postEndpoint);

function postEndpoint(req, res) {
    const newEntry = {
        temp: req.body.temp,
        date: req.body.date,
        content: req.body.content
    }
    projectData = newEntry;
    res.send(projectData);
    console.log(projectData);
}