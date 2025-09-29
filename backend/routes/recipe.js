const express = require( "express" )
const {getRecipes, getRecipesById, addRecipe, updateRecipe, deleteRecipe} = require( "../controllers/recipe" )
const router = express.Router()

router.get( "/", getRecipes )
router.get( "/id", getRecipesById )
router.post( "/", addRecipe )
router.put( "/:id", updateRecipe )
router.delete( "/:id", deleteRecipe )


module.exports = router