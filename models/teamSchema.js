const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamSchema = new Schema({
  name: String,
  avatar: String,
  email: String,
  position: String,
  socialMedia: {
    twitter: String,
    facebook: String,
    telegram: String,
    instagram: String,
  },
});

module.exports = mongoose.model('Team', teamSchema);
