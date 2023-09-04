const mongoose = require('mongoose')


const colleageSchema = new mongoose.Schema({
    colleageName:{
        type:String,
        required:true
    },
    colleageImgUrl:{
        type:String,
        required:true
    },
    colleageBranches:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Branch'
        }
    ],
    university:{
        type:mongoose.Types.ObjectId,
        ref:'University'
    }
})


exports.Colleage = mongoose.model('Colleage',colleageSchema)
