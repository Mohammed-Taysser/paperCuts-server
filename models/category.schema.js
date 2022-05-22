const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  title: String,
  slug: String,
  img: String,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
