/**
 * return response with status code and message as json
 * @param {*} response the response object
 * @param {Number} code response status code
 * @param {String} message the error message
 * @returns create response with status and json error message
 */
function catchError(response, code = 404, message = 'Error Went Occur') {
  return response.status(code).json({ error: message });
}

module.exports = catchError;
