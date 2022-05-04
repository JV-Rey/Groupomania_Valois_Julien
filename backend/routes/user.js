const express = require('express');
const router = express.Router();
const limiter = require('../middleware/rate-limit')

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', limiter.max, userCtrl.login);
router.get('/user', userCtrl.getAllUsers);
router.delete('/user/:id', auth, userCtrl.deleteUser);
router.get('/user/:id', auth, userCtrl.getOneUser);
router.put('/user/:id', auth, userCtrl.modifyUser);

module.exports = router;