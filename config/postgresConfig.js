const { Pool, Client } = require('pg')

// const setting = {
//   databaseConfig: {
//       uri: 'postgres://kburuxiudhihbo:0c26fc6d1a06365a5a8fe206452e3ff9fb2e12fc76531080ab1342c1dbba21c4@ec2-54-243-238-46.compute-1.amazonaws.com:5432/db2kj54elqvc21',
//       database: 'db2kj54elqvc21',
//       username: 'kburuxiudhihbo',
//       password: '0c26fc6d1a06365a5a8fe206452e3ff9fb2e12fc76531080ab1342c1dbba21c4',
//       host: 'ec2-54-243-238-46.compute-1.amazonaws.com',
//       dialect: 'postgres',
//       operatorsAliases: false,
//       protocol: 'postgres',
//   }
// }

var setting = {
  uri: 'postgres://kburuxiudhihbo:0c26fc6d1a06365a5a8fe206452e3ff9fb2e12fc76531080ab1342c1dbba21c4@ec2-54-243-238-46.compute-1.amazonaws.com:5432/db2kj54elqvc21',
}
const pool = new Pool({
  connectionString: setting.uri,
  ssl: true
})

pool.connect( (err,client,done) => { 
      if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
      }
      const query = "Select * from news where id = 1"
      client.query(query, (err, result ) => { 
        if (err)
          console.log(err.stack);
          console.log(result.rows.length);
          done()
      })
})
module.exports = pool;