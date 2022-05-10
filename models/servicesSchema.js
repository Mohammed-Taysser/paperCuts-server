const mongoose = require('mongoose');
const { Schema } = mongoose;

const servicesSchema = new Schema({
  title: String,
  info: String,
  img: String,
});

module.exports = mongoose.model('Services', servicesSchema);
