const mongoose = require('mongoose')

const DocumentSchema = new mongoose.Schema({
    title: { type: String, unique: true},
    teacherId: String,
    resource: String
})

module.exports = mongoose.model('document', DocumentSchema)