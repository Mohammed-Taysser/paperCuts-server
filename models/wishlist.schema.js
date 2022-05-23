const mongoose = require("mongoose");
const { Schema } = mongoose;

const wishlistSchema = new Schema({
  bookId: {
    type: mongoose.Types.ObjectId,
    required: [true, "bookId not provided"],
  },
  slug: {
    type: String,
    required: [true, "slug not provided"],
  },
  title: {
    type: String,
    required: [true, "title not provided"],
  },
  image: {
    type: String,
    required: [true, "image not provided"],
  },
  price: { type: Number, required: [true, "price not provide"] },
  stars: { type: Number, required: [true, "stars not provide"] },
  author: {
    username: String,
    name: String,
  },
  username: {
    type: String,
    required: [true, "username not provided"],
  },
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
