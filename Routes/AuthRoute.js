const express = require("express");
const passport = require("passport");
const router = express.Router();
const {googleLogin,login,logout} =require('../Controllers/AuthController')
const {isLoggedIn} = require('../middleware/auth')

router.get('/login',login)

router.get('/google',passport.authenticate('google',{
    scope:['profile','email'],
}),googleLogin)

router.get('/google/callback',passport.authenticate('google'),(req,res)=>{
    res.render('main')
})

router.get('/logout',isLoggedIn,logout)


module.exports = router;
