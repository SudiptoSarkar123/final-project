const mongoose = require('mongoose');


const ClientSchema = mongoose.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    status:{
        type:String,
        enum:['pending','active','blocked'],
        default:'active'
    },
    coach:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'coach',
        required:true
    },
    subscription:{
        planName:String,
        endDate:Date,
    },
    dateJoined:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model('client',ClientSchema);