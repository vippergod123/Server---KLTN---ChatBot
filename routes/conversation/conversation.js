const express = require("express")
const router = express.Router()
const Passport = require("passport")
// Middleware
const handleConversationFirebase = require('../../function/handleConversationFirebase');
const {isLoggedin, isAdmin} = require('../../middleware/passportMiddleware');
// respond function 
const respondFunction = require('../../function/respondFunction');


const database_error = { 
    pool: "database - error",
    query: "database - query",
}
const status_code = { 
    error: "error",
    success:"success"
}


router.get("/get",isAdmin, (req,res,next) => { 
    handleConversationFirebase.getFirebaseConversation()
    .then( data => { 
        respondFunction.successStatus(res,status_code.success,"firebase conversation get", data)
    })
    .catch(error => { 
        respondFunction.errorStatus(res,status_code.error,"firebase conversation get",error,500)
    })
})


router.post("/delete", (req,res,next) => { 

    var selectedConversation = req.body
    
    handleConversationFirebase.deleteFirebaseConversation(selectedConversation)
    .then( data => {
        respondFunction.successStatus(res,status_code.success,"firebase conversation delete", data)
    })
    .catch(err => { 
        
        respondFunction.errorStatus(res,status_code.error,"firebase conversation delete",error,500)
        
    })
    
})


module.exports = router;