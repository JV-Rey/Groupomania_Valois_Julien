const DataTypes = require('sequelize');
const db = require('../config/database');
 
const Comment = db.define('comment', {
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