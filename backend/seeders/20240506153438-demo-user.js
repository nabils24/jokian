'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const passwordHash = await bcrypt.hash('123321', 10); // Ganti dengan password yang Anda inginkan

    await queryInterface.bulkInsert('Users', [
      {
        name: 'admin',
        email: 'admin@admin.com',
        password: passwordHash,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'user',
        email: 'user@user.com',
        password: passwordHash,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Tambahkan data user lainnya jika diperlukan
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
