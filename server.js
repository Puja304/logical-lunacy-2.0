const express = require('express');
const cors = require('cors');
const path = require('path');
const { title } = require('process');
const app = express();
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

// Example project data
const projects = [
  {
    title: "Find all my projects @ :",
    image: "",
    description: "https://github.com/Puja304"
  },
  {
    title: "Command-Line Adventure Game",
    image: 'adventureGame.png',
    description: "An adventure game where the player must solve riddles and fight monsters to exit the building before the zombies reach."
  },
  {
    title: "Personal Website",
    image: 'websiteHome.png',
    description: "Created a personal portfolio website: the one you are reading this on. Used: HTML, CSS, JS, Node.js"
  },
  {
    title:"Issue Tracking System",
    image: "monster1.png",
    description: "An issue tracking system that companies can use to track bugs"
  }
];


app.use(cors());
// Endpoint to get project data
app.get('/projects', (req, res) => {
  res.json(projects);
});

// Serve static files (images)
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.static(path.join(__dirname, '../public')));


app.use(express.static('public'));


// Start the server
app.listen(port, host,() => {
  console.log(`Server is running on port ${port}`);
});
