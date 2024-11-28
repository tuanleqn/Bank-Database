const db = require('../config/db.js');

const getAllCustomersAndAccounts = async () => {
    try {

        const [customers] = await db.query('SELECT * FROM customer');

        const customerIds = customers.map(cust => cust.customerCode);
        const [accounts] = await db.query('SELECT * FROM account WHERE customerCode IN (?)', [customerIds]);

        const [phoneNumbers] = await db.query('SELECT * FROM CustomerPhoneNumber WHERE customerCode IN (?)', [customerIds]);

        const customersData = customers.map(customer => ({
            ...customer,
            accounts: accounts.filter(account => account.customerCode === customer.customerCode),
            phoneNumbers: phoneNumbers
                .filter(phone => phone.customerCode === customer.customerCode)
                .map(phone => phone.phoneNumber) // Lấy danh sách số điện thoại
        }));

        return customersData;
    } catch (err) {
        throw err;
    }
};

module.exports = { getAllCustomersAndAccounts };
