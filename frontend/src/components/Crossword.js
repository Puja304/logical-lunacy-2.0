import React, { useEffect } from "react"
import Row from "./row"
import Navbar from "./Navbar"
import "../components/home.css"

export default function Crossword(){


        let darkColors = [
            // "rgba(80, 200, 120, 0.7)",    // green and blue pallete
            // "rgba(34, 139, 34, 0.7)",      
            // "rgba(152, 251, 152, 0.7)",    
            // "rgba(46, 139, 87, 0.7)",      
            // "rgba(0, 128, 128, 0.7)"    
           // "rgba(0,0,0,1)",
           'rgba(34, 49, 34, 1)',        // Deep Forest Green
           'rgba(47, 79, 47, 1)',        // Dark Olive Green
           'rgba(85, 107, 47, 1)',       // Olive Drab
           'rgba(143, 188, 143, 1)',     // Sage Green
           'rgba(143, 160, 59, 1)',     // Khaki Green
            // 'rgba(0, 0, 0, 0.7)',        // Black (for headings)
            // 'rgba(50, 50, 50, 0.7)',     // Dark Grey (for subheadings)
            // 'rgba(255, 255, 255, 0.7)',  // White (for body text)
            // 'rgba(255, 99, 71, 0.7)',     // Tomato (for accents)
            // 'rgba(240, 230, 140, 0.7)'   // Khaki (for buttons)
            // 'rgba(240, 240, 240, 0.8)',      // Light Grey (for subtle backgrounds or borders)
            // 'rgba(200, 200, 200, 0.8)',      // Soft Grey (for muted text or elements)
            // 'rgba(255, 255, 255, 0.8)',    // Semi-Transparent White (for overlays)
            // 'rgba(245, 245, 245, 0.8)'       // Very Light Grey (for background elements)
            // 'rgba(255, 255, 255, 0.8)',        // Pure White with 80% opacity
            // 'rgba(240, 230, 220, 0.8)',        // Light Beige with 80% opacity
            // 'rgba(220, 220, 220, 0.8)',        // Light Gray with 80% opacity
            // 'rgba(235, 225, 240, 0.8)',        // Light Lavender (soft taupe) with 80% opacity
            // 'rgba(255, 245, 230, 0.8)',        // Light Cream with 80% opacity
            // 'rgba(0, 0, 0, 1)',            // Pure Black
            // 'rgba(34, 34, 34, 1)',         // Very Dark Gray
            // 'rgba(68, 68, 68, 1)',         // Dark Gray
            // 'rgba(119, 119, 119, 1)',      // Medium Gray
            // 'rgba(170, 170, 170, 1)',      // Light Gray
            // 'rgba(210, 180, 140, 1)',     // Tan
            // 'rgba(222, 184, 135, 1)',     // Burlywood
            // 'rgba(245, 222, 179, 1)',     // Wheat
            // 'rgba(238, 232, 205, 1)',     // Bone White
            // 'rgba(250, 240, 230, 1)',     // Linen

    //     let darkColors = [
    //     "rgba(243, 186, 186, 0.9)",   //green and pink palette
    //     "rgba(248, 208, 200, 0.9)",   
    //     "rgba(249, 221, 216, 0.9)",   
    //     "rgba(167, 181, 158, 0.9)",   
    //     "rgba(121, 149, 103, 0.9)"    
    //   
    ];

    const randomColor = () => darkColors[Math.floor(Math.random() * darkColors.length)];

            
    useEffect(() => {
        const animateRow = (rowIndex) => {
            const cross = document.querySelector('.cross');
            const row = cross.querySelectorAll('.aRow')[rowIndex];
            if (row) {
                const cells = row.querySelectorAll('td');
                
                cells.forEach((cell, i) => {
                    setTimeout(() => {
                      cell.style.opacity = 1;
                      cell.style.backgroundColor = randomColor();
                      cell.style.color = "white";
                      cell.style.fontWeight = "bold";
                      //i%2 == 0 ? cell.style.backgroundColor = "rgba(255, 255, 255, 0.3)" : cell.style.backgroundColor = "rgb(0,0,0,0.3)";
                    }, i * 100); // Adjust delay between cells if needed
                  });
            }
        };
 
        const animateColumn = (colIndex) => {
            const cross = document.querySelector('.cross');
            const rows = cross.querySelectorAll('.aRow');
            rows.forEach((row,i) => {
                const cell = row.children[colIndex];
                if (cell) {
                    setTimeout(() => {
                        cell.style.opacity = 1;
                        cell.style.backgroundColor = randomColor();
                        cell.style.color = "white";
                        cell.style.fontWeight = "bold";
                        //i%2 == 0 ? cell.style.backgroundColor = "rgba(255, 255, 255, 0.3)" : cell.style.backgroundColor = "rgb(0,0,0,0.3)";
                      }, i * 100); // Adjust delay between cells if needed
                }
            });
        };

        const animateRest = () => {
            const cross = document.querySelector('.cross');
            const rows = cross.querySelectorAll('.aRow');
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
                  cell.style.color = "white";
                  cell.style.fontWeight = "bold";
                 //(rowIndex + colIndex) % 2 === 0 ? cell.style.backgroundColor = "rgba(255, 255, 255, 0.3)" : cell.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
                }, (rowIndex + colIndex) * 50); // Adjust delay between cells if needed
              });
            });
          };
        // Sequence animations: Row 1, Column 6, Row 4

        const area = document.querySelector('.expanding-div');
        area.style.height = "65%";
        area.style.width = "65%"


        const row1Timeout = setTimeout(() => animateRow(3), 1500);
        const columnTimeout = setTimeout(() => animateColumn(8), 3000);
        const row2Timeout = setTimeout(() => animateRow(5), 4000);
        const restTimeout = setTimeout(() => animateRest(), 6000);

        return () => {
            clearTimeout(row1Timeout);
            clearTimeout(columnTimeout);
            clearTimeout(row2Timeout);
            clearTimeout(restTimeout);
        };

    },[])

    return (
        <div className="crossword-intro">
            <table className="cross">
                <tbody>
                    <Row value= "" pos = {0} columns = {20}/>
                    <Row value= "" pos = {0} columns = {20}/>
                    <Row value= "I'" pos = {8} columns = {20}/>
                    <Row value= "WELCOME" pos = {3} columns = {20}/>
                    <Row value= "/" pos = {8} columns = {20}/>
                    <Row value= "A/PROGRAMMER" pos = {6} columns = {20}/>
                    <Row value= "U" pos = {8} columns = {20}/>
                    <Row value= "J" pos = {8} columns = {20}/>
                    <Row value= "A" pos = {8} columns = {20}/>
                    <Row value= "" pos = {0} columns = {20}/>
                </tbody>
                
            </table>
        </div>
    )
}