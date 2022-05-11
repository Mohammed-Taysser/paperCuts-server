const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
require('dotenv').config();

const servicesRoutes = require('./routes/servicesRoutes');
const teamRoutes = require('./routes/teamRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const eventRoutes = require('./routes/eventRoutes');
const authorRoutes = require('./routes/authorRoutes');
const booksRoutes = require('./routes/booksRoutes');
const authRoutes = require('./routes/auth');

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

// Serving static files
app.use('/static', express.static('static'));

// create index page for documentation
app.set('views', './views');
app.set('view engine', 'pug');

app.all('/', (_, response) => {
  response.status(200).render('index');
});

// connect to DB
mongoose
  .connect(MONGO_URL)
  .then(() => {
    // routes
    app.use('/api/services', servicesRoutes);
    app.use('/api/team', teamRoutes);
    app.use('/api/category', categoryRoutes);
    app.use('/api/testimonial', testimonialRoutes);
    app.use('/api/events', eventRoutes);
    app.use('/api/authors', authorRoutes);
    app.use('/api/books', booksRoutes);
    app.use('/api/auth', authRoutes);

    app.listen(PORT, () => {
      console.log(`PaperCuts Server listening on port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
