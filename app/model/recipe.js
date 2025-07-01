const mongoose = require('mongoose');


const recipeSchema = new mongoose.Schema({
  
    name: {
        type: String,
        required: [true, 'Recipe name is required.'],
        trim: true
    },
    
   
   
    instructions: {
        type: String,
        required: [true, 'Preparation instructions are required.']
    },

   
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // A general User model that points to an Admin or a Coach
        // required: true
    },


    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    ingredients: [{
        ingredient: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true },
        amountInGrams: { type: Number, required: true }
    }],


    totals: {
        calories: { type: Number, default: 0 },
        protein: { type: Number, default: 0 },
        carbs: { type: Number, default: 0 },
        fats: { type: Number, default: 0 }
    },
    
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true
});

recipeSchema.pre('save', async function(next) {
    if (this.isModified('ingredients')) {
        let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFats = 0;
        
        
        await this.populate('ingredients.ingredient');
        
        for (const item of this.ingredients) {
            if (item.ingredient) { // Check if ingredient was populated
                const nutrition = item.ingredient.nutritionPer100g;
                const ratio = item.amountInGrams / 100;
                
                totalCalories += nutrition.calories * ratio;
                totalProtein  += nutrition.protein * ratio;
                totalCarbs    += nutrition.carbs * ratio;
                totalFats     += nutrition.fats * ratio;
            }
        }
        
        // Update the 'totals' field on the recipe itself
        this.totals = {
            calories: Math.round(totalCalories),
            protein: Math.round(totalProtein),
            carbs: Math.round(totalCarbs),
            fats: Math.round(totalFats),
        };
    }
    next();
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;