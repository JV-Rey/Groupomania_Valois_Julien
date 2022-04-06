const DataTypes = require('sequelize');
const db = require('../app');
 
const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING(255), 
    allowNull: false, 
    unique: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true
})
 
module.exports = User;