function errorStatus (res,status,type, message, errorCode) { 
        res.status(errorCode).json({
            status:status,
            message:message,
            type:type
        }) 
}

function successStatus ( res, status,message, data) { 
    res.json({
        status:status,
        data:data,
        message:message,
    })
}


const respondFunction = { 
    errorStatus,
    successStatus
}
module.exports = respondFunction