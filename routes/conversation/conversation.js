var express = require("express")
var router = express.Router()
var Passport = require("passport")
// Middleware

const handleConversationFirebase = require('../../function/handleConversationFirebase');


router.get("/get", (req,res,next) => { 
    handleConversationFirebase.getFirebaseConversation()
    .then( data => { 
        res.json(data);
    })
    .catch(error => { 
        res.status(400).json({ 
            error
        })
    })
})


router.post("/delete", (req,res,next) => { 

    var selectedConversation = req.body
    
    handleConversationFirebase.deleteFirebaseConversation(selectedConversation)
    .then( data => {
        res.json({ 
            data: data,
            status: "success",
        })
    })
    .catch(err => { 
        res.status(400).json({
            err
        })
        
    })
    
})


module.exports = router;