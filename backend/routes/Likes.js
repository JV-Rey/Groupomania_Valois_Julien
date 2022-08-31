const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const postCtrl = require('../controllers/post');

router.get("/:postId", auth, postCtrl.getLikesDislikes);
router.post("/:id", auth, postCtrl.likesDislikes);

module.exports = router;