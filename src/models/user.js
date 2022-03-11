'use strict';
const { Model } = require('sequelize');
const bcryptjs = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Role, Transaction, Account }) {
      // define association here
      this.belongsTo(Role, {
        foreignKey: 'roleId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      this.belongsTo(Transaction, {
        foreignKey: 'transactionId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      this.hasMany(Account, {
        foreignKey: 'accountId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        allowNull: true,
        type: DataTypes.STRING,
        defaultValue:
          'https://res.cloudinary.com/owujib/image/upload/v1640215435/Group_2_by14sn.svg',
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'User',
    },
  );

  User.beforeCreate(async (user, options) => {
    /**check if the recors is a new one */
    if (user.isNewRecord || !user.changed('password')) {
      return false;
    }

    /**hash user password */
    const hashedPassword = await bcryptjs.hash(user.password, 10);
    user.password = hashedPassword;
    return user;
  });
  return User;
};
