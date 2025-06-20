const mongoose = require('mongoose');


const coachSchema = mongoose.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},

    status:{
        type:String,
        enum:['pending','active','blocked'],
        default:'pending'
    },

    profile:{
        specialty:{type:String},
        bio:{type:String},
        image:{type:String},
        clientCount:{type:Number},
       
    },

    dateJoined:{type:Date,default:Date.now},
    lastLogin:{type:Date,default:Date.now},
})

module.exports = mongoose.model('coach',coachSchema)