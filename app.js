const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
require('dotenv').config();

const categoryRoutes = require('./routes/category.route');
const eventRoutes = require('./routes/event.route');
const authorRoutes = require('./routes/author.route');
const booksRoutes = require('./routes/books.route');
const cartRoutes = require('./routes/cart.route');
const wishlistRoutes = require('./routes/wishlist.route');
const couponRoutes = require('./routes/coupon.route');
const orderRoutes = require('./routes/order.route');
const authRoutes = require('./routes/auth.route');
const utilitiesRoutes = require('./routes/utilities.route');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();

app.set('trust proxy', 1);

// logger
app.enable('verbose errors');
app.use(logger('dev'));

// config
const { PORT = 8080, MONGO_URL } = process.env;

// middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: '30mb' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: '30mb' })); // parse application/json

app.use(hpp()); // Make sure the body is parsed beforehand.

app.use(
  rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 60 minutes)
    message:
      'Too many accounts created from this IP, please try again after an hour',
    handler: (_, response, __, options) =>
      response.status(options.statusCode).json({ error: options.message }),
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);

// Serving static files
app.use('/static', express.static('static'));

// Use /docs as docs route
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// connect to DB
mongoose
  .connect(MONGO_URL)
  .then(() => {
    // routes
    app.use('/api/category', categoryRoutes);
    app.use('/api/events', eventRoutes);
    app.use('/api/authors', authorRoutes);
    app.use('/api/books', booksRoutes);
    app.use('/api/cart', cartRoutes);
    app.use('/api/wishlist', wishlistRoutes);
    app.use('/api/coupon', couponRoutes);
    app.use('/api/order', orderRoutes);
    app.use('/api/auth', authRoutes);
		app.use('/api/utilities', utilitiesRoutes);

    app.listen(PORT, () => {
      console.log(`PaperCuts Server listening on port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
