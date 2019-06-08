const express = require("express")
const router = express.Router()
const request = require('request');
const cheerio = require('cheerio')
const axios = require('axios');
// respond function 
const respondFunction = require('../../function/respondFunction');


const domain = ["http://localhost:3002/lich-thi","http://localhost:3002"]

// domain.forEach( each => {
    // request("https://client-college-handbook.herokuapp.com/", function (error, response, html) {

    //     console.log(response.statusCode);
    //     if (!error && response.statusCode == 200) {
    //         var $ = cheerio.load(html)
            
            
    //         // main('.sppb-article-info-wrap').find('h3').each(function() {
    //         //     keyword.forEach(each => {
    //         //         var title = main(this).text()
    //         //         var link = main(this).attr('href')
    //         //         console.log(link);
    //         //     });
    //         // });
    //         console.log( $.html().toString());
    //     }
        
    // });
// })
axios.default.get(domain[1])
.then (res => { 
    // console.log(res.data);
    
})
function searchEngine() { 
    return new Promise( (resolve, reject ) => { 
        
    })
}
router.post("/", (req,res,next) => { 

        const {keyword} = req.body
        searchEngine().then( data => { 
            console.trace(data);
            
        })
        .catch ( err => { 
            console.log(err);
            respondFunction.errorStatus(res,status_code.error,"search engine",err,400)
        })
        // respondFunction.successStatus(res,status_code.success,"send mail", info.response)
        
})


module.exports = router;