const DataTypes = require('sequelize');
const db = require('../config/database');
 
const Post = db.define('post', {
  titre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING
  },
  imageUrl: {
    type: DataTypes.STRING,
  }
}, {
  freezeTableName: true
})
 
module.exports = Post;