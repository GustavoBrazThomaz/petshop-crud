const router = require('express').Router();

const customerController = require('../../controllers/customerController');
const authController = require('../../controllers/authController')
const { checkToken } = require('../../middlewares/middlewares')
router.post('/auth/register', authController.registerUser)
router.post('/auth/login', authController.loginUser)


router.post('/', checkToken ,customerController.createCustomer);
router.get('/', checkToken ,customerController.getAllCustomer);
router.get('/:id', checkToken ,customerController.getCustomerId);
router.delete('/:id', checkToken ,customerController.deleteCustomer);
router.put('/:id', checkToken ,customerController.putCustomer);

router.post('/pet/:id', checkToken ,customerController.createPet);
router.delete('/pet/:id/:index', checkToken ,customerController.deletePet);

module.exports = router;
