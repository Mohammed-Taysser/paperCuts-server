const validator = require('validator/validator');

module.exports = (requestBody) => {
  const { username, email, password, firstName, lastName } = requestBody;

  let errorAsArray = [];

  if (username && email && password && firstName && lastName) {
    if (!validator.isSlug(username)) {
      errorAsArray.push(`please provide valid username`);
    }

    if (!validator.isEmail(email)) {
      errorAsArray.push(`please provide valid email`);
    }

    if (!validator.isAlphanumeric(firstName, 'en-US', { ignore: ' -' })) {
      errorAsArray.push(`please provide valid first Name`);
    }

    if (!validator.isAlphanumeric(lastName, 'en-US', { ignore: ' -' })) {
      errorAsArray.push(`please provide valid last Name`);
    }

    if (!validator.isStrongPassword(password)) {
      errorAsArray.push(`please provide strong password`);
    }
  } else {
    errorAsArray.push(`make sure username or email and password are provided`);
  }

  return errorAsArray;
};
