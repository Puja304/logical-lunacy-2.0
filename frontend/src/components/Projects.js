import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./home.css";
import "./Projects.css";
import { useNavigate } from "react-router-dom";
import { IoArrowUpCircleOutline, IoArrowUpCircle } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function Projects() {
    const navigate = useNavigate();
    const [projectSet, setProjectSet] = useState([]);
    const [currentProjNum, setCurrentProjectNum] = useState(0);

    // Define the backend URL dynamically based on the environment
    const backendUrl = 'https://logical-lunacy-51c7491d9460.herokuapp.com';
    useEffect(() => {
        const animateTitle = () => {
            const titles = document.querySelector('.header');
            if (titles) {
                titles.style.opacity = 1;
            }
        };
        setTimeout(() => animateTitle(), 500);
    
        console.log('Fetching projects...');
    
        // Function to fetch from a given URL
        const fetchProjects = (url) => {
            console.log(`Attempting to fetch from ${url}`); // Moved inside the fetchProjects function
            return fetch(`${url}/projects`) // Correct API endpoint
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Fetched projects:', data);
                    // Exclude the first JSON entry
                    const filteredData = data.slice(1);
                    setProjectSet(filteredData);
                })
                .catch(error => {
                    console.error('Error fetching projects:', error);
                    throw error;  // Re-throw the error to allow fallback logic
                });
        };
    
        // Try to fetch from Heroku first
        fetchProjects(backendUrl)
            .then(() => {
                console.log('Successfully fetched from Heroku');
            })
            .catch(error => {
                console.error('Error fetching projects from Heroku:', error);
            });
    }, []);

    const nextProject = () => {
        setCurrentProjectNum((currentProjNum + 1) % projectSet.length);
    };

    const prevProject = () => {
        setCurrentProjectNum(currentProjNum === 0 ? projectSet.length - 1 : currentProjNum - 1);
    };

    let currentProject = projectSet[currentProjNum];

    console.log(projectSet)

    if (!currentProject) {
        return <div>No projects found</div>; // Handle loading state
    }

    const handleBackToHome = () => {
        sessionStorage.setItem('lightMode', 'true');
        navigate('/');
    };
    return (
        <div className="projects-page">
            <div className="arrows-up">
                <IoArrowUpCircleOutline 
                    className="back-arrow" 
                    color="white" 
                    onClick={() => handleBackToHome()} 
                />
                <IoArrowUpCircle 
                    className="back-arrow-filled" 
                    color="white" 
                    onClick={() => handleBackToHome()} 
                />
            </div>
            <Navbar value="projects" light={false} />
            <div className="github">
                <h3>
                    Find all projects @ 
                    <a 
                        href="https://github.com/Puja304" 
                        target="_blank" 
                        style={{ textDecoration: 'none', textDecoration: 'underline' }}
                    >
                        myGitHub
                    </a>
                </h3>
            </div>
            <div className="project-container">
                <div className="details">
                    <h1>{currentProject.title}</h1>
                </div>
                {console.log(`Image path: ${backendUrl}/images/${currentProject.picture_link}`)}
                {console.log(`Image name: ${currentProject.image.split('.').slice(0, -1).join('.') }`)}

                <img 
                    src={require(`../images/${currentProject.image}`)} 
                    alt={currentProject.name} 
                />
                <p>{currentProject.description}</p>
                <div className="arrows">
                    <FaArrowRight className="right" onClick={nextProject} />
                    <FaArrowLeft className="left" onClick={prevProject} />
                </div>
            </div>
        </div>
    );
}
