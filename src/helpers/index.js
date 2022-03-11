const { User } = require('../models');
const jwt = require('jsonwebtoken');
class Helper {
  /**
   * @param {object} payload
   */
  static signToken(payload) {
    const secret = process.env.JWT_SECRET;
    return jwt.sign(payload, secret, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  /**
   * @param {User} user
   * @param {number} statusCode
   * @param {import('express').Response} res
   */
  static createResponseToken(user, statusCode, res) {
    const token = Helper.signToken({ id: user.id });

    return res.status(statusCode).json({
      status: 'success',
      data: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        roleId: user.roleId,
      },
      token,
    });
  }
}

module.exports = Helper;
