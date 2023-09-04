const  mongoose  = require("mongoose");

const UniversitySchema = new mongoose.Schema({
    universityName:{
        type:String,
        required:true
    },
    universityImgUrl:{
        type:String,
        required:true
    },
    universityColleages:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Colleage'
        }
    ]
})

exports.University = mongoose.model('University',UniversitySchema)