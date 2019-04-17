var express = require("express")
var router = express.Router()

// Firebase
// const {firestore} = require('../../config/firebaseConfig');
// const firestoreNewsCnttDoc = firestore.collection("News").doc("cntt")

//Pool postgres
const pool = require('../../config/postgresConfig');
// mysql Model
const newsModel = require('../../models/news');

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

router.get("/get",isAdmin, (req,res,next) => { 
    var  ID_article = req.query.id
    
    if ( !ID_article ) { 
        respondFunction.errorStatus(res,"error","client","Missing required parameters - department or ID",400)
    }
    else {
        
        var query = "Select * from news where id = " + ID_article
      
        newsModel.getNewsByQuery(query).then( data => {
            respondFunction.successStatus(res,status_code.success,"get news by id ",data)
        })
        .catch( err => { 
            respondFunction.errorStatus(res,status_code.error,database_error.query,err,500)
        })
    }
    
})


router.post("/getall",isAdmin, (req,res,next) => { 
    
    newsModel.getAllNews().then(data => { 
        respondFunction.successStatus(res,status_code.success,"get all news success",data)
    })
    .catch ( err => { 
        respondFunction.errorStatus(res,status_code.error,"database get all news",err,500)
    })
})


router.post("/article/update", (req,res,next) => { 

    const article = req.body
    
    newsModel.updateArticle(article).then(data => { 
        respondFunction.successStatus(res,status_code.success,"update news success",data)
    })
    .catch ( err => { 
        respondFunction.errorStatus(res,status_code.error,"database-update-news",err,500)
    })
})


router.post("/article/add", (req,res,next) => { 
    const article = req.body
    
    newsModel.addArticle(article).then(data => { 
        respondFunction.successStatus(res,status_code.success,"add news success",data)
    })
    .catch ( err => { 
        respondFunction.errorStatus(res,status_code.error,"database add news",err,500)
    })
})


router.post("/article/delete", (req,res,next) => { 

    const articles = req.body
    
    newsModel.deleteArticles(articles).then(data => { 
        res.json({ 
            data: data,
            status: "success",
        })
    })
    .catch ( err => { 
        res.json({
            status: "error",
            message: err,
        })
    })
})
   
  

module.exports = router;