const mysql = require('mysql');

// var sql = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "college_handbook",
//   connectionLimit:10000,
//   multipleStatements: true,
// });


var sql = mysql.createPool({
  sockePath     : '/cloudsql/esoteric-code-237607:asia-east1:mysql-college-handbook',
  // host: "35.194.253.115",
  // port: 3306,
  user: "root",
  password: "",
  database: "college_handbook",  
  connectionLimit:10000,
  multipleStatements: true,
});



sql.getConnection((err, connection) => {
    if(err) {
        if(connection) connection.release();
        console.log(err);
        
    } else  {
    }
})




module.exports = sql