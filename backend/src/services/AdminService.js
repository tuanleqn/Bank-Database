const db = require("../config/db");

class AdminService {
  getInforUser = async (req, res) => {
    try {
      const user = "getInforUser success";
      return user;
    } catch (error) {
      throw new Error("Error fetching user by ID: " + error.message);
    }
  };
}

module.exports = new AdminService();
