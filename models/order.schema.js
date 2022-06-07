const mongoose = require('mongoose'),
	{ Schema } = mongoose,
	orderSchema = new Schema({
		address: String,
		country: String,
		date: {
			type: Date,
			default: Date.now(),
		},
		fullName: String,
		phone: String,
		progress: { type: String, default: 'placed' },
		total: Number,
		username: String,
		note: String,
		items: [
			{
				image: String,
				price: Number,
				quantity: Number,
				slug: String,
				title: String,
			},
		],
	});

module.exports = mongoose.model('Order', orderSchema);
