const fs = require('fs');
const { Client } = require('pg');

const client = new Client({
    host: 'cf980tnnkgv1bp.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com',
    port: 5432,
    user: 'u6d875dkqb3ikm',
    password: 'p165aa5941e87a4bbefe3f4897c3eb2f1e0866112bdffafcd8feab9b00937fd11',
    database: 'd8d35u30r82ug3',
    ssl: {
        rejectUnauthorized: false
    }
});

const run = async () => {
    try {
        await client.connect();
        console.log('Connected to database');

        // Read and parse the JSON file
        fs.readFile('./projects.json', 'utf8', async (err, data) => {
            if (err) {
                console.error('Error reading the JSON file:', err);
                return;
            }
            console.log('Successfully read projects.json');
            const projects = JSON.parse(data);
            console.log('Parsed projects:', projects); // Log the parsed data
            await updateDatabase(projects);
        });

    } catch (err) {
        console.error('Error during script execution:', err);
    }
};

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

        console.log(`Preparing to insert/update project: ${project.name}`); // Debugging log
        return client.query(query, values)
            .then(result => {
                console.log(`Result for ${project.name}:`, result); // Log result of query execution
            })
            .catch(error => {
                console.error(`Error executing query for ${project.name}:`, error);
            });
    });

    try {
        await Promise.all(updatePromises);
        console.log('Database updated successfully!');
    } catch (err) {
        console.error('Error updating the database:', err);
    } finally {
        await client.end();
        console.log('Database connection closed');
    }
};

run();
