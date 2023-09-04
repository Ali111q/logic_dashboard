const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseImg: {
        type: String,
        required: true
    },
    courseTitle: {
        type: String,
        required: true
    },
    courseChapter:{
        type:String,
        required:true
    },
    coursePrice: {
        type: Number
    },
    isCourseFree: {
        type: Boolean
    },
    courseDescription: {
        type: String,
        required: true
    },
    courseTeacher: {
        type: String,
        required: true
    },
    courseUniversityName: {
        type: String,
        required: true
    },
    courseColleageName: {
        type: String,
        required: true
    },
    courseBranchName:{
        type:String,
        required:true
    },
    courseStage: {
        type: String,
        required: true
    },
    //! -------------------  relationships between collections  ------------------------//
    branch: {
        type: mongoose.Types.ObjectId,
        ref: 'Branch'
    },
    courseVideos: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Video' }
    ],
})

exports.Course = mongoose.model('Course', courseSchema)










/**
 * TODO : add relationships between all the database below
 * TODO : add databases for
 * ! university
 * ! colleage
 * ! branch
 * ! stage
 * ! class
  */
 // * GO BEYOND YOUR LIMITS HASAN 