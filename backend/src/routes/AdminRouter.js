const express = require("express");
const router = express.Router();
const AdminController = require('../controllers/AdminController');

router.get('/infor_user', AdminController.getInforUser);
router.get('/service-report', AdminController.getServiceReport);

module.exports = router