const pool = require('../config/postgresConfig');
const firebase = require('firebase-admin');
const {firestore} = require('../config/firebaseConfig');
const postFirestore = firestore.collection("Post")
const moment = require('moment');

// function getPostByQuery( query ) { 
//     return new Promise((resolve,reject) => {
        
//         pool.connect( (err, client, done) => {
//             if (err) 
//                 reject(err)
//             client.query(query, (err,result) => { 
//                 done()
//                 if (err)
//                     reject(err)
//                 if (result.rowCount === 0)
//                     reject("Không có dữ liệu trong database")
//                 resolve(result.rows)
//             }) 
//         })
//     })
// } 

function addCommentPost ( post, text, user ) {
    return new Promise ( (resolve,reject) => {
        const comment =  { 
            text: text, 
            user: user,
            create_time: moment(new Date()).valueOf(),
        } 
        postFirestore.doc(post.create_time.toString()).update({
            comment: firebase.firestore.FieldValue.arrayUnion(comment),
        })
        .then( () => {
            resolve(null)
        })
        .catch(error => {
            reject(error)
        });
    })
}
// module.exports.getPostByQuery = getPostByQuery
module.exports.addCommentPost = addCommentPost
// module.exports.getAllNews = getAllNews
// module.exports.updateArticle = updateArticle
// module.exports.deleteArticles = deleteArticles
// module.exports.addArticle = addArticle