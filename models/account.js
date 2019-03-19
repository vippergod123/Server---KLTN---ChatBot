var mysql = require('../config/mysqlConfig');
var mysqlFunction = require('../function/mysqlFunction');

function getAllAccount() { 
    return new Promise((resolve,reject) => {
        var query = "Select * from account"
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


module.exports.getAllAccount = getAllAccount