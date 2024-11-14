const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/all_customer', customerController.getAllCustomers);

module.exports = router;
