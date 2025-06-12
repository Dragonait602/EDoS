const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// POST /api/users/:userId/reset-password
// Маршрут для скидання пароля. Доступний тільки адміністраторам.
router.post(
    '/:userId/reset-password',
    [authMiddleware, roleMiddleware(['admin'])],
    UserController.resetPassword
);

module.exports = router;