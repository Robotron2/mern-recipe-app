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
const userLogin = async ( req, res ) => {
    const {email, password} = req.body
    if ( !email || !password ) {
        return res.status( 400 ).json( {message: "Email & password cannot be empty"} )
    }

    let user = await User.findOne( {email} )
    if ( user && await bcrypt.compare( password, user.password ) ) {
        const secretKey = process.env.SECRET_KEY
        let token = jwt.sign( {email, id: user._id}, secretKey, {expiresIn: "60000"} )
        return res.status( 200 ).json( {token, user} )
    } else {
        res.status( 400 ).json( {error: "Invalid Credentials"} )
    }

}

const getUserById = async ( req, res ) => {
    const userId = req.params.id
    const user = await User.findById( userId )
    if ( !user ) {
        return res.status( 404 ).json( {message: "User not found"} )
    }

    return res.status( 200 ).json( {user} )

}

module.exports = {userSignUp, userLogin, getUserById}