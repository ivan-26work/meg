// projets/horloge.js

window.project = {
    name: 'Horloge analogique',
    html: '<!DOCTYPE html>\n' +
'<html lang="fr">\n' +
'<head>\n' +
'    <meta charset="UTF-8">\n' +
'    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'    <title>Horloge</title>\n' +
'    <link rel="stylesheet" href="style.css">\n' +
'</head>\n' +
'<body>\n' +
'    <div class="clock">\n' +
'        <div class="clock-face">\n' +
'            <div class="hand hour" id="hour"></div>\n' +
'            <div class="hand minute" id="minute"></div>\n' +
'            <div class="hand second" id="second"></div>\n' +
'        </div>\n' +
'    </div>\n' +
'    <script src="script.js"><\/script>\n' +
'</body>\n' +
'</html>',
    css: '* {\n' +
'    margin: 0;\n' +
'    padding: 0;\n' +
'    box-sizing: border-box;\n' +
'}\n' +
'\n' +
'body {\n' +
'    background: #2d3436;\n' +
'    display: flex;\n' +
'    justify-content: center;\n' +
'    align-items: center;\n' +
'    min-height: 100vh;\n' +
'    font-family: sans-serif;\n' +
'}\n' +
'\n' +
'.clock {\n' +
'    width: 350px;\n' +
'    height: 350px;\n' +
'    border-radius: 50%;\n' +
'    background: white;\n' +
'    box-shadow: 0 20px 40px rgba(0,0,0,0.2);\n' +
'    position: relative;\n' +
'    padding: 20px;\n' +
'}\n' +
'\n' +
'.clock-face {\n' +
'    width: 100%;\n' +
'    height: 100%;\n' +
'    position: relative;\n' +
'    border-radius: 50%;\n' +
'}\n' +
'\n' +
'.hand {\n' +
'    position: absolute;\n' +
'    bottom: 50%;\n' +
'    left: 50%;\n' +
'    transform-origin: bottom;\n' +
'    background: #2d3436;\n' +
'    border-radius: 5px;\n' +
'    transition: transform 0.05s cubic-bezier(0.4, 2.5, 0.6, 1);\n' +
'}\n' +
'\n' +
'.hour {\n' +
'    width: 6px;\n' +
'    height: 80px;\n' +
'    margin-left: -3px;\n' +
'}\n' +
'\n' +
'.minute {\n' +
'    width: 4px;\n' +
'    height: 110px;\n' +
'    margin-left: -2px;\n' +
'}\n' +
'\n' +
'.second {\n' +
'    width: 2px;\n' +
'    height: 130px;\n' +
'    margin-left: -1px;\n' +
'    background: #e74c3c;\n' +
'}\n' +
'\n' +
'.clock-face::after {\n' +
'    content: "";\n' +
'    position: absolute;\n' +
'    top: 50%;\n' +
'    left: 50%;\n' +
'    width: 15px;\n' +
'    height: 15px;\n' +
'    background: #2d3436;\n' +
'    border-radius: 50%;\n' +
'    transform: translate(-50%, -50%);\n' +
'    z-index: 10;\n' +
'}',
    js: 'function updateClock() {\n' +
'    const now = new Date();\n' +
'    const hours = now.getHours() % 12;\n' +
'    const minutes = now.getMinutes();\n' +
'    const seconds = now.getSeconds();\n' +
'    \n' +
'    const hourDeg = (hours * 30) + (minutes * 0.5);\n' +
'    const minuteDeg = minutes * 6;\n' +
'    const secondDeg = seconds * 6;\n' +
'    \n' +
'    const hourHand = document.getElementById("hour");\n' +
'    const minuteHand = document.getElementById("minute");\n' +
'    const secondHand = document.getElementById("second");\n' +
'    \n' +
'    if (hourHand) hourHand.style.transform = "rotate(" + hourDeg + "deg)";\n' +
'    if (minuteHand) minuteHand.style.transform = "rotate(" + minuteDeg + "deg)";\n' +
'    if (secondHand) secondHand.style.transform = "rotate(" + secondDeg + "deg)";\n' +
'}\n' +
'\n' +
'setInterval(updateClock, 1000);\n' +
'updateClock();\n' +
'\n' +
'console.log("Horloge chargée !");'
};
