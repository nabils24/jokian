'use strict';

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
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Espresso',
        size: 'Medium',
        price: 15.00,
        image: 'espresso.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Americano',
        size: 'Large',
        price: 12.99,
        image: 'americano.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Tambahkan data produk lainnya jika diperlukan
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
