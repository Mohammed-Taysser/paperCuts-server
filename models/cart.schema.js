const mongoose = require('mongoose'),
  { Schema } = mongoose,
  cartSchema = new Schema({
    username: {
      type: String,
      required: [ true, 'username not provided' ],
    },
    bookId: mongoose.Types.ObjectId,
    slug: {
      type: String,
      required: [ true, 'username not provided' ],
    },
    quantity: {
      type: Number,
      required: [ true, 'Please specify user quantity' ],
    },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: {
      type: String,
      required: [ true, 'image not provided' ],
    },
  });

module.exports = mongoose.model('Cart', cartSchema);
