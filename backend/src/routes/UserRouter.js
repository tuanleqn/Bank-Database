const express = require("express");
const router = express.Router();
const UserController = require('../controllers/UserController');



router.get('/profile', UserController.CustomerInfo);
router.post('/account', UserController.addAccount);
router.put('/account/:accountNumber', UserController.updateAccount);
router.delete('/account/:accountNumber', UserController.deleteAccount);


module.exports = router