const Post = require('../models/Post');
const Comment = require('../models/Comment')
const User = require('../models/User')

/** 
 * Capture et enregistre l'image
 * analyse le commentaire transformée en chaîne de caractères 
 * et l'enregistre dans la base de données en définissant correctement son imageUrl 
 * Initialise les likes et dislikes de le comment à 0 
 * et les usersLiked et usersDisliked avec des tableaux vides.
 */
exports.createComment = (req, res, next) => {
  if (req.body.text){
    Comment.create({
      userId: req.token.userId,
      text: req.body.text,
      postId:req.body.postId
    //   likes: 0,
    //   dislikes: 0,
    //   usersLiked: [],
    //   usersDisliked: []
    })
    .then(() => res.status(201).json({ message: 'comment enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
  }else{
    res.status(400).json('Un commentaire est necessaire')
  }
};

/** Renvoie le commentaire avec l’id fourni. */
exports.getOneComment = (req, res, next) => {
  Comment.findByPk(req.params.id, 
    {include: [
      {model: User, attributes: ["firstName", "lastName"] },
    ]})
  .then((comment) => {
    res.status(200).json(comment);
  })
  .catch((error) => {
    res.status(404).json({
      error: error
    });
  });
};

/** 
 * Met à jour le comment avec l'id fourni.
 * Si une image est téléchargée, elle est capturée et l’imageUrl de le comment est mise à jour.
 * Si aucun fichier n'est fourni, les informations sur le comment se trouvent directement dans le corps de la requête
 * Si un fichier est fourni, le comment transformée en chaîne de caractères se trouve dans req.body.comment */
exports.modifyComment = (req, res, next) => {
  Comment.findByPk( req.params.id )
  .then(comment => {
    if (comment.userId === req.token.userId || req.token.isAdmin){
      comment.update(
        { text: req.body.text 
      })
      .then(() => res.status(200).json({ message: 'comment modifiée !'}))
      .catch(error => res.status(400).json({ error }));
    };
  })
}

/** Supprime le comment avec l'id fourni. */
exports.deleteComment = (req, res, next) => {
  Comment.findByPk( req.params.id )
  .then(comment => {    
    if (comment.userId === req.token.userId || req.token.isAdmin){
        comment.destroy()
        .then(() => res.status(200).json({ message: 'comment supprimée !'}))
        .catch(error => res.status(400).json({ error }));
      }    
   })
  .catch(error => res.status(500).json({ error }));
};

/** Renvoie un tableau de tous les commentaires de la base de données. */
exports.getAllComments = (req, res, next) => {
  Comment.findAll({
  include: [
    {model: User, attributes: ["firstName", "lastName"] },
  ]})
  .then((comments) => {
    res.status(200).json(comments);
  }
  ).catch((error) => {
    res.status(400).json({
      error: error
    });
  });
};