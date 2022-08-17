const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const postCtrl = require('../controllers/post');

router.post("/:id", auth, postCtrl.getLikesDislikes);

module.exports = router;