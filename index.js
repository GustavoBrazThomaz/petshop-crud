require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@petshop.zhmv59r.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3001);
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const Router = require("./api/src/router/router");
app.use("/api/customer", Router);
