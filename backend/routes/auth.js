const authController = require('../controllers/AuthController');
const middlewareController = require('../controllers/MiddlewareController');

const router = require('express').Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', middlewareController.verifyToken, authController.logout);

module.exports = router;
