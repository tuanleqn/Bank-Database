const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/all_customer', customerController.getAllCustomers);
router.get(
    '/all_account_information',
    customerController.getAllAccountInformation
);

module.exports = router;
