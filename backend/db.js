const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // your MySQL username
    password: 'MySQLpu2301!', // your MySQL password
    database: 'myprojects', // your database name4
});

// Function to insert projects into the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = connection;
