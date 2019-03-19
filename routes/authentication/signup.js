var express = require("express")
var router = express.Router()
var Passport = require("passport")
// Middleware
const {isLoggedin} = require('../../middleware/passportMiddleware');

router.get("/",isLoggedin, (req,res,next) => { 
})

module.exports = router;