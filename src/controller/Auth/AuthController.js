const Response = require('../../helpers/Response');
const { User, Role } = require('../../models');
const ApiError = require('../../utils/ApiError');
const { registerValidation } = require('../../validation/AuthValidation');
const Controller = require('../Controller');

class AuthController extends Controller {
  constructor() {
    super();
  }
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   * @returns {import('express').Response}
   */
  async create(req, res, next) {
    try {
      /**validate request */
      const { error } = registerValidation(req.body);
      if (error) {
        return next(
          new ApiError('Request Validation Error', Response.HTTP_BAD_REQUEST, {
            message: error.message,
          }),
        );
      }

      /**check if user exists */
      const [userExist, roleId] = await Promise.all([
        User.findOne({
          where: { email: req.body.email },
        }),
        Role.fetchRoleIdByName('user'),
      ]);

      if (userExist) {
        return next(
          new ApiError(
            'Email has already been taken',
            Response.HTTP_BAD_REQUEST,
            { user: 'Email already exist' },
          ),
        );
      }

      /**create new user*/
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        roleId,
      });

      return super.sendSuccessResponse(
        res,
        {
          id: user.id,
          email: user.email,
          roleId: user.roleId,
          avartar: user.avartar,
        },
        'User created',
        Response.HTTP_CREATED,
      );
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new AuthController();
