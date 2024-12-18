const { Client } = require('pg');
// Use DATABASE_URL if available, else construct the connection string locally
const connectionString = process.env.DATABASE_URL || 
    `postgres://postgres:PostgreSQLpu2301!@localhost:5432/myprojects`; // Your fallback connection string for local development

const client = new Client({
    connectionString,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : undefined // Only apply SSL if on Heroku
});

// Connect to the PostgreSQL database
client.connect()
    .then(() => console.log('Connected to the PostgreSQL database.'))
    .catch(err => console.error('Error connecting to the database:', err));

module.exports = client;
