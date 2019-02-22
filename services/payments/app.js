const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const routes = require('./routes');

const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'food_payments';      // REPLACE WITH YOUR DB NAME


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(routes);

mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true } )
    .then(() => {
        console.log('Database connection successful');
    })
    .catch(err => {
        console.error('Database connection error', err);
    });

app.listen(3004, function () {
    console.log('listening http://localhost:3005');
});