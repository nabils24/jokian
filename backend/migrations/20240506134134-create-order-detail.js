'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DOUBLE
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
    await queryInterface.addConstraint('OrderDetails', {
      fields: ['order_id'], // Kolom dalam tabel OrderLists
      type: 'foreign key',
      name: 'fk_order_id_orderlist', // Nama kunci asing
      references: {
        table: 'OrderLists', // Tabel yang diacu
        field: 'id' // Kolom yang diacu di tabel OrderDetails
      },
      onDelete: 'CASCADE', // Opsi aksi saat penghapusan
      onUpdate: 'CASCADE' // Opsi aksi saat pembaruan
    });
    await queryInterface.addConstraint('OrderDetails', {
      fields: ['product_id'], // Kolom dalam tabel OrderLists
      type: 'foreign key',
      name: 'fk_product_id_product_id', // Nama kunci asing
      references: {
        table: 'Products', // Tabel yang diacu
        field: 'id' // Kolom yang diacu di tabel OrderDetails
      },
      onDelete: 'CASCADE', // Opsi aksi saat penghapusan
      onUpdate: 'CASCADE' // Opsi aksi saat pembaruan
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderDetails');
  }
};