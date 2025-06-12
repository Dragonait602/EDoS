const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Допоміжна функція для генерації випадкового рядка
const generateRandomPassword = (length = 10) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};

class UserController {
    /**
     * Скидає пароль для вказаного користувача.
     */
    static async resetPassword(req, res) {
        try {
            const { userId } = req.params; // Отримуємо ID користувача з URL

            const newPassword = generateRandomPassword(10);
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Знаходимо користувача і оновлюємо його пароль
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { password: hashedPassword },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'Користувача не знайдено' });
            }

            // Повертаємо новий пароль у відкритому вигляді для адміністратора
            res.status(200).json({
                message: 'Пароль успішно скинуто',
                newPassword: newPassword
            });

        } catch (error) {
            console.error("Помилка при скиданні пароля:", error);
            res.status(500).json({ message: 'Помилка сервера при скиданні пароля' });
        }
    }
}

module.exports = UserController;