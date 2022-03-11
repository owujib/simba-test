/**
 * @author Enang Favour <owujibfavour@gmail.com>
 * @name Controller
 * @description BaseController handler
 */

class Controller {
  /**
   *
   * @param {import('express').Response} res express server response
   * @param {object} data response payload object
   * @param {string} message reponse message
   * @param {number} statusCode  server  response status code
   * @returns {import('express').Response}
   */
  sendSuccessResponse(res, data, message, statusCode) {
    res.status(statusCode || 200).json({
      status: 'success',
      message,
      data,
    });
  }
}

module.exports = Controller;
