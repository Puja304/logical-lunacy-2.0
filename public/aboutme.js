const move = document.getElementsByTagName("img");
let mainThing = document.querySelector(".text");
const hint = document.createElement('h4');
hint.textContent = "I see you've disregarded the warning. If it helps, just know that they value persistence";


// Convert HTMLCollection to an array
Array.from(move).forEach(element => {
    let counter = 0;
    let following = false;

    element.addEventListener("click", function () {
        counter++;
        
        if (counter <= 35) {
            following = true;
            element.classList.add("whenClicked");
        } else {
            following = false;
            element.classList.remove("whenClicked");
            counter = 0; // Reset counter after 5 clicks
        }

        document.body.onpointermove = event => {
            if (following) {
                const { clientX, clientY } = event;
                element.animate({
                    left: `${clientX}px`,
                    top: `${clientY}px`
                }, {duration: 1000, fill: "forwards"});
                mainThing.appendChild(hint);
            }
            else{
                mainThing.removeChild(hint);
            }
        }
    });
});
