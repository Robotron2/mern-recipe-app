const express = require( "express" )
const {userSignUp, userLogin, getUserById} = require( "../controllers/userController" )

const router = express.Router()

router.post( "/signUp", userSignUp )
router.post( "/login", userLogin )
router.get( "/user/:id", getUserById )


module.exports = router