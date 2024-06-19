document.addEventListener("DOMContentLoaded", function() {
    fetch('https://git.heroku.com/logical-lunacy.git')
        .then(response => response.json())
        .then(projects => {
            const container = document.getElementById('projects-container');
            projects.forEach(project => {
                const projectTile = document.createElement('div');
                projectTile.classList.add('project-tile');

                const title = document.createElement('h2');
                title.textContent = project.title;

                const image = document.createElement('img');
                image.src = project.image;
                image.alt = project.title;

                const description = document.createElement('p');
                description.textContent = project.description;

                projectTile.appendChild(title);
                projectTile.appendChild(image);
                projectTile.appendChild(description);

                container.appendChild(projectTile);
            });
        })
        .catch(error => console.error('Error fetching projects:', error));
});


document.addEventListener("DOMContentLoaded", function() {
    const container1 = document.getElementById('projects-container');
    container1.classList.add("slowReveal");
})