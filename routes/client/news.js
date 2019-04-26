var express = require("express")
var router = express.Router()

//Pool postgres
const newsModel = require('../../models/news');

//Middleware
const {isLoggedin} = require('../../middleware/passportMiddleware');

//Responde function
const respondFunction = require('../../function/respondFunction');

const database_error = { 
    pool: "database - error",
    query: "database - query",
}
const status_code = { 
    error: "error",
    success:"success"
}

router.post("/get/department", (req,res,next) => { 
    const  alias = req.body.alias
    console.log(alias);
    
    if ( !alias ) { 
        respondFunction.errorStatus(res,status_code.error,"get news department","Missing required parameters - department or ID",400)
    }
    else {
        
        var query = "Select * from news where department = '" + alias +"'"
        console.log(query);
        
        newsModel.getNewsByQuery(query).then( data => {
            respondFunction.successStatus(res,status_code.success,"get news by id ",data)
        })
        .catch( err => { 
            respondFunction.errorStatus(res,status_code.error,"get news department",err,500)
        })
    }
    
})



module.exports = router;