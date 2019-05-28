var mysql = require('../config/mysqlConfig');
var mysqlFunction = require('../function/mysqlFunction');

const pool = require('../config/postgresConfig');

class Article  { 
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
        pool.connect( (err, client, done) => {
            if (err) 
                reject(err)
            client.query(query, (err,result) => { 
                done()
                if (err)
                    reject(err)
                resolve(result.rows)
            }) 
        })
    })
}

function getNewsByQuery( query ) { 
    return new Promise((resolve,reject) => {
        
        pool.connect( (err, client, done) => {
            if (err) 
                reject(err)
            client.query(query, (err,result) => { 
                done()
                if (err)
                    reject(err)
                if (result.rowCount === 0)
                    reject("Không có dữ liệu trong database")
                resolve(result.rows)
            }) 
        })
    })
} 

function updateArticle ( article ) {
    return new Promise ( (resolve,reject) => { 
        var query = "UPDATE news SET " +
                    "author = '{0}', title = '{1}', department= '{2}', content = '{3}' ,create_time  = '{4}', hits = {5}, is_star = {6}, last_modified = '{7}' "
                    .format(article.author,  article.title,     article.department, 
                            article.content, article.create_time,
                            article.hits,    article.isStar ? true : false, article.last_modified) +
                    "WHERE id = {0}".format(article.id)
                    
        pool.connect( (err, client, done) => {
            if (err) 
                reject(err)
            client.query(query.trim(), (err,result) => { 
                done()
                if (err)
                    reject(err)
                
                resolve(null)
            }) 
        })
    })
}



function addArticle ( article ) {
    return new Promise ( (resolve,reject) => { 
        const query = "Insert into news(author, title ,department, content, create_time, last_modified) " +
                    "values ('{0}','{1}','{2}','{3}','{4}', '{5}') "
                    .format(article.author,  article.title,  article.department, 
                            article.content, article.create_time, article.last_modified)

        pool.connect( (err, client, done) => {
            if (err) 
                reject(err)
            client.query(query, (err,result) => { 
                done()
                if (err)
                    reject(err)
                resolve(null)
            }) 
        })
    })
}

function deleteArticles ( articles ) {
    return new Promise ( (resolve,reject) => { 
        var articlesID = articles.map(each => {
            return each.id
        });
        
        const query = "delete from news where id = ANY(Array [ "+ articlesID +" ])"
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


function increaseHitsArticles ( article ) {
    return new Promise ( (resolve,reject) => { 
        const query = "update news set hits = hits + 1 where id = " + article.id
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

function addNewsFromHCMUS (articles){ 
    return new Promise( (resolve, reject) => {
        // const query = "Insert into news(author, title ,department, content, create_time, last_modified) " +
        //             "values ('{0}','{1}','{2}','{3}','{4}', '{5}') "
        //             .format(article.author,  article.title,  article.department, 
        //                     article.content, article.create_time, article.last_modified)
        
        articles.forEach(each => {
            console.log(each.create_time);
            
            const query =   "DO \n" +
                            "$do$ \n" +
                            "BEGIN \n" +
                            "IF {0} > ((select max(create_time)  from news)::bigint) THEN \n".format(each.create_time) +
                            "insert into news (author, title ,department, content, create_time, last_modified) \n" +
                            "values ('{0}','{1}','{2}','{3}','{4}', '{5}'); \n"
                            .format(each.author,  each.title,  each.department, 
                                each.content, each.create_time, each.last_modified) + 
                            "END IF; \n" +
                            "END \n" +
                            "$do$ \n"

                                
            pool.connect( (err, client, done) => {
                if (err) 
                    reject(err)
                client.query(query, (err,result) => { 
                    done()
                    
                    if (err)
                        reject(err)
                    resolve(null)
                }) 
            })    
        });
        
    })
}

module.exports.getNewsByQuery = getNewsByQuery
module.exports.getAllNews = getAllNews
module.exports.updateArticle = updateArticle
module.exports.deleteArticles = deleteArticles
module.exports.addArticle = addArticle
module.exports.increaseHitsArticles = increaseHitsArticles
module.exports.addNewsFromHCMUS = addNewsFromHCMUS

