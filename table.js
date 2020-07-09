const mysql = require('mysql2');
const config = require('config');
const dbConfig = config.get('dev');

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  multipleStatements: true,
});

const create_table_profiles = `CREATE TABLE profiles (
	id INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(50) NOT NULL DEFAULT '',
	last_name VARCHAR(50) NOT NULL DEFAULT '',
	email VARCHAR(100) NOT NULL DEFAULT '',
	PRIMARY KEY (id)
)`;

const create_table_users = `CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
	login VARCHAR(50) NOT NULL,
	password VARCHAR(255) NOT NULL,
	user_type ENUM('superadmin','admin','user') NOT NULL,
	profile_id INT NOT NULL DEFAULT '0',
	companies_id INT NOT NULL DEFAULT '0',
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
	UNIQUE INDEX login (login),
	INDEX profile_id (profile_id),
	INDEX companies_id (companies_id))`;

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
  connection.query(create_table_profiles, function (err, result) {
    if (err) throw err;
    console.log('Table profiles created');
    connection.end();
  },
  );
  connection.query(create_table_users, function (err, result) {
    if (err) throw err;
    console.log('Table users created');
    connection.end();
  },
  );
});
