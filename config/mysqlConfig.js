const mysql = require('mysql');

// var sql = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "college_handbook",
//   connectionLimit:10000,
//   multipleStatements: true,
// });


var sql = mysql.createConnection({
  
  host: "35.194.253.115",
  // port:3306,
  user: "admin",
  password: "123",
  database: "college_handbook",  
  // socketPath  : '/cloudsql/esoteric-code-237607:asia-east1:mysql-college-handbook',
  // connectionLimit:10000,
  // multipleStatements: true,
});


sql.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  // console.log('Connected as thread id: ' + connection.threadId);
});


// sql.getConnection((err, connection) => {
//     if(err) {
//         if(connection) connection.release();
//         console.log(err);
        
//     } else  {
//     }
// })




module.exports = sql