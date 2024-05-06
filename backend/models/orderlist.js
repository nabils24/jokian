'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderList.hasMany(models.OrderDetail, { foreignKey: 'order_id' });
    }
  }
  OrderList.init({
    customer_name: DataTypes.STRING,
    order_type: {
      type: DataTypes.ENUM('dine_in', 'take_away')
    },
    order_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'OrderList',
  });
  return OrderList;
};