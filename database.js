const mysql = require('mysql2');
const config = require('config');
const dbConfig = config.get('dev');

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  multipleStatements: true,
});

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
  connection.query('CREATE DATABASE policystreet', function (err, result) {
    if (err) throw err;
    console.log('Database created');
  });
});
