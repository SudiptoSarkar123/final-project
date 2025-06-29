const mongoose = require('mongoose');

const assignedMealSchema = new mongoose.Schema({
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
    recipeName: String,
    calories: Number,
}, { _id: false }); 

const clientSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, enum: ['active', 'paused', 'inactive'], default: 'active' },
    coach: { type: mongoose.Schema.Types.ObjectId, ref: 'coach', required: true },
    dateJoined: { type: Date, default: Date.now },

    assignedMealPlan: {
        planAssignedDate: Date,
        dailyPlan: {
            breakfast: [assignedMealSchema],
            lunch: [assignedMealSchema],
            dinner: [assignedMealSchema],
            snacks: [assignedMealSchema]
        },
        // Store the daily totals for the client's dashboard view.
        dailyTotals: {
            calories: Number,
            protein: Number,
            carbs: Number,
            fats: Number
        }
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('client', clientSchema);