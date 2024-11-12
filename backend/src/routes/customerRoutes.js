const express = require('express');
const router = express.Router();
const customerController = require('../controller/customerController');

router.get('/customer/:id', customerController.getCustomerData);

module.exports = router;
