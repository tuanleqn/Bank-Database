const { message } = require("antd");
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

  getServiceReport = async () => {
    try {
      const [results] = await db.query(`
        SELECT 
            e.employeeID,
            CONCAT(e.firstName, ' ', e.lastName) AS employeeName,
            e.branchName,
            CASE 
                WHEN b.employeeID IS NOT NULL THEN 'Manager'
                ELSE 'Staff'
            END AS position,
            c.customerCode,
            CONCAT(c.firstName, ' ', c.lastName) AS customerName,
            c.email,
            s.dateOfServing
        FROM 
            ServedDate s
        JOIN 
            Employee e ON s.eID = e.employeeID
        JOIN 
            Customer c ON s.cID = c.customerCode
        LEFT JOIN 
            Branch b ON e.employeeID = b.employeeID 
        ORDER BY 
            s.dateOfServing DESC;
      `);
      return results;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getTotalServe = async (startDate, endDate) => {
    try {
      const [results] = await db.query(`
                CALL SortEmployeesByCustomers('${startDate}', '${endDate}')
            `);
      return results;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getInforUser = async (req, res) => {
    try {
      const user = "getInforUser success";
      return user;
    } catch (error) {
      throw new Error("Error fetching user by ID: " + error.message);
    }
  };

  getCustomerByNameOrId = async (input) => {
    try {
      const [customers] = await db.query(
        `
            SELECT 
                c.customerCode,
                c.lastName,
                c.firstName
            FROM 
                Customer c
            WHERE 
                c.customerCode = ? OR CONCAT(c.lastName, ' ', c.firstName) = ?;
            `,
        [input, input]
      );

      // Định dạng lại kết quả
      const result = customers.map((customer) => ({
        customerCode: customer.customerCode,
        lastName: customer.lastName,
        firstName: customer.firstName,
      }));

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getAllCustomers = async () => {
    try {
      // Chỉ lấy các cột cần thiết từ bảng Customer
      const [customers] = await db.query(
        "SELECT customerCode, lastName, firstName FROM Customer"
      );

      // Chuyển đổi dữ liệu về định dạng mong muốn
      const customersData = customers.map((customer) => ({
        customerCode: customer.customerCode,
        lastName: customer.lastName,
        firstName: customer.firstName,
      }));

      return customersData;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  getBasicCustomerInfo = async (customerCode) => {
    try {
      const [customerInfos] = await db.query(
        `
            SELECT 
                c.customerCode,
                c.firstName,
                c.lastName,
                c.homeAddress,
                c.officeAddress,
                c.email,
                cpn.phoneNumber
            FROM 
                Customer c
            LEFT JOIN
                CustomerPhoneNumber cpn ON c.customerCode = cpn.customerCode
            WHERE 
                c.customerCode = ?;
        `,
        [customerCode]
      );

      if (customerInfos.length === 0) {
        return { message: "No information found for this customer." };
      }

      const result = {
        firstName: customerInfos[0].firstName,
        lastName: customerInfos[0].lastName,
        customerCode: customerInfos[0].customerCode,
        phoneNumber: customerInfos.map((info) => info.phoneNumber),
        email: customerInfos[0].email,
        homeAddress: customerInfos[0].homeAddress,
        officeAddress: customerInfos[0].officeAddress,
      };

      return result;
    } catch (error) {
      throw error;
    }
  };

  getCustomerAccountsByCode = async (customerCode) => {
    try {
      const [customerAccounts] = await db.query(
        `
                SELECT 
                    a.accountNumber,
                    a.accountType,
                    a.openDate,
                    la.dateOfTaken AS loanDateOfTaken,
                    la.dueBalance AS loanDueBalance,
                    la.interestRate AS loanInterestRate,
                    sa.interestRate AS savingInterestRate,
                    sa.accountBalance AS savingAccountBalance,
                    ca.accountBalance AS checkingAccountBalance
                FROM
                    Customer c
                LEFT JOIN 
                    Account a ON c.customerCode = a.customerCode
                LEFT JOIN 
                    LoanAccount la ON a.accountNumber = la.accountNumber
                LEFT JOIN 
                    SavingsAccount sa ON a.accountNumber = sa.accountNumber
                LEFT JOIN 
                    CheckingAccount ca ON a.accountNumber = ca.accountNumber
                WHERE 
                    c.customerCode = ?;
                `,
        [customerCode]
      );

      if (customerAccounts.length === 0) {
        return { message: "No accounts found for this customer." };
      }

      const result = {
        accounts: customerAccounts.map((account) => ({
          accountNumber: account.accountNumber,
          accountType: account.accountType,
          openDate: account.openDate,
          loanDetails: account.loanDateOfTaken
            ? {
                dateOfTaken: account.loanDateOfTaken,
                dueBalance: account.loanDueBalance,
                interestRate: account.loanInterestRate,
              }
            : null,
          savingDetails: account.savingInterestRate
            ? {
                interestRate: account.savingInterestRate,
                accountBalance: account.savingAccountBalance,
              }
            : null,
          checkingDetails: account.checkingAccountBalance
            ? { accountBalance: account.checkingAccountBalance }
            : null,
        })),
      };

      return result;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new AdminService();
