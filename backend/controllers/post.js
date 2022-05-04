const Post = require('../models/Post');
const fs = require('fs');

/** 
 * Capture et enregistre l'image
 * analyse le post transformée en chaîne de caractères 
 * et l'enregistre dans la base de données en définissant correctement son imageUrl 
 * Initialise les likes et dislikes de le post à 0 
 * et les usersLiked et usersDisliked avec des tableaux vides.
 */
exports.createPost = (req, res, next) => {
  if (req.body.imageUrl || req.body.text){

    const post = new Post({
      postId: req.body.id,
    //  userId: req.body.userId,
      imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: null,
      titre: req.body.titre,
      text: req.body.text
    //   likes: 0,
    //   dislikes: 0,
    //   usersLiked: [],
    //   usersDisliked: []
    });
    post.save()
    .then(() => res.status(201).json({ message: 'post enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
  }
};

/** Renvoie le post avec l’id fourni. */
exports.getOnePost = (req, res, next) => {
  Post.findOne({postId: req.params.id})
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
  Post.findOne({ postId: req.params.id })
  .then(post => {
    if (post.userId === req.token.userId){
      post.update(
        {titre: req.body.titre,
          text: req.body.text,
          imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: null,
        },
        {where: req.params.postId}
      )
      .then(() => res.status(200).json({ message: 'post modifiée !'}))
      .catch(error => res.status(400).json({ error }));
    };
  })
}

/** Supprime le post avec l'id fourni. */
exports.deletePost = (req, res, next) => {
  Post.findOne({ postId: req.params.id })
  .then(post => {
    if (post.userId === req.token.userId){
      console.log(req.params.id)
      if (post.imageUrl){
        const filename = post.imageUrl.split('/images/')[1];
        
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'post supprimée !'}))
          .catch(error => res.status(400).json({ error }));
        });
      }else{
        Post.deleteOne({ id: req.params.id })
        .then(() => res.status(200).json({ message: 'post supprimée !'}))
        .catch(error => res.status(400).json({ error }));
      }
    }
   })
  .catch(error => res.status(500).json({ error }));
};

/** Renvoie un tableau de toutes les posts de la base de données. */
exports.getAllPosts = (req, res, next) => {
  Post.findAll()
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
/*exports.getLikesDislikes = (req, res, next) => {
  post.findOne({ _id: req.params.id })
  .then((post) => {
    const userID = req.token.userId;
    const like = req.body.like;
    switch (like) {
      case 0:
        if (post.usersLiked.includes(userID)){
          post.usersLiked = post.usersLiked.filter(user => user != userID);
        }
        if (post.usersDisliked.includes(userID)){
          post.usersDisliked = post.usersDisliked.filter(user => user != userID);
        }
        break;

      case 1:
        if (!post.usersLiked.includes(userID)){
          post.usersLiked.push(userID);            
        }
        if (post.usersDisliked.includes(userID)){
          post.usersDisliked = post.usersDisliked.filter(user => user != userID);
        }
        break;

      case -1:
        if (!post.usersDisliked.includes(userID)){
          post.usersDisliked.push(userID);
          }
        if (post.usersLiked.includes(userID)){
          post.usersLiked = post.usersLiked.filter(user => user != userID);
        }
        break;

      default:
        break;        
    }
    post.likes = post.usersLiked.length;
    post.dislikes = post.usersDisliked.length;

    post.updateOne({_id: req.params.id }, post)
    .then(() => res.status(200).json({ message: 'post évaluée !' }))
    .catch(error => res.status(400).json({ error }))
  })
  .catch((error) => res.status(400).json({ error }));
};*/
