const AuthService = require('../services/AuthService')

class AuthController {
    check = async (req, res) => {
        try {
            const result = await AuthService.check(req);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(200).json({status: false, error: err});
        }
    }

    createUser = async (req, res) => {
        try {            
            const result = await AuthService.createUser(req.body);            
            return res.status(200).send(result);
        } catch(err) {
            return res.status(200).json({status: false, error: err});
        }
    }

    logout = async (req, res) => {
        try {
            const result = await AuthService.logout(req);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(200).json(err);
        };
    }

    login = async (req, res) => {
        try {
            const userinfo = await AuthService.login(req.body, req);
            return res.status(200).send(userinfo);
        } catch(err) {
            return res.status(200).json({status: false, error: err});
        };
    }

    
    
}

module.exports = new AuthController