const mongoose = require('mongoose');

const WorkoutSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
   
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    category: {
        type: String,
        required: true
    },
    mediaFile: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coach',
        // required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('workout', WorkoutSchema);