// projets/horloge.js

export const project = {
    name: 'Horloge analogique',
    html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Horloge</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="clock">
        <div class="face">
            <div class="hand hour" id="hour"></div>
            <div class="hand minute" id="minute"></div>
            <div class="hand second" id="second"></div>
        </div>
    </div>
    <script src="script.js"><\/script>
</body>
</html>`,
    css: `body {
    background: #2d3436;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
}

.clock {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    position: relative;
}

.face {
    width: 100%;
    height: 100%;
    position: relative;
}

.hand {
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform-origin: bottom;
    background: #2d3436;
    border-radius: 5px;
}

.hour {
    width: 6px;
    height: 70px;
    margin-left: -3px;
}

.minute {
    width: 4px;
    height: 90px;
    margin-left: -2px;
}

.second {
    width: 2px;
    height: 100px;
    margin-left: -1px;
    background: #e74c3c;
}`,
    js: `function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    const hourDeg = (hours * 30) + (minutes * 0.5);
    const minuteDeg = minutes * 6;
    const secondDeg = seconds * 6;
    
    document.getElementById('hour').style.transform = \`rotate(\${hourDeg}deg)\`;
    document.getElementById('minute').style.transform = \`rotate(\${minuteDeg}deg)\`;
    document.getElementById('second').style.transform = \`rotate(\${secondDeg}deg)\`;
}

setInterval(updateClock, 1000);
updateClock();`
};
