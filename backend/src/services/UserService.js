const db = require("../config/db");

class UserService {
  getUserById = async (id) => {
    try {
      const user = "get_user_by_id success";
      return user;
    } catch (error) {
      throw new Error("Error fetching user by ID: " + error.message);
    }
  };

  addAccount = async (customerCode, accountType, additionalData) => {
    try {
      let accountNumber = '';
      const queryGetAccountNumber = `SELECT accountNumber FROM Account WHERE customerCode = ? AND accountType = ? ORDER BY openDate DESC LIMIT 1`;
      const [rows] = await db.query(queryGetAccountNumber, [customerCode, accountType]);
      if (rows.length === 0) {
        const queryAddAccount = `INSERT INTO Account (customerCode, accountType) VALUES (?, ?)`;
        await db.query(queryAddAccount, [customerCode, accountType]);
        const [newAccountNumberRow] = await db.query(`SELECT LAST_INSERT_ID() AS accountNumber`);
        accountNumber = newAccountNumberRow[0].accountNumber;
      } else {
        accountNumber = rows[0].accountNumber;
      }

      if (accountType === 'Savings') {
        const querySavings = `INSERT INTO SavingsAccount (accountNumber, interestRate, accountBalance) VALUES (?, ?, ?)`;
        await db.query(querySavings, [accountNumber, additionalData.interestRate, additionalData.accountBalance]);
      } else if (accountType === 'Checking') {
        const queryChecking = `INSERT INTO CheckingAccount (accountNumber, accountBalance) VALUES (?, ?)`;
        await db.query(queryChecking, [accountNumber, additionalData.accountBalance]);
      } else if (accountType === 'Loan') {
        const queryLoan = `INSERT INTO LoanAccount (accountNumber, dueBalance, interestRate) VALUES (?, ?, ?)`;
        await db.query(queryLoan, [accountNumber, additionalData.dueBalance, additionalData.interestRate]);
      }
      return "Account added successfully";
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updateAccount = async (accountNumber, updatedData) => {
    try {
      const queryGetAccountType = `SELECT accountType FROM Account WHERE accountNumber = ?`;
      const [rows] = (await db.query(queryGetAccountType, [accountNumber]));
      if (rows.length === 0) {
        throw new Error("Account not found");
      };
      const accountType = rows[0].accountType;

      if (accountType === 'Savings') {
        const queryUpdateSavings = `UPDATE SavingsAccount SET interestRate = ?, accountBalance = ? WHERE accountNumber = ?`;
        await db.query(queryUpdateSavings, [updatedData.interestRate, updatedData.accountBalance, accountNumber]);
      } else if (accountType === 'Checking') {
        const queryUpdateChecking = `UPDATE CheckingAccount SET accountBalance = ? WHERE accountNumber = ?`;
        await db.query(queryUpdateChecking, [updatedData.accountBalance, accountNumber]);
      } else if (accountType === 'Loan') {
        const queryUpdateLoan = `UPDATE LoanAccount SET dateOfTaken = ?, dueBalance = ?, interestRate = ? WHERE accountNumber = ?`;
        await db.query(queryUpdateLoan, [updatedData.dateOfTaken, updatedData.dueBalance, updatedData.interestRate, accountNumber]);
      } else {
        throw new Error("Invalid account type");
      }

      return "Account updated successfully";
    } catch (error) {
      throw new Error(error.message);
    }
  };

  deleteAccount = async (accountNumber) => {
    try {
      const queryGetAccountType = `SELECT accountType FROM Account WHERE accountNumber = ?`;
      const [rows] = (await db.query(queryGetAccountType, [accountNumber]));
      if (rows.length === 0) {
        throw new Error("Account not found");
      };
      const accountType = rows[0].accountType;

      if (accountType === 'Savings') {
        const queryDeleteSavings = `DELETE FROM SavingsAccount WHERE accountNumber = ?`;
        await db.query(queryDeleteSavings, [accountNumber]);
      } else if (accountType === 'Checking') {
        const queryDeleteChecking = `DELETE FROM CheckingAccount WHERE accountNumber = ?`;
        await db.query(queryDeleteChecking, [accountNumber]);
      } else if (accountType === 'Loan') {
        const queryDeleteLoan = `DELETE FROM LoanAccount WHERE accountNumber = ?`;
        await db.query(queryDeleteLoan, [accountNumber]);
      } else {
        throw new Error("Invalid account type");
      }

      const queryDeleteAccount = `DELETE FROM Account WHERE accountNumber = ?`;
      await db.query(queryDeleteAccount, [accountNumber]);

      return "Account deleted successfully";
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = new UserService();
