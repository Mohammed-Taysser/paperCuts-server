const bcrypt = require('bcryptjs');
const schema = require('../models/authorSchema');
const statusCode = require('../utilities/statusCode');
const catchError = require('../utilities/catchError');
const loginValidation = require('../validations/login.validate');
const registerValidation = require('../validations/register.validate');
const { generateToken, verifyToken } = require('../utilities/jwt');

// authors
exports.register = async (request, response) => {
  const { username, email } = request.body;

  const errorAsArray = registerValidation(request.body);

  if (errorAsArray.length === 0) {
    try {
      const isExist = await schema.isExist(username, email);

      if (isExist.exist) {
        catchError(response, statusCode.error.conflict, isExist.error).end();
      } else {
        let createdAuthor = new schema(request.body);

        await createdAuthor
          .save()
          .then(async (results) => {
            const token = await generateToken(results);
            request.header('authorization', token);
            response
              .status(statusCode.success.created)
              .json({ author: results, token });
          })
          .catch((error) =>
            catchError(response, statusCode.error.conflict, error.message)
          );
      }
    } catch (error) {
      catchError(response, statusCode.error.serverError, error.message).end();
    }
  } else {
    catchError(response, statusCode.error.badRequest, errorAsArray.join(', '));
  }
};

exports.login = async (request, response) => {
  const { password } = request.body;

  const { errorAsArray, querySearch } = loginValidation(request.body);

  if (errorAsArray.length === 0) {
    await schema
      .findOne(querySearch)
      .then(async (results) => {
        if (!results) {
          catchError(
            response,
            statusCode.error.badRequest,
            `author not exist`
          ).end();
        } else {
          await bcrypt
            .compare(password, results.password)
            .then(async (isMatch) => {
              if (isMatch) {
                const token = await generateToken(results);
                request.header('authorization', token);
                response.status(statusCode.success.ok).json({
                  author: results,
                  token,
                });
              } else {
                catchError(
                  response,
                  statusCode.error.badRequest,
                  'Password Not Correct'
                ).end();
              }
            })
            .catch((error) => {
              catchError(response, statusCode.error.serverError, error.message);
            });
        }
      })
      .catch((error) =>
        catchError(response, statusCode.error.serverError, error.message)
      );
  } else {
    catchError(response, statusCode.error.badRequest, errorAsArray.join(', '));
  }
};

// token
// exports.verify = async (request, response) => {
//   const { token } = request.headers;
//   if (token) {
//     verifyToken(token, (error, author) => {
//       if (error) {
//         response
//           .status(403)
//           .json({ message: `you arn't authorize, token is invalid` });
//       } else {
//         response.status(200).json({
//           author,
//           token,
//         });
//       }
//     });
//   } else {
//     response.status(401).json({ message: `you arn't authorize` });
//   }
// };

// exports.refresh = async (request, response) => {
//   const { token } = request.headers;
//   if (token) {
//     verifyToken(token, (error, author) => {
//       if (error) {
//         response
//           .status(403)
//           .json({ message: `you arn't authorize, token is invalid` });
//       } else {
//         response.status(200).json({
//           author,
//           token,
//         });
//       }
//     });
//   } else {
//     response.status(401).json({ message: `you arn't authorize` });
//   }
// };
