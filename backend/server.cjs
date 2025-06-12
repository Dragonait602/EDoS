'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// ІМПОРТ РОУТІВ
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const userRoutes = require('./routes/userRoutes'); // Додано маршрут для користувачів

const app = express();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mydb', {})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Підключення роутів
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/users', userRoutes); // Додано використання маршруту для користувачів

app.get('/', (req, res) => {
    res.send('Сервер працює!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущено на порті ${PORT}`));