const db = require('../config/db.js');

const getAllCustomersAndAccounts = async () => {
    try {
        // Lấy dữ liệu khách hàng
        const [customers] = await db.query('SELECT * FROM customer');

        // Lấy dữ liệu tài khoản cho các khách hàng
        const customerIds = customers.map(cust => cust.customerCode);
        const [accounts] = await db.query('SELECT * FROM account WHERE customerCode IN (?)', [customerIds]);

        // Kết hợp dữ liệu khách hàng với tài khoản
        const customersData = customers.map(customer => ({
            ...customer,
            accounts: accounts.filter(account => account.customerCode === customer.customerCode)
        }));

        return customersData;
    } catch (err) {
        throw err;
    }
};


module.exports = { getAllCustomersAndAccounts };
