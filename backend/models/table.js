'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Table.init({
    tables_name: DataTypes.STRING,
    status_table: {
      type: DataTypes.ENUM('active', 'inactive'), // Definisikan enum
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Table',
     // Nama tabel di database
  });
  return Table;
};