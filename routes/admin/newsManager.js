var express = require("express")
var router = express.Router()

// Firebase
// const {firestore} = require('../../config/firebaseConfig');
// const firestoreNewsCnttDoc = firestore.collection("News").doc("cntt")

// mysql Model
const newsModel = require('../../models/news');

//Middleware
const {isAdmin} = require('../../middleware/passportMiddleware');



router.get("/get", (req,res,next) => { 
    var  ID_article = req.query.ID
    if ( !ID_article ) { 
        res.json({ 
            msg: "Missing required parameters - department or ID ",
            status: "error",
        }) 
    }
    else {
        
        var query = "Select * from news where ID = " + ID_article
        console.log(query);
        
        newsModel.getNewsByQuery(query).then( data => {
            res.json({ 
                data: data,
                status: "success",
            })
        })
        .catch( err => { 
            res.json({
                status: "error",
                msg: err,
            })
        })
    }
    
})


router.post("/getall", (req,res,next) => { 
    
    newsModel.getAllNews().then( data => {
        res.json({ 
            data: data,
            status: "success",
        })
    })
    .catch( err => { 
        res.json({
            status: "error",
            msg: err,
        })
    })
})


router.post("/article/update", (req,res,next) => { 

    var article = req.body
    console.log(article);
    
    newsModel.updateArticle(article).then(data => { 
        res.json({ 
            data: data,
            status: "success",
        })
    })
    .catch ( err => { 
        res.json({
            status: "error",
            msg: err,
        })
    })
})


router.post("/article/add", (req,res,next) => { 

    var article = req.body
    console.log(article);
    
    
    newsModel.addArticle(article).then(data => { 
        res.json({ 
            data: data,
            status: "success",
        })
    })
    .catch ( err => { 
        res.json({
            status: "error",
            msg: err,
        })
    })
})


router.post("/article/delete", (req,res,next) => { 

    var articles = req.body
    
    newsModel.deleteArticles(articles).then(data => { 
        res.json({ 
            data: data,
            status: "success",
        })
    })
    .catch ( err => { 
        res.json({
            status: "error",
            msg: err,
        })
    })
})

module.exports = router;