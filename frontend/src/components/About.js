import React, { useEffect } from "react";
import "../components/About.css"
import "../components/home.css"
import Navbar from "../components/Navbar";
import myPic from "..//images/myPic.jpg"
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function About() {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        sessionStorage.setItem('lightMode', 'true');
        navigate('/');
    };

    return (
        <div className="about-me-page">
            <div className="arrows-right">
            <   IoIosArrowDropright className="back-arrow" onClick={() => handleBackToHome()}/>
                <IoIosArrowDroprightCircle className="back-arrow-filled" onClick={() => handleBackToHome()}/>
            </div>
            <Navbar 
                value="about - me"
                light = {true}
            />
            <div className="pic-and-text">
                <div className="pic">
                    <img src={myPic}/>
                </div>
                <div className="text-box">
                    <p>
                    Driven by an insatiable curiosity about the world, I am passionate about learning and discovering how things work. Since the first time I 
                    discovered programming, I've been enamoured. Programming excites me, as I find that logic comes intuitively, providing me with a great deal
                    of satisfaction as I create tangible products of my ideas with real-world applications. I have developed a strong foundation in algorithms 
                    and possess technical skills in Python, C++, and JavaScript, focusing on software and web development. Increasingly, I am interested in 
                    artificial intelligence, machine learning, and cybersecurity, which I hope to be more knowledgeable about.<br/><br/>Alongside programming, 
                    I have always had a deep fascination for languages, extending to linguistics. My journey with lingusitics has helped me gain deeper 
                    appreciation for the complex systems that languages are, and has been integral in improving my communication skills.<br/><br/>In addition to
                    my technical pursuits, I am committed to making a positive impact on the world, no matter how small, and would love more opportunities to do
                    so. I pride myself on being a quick learner, optimistic, and easy to work with.<br/><br/>In my free time, I enjoy reading, exploring new 
                    hobbies, and being close to nature. I have a personal goal of learning ten languages and mastering at least one musical instrument. 
                    I am always open to collaboration and eager to work with others to share ideas and gain hands-on experience.
                    </p>
                </div>
            </div>
        </div>
    )
}