/**
 * return response with status code and message as json
 * @example
 *  catchError(response, 500, 'Error Occur')
 * @param {*} response Express HTTP Response
 * @param {Number} code rStatus code to send on fail
 * @param {String|Object} message the error message
 * @returns create response with status and json error message
 */
function catchError(response, code = 404, message = 'Error Went Occur') {
  return response.status(code).json({ error: message });
}

module.exports = catchError;
