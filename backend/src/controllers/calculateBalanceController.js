const customerService = require('../services/customerService');

const getTotalBalance = async (req, res) => {
    try {
        const { customerId } = req.params; // Lấy Customer ID từ params
        if (!customerId) {
            return res.status(400).json({ message: 'Customer ID is required' });
        }

        const balances = await customerService.getTotalBalanceByAccountType(customerId);
        
        if (balances.length === 0) {
            return res.status(404).json({ message: 'No accounts found for this customer' });
        }

        res.json(balances);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getTotalBalance };
