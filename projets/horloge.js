// projets/horloge.js

window.project = {
    name: 'Horloge analogique',
    html: `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Horloge</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="clock">
        <div class="clock-face">
            <div class="hand hour" id="hour"></div>
            <div class="hand minute" id="minute"></div>
            <div class="hand second" id="second"></div>
        </div>
    </div>
    <script src="script.js"><\/script>
</body>
</html>
`,
    css: `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #2d3436;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: sans-serif;
}

.clock {
    width: 350px;
    height: 350px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    position: relative;
    padding: 20px;
}

.clock-face {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 50%;
}

.hand {
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform-origin: bottom;
    background: #2d3436;
    border-radius: 5px;
    transition: transform 0.05s cubic-bezier(0.4, 2.5, 0.6, 1);
}

.hour {
    width: 6px;
    height: 80px;
    margin-left: -3px;
}

.minute {
    width: 4px;
    height: 110px;
    margin-left: -2px;
}

.second {
    width: 2px;
    height: 130px;
    margin-left: -1px;
    background: #e74c3c;
}

.clock-face::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 15px;
    height: 15px;
    background: #2d3436;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
}
`,
    js: `
function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    const hourDeg = (hours * 30) + (minutes * 0.5);
    const minuteDeg = minutes * 6;
    const secondDeg = seconds * 6;
    
    const hourHand = document.getElementById("hour");
    const minuteHand = document.getElementById("minute");
    const secondHand = document.getElementById("second");
    
    if (hourHand) hourHand.style.transform = "rotate(" + hourDeg + "deg)";
    if (minuteHand) minuteHand.style.transform = "rotate(" + minuteDeg + "deg)";
    if (secondHand) secondHand.style.transform = "rotate(" + secondDeg + "deg)";
}

setInterval(updateClock, 1000);
updateClock();

console.log("✅ Horloge chargée !");
`
};
