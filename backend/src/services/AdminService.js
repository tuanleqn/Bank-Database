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
}

module.exports = new AdminService();
