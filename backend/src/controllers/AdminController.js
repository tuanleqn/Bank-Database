const AdminService = require('../services/AdminService');

class AdminController {
    getInforUser = async (req, res) => {
        try {
            let result = await AdminService.getInforUser();
            res.json(result);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    };

    getCustomerByName = async (req, res) => {
        try {
            if (!req.session.user) {
                return res
                    .status(401)
                    .json({ message: 'Chưa xác thực thông tin người dùng' });
            }
            const { name } = req.query;
            const customersData = await AdminService.getCustomerByName(name);
            res.json(customersData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}


module.exports = new AdminController;