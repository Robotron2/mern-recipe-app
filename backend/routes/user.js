const express = require( "express" )
const {userSignUp} = require( "../controllers/userController" )

const router = express.Router()

router.post( "/signUp", userSignUp )
// router.post( "/login", userLogin )
// router.get( "/user/:id", getUser )


module.exports = router