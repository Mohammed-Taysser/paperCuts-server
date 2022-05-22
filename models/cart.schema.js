const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: mongoose.Types.ObjectId,
  slug: {
    type: String,
    required: [true, "username not provided"],
  },
  quantity: {
    type: Number,
    required: [true, "Please specify user quantity"],
  },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  avatar: {
    type: String,
    required: [true, "avatar not provided"],
  },
});

module.exports = mongoose.model("Cart", cartSchema);
