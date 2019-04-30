var express = require("express")
var router = express.Router()

//Pool postgres
const postModel = require('../../models/post');

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

router.post("/get/paging", (req,res,next) => { 
    const  requestQuery = req.body
    const {limit, page} = requestQuery
    
    if ( !requestQuery ) { 
        respondFunction.errorStatus(res,status_code.error,"get post","Missing required body",400)
    }
    else {
        postModel.getPostPaging(page, limit).then( post => { 
            const data = { 
                limit: requestQuery.limit,
                page: requestQuery.page,
                post: post,
            } 
            console.log(data);
            
            respondFunction.successStatus(res,status_code.success,"get post ",data)

        })
        .catch (err => { 
            console.log(err);
            
            respondFunction.errorStatus(res,status_code.error,"get post",err,500)
        })
    }
    
})

router.get("/get/count", (req,res,next) => { 
    postModel.getCountQnaPost().then( data => {
        console.log(data);
        
        respondFunction.successStatus(res,status_code.success,"get post count",data)
    })
    .catch( err => { 
        console.log(err);
        respondFunction.errorStatus(res,status_code.error,"get post count","Đã xảy ra lỗi",500)
    })
})


router.post("/create", (req,res,next) => { 
    const  post = req.body
    console.log(post);
    
    if ( !post ) { 
        respondFunction.errorStatus(res,status_code.error,"create post","Missing required body",400)
    }
    else {
        
        postModel.addPost(post).then( data => {
            respondFunction.successStatus(res,status_code.success,"create post ",data)
        })
        .catch( err => { 
            console.log(err);
            
            respondFunction.errorStatus(res,status_code.error,"create post","Đã xảy ra lỗi",500)
        })
    }
    
})



module.exports = router;
