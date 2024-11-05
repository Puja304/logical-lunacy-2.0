import React, {useEffect} from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "./home.css"
import "./Contact.css"
import Gmail from "../images/gmail.png"
import Discord from "../images/discord.png"
import Insta from "../images/instagram.png"
import Git from "../images/github.png"
import Linkedin from "../images/linkedin.png"
import Phone from "../images/phone.png"
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";


export default function Contact() {
    const navigate = useNavigate();
    useEffect(() => {
        const animateTitle = () => {
            const titles = document.querySelector('.header');
            if(titles){
                titles.style.opacity = 1;
            }
            else{
                console.log("not selected");
            }
            
        }
        
        setTimeout(() => animateTitle(),500);
    }, [])

    const createBox = (text, link, number, icon) => {
        return (
            <div style={{ backgroundColor: boxShades[number % 3] }} className="box">
                <img src={icon} alt="Icon" className="theIcon" />
                <a href={link} className="box-text" target="_blank">{text}</a>
            </div>
        );
    };
    
    const boxShades = [ "#FF7990","#CBFDD0","#FFA872"];

    const handleBackToHome = () => {
        sessionStorage.setItem('lightMode', 'true');
        navigate('/');
    };
    
    return (
        <div className="contact-me-page">
            <div className="arrows-left">
                <IoIosArrowDropleft className="back-arrow" onClick={() => handleBackToHome()}/>
                <IoIosArrowDropleftCircle className="back-arrow-filled" onClick={() => handleBackToHome()}/>
            </div>
            <Navbar value="contact - me" light={true} />
            <div className="main-body">
                <div className="main-grid">
                    {createBox("puja.shah321@gmail.com", "mailto:puja.shah321@gmail.com", 1, Gmail)}
                    {createBox("puja.shah321", "https://www.instagram.com/puja.shah321/", 2, Insta)}
                    {createBox("linkedin.puja.shah", "https://linkedin.com/in/puja-shah-711a79177", 3, Linkedin)}
                    {createBox("github.puja304", "https://github.com/Puja304", 4, Git)}
                    {createBox("778-513-9193", "", 5, Phone)}
                    {createBox("@hopefuldisaster23", "", 6, Discord)}
                </div>
            </div>
            
        </div>
    );
}