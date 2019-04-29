const pool = require('../config/postgresConfig');
const firebase = require('firebase-admin');
const {firestore} = require('../config/firebaseConfig');
const postFirestore = firestore.collection("Post")


// function getPostByQuery( query ) { 
//     return new Promise((resolve,reject) => {

//         postFirestore.get()
//         .then( doc => { 

//         })
//         .catch(err => {

//         })
        
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

function addPost ( post ) {
    return new Promise ( (resolve,reject) => { 
        if ( post.question === "")        
            reject("Câu hỏi không hợp lệ!")

        postFirestore.doc(post.create_time.toString()).set({
            question: post.question,
            title: post.title,
            create_time: post.create_time,
            comment:[],
            react_like: [],
            id:  post.create_time,
            react_dislike: [],
            student:post.student,
            isSolved:false,
        })
        .then( () => {
            resolve(null)
        })
        .catch(error => {
            reject(error)
        });

    })
}

function getPostPaging(page, limit) { 
    return new Promise ( (resolve, reject ) => {
        var postArray = []
        postFirestore.orderBy("create_time","desc").limit(limit).offset(limit*page).get()
        .then( querySnapshot => {
            querySnapshot.forEach(doc => {
                postArray.push(doc.data())
            })
            resolve(postArray)
        })
        .catch( error => {
            reject(error)
        })
    })
}


module.exports.addPost = addPost
module.exports.getPostPaging = getPostPaging
