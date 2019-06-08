
var express = require("express")
var router = express.Router()

const handleGetDataFromHCMUS = require('../../function/handleGetDataFromHCMUS');
const respondFunction = require('../../function/respondFunction');

const status_code = { 
    error: "error",
    success:"success"
}

var listContest = []
var listSubjectSchedule = []


// setInterval(() => {
    handleGetDataFromHCMUS.getContestSchedule()
    .then( data => { 
        console.log("fetch contest from hcmus success");
        listContest = data
    })
    .catch (err => { 
        console.log(err);
    })

    handleGetDataFromHCMUS.getSubjectSchedule()
    .then( data => { 
        console.log("fetch subject schedule from hcmus success");
        listSubjectSchedule = data
    })
    .catch (err => { 
        console.log(err);
    })
// },2000)

router.get("/schedule/subject", (req,res,next) => { 
    
    if ( listSubjectSchedule.length > 0  )
        respondFunction.successStatus(res,status_code.success,"get subject schedule ",listSubjectSchedule)
    else 
        respondFunction.errorStatus(res,status_code.error,"get subject schedule","Đã xảy ra lỗi",500)
})

router.get("/schedule/contest", (req,res,next) => { 
    
    if ( listContest.length > 0  )
        respondFunction.successStatus(res,status_code.success,"get contest ",listContest)
    else 
        respondFunction.errorStatus(res,status_code.error,"get contest","Đã xảy ra lỗi",500)
})

router.get("/news", (req,res,next) => { 
    console.log(listContest);
    
    if ( listContest.length > 0  )
        respondFunction.successStatus(res,status_code.success,"get contest ",listContest)
    else 
        respondFunction.errorStatus(res,status_code.error,"get contest","Đã xảy ra lỗi",500)
})

module.exports = router