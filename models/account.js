var mysql = require('../config/mysqlConfig');
var pool = require('../config/postgresConfig');

function getAllAccount() { 
    return new Promise((resolve,reject) => {
        var query = "Select * from account"
        pool.connect( (err,client,done) => { 
            if (err) 
                reject(err)
            client.query(query, (err,result) => {
                done()
                if (err)
                    reject(err)
                else
                    resolve(result.rows)
            })
        })
    })
}


module.exports.getAllAccount = getAllAccount