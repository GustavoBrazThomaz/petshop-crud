const router = require('express').Router();

const customerController = require('../../controllers/customerController');
const authController = require('../../controllers/authController')
const { checkToken } = require('../../middlewares/middlewares')

router.post('/auth/register', authController.registerUser)
router.post('/auth/login', authController.loginUser)

router.post('/customer', checkToken ,customerController.createCustomer);
router.get('/customer', checkToken ,customerController.getAllCustomer);
router.get('/customer/:id', checkToken ,customerController.getCustomerId);
router.delete('/customer/:id', checkToken ,customerController.deleteCustomer);
router.put('/customer/:id', checkToken ,customerController.putCustomer);

router.post('/customer/pet/:id', checkToken ,customerController.createPet);
router.delete('/customer/pet/:id/:index', checkToken ,customerController.deletePet);

module.exports = router;
