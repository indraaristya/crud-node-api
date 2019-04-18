const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const dbConfig = require('./config/db_config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
});

require('./app/routes')(app, {});
app.listen(port, () => {
    console.log('We are live on ' + port);
});