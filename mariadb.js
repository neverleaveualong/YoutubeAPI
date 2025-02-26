// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'Youtube',
    dateStrings: true
  });

// A simple SELECT query
connection.query(
    'SELECT * FROM `users`',
    function (err, results, fields) {
        var {id, email, name, created_at} = results[0];
        console.log(id)
        console.log(email)
        console.log(name)
        console.log(created_at)
    }
  );

  module.exports = connection