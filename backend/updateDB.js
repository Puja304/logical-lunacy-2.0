// updateDatabase.js
const fs = require('fs');
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // your MySQL username
    password: 'MySQLpu2301!', // your MySQL password
    database: 'myprojects', // your database name
});


// Read and parse the JSON file
fs.readFile('./projects.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the JSON file:', err);
        return;
    }
    const projects = JSON.parse(data);
    updateDatabase(projects);
});

// Function to insert or update projects in the database
const updateDatabase = async (projects) => {
    const updatePromises = projects.map(project => {
        const query = `
            INSERT INTO projects (name, languages, frameworks, status, picture_link, description)
            VALUES (?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                languages = VALUES(languages),
                frameworks = VALUES(frameworks),
                status = VALUES(status),
                picture_link = VALUES(picture_link),
                description = VALUES(description)
        `;
        
        const values = [
            project.name,
            JSON.stringify(project.languages || []),
            JSON.stringify(project.frameworks || []),
            project.status ? 1 : 0,
            project.picture_link || '',
            project.description
        ];
        
        return connection.promise().query(query, values);
    });

    try {
        await Promise.all(updatePromises);
        console.log('Database updated successfully!');
    } catch (err) {
        console.error('Error updating the database:', err);
    } finally {
        connection.end();
    }
};
