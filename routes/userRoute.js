const express = require('express');
const authenticate = require('../middlewares/authenticate');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/me', authenticate, userController.getme);
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
