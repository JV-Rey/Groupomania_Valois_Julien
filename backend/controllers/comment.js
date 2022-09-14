const Comment = require('../models/Comment')
const User = require('../models/User')

exports.createComment = (req, res, next) => {
  if (req.body.text){
    Comment.create({
      userId: req.token.userId,
      text: req.body.text,
      postId:req.body.postId
    })
    .then(() => res.status(201).json({ message: 'comment enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
  }else{
    res.status(400).json('Un commentaire est necessaire')
  }
};

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