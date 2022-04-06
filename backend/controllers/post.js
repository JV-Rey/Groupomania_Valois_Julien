const Post = require('../models/Post');

/**
 * Returns array of all post in the database.
 */
exports.gets = async () => {
    await Post.findAll().then ( (posts) => {
        for (const post of posts) {
        console.log(post.dataValues);
        } 
    }).catch((error) => {
      console.log("error : " + error);
    });
};

