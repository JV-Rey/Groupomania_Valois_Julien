const DataTypes = require('sequelize');
const db = require('../config/database');
 
const Comment = db.define('Comment', {
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
  }
}, {
  freezeTableName: true
})
 
module.exports = Comment;