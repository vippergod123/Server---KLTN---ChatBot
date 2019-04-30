const {firestore} = require('../config/firebaseConfig');
const firestorePost = firestore.collection("Post")



function getQnAFirebase () { 
    return new Promise ( (resolve, reject) =>  {
        var data = new Array()
        firestorePost.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
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


function getPostById (id) { 
    return new Promise ( (resolve, reject) =>  {
        firestorePost.doc(id.toString()).get()
        .then( doc => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                resolve(doc.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                reject("Không có dữ liệu!")
            }
            
        })
        .catch (err => { 
            console.log(err);
            
            reject( err.toString())
        })
    })
}


function markSolvedPost(post) { 
    return new Promise ( (resolve, reject) =>  {
       
        firestorePost.doc(post.id.toString()).update({
            isSolved: !post.isSolved
        })
        .then( () => {
            resolve(null)
        })
        .catch( err => { 
            console.log(err);
            reject (err.toString())
        })
    })
}


function deleteSelectedPostFirebase(selectedPost) { 
    return new Promise ( (resolve, reject) =>  {
       
        firestorePost.get().then( snapshot => { 
            var batch = firestore.batch()
            selectedPost.map( each => { 
                var temp = firestorePost.doc(each.id.toString())
                batch.delete(temp)

            })
                
            
            return batch.commit()
            .then(data => {
                resolve(null) 
            })
            .catch( err => { 
                console.log(err);
                reject(err.toString())
            })
        })
    })
}


module.exports.getQnAFirebase = getQnAFirebase
module.exports.deleteSelectedPostFirebase = deleteSelectedPostFirebase
module.exports.markSolvedPost = markSolvedPost
module.exports.getPostById = getPostById
