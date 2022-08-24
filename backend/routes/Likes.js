const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const postCtrl = require('../controllers/post');

router.get("/:id", auth, postCtrl.getLikesDislikes);
router.put("/:id", auth, postCtrl.likesDislikes);

module.exports = router;