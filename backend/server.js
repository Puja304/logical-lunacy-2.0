// server.js
const express = require('express');
const cors = require('cors');
const client = require('./db'); // Import the database connection
const app = express();
const path = require('path');


app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(express.json()); // Parse JSON bodies for POST requests

// Example route to fetch all projects from the 'projects' table
app.get('/projects', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM projects');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching projects:', err);
        res.status(500).send('Error fetching projects');
    }
});

// Route to add a new project
app.post('/projects', async (req, res) => {
    const { name, languages, frameworks, status, picture_link, description } = req.body;
    try {
        const query = `
            INSERT INTO projects (name, languages, frameworks, status, picture_link, description)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const values = [
            name,
            JSON.stringify(languages || []),
            JSON.stringify(frameworks || []),
            status ? 1 : 0,
            picture_link,
            description
        ];
        await client.query(query, values);
        res.status(201).send('Project added successfully');
    } catch (err) {
        console.error('Error inserting project:', err);
        res.status(500).send('Error inserting project');
    }
});


// Start the server
const PORT = process.env.PORT;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
