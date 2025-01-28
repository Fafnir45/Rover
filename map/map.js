let canvas = document.getElementById("mapCanvas");
let ctx = canvas.getContext("2d");

let roverPos = { x: 100, y: 100 };

let currentMode = "INS";  
function drawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  
    ctx.fillStyle = "lightblue";  
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(roverPos.x, roverPos.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(roverPos.x, roverPos.y);
    ctx.lineTo(roverPos.x + 50, roverPos.y + 50);  
    ctx.strokeStyle = "blue";
    ctx.stroke();
}

function updatePosition(mode, newPos) {
    if (mode === "INS") {
        roverPos = { x: roverPos.x + newPos.x, y: roverPos.y + newPos.y };
    } else if (mode === "GPS") {
        roverPos = newPos;  
    }

    drawMap();  
}

function toggleMode() {
    currentMode = (currentMode === "INS") ? "GPS" : "INS";
    console.log("Current Mode: " + currentMode);
}

setInterval(() => {
    let simulatedMovement = { x: 10, y: 5 }; 
    updatePosition(currentMode, simulatedMovement); 
}, 1000);

document.getElementById("toggleModeBtn").addEventListener("click", toggleMode);
