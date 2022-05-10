const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorSchema = new Schema(
  {
    title: String,
    username: { type: String, required: true, unique: true },
    role: { type: String, default: 'user' },
    firstName: String,
    lastName: String,
    avatar: {
      type: String,
      default:
        'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/authors/img/avatar-1.png',
    },
    email: String,
    password: String,
    info: String,
    extraInfo: String,
    socialMedia: {
      twitter: String,
      facebook: String,
      telegram: String,
      instagram: String,
    },
    category: [
      {
        title: String,
        slug: String,
      },
    ],
    signature: String,
  },

  {
    timestamps: {
      createdAt: 'joinAt',
      updatedAt: 'updatedAt',
    },
  }
);

module.exports = mongoose.model('Authors', authorSchema);
