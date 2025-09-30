const User = require( "../models/user" )
const bcrypt = require( 'bcrypt' )
const jwt = require( "jsonwebtoken" )

const userSignUp = async ( req, res ) => {
    const {email, password} = req.body
    if ( !email || !password ) {
        return res.status( 400 ).json( {message: "Email & password cannot be empty"} )
    }

    let existingUser = await User.findOne( {email} )
    if ( existingUser ) {
        return res.status( 400 ).json( {error: "Email is already registered"} )
    }
    const hashPwd = await bcrypt.hash( password, 10 )
    const newUser = await User.create( {
        email, password: hashPwd
    } )
    const secretKey = process.env.SECRET_KEY
    let token = jwt.sign( {email, id: newUser._id}, secretKey, {expiresIn: "60000"} )

    return res.status( 200 ).json( {token, newUser} )

}

module.exports = {userSignUp}