const express = require('express');
const router = express.Router();
const calculateBalanceController = require('../controllers/calculateBalanceController');


router.get('/total_balance/:customerId', calculateBalanceController.getTotalBalance);

module.exports = router;
