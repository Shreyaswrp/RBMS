/*************************************************************
 *
 * Execution       : default node cmd> node server.js
 * Purpose         : Run a nodejs server and connect to a database server
 *
 * @description    : Creates a app using express ,and add two body-parser middlewares 
 *                   using express’s app.use() method. We connect to the database using mongoose.
 *                   We run a nodejs server which listens on port number 3000. 
 *                   
 *
 * @file           : server.js
 * @overview       : Run a nodejs server and connect to a database server
 * @module         : RBMS
 * @version        : 1.0
 * @since          : 16/11/2020
 *
 * **********************************************************/

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/rt');
require('./config/databaseConfig');
require('dotenv/config');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(routes);

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to RBMS application."});
});

// listen for requests
const PORT = process.env.PORT;
app.listen( PORT, () => {
    console.log( "Server is listening on port"+" " +PORT);
});