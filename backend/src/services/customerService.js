const db = require('../config/db.js');

const getAllCustomersAndAccounts = () => {
    return new Promise((resolve, reject) => {
        let customersData = [];

        db.query('SELECT * FROM customer', (err, customers) => {
            if (err) return reject(err);
            
            const customerIds = customers.map(cust => cust.customerCode);

            db.query('SELECT * FROM account WHERE customerCode IN (?)', [customerIds], (err, accounts) => {
                if (err) return reject(err);

                customersData = customers.map(customer => ({
                    ...customer,
                    accounts: accounts.filter(account => account.customerCode === customer.customerCode)
                }));

                resolve(customersData);
            });
        });
    });
};

module.exports = { getAllCustomersAndAccounts };
