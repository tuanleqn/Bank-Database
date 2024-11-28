const customerService = require('../services/customerService');

const getAllCustomers = async (req, res) => {
    try {
        if (!req.session.user) {
            return res
                .status(401)
                .json({ message: 'Chưa xác thực thông tin người dùng' });
        }
        const customersData =
            await customerService.getAllCustomersAndAccounts();
        res.json(customersData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllAccountInformation = async (req, res) => {
    try {
        console.log(req.session.user);
        if (!req.session.user) {
            return res
                .status(401)
                .json({ message: 'Chưa xác thực thông tin người dùng' });
        }
        const customerCode = req.query.customerCode;
        const accountInformation =
            await customerService.getCustomerAccountsByCode(customerCode);
        res.json(accountInformation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllCustomers, getAllAccountInformation };
