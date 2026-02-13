// projets/horloge.js

export const project = {
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
'        <div class="face">\n' +
'            <div class="hand hour" id="hour"></div>\n' +
'            <div class="hand minute" id="minute"></div>\n' +
'            <div class="hand second" id="second"></div>\n' +
'        </div>\n' +
'    </div>\n' +
'    <script src="script.js"><\/script>\n' +
'</body>\n' +
'</html>',
    css: 'body {\n' +
'    background: #2d3436;\n' +
'    display: flex;\n' +
'    justify-content: center;\n' +
'    align-items: center;\n' +
'    min-height: 100vh;\n' +
'    margin: 0;\n' +
'}\n' +
'\n' +
'.clock {\n' +
'    width: 300px;\n' +
'    height: 300px;\n' +
'    border-radius: 50%;\n' +
'    background: white;\n' +
'    box-shadow: 0 20px 40px rgba(0,0,0,0.2);\n' +
'    position: relative;\n' +
'}\n' +
'\n' +
'.face {\n' +
'    width: 100%;\n' +
'    height: 100%;\n' +
'    position: relative;\n' +
'}\n' +
'\n' +
'.hand {\n' +
'    position: absolute;\n' +
'    bottom: 50%;\n' +
'    left: 50%;\n' +
'    transform-origin: bottom;\n' +
'    background: #2d3436;\n' +
'    border-radius: 5px;\n' +
'}\n' +
'\n' +
'.hour {\n' +
'    width: 6px;\n' +
'    height: 70px;\n' +
'    margin-left: -3px;\n' +
'}\n' +
'\n' +
'.minute {\n' +
'    width: 4px;\n' +
'    height: 90px;\n' +
'    margin-left: -2px;\n' +
'}\n' +
'\n' +
'.second {\n' +
'    width: 2px;\n' +
'    height: 100px;\n' +
'    margin-left: -1px;\n' +
'    background: #e74c3c;\n' +
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
'    document.getElementById("hour").style.transform = "rotate(" + hourDeg + "deg)";\n' +
'    document.getElementById("minute").style.transform = "rotate(" + minuteDeg + "deg)";\n' +
'    document.getElementById("second").style.transform = "rotate(" + secondDeg + "deg)";\n' +
'}\n' +
'\n' +
'setInterval(updateClock, 1000);\n' +
'updateClock();'
};
