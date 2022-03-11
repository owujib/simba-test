'use strict';
const { Model } = require('sequelize');

const ApiError = require('../utils/ApiError');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate({ User }) {
      // define association here
      this.hasOne(User, {
        foreignKey: 'roleId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }

    /**
     * @param {string} roleName exist record in role tables
     * @returns {number}
     * @description method helps get role id by name
     */
    static async fetchRoleIdByName(roleName) {
      const roleId = await this.findOne({ where: { name: roleName } });
      if (!roleId) {
        return new ApiError('record does not exist');
      }
      return roleId.id;
    }
  }
  Role.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Role',
    },
  );
  return Role;
};
