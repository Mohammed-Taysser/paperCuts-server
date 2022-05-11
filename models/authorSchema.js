const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const authorSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    role: { type: String, default: 'author' },
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

authorSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('Authors', authorSchema);
