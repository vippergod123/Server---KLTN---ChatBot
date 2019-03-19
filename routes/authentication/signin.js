var express = require("express")
var router = express.Router()
var Passport = require("passport")
var jwt      = require('jsonwebtoken');

var jsonWebTokenConfig = require('../../config/jsonWebTokenConfig');

router.post('/', function(req, res, next) {
    
    // Passport.authenticate('local', function(err, user, info) {
    //     var isValid = false
    //     isValid = user?true:false
    //     isValid = err?false:true
    //     req.logIn(user, function (err) { 
    //         isValid= user?true:false
    //     })
    //     if (isValid) { 
    //         console.log(isValid);
    //         const token = jwt.sign(user, jsonWebTokenConfig.secretKey);
    //         return res.json({
    //             message: "Login Success!",
    //             redirect: "/",
    //             token: token,
    //         })
    //     }
    //     else { 
    //         console.log(isValid);
    //         return res.json({
    //             error: "Invalid username or password",
    //             redirect: "/signin",
    //         })
    //     }
    // })(req, res, next);


    Passport.authenticate('local', {session: false}, (err, user, info) => {
       
        if (err || !user) {
            console.log(user);
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user   : user
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }

            const token = jwt.sign(JSON.stringify(user), jsonWebTokenConfig.secretKey);

            return res.json({user, token});
        });
    })
    (req, res);
});

module.exports = router;