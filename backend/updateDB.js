const fs = require('fs');
const { Client } = require('pg');

// Use DATABASE_URL if available, else construct the connection string locally
const connectionString = process.env.DATABASE_URL || 
    `postgres://postgres:PostgreSQLpu2301!@localhost:5432/myprojects`; // Your fallback connection string for local development

const client = new Client({
    connectionString,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : undefined // Only apply SSL if on Heroku
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
