const UserService = require("../services/UserService");
const path = require("path");
const fs = require("fs");
class UserController {
  UserInfo = async (req, res) => {
    try {
      let result = await UserService.getUserById();
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: "Lỗi server" });
    }
  };
}

module.exports = new UserController();
