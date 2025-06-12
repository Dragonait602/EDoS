const Student = require('../models/Student');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const generateRandomPassword = (length = 8) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};

class StudentController {
    static async getAllStudents(req, res) {
        try {
            const students = await Student.find({}).populate('userId', 'username');
            res.status(200).json(students);
        } catch (error) {
            res.status(500).json({ message: 'Не вдалося отримати список студентів', error });
        }
    }

    static async createStudent(req, res) {
        try {
            const { name, surname, age, email, group } = req.body;
            if (!name || !surname || !group || !email) {
                return res.status(400).json({ message: "Ім'я, прізвище, група та email є обов'язковими" });
            }

            const newStudent = new Student({ name, surname, age, email, group });

            const generatedUsername = name.toLowerCase().replace(/\s/g, '') + surname.toLowerCase().replace(/\s/g, '') + (Math.floor(Math.random() * 900) + 100);
            const generatedPassword = generateRandomPassword(8);
            const hashedPassword = await bcrypt.hash(generatedPassword, 10);
            
            const newUser = new User({
                username: generatedUsername,
                password: hashedPassword,
                email: email,
                role: 'student',
                studentId: newStudent._id
            });
            await newUser.save();

            newStudent.userId = newUser._id;
            await newStudent.save();

            const populatedStudent = await Student.findById(newStudent._id).populate('userId', 'username');

            res.status(201).json({ 
                message: 'Студента та його акаунт успішно створено', 
                student: populatedStudent,
                credentials: { username: generatedUsername, password: generatedPassword }
            });
        } catch (error) {
            console.error("Помилка при створенні студента/користувача:", error);
            res.status(500).json({ message: 'Помилка при створенні студента', error });
        }
    }

    static async updateStudent(req, res) {
        try {
            const { id } = req.params;
            const updatedData = req.body;
            const updatedStudent = await Student.findByIdAndUpdate(id, updatedData, { new: true }).populate('userId', 'username');
            if (!updatedStudent) return res.status(404).json({ message: 'Студента не знайдено' });
            res.status(200).json({ message: 'Дані студента оновлено', student: updatedStudent });
        } catch (error) {
            res.status(500).json({ message: 'Помилка при оновленні даних студента', error });
        }
    }

    static async deleteStudent(req, res) {
        try {
            const { id } = req.params;
            const deletedStudent = await Student.findByIdAndDelete(id);
            if (!deletedStudent) return res.status(404).json({ message: 'Студента не знайдено' });
            
            if (deletedStudent.userId) {
                await User.findByIdAndDelete(deletedStudent.userId);
            }
            res.status(200).json({ message: 'Студента та його акаунт успішно видалено' });
        } catch (error) {
            res.status(500).json({ message: 'Помилка при видаленні студента', error });
        }
    }

    // !!! ДОДАНО: Новий метод для керування оцінками !!!
    static async addOrUpdateGrade(req, res) {
        try {
            const { studentId } = req.params;
            const { subject, grade } = req.body;

            if (!subject || grade === undefined) {
                return res.status(400).json({ message: "Предмет та оцінка є обов'язковими" });
            }

            const student = await Student.findById(studentId);
            if (!student) {
                return res.status(404).json({ message: 'Студента не знайдено' });
            }

            // Шукаємо, чи існує вже оцінка з цього предмету
            const gradeIndex = student.grades.findIndex(g => g.subject === subject);

            if (gradeIndex > -1) {
                // Якщо існує - оновлюємо
                student.grades[gradeIndex].grade = grade;
            } else {
                // Якщо не існує - додаємо нову
                student.grades.push({ subject, grade });
            }

            await student.save();
            const updatedStudent = await Student.findById(studentId).populate('userId', 'username');
            res.status(200).json(updatedStudent);

        } catch (error) {
            console.error("Помилка при додаванні/оновленні оцінки:", error);
            res.status(500).json({ message: 'Помилка сервера при роботі з оцінкою' });
        }
    }
}

module.exports = StudentController;