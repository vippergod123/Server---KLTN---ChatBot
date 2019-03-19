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
            }
            resolve(msg) 
        })
        .catch( err => { 
            var msg =  { 
                status: "error",
                msg: err
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
            }
            resolve(msg) 
        })
        .catch( err => { 
            var msg =  { 
                status: "error",
                msg: err
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
            reject(err)
        })
    })
}

module.exports.createNewFirebaseConversation = createNewFirebaseConversation
module.exports.updateHistoryFirebaseConversation = updateHistoryFirebaseConversation
module.exports.getFirebaseConversation = getFirebaseConversation