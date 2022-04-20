const bcrypt = require('bcrypt');
/*let passwordValidator = require('password-validator');*/
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/** Utilisation de passwordValidator pour
 *  forcer les utilisateurs à avoir un mdp à sécurité importante */
/*let schema = new passwordValidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
*/
/** 
 * Inscription utilisateur
 * Hachage du mot de passe de l'utilisateur
 * ajout de l'utilisateur à la base de données
 */
exports.signup = (req, res, next) => {
  /*if (!schema.validate(req.body.password)) {
    return res.status(400).json({error: "schema mot de passe non valide"})
  }*/
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
 * renvoie l'id de l'utilisateur depuis la base de données et un token web JSON signé
 */
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
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
            userId: user._id,
            token: jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24h' })
          });
        })
      .catch(error => res.status(500).json({ error }));
    })
  .catch(error => res.status(500).json({ error }));
}; 