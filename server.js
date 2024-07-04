const express = require('express');
const cors = require('cors');
const path = require('path');
const { title } = require('process');
const { deserialize } = require('v8');
const app = express();
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

// Example project data
const projects = [
  {
    title: "Find all my projects @",
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
    image: "issueTS.png",
    description: "Analysed requirements for, designed, developed, and tested a program that helps companies track bugs report and update requests. Used thorough documentation."
  },
  {
    title: "Wordle",
    image : "wordle.png",
    description: "A command-line version of the popular game Wordle created twice, with C and python respectively"
  },
  {
    title: "Hangman",
    image: "hangman.png",
    description: "A command-line version of Hangman using python"
  },
  {
    title:"Machine Learning Profit Predictor",
    image: "profitPrediction.png",
    description: "Used a small set of training material detailing a business's profit and the population of the city it is based in, to train a model to predict profits based on population"
  },

  {
    title:"Movie Site",
    image:"movieSite.png",
    description:"Created a website that allowed user to search a movie and find all matching results (Thumbnail + title). Used an API to get movie information and HTML, CSS, and JS to make it"
  },
  {
    title: "Mario Underwater Scene - Turtles",
    image: "mario.png",
    description: "recreated an interpretation of the mario underwater level using python's turtle. added elements like coins, jellyfish, and pillars"
  },
  {
    title: "Talks Lookup System",
    image:"talks.png",
    description: "Used C to create a program that would take a file with talks (duration and description of speeches) and present them to the user, with the ability to sort and search within"
  },
  {
    title:"ADTs and Data Structures",
    image:"DS.png",
    description:"Implemented ADTs and Data Structures such as lists, linked lists, binary trees, BSTs, binary heaps, stacks, queues, and hashtables from scratch using both c and c++. More details on github"
  },
  {
    title: "Sorting Algorithms",
    image: "SA.png",
    description:"Implemented simple and complex sorting algorithms using C++ (selection, insertion, merge, quick, heap). More details on github"
  },
  {
    title: "Vector Cone",
    image: "cone.png",
    description: "Used vector calculations and MATLAB plotting tools to create a cone from vectors."
  },{
    title: "Friendsbook",
    image: "fb.png",
    description: "Created a social-media-inspired software that allows for users to join and leave the network, find other people, and modify their information"
  },
  {
  title: "Simple Expression Evaluator",
  image: "eval.png",
  description: "Created a program that takes in a simple mathematical expression and solves it by keeping in mind the order of operations. Implemented using a pair of stacks."
  },
  {
    title: "English-Sanskrit Translator",
    image: "translator.png",
    description: "Used BST and Dictionary to create a translator program that takes in English words and gives out their Sanskrit translations"
  },
  {
    title: "Bank Simulation",
    image: "BS.png",
    description: "Created a program that keeps track of customer arrival time and interaction duration with bank-teller in order to produce a record of every interaction at a bank. Used a combination of binary heap and priority queue for its implementation"
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
