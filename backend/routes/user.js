const userController = require('../controllers/UserController');
const middlewareController = require('../controllers/MiddlewareController');

const router = require('express').Router();

router.get('/', middlewareController.verifyToken, userController.show);
router.delete('/:id', middlewareController.verifyTokenAndAdmin, userController.delete);

module.exports = router;
