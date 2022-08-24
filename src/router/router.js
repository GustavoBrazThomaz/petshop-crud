const router = require('express').Router();
const customerController = require('../controllers/customerController');

// Create
router.post('/', customerController.createCustomer);
router.get('/', customerController.getAllCustomer);
router.get('/:id', customerController.getCustomerId);
router.delete('/:id', customerController.deleteCustomer);
router.put('/:id', customerController.putCustomer);

router.post('/pet/:id', customerController.createPet);
router.delete('/pet/:id/:index', customerController.deletePet);

module.exports = router;
