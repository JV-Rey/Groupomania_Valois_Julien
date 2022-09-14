const Post = require('../models/Post');
const Comment = require('../models/Comment')
const User = require('../models/User')
const fs = require('fs');
const Like = require('../models/postLikes')

exports.createPost = (req, res, next) => {
  if ((req.file || req.body.text) && req.body.titre){
    const post = new Post({
      userId: req.token.userId,
      imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: null,
      titre: req.body.titre,
      text: req.body.text
    });
    post.save()
    .then(() => res.status(201).json({ message: 'post enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
  }
};

exports.getOnePost = (req, res, next) => {
  Post.findByPk(req.params.id, 
    {include: [
      {model: User, attributes: ["firstName", "lastName"] },
      {model: Comment, include: [{model: User, attributes: ["firstName", "lastName"] }] }
    ]})
  .then((post) => {
    res.status(200).json(post);
  })
  .catch((error) => {
    res.status(404).json({
      error: error
    });
  });
};

exports.modifyPost = (req, res, next) => {
  Post.findByPk( req.params.id )
  .then(post => {
    if (post.userId === req.token.userId || req.token.isAdmin){  
      if (req.file){
        const filename = post.imageUrl.split('/images/')[1]; 
        post.set({
          titre: req.body.titre,
          text: req.body.text,
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });
        fs.unlink(`images/${filename}`, (error) => { if (error) console.log(error); });
      }else{
        post.set({
          titre: req.body.titre,
          text: req.body.text
        }) 
      }
      post.save()
      .then(() => res.status(200).json({ message: 'post modifiée !'}))
      .catch(error => res.status(400).json({ error }));
    };
  })
}

exports.deletePost = (req, res, next) => {
  Post.findByPk( req.params.id )
  .then(post => {    
    if (post.userId === req.token.userId || req.token.isAdmin){
      if (post.imageUrl){
        const filename = post.imageUrl.split('/images/')[1];        
        fs.unlink(`images/${filename}`, () => {
          post.destroy()
          .then(() => res.status(200).json({ message: 'post supprimée !'}))
          .catch(error => res.status(400).json({ error }));
        });
      }else{
        post.destroy()
        .then(() => res.status(200).json({ message: 'post supprimée !'}))
        .catch(error => res.status(400).json({ error }));
      }
    }
  })
  .catch(error => res.status(500).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    include: [
      {model: User, attributes: ["firstName", "lastName"] },
      {model: Comment, include: [{model: User, attributes: ["firstName", "lastName"] }] },
    ]
  })
  .then((posts) => {
    res.status(200).json(posts);
  }
  ).catch((error) => {
    res.status(400).json({
      error: error
    });
  });
};

exports.likesDislikes = (req, res, next) => {
  Like.findOne({where: { postId: req.params.id, userId: req.token.userId }})
  .then((like) => {
    console.log(like);
    console.log(typeof(req.body.likeType));
    switch (req.body.likeType) {
      case 0:
        if (like){
          like.destroy()
          .then(() => res.status(201).json({ message: 'like or dislike canceled !'}))
          .catch(error => res.status(400).json({ error }));
        }else{
          res.status(400).json({message: "Already canceled"})
        }
        break;
        
      case -1:
      case 1:
        if (!like) {
          console.log(req.body.likeType);
          Like.create({
            likeType: req.body.likeType,
            userId: req.token.userId,
            postId: req.params.id
          })
          .then(() => res.status(201).json({ message: 'post liked or disliked !'}))
          .catch(error => res.status(400).json({ error }));
        }else{
          res.status(400).json({message: "Already liked or disliked"})
        }
        break;

      default:
        break;        
    }
  })
  .catch((error) => res.status(400).json({ error }));
};

exports.getLikesDislikes = async (req, res, next) => {
  try {
    const likesCount = await Like.count({where: {likeType: 1 , postId: req.params.postId}})
    const dislikesCount = await Like.count({where: {likeType: -1 , postId: req.params.postId}})
    const alreadyLiked = !!await Like.findOne({where: { likeType: 1, postId: req.params.postId, userId: req.token.userId }})
    const alreadyDisliked = !!await Like.findOne({where: { likeType: -1, postId: req.params.postId, userId: req.token.userId }})
    res.status(200).json({ likesCount, dislikesCount, alreadyLiked, alreadyDisliked })
  } catch (error) {res.status(500).json({ error })
  }
};