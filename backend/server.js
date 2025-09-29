require( "dotenv" ).config()
const express = require( "express" )
const app = express()

const PORT = process.env.PORT || 8000

app.get( "/", ( req, res ) => {
    res.json( {message: "Hello!"} )
} )

app.listen( PORT, ( err ) => {
    console.log( `App is listening on port ${ PORT }` )
} )