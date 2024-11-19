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

    getServiceReport = async (req, res) => {
        try {
            let result = await AdminService.getServiceReport();
            return res.status(200).json({ data: result });
        } catch (err) {
            return res.status(500).json({ message: "Server error: " + err.message });
        }
    }
}
module.exports = new AdminController;