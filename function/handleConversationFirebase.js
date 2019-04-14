const {firestore} = require('../config/firebaseConfig');
const firestoreConversation = firestore.collection("Conversation")



function updateHistoryFirebaseConversation ( userResponse, botResponse, idConversation) { 
    return new Promise((resolve,reject) =>  {
        var history = new Array()

        history.push(userResponse, botResponse)

        firestoreConversation.doc(idConversation).update({
            history: history,
            lastMessage: new Date(),
            user: "user",
            respondent: "bot",
        })
        .then(data => {
            var msg =  { 
                status: "success",
                message: "update firebase",
                type: "firebase conversation"
            }
            resolve(msg) 
        })
        .catch( err => { 
            var msg =  { 
                status: "error",
                message: err,
                type: "firebase conversation"
            }
            reject(msg)
        })
    })
}

function createNewFirebaseConversation (idConversation) { 
    return new Promise((resolve,reject) =>  {
        firestoreConversation.doc(idConversation).set({
            createdTime: new Date(),
            id: idConversation,
            history:[],
            user: "user",
            respondent: "bot",
            lastMessage: new Date(),
        })
        .then(data => {
            var msg =  { 
                status: "success",
                message:"Create conversation success",
                type: "firebase conversation"
            }
            resolve(msg) 
        })
        .catch( err => { 
            var msg =  { 
                status: "error",
                message: err,
                type:"firebase conversation"
            }
            reject(msg)
        })
    })
}

function getFirebaseConversation () { 
    return new Promise ( (resolve, reject) =>  {
        var data = new Array()
        firestoreConversation.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                data.push(doc.data())
            });
        })
        .then ( res => { 
            resolve(data)
        })
        .catch (err => { 
            const msg = { 
                message: err,
                type: "firebase conversation",
                status: "error"
            }
            reject(msg)
        })
    })
}


function deleteFirebaseConversation (selectedConversation) { 
    return new Promise ( (resolve, reject) =>  {
       
        firestoreConversation.get().then( snapshot => { 
            var batch = firestore.batch()
            selectedConversation.map( each => { 
                var temp = firestoreConversation.doc(each.id)
                batch.delete(temp)

            })
                
            
            return batch.commit()
                    .then(data => {
                        var message =  { 
                            status: "success",
                            type:"delete conversation",
                            message:"delete firebase success"
                        }
                        resolve(message) 
                    })
                    .catch( err => { 
                        var message =  { 
                            status: "error",
                            message: err,
                            type:"delete conversation"
                        }
                        reject(message)
                    })
        })
        
    })
}

module.exports.createNewFirebaseConversation = createNewFirebaseConversation
module.exports.updateHistoryFirebaseConversation = updateHistoryFirebaseConversation
module.exports.getFirebaseConversation = getFirebaseConversation
module.exports.deleteFirebaseConversation = deleteFirebaseConversation