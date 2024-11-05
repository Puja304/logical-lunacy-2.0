import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../components/home.css"
import Row from "./row"
import Navbar from "./Navbar"
import Crossword from "./Crossword";
import Menu from "./Menu";

export default function Home () {

    const [key, setKey] = useState(Date.now()); // Unique key for tracking animation reset

    const navigate = useNavigate();

    // let colors = [
    //     "rgba(243, 186, 186, 0.5)",   //green and pink palette
    //     "rgba(248, 208, 200, 0.5)",   
    //     "rgba(249, 221, 216, 0.5)",   
    //     "rgba(167, 181, 158, 0.5)",   
    //     "rgba(121, 149, 103, 0.5)"    
    //   ];

    const [lightMode, setLightMode] = useState(false);

    const toggleMode = () => {
        setLightMode(!lightMode);
    }

    const resetName = (element) => { 
        element.classList.remove('animate-text'); 
        void element.offsetWidth; // Trigger reflow 
        element.classList.add('animate-text'); 
    };


    const resetBody = (element) => { 
        element.classList.remove('expand-div'); 
        void element.offsetWidth; // Trigger reflow 
        element.classList.add('expand-div'); 
    };

    const resetNote = (element) => { 
        element.classList.remove('animate-note'); 
        void element.offsetWidth; // Trigger reflow 
        element.classList.add('animate-note'); 
    };

    let darkColors = [
            "rgba(80, 200, 120, 0.5)",    // green and blue pallete
            "rgba(34, 139, 34, 0.5)",      
            "rgba(152, 251, 152, 0.5)",    
            "rgba(46, 139, 87, 0.5)",      
            "rgba(0, 128, 128, 0.5)"      
    ];


    const randomColor = () => darkColors[Math.floor(Math.random() * darkColors.length)];

    useEffect(() => {
        const sessionLightMode = sessionStorage.getItem('lightMode');
        if (sessionLightMode) {
            setLightMode(true);
        } else {
            setLightMode(false);
        }
    }, []);

    useEffect(() => { if (!lightMode) { // Reset key to force reflow and reset animations 
        setKey(Date.now()); } }, [lightMode]);

    useEffect(() => {

        if(!lightMode){
            const titleElement = document.querySelector('.animated-text'); 
            resetName(titleElement);
            const bodyElement = document.querySelector('.expanding-div');
            resetBody(bodyElement);
            const note = document.querySelector(".note");
            resetNote(note);
        }

        const animateTitle = () => {
            const titles = document.querySelector('.header');
            if(titles){
                titles.style.opacity = 1;
                console.log("Worked");
            }
            else{
                console.log("not selected");
            }
            
        }

        const animateIntro = () => {
            const intro = document.querySelector('.note');
            console.log("Intro element:", intro);
            if (intro) {
                intro.style.opacity = 1;
            } else {
                console.log("No .note element found, skipping animateIntro");
            }
        };

        setTimeout(() => animateTitle(), 500);
        setTimeout(() => animateIntro(),1500);

    }, [lightMode]);


    return (
        <div className={`homepage ${lightMode ? 'light-mode' : 'dark-mode'}`} >
            <div className="animated-text">
                <p>logical lunacy</p>
            </div>
            <div className="expanding-div" style={{animationDuration : lightMode ? "2s ": "0s"}}>
                {lightMode ? <Menu/> : <Crossword/>}
            </div>
            <div className="note" style={{animationDelay : lightMode ? "0s ": "7s", visibility : lightMode ? "visible" : "hidden"}}>
                <button onClick={toggleMode}>
                    {lightMode ? "Close" : "Menu"}
                </button>
            </div>
        </div>
    );
}