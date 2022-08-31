// Database
const db = require('../config/database');
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Like = require('./postLikes')

let Init = async () => {    
    /* Si on veut tester la connexion */
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    
    Post.belongsTo(User, {onDelete: 'CASCADE'});    
    Comment.belongsTo(User, {onDelete: 'CASCADE'}); 
    Comment.belongsTo(Post, {onDelete: 'CASCADE'})
    Post.hasMany(Like);
    Like.belongsTo(Post, {onDelete: 'CASCADE'});
    Like.belongsTo(User, {onDelete: 'CASCADE'});
    Post.hasMany(Comment);
    
    await User.sync({/* force: true */});
    await Post.sync({/* force: true */});
    await Comment.sync({/* force: true */});
    await Like.sync({/* force: true */});
}

module.exports = Init;