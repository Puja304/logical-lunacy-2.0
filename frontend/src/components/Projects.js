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
    let backendUrl = 'https://your-backend-app.herokuapp.com';

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
            return fetch(`${url}/api/projects`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Fetched projects:', data);
                    setProjectSet(data);
                })
                .catch(error => {
                    console.error('Error fetching projects:', error);
                    throw error;  // Re-throw the error to allow fallback logic
                });
        };

        // Try to fetch from Heroku first
        fetchProjects(backendUrl)
            .catch(() => {
                // If fetching from Heroku fails, fall back to localhost
                console.log('Heroku fetch failed, trying localhost...');
                backendUrl = 'http://localhost:5000';
                fetchProjects( backendUrl)
                    .catch(error => {
                        console.error('Error fetching projects from localhost:', error);
                    });
            });
    }, []);

    const nextProject = () => {
        setCurrentProjectNum((currentProjNum + 1) % projectSet.length);
    };

    const prevProject = () => {
        setCurrentProjectNum(currentProjNum === 0 ? projectSet.length - 1 : currentProjNum - 1);
    };

    let currentProject = projectSet[currentProjNum];

    if (!currentProject) {
        return <div>Loading...</div>; // Handle loading state
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
                    <h1>{currentProject.name}</h1>
                    <status>
                        <GoDotFill color={currentProject.status ? 'green' : 'red'} />
                        {currentProject.status ? "Completed" : "In Progress"}
                    </status>
                    <h3>Languages: {currentProject.languages}</h3>
                    <h3>Frameworks: {currentProject.frameworks}</h3>
                </div>
                {console.log(`Image path: ${backendUrl}${currentProject.picture_link}`)}
                <img 
                    src={`${backendUrl}${currentProject.picture_link}`} // Use the dynamic backend URL here
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
