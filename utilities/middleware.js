const statusCode = require('./statusCode');

const { AUTHORIZATION_ROLE } = process.env;
module.exports.authorization = (request, response, next) => {
  if (request.body.role && AUTHORIZATION_ROLE.includes(request.body.role)) {
    next();
  } else {
    response
      .status(statusCode.error.unauthorized)
      .json({ message: "You Don'T Have Permission" });
  }
};
