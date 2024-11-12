const db = require('../config/dbConfig');

const getCustomerAndAccounts = (customerId) => {
    return new Promise((resolve, reject) => {
        let customerData = {};

        db.query('SELECT * FROM customers WHERE id = ?', [customerId], (err, result) => {
            if (err) return reject(err);
            if (result.length === 0) return resolve({ customer: null });

            customerData.customer = result[0];

            db.query('SELECT * FROM accounts WHERE customerId = ?', [customerId], (err, accounts) => {
                if (err) return reject(err);
                customerData.accounts = accounts;
                resolve(customerData);
            });
        });
    });
};

module.exports = { getCustomerAndAccounts };
