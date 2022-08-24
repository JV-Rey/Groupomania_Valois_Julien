const Post = require('../models/Post');
const Comment = require('../models/Comment')
const User = require('../models/User')
const fs = require('fs');
const Like = require('../models/postLikes')

/** 
 * Capture et enregistre l'image
 * analyse le post transformée en chaîne de caractères 
 * et l'enregistre dans la base de données en définissant correctement son imageUrl 
 * Initialise les likes et dislikes de le post à 0 
 * et les usersLiked et usersDisliked avec des tableaux vides.
 */
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

/** Renvoie le post avec l’id fourni. */
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

/** 
 * Met à jour le post avec l'id fourni.
 * Si une image est téléchargée, elle est capturée et l’imageUrl de le post est mise à jour.
 * Si aucun fichier n'est fourni, les informations sur le post se trouvent directement dans le corps de la requête
 * Si un fichier est fourni, le post transformée en chaîne de caractères se trouve dans req.body.post */
exports.modifyPost = (req, res, next) => {
  Post.findByPk( req.params.id )
  .then(post => {
    if (post.userId === req.token.userId || req.token.isAdmin){  
      // if (req.body.imageUrl)
        post.set({
          titre: req.body.titre,
          text: req.body.text,
          imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: post.imageUrl,
        });
        // else{
        //   post.set({
        //     titre: req.body.titre,
        //     text: req.body.text
        //   }) 
        // }
      post.save()
      .then(() => res.status(200).json({ message: 'post modifiée !'}))
      .catch(error => res.status(400).json({ error }));
    };
  })
}

/** Supprime le post avec l'id fourni. */
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

/** Renvoie un tableau de toutes les posts de la base de données. */
exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    include: [
      {model: User, attributes: ["firstName", "lastName"] },
      {model: Comment, include: [{model: User, attributes: ["firstName", "lastName"] }] },
      {model: Like}
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

/**
 * Définit le statut « Like » pour l'userId fourni.
 * Si like = 1, l'utilisateur aime (= like) le post. 
 * Si like = 0, l'utilisateur annule son like ou son dislike.
 * Si like = -1, l'utilisateur n'aime pas (= dislike) le post.
 * L'ID de l'utilisateur doit être ajouté ou retiré du tableau approprié
 * Le nombre total de « Like » et de « Dislike » est mis à jour à chaque nouvelle notation
 */
exports.likesDislikes = (req, res, next) => {
  Like.findOne({where: { postId: req.params.id, userId: req.token.userId }})
  .then((like) => {
    switch (likeType) {
      case 0:
        if (like){
          like.destroy
          .then(() => res.status(201).json({ message: 'like or dislike canceled !'}))
          .catch(error => res.status(400).json({ error }));
        }else{
          res.send({message: "Already canceled"})
        }
        break;
        
      case -1:
      case 1:
        if (!like) {
          Like.create({
            likeType: req.body.likeType,
            userId: req.token.userId,
            postId: req.params.id
          })
          .then(() => res.status(201).json({ message: 'post liked or disliked !'}))
          .catch(error => res.status(400).json({ error }));
        }else{
          res.send({message: "Already liked or disliked"})
        }
        break;

      default:
        break;        
    }
    Like.update({where: { postId: req.params.id, userId: req.token.userId }})
    .then(() => res.status(200).json({ message: 'post évaluée !' }))
    .catch(error => res.status(400).json({ error }))
  })
  .catch((error) => res.status(400).json({ error }));
};

exports.getLikesDislikes = async (req, res, next) => {
  try {
    const likesCount = await Like.count({where: likeType = "1" , postId: Like.postId})
    const dislikesCount = await Like.count({where: dislikeType = "-1" , postId: Like.postId})
    res.status(200).json({ likesCount, dislikesCount })
  } catch (error) {res.status(500).json({ error })
  }
};