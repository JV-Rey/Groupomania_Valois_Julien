const DataTypes = require('sequelize');
const db = require('../config/database');
 
const Like = db.define('likes', {
  likeType: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  freezeTableName: true
});

const likeCount = Like.count({
  where: {likeType: "1"}
});

const dislikeCount = Like.count({
  where: {likeType: "-1"}
});
 
module.exports = Like;