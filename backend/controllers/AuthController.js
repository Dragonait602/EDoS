const AuthService = require('../services/AuthService');

class AuthController {
    static async register(req, res) {
        try {
            // Просто передаємо весь об'єкт з даними в сервіс
            const { token, user } = await AuthService.register(req.body);
            res.status(201).json({ token, user });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body;
            const { token, user } = await AuthService.login(username, password);
            res.json({ token, user });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    static async getMe(req, res) {
        try {
            const user = await AuthService.getUserById(req.user.id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Помилка сервера' });
        }
    }
}

module.exports = AuthController;