import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../components/home.css"
import Row from "./row"
import Navbar from "./Navbar"
import Crossword from "./Crossword";
import Menu from "./Menu";

export default function Home () {

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


    useEffect(() => {
        const animateRow = (rowIndex) => {
            const row = document.querySelectorAll('.aRow')[rowIndex];
            if (row) {
                const cells = row.querySelectorAll('td');
                
                cells.forEach((cell, i) => {
                    setTimeout(() => {
                      cell.style.opacity = 1;
                      cell.style.backgroundColor = randomColor();
                      //i%2 == 0 ? cell.style.backgroundColor = "rgba(255, 255, 255, 0.3)" : cell.style.backgroundColor = "rgb(0,0,0,0.3)";
                    }, i * 100); // Adjust delay between cells if needed
                  });
            }
        };
 
        const animateColumn = (colIndex) => {
            const rows = document.querySelectorAll('.aRow');
            rows.forEach((row,i) => {
                const cell = row.children[colIndex];
                if (cell) {
                    setTimeout(() => {
                        cell.style.opacity = 1;
                        cell.style.backgroundColor = randomColor();
                        //i%2 == 0 ? cell.style.backgroundColor = "rgba(255, 255, 255, 0.3)" : cell.style.backgroundColor = "rgb(0,0,0,0.3)";
                      }, i * 100); // Adjust delay between cells if needed
                }
            });
        };

        const animateRest = () => {
            const rows = document.querySelectorAll('.aRow');
            let rownum = 0;
          
            rows.forEach((row, rowIndex) => {
              rownum += 1;
              let colnum = 0;
              const cells = row.querySelectorAll('td');
          
              cells.forEach((cell, colIndex) => {
                colnum += 1;
                setTimeout(() => {
                  cell.style.opacity = 1;
                  cell.style.backgroundColor = randomColor();
                 //(rowIndex + colIndex) % 2 === 0 ? cell.style.backgroundColor = "rgba(255, 255, 255, 0.3)" : cell.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
                }, (rowIndex + colIndex) * 50); // Adjust delay between cells if needed
              });
            });
          };
        // Sequence animations: Row 1, Column 6, Row 4

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

        const animateMenu = () => {
            const row = document.querySelector('.aRow')
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

        setTimeout(() => animateTitle(), 500);

        if(lightMode && window.location.path == "/"){  
            setTimeout(() => animateMenu(), 500);
            setTimeout(() => animateIntro(),1500);
        }
        else{
            if(!lightMode){
                setTimeout(() => animateRow(3), 1000);
                setTimeout(() => animateColumn(8), 2500);
                setTimeout(() => animateRow(5), 3500);
                setTimeout(() => animateRest(), 5500);
                setTimeout(() => animateIntro(),7200);
            }

        }

    }, [lightMode]);




    return (
        <div className="homepage" style = {{backgroundColor : lightMode ? "#FFFFFF" : "black"}} >
            <Navbar 
                value="logical&ensp;&ensp;&ensp;lunacy"
                light = {lightMode}
            />
            {lightMode ? <Menu/> : <Crossword/>}
            <div className="note">
                <button onClick={toggleMode} style={{backgroundColor : lightMode ? "#000000" : "#FFFFFF", color : lightMode ? "#FFFFFF" : "black"}}>
                    {lightMode ? "Close" : "Menu"}
                </button>
            </div>
        </div>
    );
}