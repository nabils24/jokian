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
    await queryInterface.bulkInsert('Tables', [
      {
        tables_name: 'Meja_1',
        status_table: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        tables_name: 'Meja_2',
        status_table: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        tables_name: 'Meja_3',
        status_table: 'active',
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
