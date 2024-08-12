'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartItem.belongsTo(models.ShoppingCart, { as: 'ShoppingCart' });
    }
  }
  CartItem.init({    
    productName: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    currency: DataTypes.STRING,
    isInStock: DataTypes.BOOLEAN,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};