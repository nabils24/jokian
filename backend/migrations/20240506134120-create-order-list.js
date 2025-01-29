'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      table_id: {
        type: Sequelize.INTEGER,
      },
      customer_name: {
        type: Sequelize.STRING
      },
      order_type: {
        type: Sequelize.STRING
      },
      order_date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('OrderLists', {
      fields: ['table_id'], // Kolom dalam tabel OrderLists
      type: 'foreign key',
      name: 'fk_table_id_table_id', // Nama kunci asing
      references: {
        table: 'tables', // Tabel yang diacu
        field: 'id' // Kolom yang diacu di tabel OrderLists
      },
      onDelete: 'CASCADE', // Opsi aksi saat penghapusan
      onUpdate: 'CASCADE' // Opsi aksi saat pembaruan
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderLists');
  }
};