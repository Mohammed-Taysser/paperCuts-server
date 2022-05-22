const mongoose = require('mongoose');
const { Schema } = mongoose;

const testimonialSchema = new Schema({
  name: String,
  avatar: String,
  rate: Number,
  info: String,
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
