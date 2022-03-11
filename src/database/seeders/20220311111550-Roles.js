'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'Roles',
      [
        {
          name: 'super-admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'accountant',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'finance',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'crm',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'marketing',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'dev-tech',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
