const express = require("express");
const router = express.Router();
const AdminController = require('../controllers/AdminController');

router.get('/infor_user', AdminController.getInforUser);

router.get('/service-report', AdminController.getServiceReport);

router.get('/customer_by_name', AdminController.getCustomerByName);

router.get('/all_customers', AdminController.getAllCustomers);

router.get('/basic_customer_info', AdminController.getBasicCustomerInfo);

router.get('/customer_accounts', AdminController.getCustomerAccounts);

module.exports = router