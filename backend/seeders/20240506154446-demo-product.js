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
        name: 'Ice Cream Vanilla',
        size: 'medium',
        price: 8.00,
        type: 'desert',
        image: 'http://localhost:3001/products/uploads/1738158416244.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ice Cream Vanilla Chocomalt',
        size: 'medium',
        price: 15,
        type: 'desert',
        image: 'http://localhost:3001/products/uploads/1738158369867.png',
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
