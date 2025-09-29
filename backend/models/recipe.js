const monggose = require( "mongoose" )

const recipeSchema = monggose.Schema( {
    title: {type: String, required: true},
    ingredients: {type: String, required: true},
    instructions: {type: String, required: true},
    time: {type: String, },
    coverImage: {type: String, },
}, {timestamps: true} )

const Recipes = monggose.model( "Recipes", recipeSchema )
module.exports = Recipes