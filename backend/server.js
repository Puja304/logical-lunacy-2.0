// server.js
const express = require('express');
const cors = require('cors');
const connection = require('./db'); // Import the database connection
const app = express();
const path = require('path');


app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Parse JSON bodies for POST requests

// Example route to fetch all projects from the 'projects' table
app.get('/', (req, res) => {
    const query = 'SELECT * FROM projects';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching projects:', err);
            res.status(500).send('Error fetching projects');
            return;
        }
        res.json(results);
    });
});

// Route to add a new project
app.post('/projects', (req, res) => {
    const { name, languages, frameworks, status, picture_link, description } = req.body;
    const query = 'INSERT INTO projects (name, languages, frameworks, status, picture_link, description) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [
        name,
        JSON.stringify(languages || []),
        JSON.stringify(frameworks || []),
        status ? 1 : 0,
        picture_link,
        description
    ];
    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error inserting project:', err);
            res.status(500).send('Error inserting project');
            return;
        }
        res.status(201).send('Project added successfully');
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
