const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET_KEY, JWT_LIFE_TIME } = process.env;

async function generateToken(author) {
  return jwt.sign(
    {
      _id: author._id,
      email: author.email,
      username: author.username,
      avatar: author.avatar,
    },
    JWT_SECRET_KEY,
    {
      expiresIn: JWT_LIFE_TIME,
    }
  );
}

async function verifyToken(token, fn) {
  return jwt.verify(token, JWT_SECRET_KEY, fn);
}

module.exports = { generateToken, verifyToken };
