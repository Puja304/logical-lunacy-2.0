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

    useEffect(() => {
        const animateTitle = () => {
            const titles = document.querySelector('.header');
            if (titles) {
                titles.style.opacity = 1;
            }
        };
        setTimeout(() => animateTitle(), 500);

        console.log('Fetching projects...');
        fetch('http://localhost:5000')
            .then(response => {
                console.log('Response received:', response);
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
                <IoArrowUpCircleOutline className="back-arrow" color="white" onClick={() => handleBackToHome()} />
                <IoArrowUpCircle className="back-arrow-filled" color="white" onClick={() => handleBackToHome()} />
            </div>
            <Navbar value="Projects" light={false} />
            <div className="project-container">
                <h1>{currentProject.name}</h1>
                <status>
                    <GoDotFill color={currentProject.status ? 'green' : 'red'} />
                    {currentProject.status ? "Completed" : "In Progress"}
                </status>
                <h3>Languages: {currentProject.languages}</h3>
                <h3>Frameworks: {currentProject.frameworks}</h3>
                {console.log(`Image path: http://localhost:5000${currentProject.picture_link}`)}
                <img src={`http://localhost:5000/${currentProject.picture_link}`} alt={currentProject.name} />
                <p>{currentProject.description}</p>
                <div className="arrows">
                    <FaArrowRight className="right" onClick={nextProject} />
                    <FaArrowLeft className="left" onClick={prevProject} />
                </div>
            </div>
        </div>
    );
}