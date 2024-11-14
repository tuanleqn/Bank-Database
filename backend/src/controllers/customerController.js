const customerService = require('../services/customerService');

const getAllCustomers = async (req, res) => {
    try {
        const customersData = await customerService.getAllCustomersAndAccounts();
        res.json(customersData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllCustomers };
