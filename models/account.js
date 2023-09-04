const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    universityName:{
        type:String,
        required:true
    },
    collegeName:{
        type:String,
        required:true
    },
    branchName:{
        type:String,
        required:true
    },
    studyType:{
        type:String,
        required:true
    },
    educationalLevel:{
        type:String,
        required:true
    },
    userSecurityInformation: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
 })

exports.Account = mongoose.model('Account',accountSchema)




