const db = require('../config/dbConfig');

const getAllCustomersAndAccounts = () => {
    return new Promise((resolve, reject) => {
        let customersData = [];

        db.query('SELECT * FROM customers', (err, customers) => {
            if (err) return reject(err);

            const customerIds = customers.map(cust => cust.id);

            db.query('SELECT * FROM accounts WHERE customerId IN (?)', [customerIds], (err, accounts) => {
                if (err) return reject(err);

                customersData = customers.map(customer => ({
                    ...customer,
                    accounts: accounts.filter(account => account.customerId === customer.id)
                }));

                resolve(customersData);
            });
        });
    });
};

module.exports = { getAllCustomersAndAccounts };
