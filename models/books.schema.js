const mongoose = require("mongoose");
const { Schema } = mongoose;

const booksSchema = new Schema({
  title: String,
  slug: String,
  image: String,
  info: String,
  extraInfo: String,
  publisher: String,
  publishAr: Date,
  price: Number,
  stars: Number,
  pages: Number,
  edition: Number,
  pdfSize: Number,
  reviews: Number,
  language: [String],
  category: [
    {
      title: String,
      slug: String,
    },
  ],
  author: {
    type: Object,
    avatar: String,
    username: String,
  },
});

module.exports = mongoose.model("Books", booksSchema);
