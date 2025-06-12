const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Виправлено шлях до моделі
const bcrypt = require('bcryptjs');

// Функція для генерації токена, щоб уникнути дублювання коду
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role }, // ВИПРАВЛЕНО
        process.env.JWT_SECRET || 'your-super-secret-key-that-is-long', // Краще винести в .env
        { expiresIn: '1h' }
    );
};

class AuthService {
    static async register(username, password, email, role, studentId = null) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            password: hashedPassword,
            email,
            role,
            studentId
        });
        await user.save();

        const token = generateToken(user); // ДОДАНО: генерація токена
        return { token, user }; // ДОДАНО: повертаємо токен разом з користувачем
    }

    static async login(username, password) {
        const user = await User.findOne({ username });
        if (!user) throw new Error('Користувача не знайдено');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Невірний пароль');

        const token = generateToken(user);
        return { token, user };
    }

    static async getUserById(id) {
        return await User.findById(id).select('-password'); // Не повертаємо хеш пароля
    }
}

module.exports = AuthService;