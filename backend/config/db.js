const mongoose = require( "mongoose" )
const connectionURI = process.env.CONNECTION_URI

const connectDB = async () => {
    await mongoose.connect( connectionURI ).then( () => console.log( "DB connected" ) )
}

module.exports = connectDB