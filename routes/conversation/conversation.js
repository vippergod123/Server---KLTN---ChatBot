var express = require("express")
var router = express.Router()
var Passport = require("passport")
// Middleware

const handleConversationFirebase = require('../../function/handleConversationFirebase');


router.get("/", (req,res,next) => { 
    handleConversationFirebase.getFirebaseConversation()
    .then( data => { 
        res.json(data);
    })
    .catch(error => { 
        res.json({ 
            status: "error",
            msg: error
        })
    })
})

module.exports = router;