const UserService = require("../services/UserService");
const path = require("path");
const fs = require("fs");

class UserController {
  CustomerInfo = async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: 'Chưa xác thực thông tin người dùng' });
      }
      const email = req.session.user.email;
      console.log(email);
      try {
        let result = await UserService.getCustomerByEmail(email);
        res.json(result);
      } catch (err) {
        res.status(500).json({ message: "Lỗi cơ sở dữ liệu" });
      }
    } catch (err) {
      res.status(500).json({ message: "Lỗi server" });
    }


  };

  // Account
  addAccount = async (req, res) => {
    const { customerCode, accountType, additionalData } = req.body;
    try {
      const result = await UserService.addAccount(customerCode, accountType, additionalData);
      return res.status(200).json({ message: result });
    } catch (error) {
      if (error.message === "Account not found") {
        return res.status(404).json({ message: "Account not found" });
      } else {
        return res.status(500).json({ message: "Error adding account: " + error.message });
      }
    }
  };

  updateAccount = async (req, res) => {
    const accountNumber = req.params.accountNumber;
    const updatedData = req.body.updatedData;
    try {
      const result = await UserService.updateAccount(accountNumber, updatedData);
      return res.status(200).json({ message: result });
    } catch (error) {
      if (error.message === "Account not found") {
        return res.status(404).json({ message: "Account not found" });
      } else {
        return res.status(500).json({ message: "Error updating account: " + error.message });
      }
    }
  };

  deleteAccount = async (req, res) => {
    const accountNumber = req.params.accountNumber;
    try {
      const result = await UserService.deleteAccount(accountNumber);
      return res.status(200).json({ message: result });
    } catch (error) {
      if (error.message === "Account not found") {
        return res.status(404).json({ message: "Account not found" });
      } else {
        return res.status(500).json({ message: "Error deleting account: " + error.message });
      }
    }
  };
}

module.exports = new UserController();
