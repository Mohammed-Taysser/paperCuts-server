const mongoose = require('mongoose');
const { Schema } = mongoose;

const couponSchema = new Schema({
	end: Date,
	label: String,
	start: Date,
	value: { type: Number, required: true },
});

module.exports = mongoose.model('Coupon', couponSchema);
