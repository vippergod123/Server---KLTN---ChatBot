
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




router.get("/get", (req,res,next) => { 
    const query = "Select * from report"
    console.log(query);
    
    reportModel.getReportByQuery(query).then( data => {
        respondFunction.successStatus(res,status_code.success,"get report ",data)
    })
    .catch( err => { 
        console.log(err);
        respondFunction.errorStatus(res,status_code.error,"get report","Đã xảy ra lỗi",500)
    })
    
})



router.post("/delete", (req,res,next) => { 

    const reports = req.body
    
    reportModel.deleteReports(reports)
    .then(data => { 
        respondFunction.successStatus(res,status_code.success,"get report ",data)
    })
    .catch ( err => { 
        console.log(err);
        respondFunction.errorStatus(res,status_code.error,"get report","Đã xảy ra lỗi",500)
    })
})

module.exports = router