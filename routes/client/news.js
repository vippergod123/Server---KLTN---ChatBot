var express = require("express")
var router = express.Router()

//Pool postgres
const newsModel = require('../../models/news');
//Middleware
const {isLoggedin} = require('../../middleware/passportMiddleware');
//Responde function
const respondFunction = require('../../function/respondFunction');
//
const handleGetDataFromHCMUS = require('../../function/handleGetDataFromHCMUS');

const database_error = { 
    pool: "database - error",
    query: "database - query",
}
const status_code = { 
    error: "error",
    success:"success"
}

const day = 86400 * 1000


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
            console.log(err);
            
            respondFunction.errorStatus(res,status_code.error,"get news department",err,500)
        })
    }
})


router.post("/article/hits/increase", (req,res,next) => { 
    const  article = req.body
    if ( !article ) { 
        respondFunction.errorStatus(res,status_code.error,"get news department","Missing required parameters - department or ID",400)
    }
    else {
        newsModel.increaseHitsArticles(article).then( data => {
            respondFunction.successStatus(res,status_code.success,"update hits by article ",data)
        })
        .catch( err => { 
            respondFunction.errorStatus(res,status_code.error,"update hits by article",err,500)
        })
    }
})





var listArticles = []



handleGetDataFromHCMUS.getNews()
.then( data => { 
    console.log("fetch from hcmus succes");
    listArticles = data
    listArticles.sort(function(a, b) {
        return a.create_time - b.create_time;
    });
})
.catch (err => { 
    console.log(err);
})

router.get("/hcmus", (req,res,next) => { 
    handleGetDataFromHCMUS.getNews()
    .then( data => {
        newsModel.addNewsFromHCMUS(listArticles)
        res.send(listArticles[1].content)
    })
    .catch(err => { 
        respondFunction.errorStatus(res,status_code.error,"get news hcmus",err,500)
    })
})

module.exports = router;