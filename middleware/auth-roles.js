const catchError = require('../utilities/catchError');
const statusCode = require('../utilities/statusCode');

const { AUTHORIZATION_ROLE } = process.env;

module.exports = (request, response, next) => {
  const { role } = request.headers;
  if (role && AUTHORIZATION_ROLE.includes(role)) {
    next();
  } else {
    catchError(
      response,
      statusCode.error.unauthorized,
      "You Don't Have Permission"
    );
  }
};
