var express = require("express")
var router = express.Router()
const axios = require('../../config/axiosConfig');
//Middleware
const {isAdmin} = require('../../middleware/passportMiddleware');
//Responde function
const respondFunction = require('../../function/respondFunction');

var fs = require('fs');
var list_of_intents = JSON.parse(fs.readFileSync('intents.json', 'utf8'));


const status_code = { 
    error: "error",
    success:"success"
}

var Client = require('node-rest-client').Client;
var client = new Client();

function getResponseFromBot(msg) {
    return new Promise((resolve,reject) => { 
        
  
        try {

            var args = {
                data: { "sentence": msg },
                headers: { "Content-Type": "application/json" }
            };

            client.post("http://localhost:5001/katana-ml/api/v1.0/assistant", args, function (data, response) {
                if(Buffer.isBuffer(data)) {
                  data = data.toString("utf-8")
                }
              
                console.log(data);
              
                var intents = list_of_intents.intents;
                var responseMsg;
                var responseContext;
                for (i = 0; i < intents.length; i++) {
                  if(intents[i].tag === data[0].intent) {
                    var responseId = getRandomInt(0, intents[i].responses.length - 1);
                    responseMsg = intents[i].responses[responseId];
                    responseContext = intents[i].context[0];
                    break;
                  }
                }
              
                console.log("Intent: " + data[0].intent);
                console.log("Probability: " + data[0].probability);
                console.log();
              
              //   socket.emit('serverEvent', {intent: data[0].intent, msg: responseMsg, context: responseContext});
                console.log(responseMsg);
                console.log(data[0].intent);
                console.log(responseContext);
                resolve({
                    intent: data[0].intent, 
                    message: responseMsg,
                    context: responseContext
                })
            });
        }
        catch (ex) { 
            reject (ex)
        }
        
    })
    
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getResponseFromPython(msg) {
    return new Promise( (resolve, reject) => { 
        // const api = "https://chat-bot-college-handbook.herokuapp.com/bot";
        const api = "http://localhost:5000/bot";
        console.log(api);
        console.log(msg);
        
        axios.default.post(api, {
            message: msg
        })
        .then( res => { 
            const message = res.data.answer
            console.log();
            
            resolve(message)
        })
        .catch( err => { 
            reject(err)
        })
    })
}

router.post("/", (req,res,next) => { 
    const msg = req.body.message
    console.log(msg);
    
    // getResponseFromBot(msg)
    getResponseFromPython(msg)
    .then( response => { 
        respondFunction.successStatus(res,status_code.success,"bot response",response)
    })
    .catch( err => { 
        console.log(err);
        respondFunction.errorStatus(res,status_code.error,"bot response",err.toString(),500)
    })
})

// const api = "https://chat-bot-college-handbook.herokuapp.com/bot";
//         console.log(api);
        
//         axios.default.post(api, {
//             message: "hello"
//         })
//         .then( res => { 
//             const message = res.data.answer
//             console.log(message);
            
//         })
//         .catch( err => { 
//             console.log(err);
            
//             reject(err)
//         })

module.exports = router;