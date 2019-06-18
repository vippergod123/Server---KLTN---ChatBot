var express = require("express")
var router = express.Router()

// Firebase
// const {firestore} = require('../../config/firebaseConfig');
// const firestoreNewsCnttDoc = firestore.collection("News").doc("cntt")

const qnaModel = require('../../models/qna');

//Middleware
const {isAdmin} = require('../../middleware/passportMiddleware');

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

router.get("/get",isAdmin,(req,res,next) => { 
    
    qnaModel.getQnAFirebase().then( data => {
        respondFunction.successStatus(res,status_code.success,"get post",data)
    })
    .catch( err => { 
        respondFunction.errorStatus(res,status_code.error,"get post".query,err,500)
    })
    
})


router.post("/delete",isAdmin, (req,res,next) => { 

    var selectedPost = req.body
    console.log(selectedPost);

    if ( !selectedPost )
        respondFunction.errorStatus(res,status_code.error,"firebase Post delete","Xóa không hợp lệ",400)
    
    
    qnaModel.deleteSelectedPostFirebase(selectedPost)
    .then( data => {
        respondFunction.successStatus(res,status_code.success,"firebase Post delete", data)
    })
    .catch(error => { 
        
        respondFunction.errorStatus(res,status_code.error,"firebase Post delete",error,500)
         
    })
    
})



router.post("/get/id",isAdmin, (req,res,next) => { 

    var {id} = req.body
    console.log(id);

    if ( !id )
        return respondFunction.errorStatus(res,status_code.error,"firebase get post by id","Xóa không hợp lệ",400)
    
    
    qnaModel.getPostById(id)
    .then( data => {
        respondFunction.successStatus(res,status_code.success,"firebase get post by id", data)
    })
    .catch(error => { 
        
        respondFunction.errorStatus(res,status_code.error,"firebase get post by id",error,500)
         
    })
    
})

router.post("/mark_solved", (req,res,next) => { 

    var post = req.body

    console.log("mark_solved");
    
    if ( !post )
        return respondFunction.errorStatus(res,status_code.error,"firebase mark solved post","Xóa không hợp lệ",400)
    
    
    qnaModel.markSolvedPost(post)
    .then( data => {
        respondFunction.successStatus(res,status_code.success,"firebase mark solved post", data)
    })
    .catch(error => { 
        respondFunction.errorStatus(res,status_code.error,"firebase mark solved post",error,500)
         
    })
    
})

  

module.exports = router;