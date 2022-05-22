const validator = require('validator/validator');

module.exports = (requestBody) => {
  const { username, email, password, firstName, lastName } = requestBody;

  let errorAsObject = {};

  if (username) {
    if (!validator.isSlug(username)) {
      errorAsObject.username = `please provide valid username`;
    }
  } else {
    errorAsObject.username = `username is missing`;
  }

  if (email) {
    if (!validator.isEmail(email)) {
      errorAsObject.email = `please provide valid email`;
    }
  } else {
    errorAsObject.email = `email is missing`;
  }

  if (firstName) {
    if (!validator.isAlphanumeric(firstName, 'en-US', { ignore: ' -' })) {
      errorAsObject.firstName = `please provide valid first Name`;
    }
  } else {
    errorAsObject.firstName = `firstName is missing`;
  }

  if (lastName) {
    if (!validator.isAlphanumeric(lastName, 'en-US', { ignore: ' -' })) {
      errorAsObject.lastName = `please provide valid first Name`;
    }
  } else {
    errorAsObject.lastName = `lastName is missing`;
  }

  if (password) {
    if (!validator.isStrongPassword(password)) {
      errorAsObject.password = `please provide strong password`;
    }
  } else {
    errorAsObject.password = `password is missing`;
  }

  return errorAsObject;
};
