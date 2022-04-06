const DataTypes = require('sequelize');
const db = require('../app');
 
const Post = db.define('Post', {
  id: {
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true
})
 
module.exports = Post;