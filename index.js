require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@petshop.zhmv59r.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
   app.listen(3001)
}).catch((error) => {
    console.log(error)
});

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    }),
);

const Router = require('./src/router/router');
app.use('/customer', Router);
