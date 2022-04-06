const express = require('express');
const router = express.Router();
const limiter = require('../middleware/rate-limit')

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', limiter.max, userCtrl.login);

module.exports = router;