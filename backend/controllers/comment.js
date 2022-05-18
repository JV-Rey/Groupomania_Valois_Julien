const Comment = require('../models/Comment');
const fs = require('fs');

/** 
 * Capture et enregistre l'image
 * analyse le commentaire transformée en chaîne de caractères 
 * et l'enregistre dans la base de données en définissant correctement son imageUrl 
 * Initialise les likes et dislikes de le comment à 0 
 * et les usersLiked et usersDisliked avec des tableaux vides.
 */
exports.createComment = (req, res, next) => {
  if (req.body.imageUrl || req.body.text){
    const comment = new Comment({
      imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: null,
      text: req.body.text
    //   likes: 0,
    //   dislikes: 0,
    //   usersLiked: [],
    //   usersDisliked: []
    });
    comment.save()
    .then(() => res.status(201).json({ message: 'comment enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
  }
};

/** Renvoie le commentaire avec l’id fourni. */
exports.getOneComment = (req, res, next) => {
  Comment.findOne({_id: req.params.id})
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
  Comment.findOne({ _id: req.params.id })
  .then(comment => {
    if (comment.userId === req.token.userId || req.token.isAdmin){
      comment.update(
        { text: req.body.text,
          imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: null,
        },
        {where: req.params.postId}
      )
      .then(() => res.status(200).json({ message: 'comment modifiée !'}))
      .catch(error => res.status(400).json({ error }));
    };
  })
}

/** Supprime le comment avec l'id fourni. */
exports.deleteComment = (req, res, next) => {
  Comment.findOne({ _id: req.params.id })
  .then(comment => {
    if (comment.userId === req.token.userId || req.token.isAdmin){
      const filename = comment.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        comment.destroy({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'comment supprimée !'}))
        .catch(error => res.status(400).json({ error }));
      });
    }
   })
  .catch(error => res.status(500).json({ error }));
};

/** Renvoie un tableau de tous les commentaires de la base de données. */
exports.getAllComments = (req, res, next) => {
  Comment.findAll()
  .then((comments) => {
    res.status(200).json(comments);
  }
  ).catch((error) => {
    res.status(400).json({
      error: error
    });
  });
};

/**
 * Définit le statut « Like » pour l'userId fourni.
 * Si like = 1, l'utilisateur aime (= like) le comment. 
 * Si like = 0, l'utilisateur annule son like ou son dislike.
 * Si like = -1, l'utilisateur n'aime pas (= dislike) le comment.
 * L'ID de l'utilisateur doit être ajouté ou retiré du tableau approprié
 * Le nombre total de « Like » et de « Dislike » est mis à jour à chaque nouvelle notation
 */
/*exports.getLikesDislikes = (req, res, next) => {
  comment.findOne({ _id: req.params.id })
  .then((comment) => {
    const userID = req.token.userId;
    const like = req.body.like;
    switch (like) {
      case 0:
        if (comment.usersLiked.includes(userID)){
          comment.usersLiked = comment.usersLiked.filter(user => user != userID);
        }
        if (comment.usersDisliked.includes(userID)){
          comment.usersDisliked = comment.usersDisliked.filter(user => user != userID);
        }
        break;

      case 1:
        if (!comment.usersLiked.includes(userID)){
          comment.usersLiked.push(userID);            
        }
        if (comment.usersDisliked.includes(userID)){
          comment.usersDisliked = comment.usersDisliked.filter(user => user != userID);
        }
        break;

      case -1:
        if (!comment.usersDisliked.includes(userID)){
          comment.usersDisliked.push(userID);
          }
        if (comment.usersLiked.includes(userID)){
          comment.usersLiked = comment.usersLiked.filter(user => user != userID);
        }
        break;

      default:
        break;        
    }
    comment.likes = comment.usersLiked.length;
    comment.dislikes = comment.usersDisliked.length;

    comment.updateOne({_id: req.params.id }, comment)
    .then(() => res.status(200).json({ message: 'comment évaluée !' }))
    .catch(error => res.status(400).json({ error }))
  })
  .catch((error) => res.status(400).json({ error }));
};*/
