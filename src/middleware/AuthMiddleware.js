/* eslint-disable prefer-destructuring */
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
// const moment = require('moment');

require('dotenv').config();
/** @type {importrequire('sequelize').Model} */
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const Response = require('../helpers/Response');

class AuthMiddleware {
  static async verifyToken(req, res, next) {
    try {
      // 1) Getting token and check of it's there
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      }
      // else if (req.cookies.transtura_driver) {
      //   token = req.cookies.transtura_driver;
      // }

      // check is token is present in header
      if (!token) {
        return next(
          new ApiError(
            'please supply a valid token',
            Response.HTTP_UNAUTHORIZED,
          ),
        );
      }

      // check for token
      //   /** @type {import('sequelize').Model} */
      //   const jwtToken = await JwtAccessTokens.findOne({
      //     where: { token, revoked: false },
      //   });
      //   if (!jwtToken) {
      //     return next(
      //       new ApiError('Unauthorized access', Response.HTTP_UNAUTHORIZED),
      //     );
      //   }

      //   const expiredAt = moment(jwtToken.expireAt);
      //   const currentDate = moment(new Date(global.Date()));

      //   if (currentDate.isAfter(expiredAt)) {
      //     await jwtToken.update({
      //       revoked: true,
      //     });
      //     return next(
      //       new ApiError(
      //         'session is expired please log in again',
      //         Response.HTTP_UNAUTHORIZED,
      //       ),
      //     );
      //   }
      // 2) docode token
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET,
      );

      // 2) Verification token
      const user = await User.findByPk(decoded.id);

      // check if user exists
      if (!user) {
        return next(
          'data invalid as user does not exist',
          Response.HTTP_UNAUTHORIZED,
        );
      }

      req.user = user;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = AuthMiddleware;
