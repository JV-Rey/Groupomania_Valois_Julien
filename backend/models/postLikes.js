const DataTypes = require('sequelize');
const db = require('../config/database');
 
const Like = db.define('likes', {
  likeType: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  freezeTableName: true
})
 
module.exports = Like;