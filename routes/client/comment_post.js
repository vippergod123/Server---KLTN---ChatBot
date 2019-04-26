var express = require("express")
var router = express.Router()

//Pool postgres
const postModel = require('../../models/post');
const commentPostModel = require('../../models/comment_post');

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

router.post("/comment", (req,res,next) => { 
    const  requestBody = req.body
    const {post, comment, user} = requestBody
    
    console.log(requestBody);
    
    if ( !requestBody ) { 
        respondFunction.errorStatus(res,status_code.error,"get post","Missing required body",400)
    }
    else {
    // const query =   "SELECT *, count(*) OVER() AS total " +
    //     	        "FROM   post " + 
    //                 "ORDER  BY create_time desc " +
	//                 "LIMIT  {0} ".format(limit) +
    //                 "OFFSET {0} ".format(page * limit)
    //                 console.log(query);
                    
    //     postModel.getPostByQuery(query).then( post => {
    //         const data = { 
    //             limit: requestBody.limit,
    //             page: requestBody.page,
    //             post: post,
    //             total: parseInt(post[0].total),
    //         } 
    //         respondFunction.successStatus(res,status_code.success,"get post ",data)
    //     })
    //     .catch( err => { 
    //         console.log(err);
            
    //         respondFunction.errorStatus(res,status_code.error,"get post",err,500)
    //     })
        commentPostModel.addCommentPost(post, comment, user)
        .then( data => { 
            respondFunction.successStatus(res,status_code.success,"get post ",data)
        })
        .catch ( err => { 
            console.log(err);
            respondFunction.errorStatus(res,status_code.error,"comment",err,500)
        })
        
    }
    
})


// router.post("/create", (req,res,next) => { 
//     const  post = req.body
//     console.log(post);
    
//     if ( !post ) { 
//         respondFunction.errorStatus(res,status_code.error,"create post","Missing required body",400)
//     }
//     else {
//         postModel.addPost(post).then( data => {
//             respondFunction.successStatus(res,status_code.success,"create post ",data)
//         })
//         .catch( err => { 
//             console.log(err);
            
//             respondFunction.errorStatus(res,status_code.error,"create post","Đã xảy ra lỗi",500)
//         })
//     }
    
// })



module.exports = router;
