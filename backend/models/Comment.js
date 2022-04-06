const DataTypes = require('sequelize');
const db = require('../app');
 
const Comment = db.define('Comment', {
  id: {
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true
})
 
module.exports = Comment;