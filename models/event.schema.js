const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
  title: String,
  slug: String,
  img: String,
  hosting: String,
  venue: String,
  price: Number,
  start: String,
  end: String,
  info: String,
  address: String,
  email: String,
  phone: String,
  image: String,
  date: Date,
  map: String,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
