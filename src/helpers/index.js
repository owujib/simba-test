const { User } = require('../models');

class Helper {
  /**
   * @param {object} payload
   */
  static signToken(payload) {}

  /**
   * @param {import('express').Response} res
   * @param {User} user
   * @param {number} statusCode
   */
  static sendResponseToken(res, user, statusCode) {}
}

module.exports = Helper;
