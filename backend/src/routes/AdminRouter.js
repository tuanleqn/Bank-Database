const express = require("express");
const router = express.Router();
const AdminController = require('../controllers/AdminController');

router.get('/infor_user', AdminController.getInforUser);

router.get('/service-report', AdminController.getServiceReport);

router.post('/total-serve', AdminController.getTotalServe);

router.get('/customer_by_name', AdminController.getCustomerByName);

router.get('/all_customers', AdminController.getAllCustomers);

module.exports = router