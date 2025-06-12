const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/StudentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// --- Маршрути для студентів ---

// GET /api/students - Отримати список всіх студентів
router.get('/', authMiddleware, StudentController.getAllStudents);

// POST /api/students - Створити студента (тільки для адмінів)
router.post('/', [authMiddleware, roleMiddleware(['admin'])], StudentController.createStudent);

// PUT /api/students/:id - Оновити студента (для викладачів та адмінів)
router.put('/:id', [authMiddleware, roleMiddleware(['teacher', 'admin'])], StudentController.updateStudent);

// DELETE /api/students/:id - Видалити студента (тільки для адмінів)
router.delete('/:id', [authMiddleware, roleMiddleware(['admin'])], StudentController.deleteStudent);


// !!! ДОДАНО: Новий маршрут для керування оцінками !!!
// POST /api/students/:studentId/grades
router.post(
    '/:studentId/grades',
    [authMiddleware, roleMiddleware(['teacher', 'admin'])],
    StudentController.addOrUpdateGrade
);


module.exports = router;