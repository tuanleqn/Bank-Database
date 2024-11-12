const customerService = require('../service/customerService');

const getCustomerData = async (req, res) => {
    try {
        const customerId = req.params.id;
        const customerData = await customerService.getCustomerAndAccounts(customerId);
        if (!customerData.customer) return res.status(404).json({ message: 'Customer not found' });
        res.json(customerData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getCustomerData };
