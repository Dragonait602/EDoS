const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || 'your-super-secret-key-that-is-long',
        { expiresIn: '1h' }
    );
};

class AuthService {
    // ВИПРАВЛЕНО: приймаємо один об'єкт registrationData
    static async register(registrationData) {
        const { username, password, email, role, secretKey, name, surname, group } = registrationData;

        if (role === 'teacher') {
            if (secretKey !== process.env.TEACHER_SECRET_KEY) {
                throw new Error('Невірний секретний ключ для вчителя');
            }
        }
        if (role === 'admin') {
            if (secretKey !== process.env.ADMIN_SECRET_KEY) {
                throw new Error('Невірний секретний ключ для адміністратора');
            }
        }

        let studentProfile = null;
        if (role === 'student') {
            // Створюємо профіль студента з даних, введених у формі
            studentProfile = new Student({ name, surname, group, email });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            username: username,
            password: hashedPassword,
            email: email,
            role: role,
            studentId: studentProfile ? studentProfile._id : null
        });
        await user.save();

        if (studentProfile) {
            studentProfile.userId = user._id;
            await studentProfile.save();
        }

        const token = generateToken(user);
        return { token, user };
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
        return await User.findById(id).select('-password');
    }
}

module.exports = AuthService;