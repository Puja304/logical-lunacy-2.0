import React, {useEffect} from "react"
import Row from "./row"
import Navbar from "./Navbar"
import "../components/home.css"
import {useNavigate} from "react-router-dom";

export default function Menu(){
    const navigate = useNavigate();

    useEffect(() => {
        const animateMenu = () => {
            const menu = document.querySelector('.menu-body');
            const row = menu.querySelector('.aRow')
            if (row) {
                const cells = row.querySelectorAll('td');
                
                cells.forEach((cell, i) => {
                    cell.style.backgroundColor =  "black";
                    setTimeout(() => {cell.style.opacity = 1;}, i * 30)

                  });
            }
            const table = document.querySelector('.menu');
            table.style.opacity = 1;
        }

        setTimeout(() => animateMenu(), 500);

        const area = document.querySelector('.expanding-div');
        area.style.height = "100vh";
        area.style.width = "100%"
    },[])
    
    const aboutLeft = () => {
        return (

            <div className="about-me">
                <button onClick={() => navigate('/About')}>
                    <table>
                        <tbody>
                        <Row value="a" pos="0" columns={1}/>
                        <Row value="b" pos="0" columns={1}/>
                        <Row value="o" pos="0" columns={1}/>
                        <Row value="u" pos="0" columns={1}/>
                        <Row value="t" pos="0" columns={1}/>
                        {/* <Row value="-" pos="0" columns={1}/>
                        <Row value="m" pos="0" columns={1}/>
                        <Row value="e" pos="0" columns={1}/> */}
                        </tbody>
                    </table>
                </button>
            </div>
        )
    }

    const contactRight = () => {
        return (
            <div className="contact">
                <button onClick={() => navigate('/contact')}>
                    <table>
                        <tbody>
                        <Row value="c" pos="0" columns={1}/>
                        <Row value="o" pos="0" columns={1}/>
                        <Row value="n" pos="0" columns={1}/>
                        <Row value="t" pos="0" columns={1}/>
                        <Row value="a" pos="0" columns={1}/>
                        <Row value="c" pos="0" columns={1}/>
                        <Row value="t" pos="0" columns={1}/>
                        </tbody>
                    </table>
                </button>
            </div>
        )
    }

    const projectsDown = () => {
        return (
            <div className="projects">
                <button onClick={() => navigate('/projects')}>
                    <table>
                        <tbody>
                        <Row value="projects" pos="0" columns={8}/>
                        </tbody>
                    </table>
                </button>
            </div>
        )
    }


    return (
        <>
            <div className="menu">
                <table className="menu-table">
                    <tbody className="menu-body">
                        <Row value="MENU" pos="0" columns={4}/>
                    </tbody>    
                </table>
            </div>
            {aboutLeft()}
            {contactRight()}
            {projectsDown()}

        </>
    )

}