const { Client } = require('pg');

// Create a connection to the database
const client = new Client({
    host: 'localhost', // your PostgreSQL host (use a Heroku-provided URL when deployed)
    user: 'postgres', // your PostgreSQL username
    password: 'PostgreSQLpu2301!', // your PostgreSQL password
    database: 'myprojects', // your database name
    port: 5432 // default PostgreSQL port
});

// Connect to the PostgreSQL database
client.connect()
    .then(() => console.log('Connected to the PostgreSQL database.'))
    .catch(err => console.error('Error connecting to the database:', err));

module.exports = client;
