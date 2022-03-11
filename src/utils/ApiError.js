/**
 * @author Enang Favour <owujibfavour@gmail.com>
 * @description custom ApiError handler
 * @param {null}
 * @name Index
 * @returns {Null}
 *
 */

class ApiError extends Error {
  /**
   *
   * @param {string} message a string containing values for your response
   * @param {number} statusCode containing your response status code
   * @param {object} error conraining your response data object
   */
  constructor(message, statusCode, error) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.error = error;

    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
