// Database
const db = require('../config/database');
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

let Init = async () => {    
    /* Si on veut tester la connexion */
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    User.hasMany(Post, { as: 'posts' });
    Post.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user'});
    User.hasMany(Comment, { as: 'comments' });
    Comment.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user'});
    Post.hasMany(Comment, { as: 'comments' });
    Comment.belongsTo(Post, { as: 'posts' });
    

    
    await User.sync({ force: true });
    await Post.sync({ force: true });
    await Comment.sync({ force: true });
}

module.exports = Init;