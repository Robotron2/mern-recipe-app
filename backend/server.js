require( "dotenv" ).config()
const express = require( "express" )
const app = express()
const connectDB = require( "./config/db" )

const PORT = process.env.PORT || 8000
connectDB()
app.use( express.json() )

const recipeRoute = require( "./routes/recipe" )

app.use( "/recipe", recipeRoute )

app.listen( PORT, ( err ) => {
    console.log( `App is listening on port ${ PORT }` )
} )