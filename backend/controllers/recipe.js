const Recipes = require( "../models/recipe" )

const getRecipes = async ( req, res ) => {
    const recipes = await Recipes.find()
    return res.json( recipes )
}
const getRecipesById = async ( req, res ) => {
    const recipe = await Recipes.findById( req.params.id )
    return res.json( recipe )
}
const addRecipe = async ( req, res ) => {
    const {title, ingredients, instructions, time} = req.body
    if ( !title || !ingredients || !instructions ) {
        return res.json( {message: "Required fields can't be empty"} )
    }

    const newRecipe = await Recipes.create( {title, ingredients, instructions, time} )
    return res.json( newRecipe )

}
const updateRecipe = async ( req, res ) => {
    const {title, ingredients, instructions, time} = req.body
    const id = req.params.id
    let recipe = await Recipes.findById( id )
    try {
        if ( recipe ) {
            await Recipes.findByIdAndUpdate( id, req.body, {new: true} )
            return res.json( {title, ingredients, instructions, time} )
        }
    } catch ( error ) {
        return res.status( 404 ).json( {message: "Error, cannot edit recipe"} )
    }
}
const deleteRecipe = async ( req, res ) => {
    const id = req.params.id // Get the ID from the route parameters

    try {
        const deletedRecipe = await Recipes.findByIdAndDelete( id )

        if ( !deletedRecipe ) {
            console.log( `Recipe with ID ${ id } not found.` )
            return res.status( 404 ).json( {message: "Recipe not found."} )
        }

        console.log( "Deleted recipe:", deletedRecipe )

        return res.json( {message: "Recipe deleted successfully", deletedRecipe} )

    } catch ( error ) {
        console.error( "Error deleting recipe:", error )
        if ( error.name === 'CastError' ) {
            return res.status( 400 ).json( {message: "Invalid ID format."} )
        }
        return res.status( 500 ).json( {message: "An unexpected error occurred while deleting the recipe."} )
    }
}

module.exports = {getRecipes, getRecipesById, addRecipe, updateRecipe, deleteRecipe}