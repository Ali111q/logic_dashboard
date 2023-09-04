const mongoose = require('mongoose')

const branchSchema = new mongoose.Schema({
    branchName:{
        type:String,
        required:true
    },
    branchStageNumbers:{
        type:Number,
        required:true
    },
    colleage:{
        type:mongoose.Types.ObjectId,
        ref:'Colleage'
    },
    courses:[{
        type:mongoose.Types.ObjectId,
        ref:'Course'
    }]
})

exports.Branch = mongoose.model('Branch',branchSchema)