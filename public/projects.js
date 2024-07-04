document.addEventListener("DOMContentLoaded", function() {
    const isLocal = window.location.hostname === '';
    console.log(window.location.hostname);
    const apiUrl = isLocal ? 'http://localhost:3000/projects' : '/projects';
    fetch(apiUrl)
        .then(response => response.json())
        .then(projects => {
            const container = document.getElementById('projects-container');
            projects.forEach(project => {
                const projectTile = document.createElement('div');
                projectTile.classList.add('project-tile');

                const title = document.createElement('h2');
                title.textContent = project.title;

                
                const description = document.createElement('p');
                description.textContent = project.description;

                if(project.image){
                    const image = document.createElement('img');
                    image.src = project.image;
                    image.alt = project.title;
                    projectTile.appendChild(title);
                    projectTile.appendChild(image);
                    projectTile.appendChild(description);
                }else{
                    const linkage = document.createElement('a');
                    linkage.href = project.description;
                    linkage.target = 'blank';
                    linkage.style.textDecoration = 'none';
                    linkage.style.textDecoration = 'bold';
                    linkage.style.fontFamily = 'Playfair Display';
                    linkage.style.color = '#003559';
                    linkage.textContent = project.description;
                    projectTile.appendChild(title);
                    projectTile.appendChild(linkage);
                }

                

                container.appendChild(projectTile);
            });
        })
        .catch(error => console.error('Error fetching projects:', error));
});


document.addEventListener("DOMContentLoaded", function() {
    const container1 = document.getElementById('projects-container');
    container1.classList.add("slowReveal");
})