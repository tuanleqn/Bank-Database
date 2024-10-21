const db = require("../config/db");

class UserService {
  getUserById = async ( id) => {
    try {
      const user = "get_user_by_id success";
      return user;
    } catch (error) {
      throw new Error("Error fetching user by ID: " + error.message);
    }
  };
}

module.exports = new UserService();
