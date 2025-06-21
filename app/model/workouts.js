const mongoose = require('mongoose');

const WorkoutSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    duration: { type: Number, required: true }, // in minutes
    intensity: {
        type: String,
        enum: ['low', 'medium', 'high'],        
        required: true
    },
    category: {
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