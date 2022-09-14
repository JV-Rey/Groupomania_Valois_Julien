const bcrypt = require('bcrypt');
let passwordValidator = require('password-validator');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const User = require('../models/User');

/** Utilisation de passwordValidator pour
 *  forcer les utilisateurs à avoir un mdp à sécurité importante */
let schema = new passwordValidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

exports.signup = (req, res, next) => {
  if (!schema.validate(req.body.password)) {
    return res.status(400).json({error: "schema mot de passe non valide"})
  }
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      imageUrl: `${req.protocol}://${req.get("host")}/images/profile/avatardefault_92824.png`,
    });
    user.save()
    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
    .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};

/** 
 * Connexion utilisateur
 * Vérifie si l'email éxiste dans la base de données
 * Compare le mdp entré avec celui de la base de données
 * renvoie l'id de l'utilisateur depuis la base de données 
 * un token web JSON signé et si l'utilisateur est un adminatreur ou non
 */
exports.login = (req, res, next) => {
  User.findOne({ where: {email: req.body.email }})
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            token: jwt.sign(
            { userId: user.id,
              isAdmin: user.isAdmin },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24h' })
          });
        })
      .catch(error => res.status(500).json({message: `bcrypt ! ${ error }`}));
    })
  .catch(error => res.status(500).json({message: `error find ! ${ error }`}));
}; 

exports.deleteUser = (req, res, next) => {
  User.findByPk( req.params.id )  
    .then(user => {
      if (user.id === req.token.userId || req.token.isAdmin){
        user.destroy({ id: req.params.id })
        .then(() => res.status(200).json({ message: 'Compte supprimé' }))
        .catch(error => res.status(400).json({ error }));
      }
    })
  .catch (error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
  User.findByPk( req.params.id )
    .then((user) => {      
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(404).json({
        error: error
    });
  });
};

exports.modifyUser = (req, res, next) => { 
  User.findByPk( req.params.id )
    .then((user) => {
      if (user.id === req.token.userId){ 
        if (req.file){
          if (user.imageUrl === `${req.protocol}://${req.get('host')}/images/profile/avatardefault_92824.png`){
            user.update({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            })
            .then(() => res.status(204).json({ message: 'Information(s) de votre compte modifiée(s) !'}))
            .catch(error => res.status(400).json({ error }));  
          }else{
            const filename = user.imageUrl.split('/images/')[1]; 
            user.update({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            })
            .then(() => {
              fs.unlink(`images/${filename}`, (error) => { if (error) console.log(error); });
              res.status(204).json({ message: 'Information(s) de votre compte modifiée(s) !'})
            })
            .catch(error => res.status(400).json({ error }));              
          }
        }else{
          user.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName
          }) 
          .then(() => res.status(204).json({ message: 'Information(s) de votre compte modifiée(s) !'}))
          .catch(error => res.status(400).json({ error }));  
        }
      }else{
        res.status(403).json({ message: 'unauthorized request' });
      };    
    })
  .catch(error => res.status(500).json({ message: error.message }));
}

exports.getAllUsers = (req, res, next) => {
  User.findAll()
  .then((users) => {
    res.status(200).json(users);
  }
  ).catch((error) => {
    res.status(400).json({
      error: error
    });
  });
};