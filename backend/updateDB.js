const fs = require('fs');
const { Client } = require('pg');

// Create a connection to the database
const client = new Client({
    host: 'localhost', // your PostgreSQL host (use a Heroku-provided URL when deployed)
    user: 'postgres', // your PostgreSQL username
    password: 'PostgreSQLpu2301!', // your PostgreSQL password
    database: 'myprojects', // your database name
    port: 5432 // default PostgreSQL port
});

client.connect();

// Read and parse the JSON file
fs.readFile('./projects.json', 'utf8', async (err, data) => {
    if (err) {
        console.error('Error reading the JSON file:', err);
        return;
    }
    const projects = JSON.parse(data);
    await updateDatabase(projects);
});

const updateDatabase = async (projects) => {
    const updatePromises = projects.map(project => {
        const query = `
            INSERT INTO projects (name, languages, frameworks, status, picture_link, description)
            VALUES ($1, $2::TEXT[], $3::TEXT[], $4, $5, $6)
            ON CONFLICT (name) DO UPDATE
                SET
                    languages = EXCLUDED.languages,
                    frameworks = EXCLUDED.frameworks,
                    status = EXCLUDED.status,
                    picture_link = EXCLUDED.picture_link,
                    description = EXCLUDED.description
        `;

        const values = [
            project.name,
            project.languages ? `{${project.languages.join(',')}}` : '{}', // Format array correctly
            project.frameworks ? `{${project.frameworks.join(',')}}` : '{}', // Format array correctly
            project.status ? true : false,
            project.picture_link || '',
            project.description || ''
        ];

        return client.query(query, values);
    });

    try {
        await Promise.all(updatePromises);
        console.log('Database updated successfully!');
    } catch (err) {
        console.error('Error updating the database:', err);
    }
};

