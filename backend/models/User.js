const DataTypes = require('sequelize');
const db = require('../config/database');
 
const User = db.define('User', {
  email: {
    type: DataTypes.STRING(255), 
    allowNull: false, 
    unique: true
  },
  password: {
    type: DataTypes.STRING(255), 
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull:false
  },
  isAdmin: DataTypes.BOOLEAN,
  allowNull: false,
  defaultValue: false
}, {
  freezeTableName: true
})
 
module.exports = User;