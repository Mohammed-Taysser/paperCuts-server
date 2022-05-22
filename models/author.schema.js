const mongoose = require('mongoose');
const validator = require('validator/validator');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const authorSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'username not provided'],
      trim:true,
      unique: [true, 'username already exists!'],
    },
    role: {
      type: String,
      default: 'author',
      enum: ['author', 'admin'],
      required: [true, 'Please specify user role'],
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: {
      type: String,
      default:
        'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/authors/img/avatar-1.png',
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: '{VALUE} is not a valid email!',
      },
    },
    password: { type: String, required: true },
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

authorSchema.statics.isExist = async function (username, email) {
  const existUsername = await this.findOne({ username });
  const existEmail = await this.findOne({ email });

  if (existUsername && existEmail) {
    return {
      exist: true,
      error: {
        username: `username not available`,
        email: `email not available`,
      },
    };
  }

  if (existUsername) {
    return { exist: true, error: { username: `username not available` } };
  }
  if (existEmail) {
    return { exist: true, error: { email: `email not available` } };
  }

  if (!existUsername && !existEmail) {
    return { exist: false };
  }
};

authorSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('Authors', authorSchema);