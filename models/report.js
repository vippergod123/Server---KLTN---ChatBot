var mysql = require('../config/mysqlConfig');
var mysqlFunction = require('../function/mysqlFunction');

const pool = require('../config/postgresConfig');


// function getAllNews() { 
    
//     return new Promise((resolve,reject) => {
//         var query = "Select * from news"
//         pool.connect( (err, client, done) => {
//             if (err) 
//                 reject(err)
//             client.query(query, (err,result) => { 
//                 done()
//                 if (err)
//                     reject(err)
//                 resolve(result.rows)
//             }) 
//         })
//     })
// }

function getReportByQuery( query ) { 
    return new Promise((resolve,reject) => {
        
        pool.connect( (err, client, done) => {
            if (err) 
                reject(err)
            client.query(query, (err,result) => { 
                done()
                if (err)
                    reject(err)
                if (result.rowCount === 0)
                    reject([])
                resolve(result.rows)
            }) 
        })
    })
} 

function addReport ( report ) {
    return new Promise ( (resolve,reject) => { 
//          
//          
        const query = "INSERT INTO report (type, create_time, issue, comment, id_issue)"  +
                    "VALUES ( $1, $2, $3, $4, $5)"
                    // .format(report.type,  report.create_time, 
                    //         report.issue, report.comment, report.id_issue)

                    
        pool.connect( (err, client, done) => {
            if (err) 
                reject(err)
            client.query(query,[report.type,  report.create_time, report.issue, report.comment, report.id_issue], (err,result) => { 
                done()
                if (err)
                    reject(err)
                resolve(null)
            }) 
        })
    })
}


function deleteReports ( reports ) {
    return new Promise ( (resolve,reject) => { 
        var reportsID = reports.map(each => {
            return parseInt(each.id)
        });
        
        const query = "delete from report where id = ANY(Array [ "+ reportsID +" ])"
        console.log(query);
        
        pool.connect( (err, client, done) => {
            if (err) 
                reject(err)
            client.query(query  , (err,result) => { 
                done()
                if (err)
                    reject(err)
                resolve(null)
            }) 
        })
    })
}


module.exports.getReportByQuery = getReportByQuery
module.exports.addReport = addReport
module.exports.deleteReports = deleteReports


// function updateArticle ( article ) {
//     return new Promise ( (resolve,reject) => { 
//         var query = "UPDATE news SET " +
//                     "author = '{0}', title = '{1}', department= '{2}', content = '{3}' ,create_time  = '{4}', hits = {5}, is_star = {6}, last_modified = '{7}' "
//                     .format(article.author,  article.title,     article.department, 
//                             article.content, article.create_time,
//                             article.hits,    article.isStar ? true : false, article.last_modified) +
//                     "WHERE id = {0}".format(article.id)
                    
//         pool.connect( (err, client, done) => {
//             if (err) 
//                 reject(err)
//             client.query(query.trim(), (err,result) => { 
//                 done()
//                 if (err)
//                     reject(err)
                
//                 resolve(null)
//             }) 
//         })
//     })
// }



// function addArticle ( article ) {
//     return new Promise ( (resolve,reject) => { 
//         const query = "Insert into news(author, title ,department, content, create_time, last_modified) " +
//                     "values ('{0}','{1}','{2}','{3}','{4}', '{5}') "
//                     .format(article.author,  article.title,  article.department, 
//                             article.content, article.create_time, article.last_modified)

//         pool.connect( (err, client, done) => {
//             if (err) 
//                 reject(err)
//             client.query(query, (err,result) => { 
//                 done()
//                 if (err)
//                     reject(err)
//                 resolve(null)
//             }) 
//         })
//     })
// }

// function deleteArticles ( articles ) {
//     return new Promise ( (resolve,reject) => { 
//         var articlesID = articles.map(each => {
//             return each.id
//         });
        
//         const query = "delete from news where id = ANY(Array [ "+ articlesID +" ])"
//         pool.connect( (err, client, done) => {
//             if (err) 
//                 reject(err)
//             client.query(query  , (err,result) => { 
//                 done()
//                 if (err)
//                     reject(err)
//                 resolve(null)
//             }) 
//         })
//     })
// }


// function increaseHitsArticles ( article ) {
//     return new Promise ( (resolve,reject) => { 
//         const query = "update news set hits = hits + 1 where id = " + article.id
//         pool.connect( (err, client, done) => {
//             if (err) 
//                 reject(err)
//             client.query(query  , (err,result) => { 
//                 done()
//                 if (err)
//                     reject(err)
//                 resolve(null)
//             }) 
//         })
//     })
// }

// // module.exports.getNewsByQuery = getNewsByQuery

