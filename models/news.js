var mysql = require('../config/mysqlConfig');
var mysqlFunction = require('../function/mysqlFunction');

class Article  { 
    // ID: null,
    // title: new String(),
    // author: new String(),
    constructor() {
        this.ID = null
        this.title = new String()
        this.author = new String()
        this.department = new String()
        this.content  = new String()
        this.create_time = null
        this.hits = null
        this.isStar= null

    }
    
}

function getAllNews() { 
    
    return new Promise((resolve,reject) => {
        var query = "Select * from news"
        mysql.query(query, (err,data) => { 
            if (err) { 
                mysqlFunction.connectionRelease
                reject(err)
            }
            else { 
                mysqlFunction.connectionRelease
                resolve(data)
            }
        })
    })
}

function getNewsByQuery( query ) { 
    return new Promise((resolve,reject) => {
        mysql.query(query, (err,data) => { 
            if (err) { 
                mysqlFunction.connectionRelease()
                reject(err)
            }
            else { 
                mysqlFunction.connectionRelease()
                resolve(data)
            }
        })
    })
} 

function updateArticle ( article ) {
    return new Promise ( (resolve,reject) => { 

        
        var query = "UPDATE news SET " +
                    "author = '{0}', title = '{1}', department= '{2}', content = '{3}' ,create_time  = '{4}', hits = {5}, is_star = {6}, last_modified = '{7}' "
                    .format(article.author,  article.title,     article.department, 
                            article.content, article.create_time,
                            article.hits,    article.isStar ? 1 : 0, article.last_modified) +
                    "WHERE ID = {0}".format(article.ID)
        console.log(query);
                    

        mysql.query(query.trim(), (err,data) => { 
            if( err ) {

                console.log(err);
                
                mysqlFunction.connectionRelease()
                reject(err)
            }
            else { 
                mysqlFunction.connectionRelease()
                resolve(data)
            }
        })
    })
}



function addArticle ( article ) {
    return new Promise ( (resolve,reject) => { 

        
        var query = "Insert into news(author, title ,department, content, create_time, last_modified) " +
                    "values ('{0}','{1}','{2}','{3}','{4}', '{5}') "
                    .format(article.author,  article.title,  article.department, 
                            article.content, article.create_time, article.last_modified)
        console.log(query);
                    

        mysql.query(query.trim(), (err,data) => { 
            if( err ) {
                mysqlFunction.connectionRelease()
                reject(err)
            }
            else { 
                mysqlFunction.connectionRelease()
                resolve(data)
            }
        })
    })
}

function deleteArticles ( articles ) {
    return new Promise ( (resolve,reject) => { 

        
        // var query = "Insert into news(author, title ,department, content, create_time) " +
        //             "values ('{0}','{1}','{2}','{3}','{4}') "
        //             .format(article.author,  article.title,  article.department, 
        //                     article.content, article.create_time)
        var articlesID = articles.map(each => {
            return each.ID
        });
        
        mysql.query("DELETE FROM news WHERE ID in (?)",[articlesID], (err,data) => { 
            console.log(err);
            
            if( err ) {     
                mysqlFunction.connectionRelease()
                reject(err)
            }
            else { 
                mysqlFunction.connectionRelease()
                resolve(data)
            }
        })
    })
}


module.exports.getNewsByQuery = getNewsByQuery
module.exports.getAllNews = getAllNews
module.exports.updateArticle = updateArticle
module.exports.deleteArticles = deleteArticles
module.exports.addArticle = addArticle