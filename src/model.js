const mongoose = require('./libExport').mongoose

const studentSchema = new mongoose.Schema({
    id: Number,
    name: String,
    currentClass: Number,
    division: String
})

const studentModel = new mongoose.model('students' , studentSchema)

module.exports = studentModel