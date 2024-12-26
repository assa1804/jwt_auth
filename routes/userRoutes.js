const userController = require('../controllers/userController');
const middlewareController = require('../middlewares/middlewareController');

const router = require('express').Router();

//get all user
router.get('/',middlewareController.verifyToken,userController.getUsers);

//delete user
router.delete('/:id',middlewareController.verifytokenAndAdinAuth,userController.deleteUser);

module.exports = router;