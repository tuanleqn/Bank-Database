const AdminService = require('../services/AdminService');

class AdminController {
    getInforUser = async (req, res) => {
        try {
            let result = await AdminService.getInforUser();
            res.json(result);
        } catch (err) {
            res.status(500).json({ message: "Lỗi server" });
        }
    }

    
}
module.exports = new AdminController;