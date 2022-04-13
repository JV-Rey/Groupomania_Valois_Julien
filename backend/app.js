const express = require('express');

const path = require('path');
const InitDB = require('./models/initdb');
/** Utilisation d'helmet pour aider à sécuriser les en-têtes HTTP */
const helmet = require("helmet");
/** Importation des routes*/
const postRoutes = require('./routes/Posts');
const commentRoutes = require('./routes/Comments')
const userRoutes = require('./routes/user');

const app = express();



/** CORS */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));


InitDB().then(() => {
  app.use(express.json());
  app.use(helmet());
  app.use('/api/post', postRoutes);
  app.use('/api/comment', commentRoutes)
  app.use('/api/auth', userRoutes);
})

module.exports = app;