
var express = require("express")
var router = express.Router()

//Pool postgres
const reportModel = require('../../models/report');

//Middleware
const {isLoggedin} = require('../../middleware/passportMiddleware');

//Responde function
const respondFunction = require('../../function/respondFunction');

const status_code = { 
    error: "error",
    success:"success"
}




router.post("/create", (req,res,next) => { 
    const  report = req.body
    console.log(report);
    
    if ( !report ) { 
        respondFunction.errorStatus(res,status_code.error,"create report","Report invalid! ",400)
    }
    else {
        reportModel.addReport(report).then( data => {
            respondFunction.successStatus(res,status_code.success,"create report ",data)
        })
        .catch( err => { 
            console.log(err);
            respondFunction.errorStatus(res,status_code.error,"create report","Đã xảy ra lỗi",500)
        })
    }
    
})


module.exports = router