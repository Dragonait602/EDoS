const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum:['student', 'teacher', 'admin'], required: true},
    studentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
    // Переконуємось, що email є required та unique
    email: {type: String, required: true, unique: true} 
});

module.exports = mongoose.model('User', UserSchema);