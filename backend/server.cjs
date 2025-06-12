'use strict';
require('dotenv').config(); // Для використання змінних середовища (.env файл)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // ІМПОРТ РОУТІВ

const app = express();

// Підключення MongoDB (лише один раз тут)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mydb', {
  // useNewUrlParser та useUnifiedTopology застаріли, але можна залишити
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Адреса вашого frontend
  credentials: true
}));

app.use(express.json());

// Підключення роутів
app.use('/api/auth', authRoutes); // Всі роути з authRoutes будуть доступні по /api/auth/...

// Тестовий маршрут (можна залишити або видалити)
app.get('/', (req, res) => {
  res.send('Сервер працює!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущено на порті ${PORT}`));