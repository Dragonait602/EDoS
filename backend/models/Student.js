const mongoose = require('mongoose')

const Gradeschema = new mongoose.Schema({
    subject: String,
    grade: Number,
}, {_id: false});

const StudentSchema = new mongoose.Schema({
    name: String,
    surname: String,
    age: Number,
    email: String,
    group: String,
    grades: [Gradeschema],
    // ДОДАНО: посилання на модель User
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
})

module.exports = mongoose.model('Student', StudentSchema);