const validator = require('validator/validator');

module.exports = (requestBody) => {
  const {username, email, password} = requestBody
  
  let errorAsArray = [],
    querySearch = {};

  if ((username || email) && password) {
    if (username) {
      querySearch.username = username;
      if (!validator.isSlug(username)) {
        errorAsArray.push(`please provide valid username`);
      }
    } else if (email) {
      querySearch.email = email;

      if (!validator.isEmail(email)) {
        errorAsArray.push(`please provide valid email`);
      }
    }

    if (!validator.isStrongPassword(password)) {
      errorAsArray.push(`please provide strong password`);
    }
  } else {
    errorAsArray.push(`make sure username or email and password are provided`);
  }

  return { errorAsArray, querySearch };
};
