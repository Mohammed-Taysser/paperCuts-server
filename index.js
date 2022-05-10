const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
require('dotenv').config();

const app = express();

// logger
app.enable('verbose errors');
app.use(logger('dev'));

// config
const { PORT = 8080, MONGO_URL } = process.env;

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: '30mb' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '30mb' })); // parse application/json

// connect to DB
mongoose
  .connect(MONGO_URL)
  .then(() => {

    app.listen(PORT, () => {
      console.log(`PaperCuts Server listening on port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
