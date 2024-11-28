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

const getCustomerAccountsByCode = async (customerCode) => {
    try {
        const [customerAccounts] = await db.query(
            `
            SELECT 
                c.customerCode,
                c.firstName,
                c.lastName,
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
            return { message: 'No accounts found for this customer.' };
        }

        const result = {
            customerCode: customerAccounts[0].customerCode,
            firstName: customerAccounts[0].firstName,
            lastName: customerAccounts[0].lastName,
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

module.exports = { getAllCustomersAndAccounts, getCustomerAccountsByCode };
