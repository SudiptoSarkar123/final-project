const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Recipe name is required'],
        trim:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    nutrition:{
        calories:{type:Number,required:true, default:0 },
        protein:{type:Number,required:true,default:0},
        carbs:{type:Number,required:true,default:0},
        fats:{type:Number,required:true,default:0}
    },
    ingredients:[{
        name:{type:String, required:true},
        amount:{type:String, required:true}
    }],
    instructions:{
        type:String,
        required:[true,'Instructions ara required']
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        // required:true,
        refPath:'createdByModel'
    },
    createdByModel:{
        type:String,
        // required:true,
        enum:['admin,coach']
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active'
    }

},{
    timestamps:true
})


module.exports = mongoose.model('Recipe',recipeSchema)