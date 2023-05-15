const DataTypes = require('sequelize').DataTypes;
const { sequelize } = require('../config/database');

const Item = sequelize.define(
  'inventory',
  {
    item_id: {
      type: DataTypes.STRING,
      defaultValue: sequelize.literal('newid()'),
      primaryKey: true,
    },
    category: DataTypes.STRING,
    location: DataTypes.STRING,
    name: DataTypes.STRING,
    qty: DataTypes.NUMBER,
    uom: DataTypes.STRING,
    last_purchase: DataTypes.DATE,
    use_by: DataTypes.DATE,
    note: DataTypes.STRING,
  },
  {
    tableName: 'inventory_tbl',
    timestamps: false,
  }
);

module.exports = Item;
