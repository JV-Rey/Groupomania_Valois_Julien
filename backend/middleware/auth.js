const jwt = require('jsonwebtoken');
require('dotenv').config();

/** 
 * Sépare le header d'autorisation
 * Vérifie la validité du token, le décode et le place dans req.token
 */
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    req.token = jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  }
  catch {
    res.status(401).json({message: `Invalid token ! ${ error }`});
  }
};