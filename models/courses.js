const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    courseDesc: {
        type: String,
        required: true
    },
    coursePrice: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        // required: true
    },
},{timestamps: true});

const courseModel = mongoose.model('Course', courseSchema);

module.exports = courseModel