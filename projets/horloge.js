// projets/horloge.js

export const project = {
    name: 'Horloge numérique',
    html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Horloge MG_ULTRA</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="clock-container">
        <div class="clock">
            <div class="time" id="time">00:00:00</div>
            <div class="date" id="date">Lundi 1 Janvier 2024</div>
        </div>
    </div>
    <script src="script.js"><\/script>
</body>
</html>`,
    
    css: `body {
    margin: 0;
    padding: 0;
    background: #e0e5ec;
    font-family: 'Inter', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.clock-container {
    background: #e0e5ec;
    padding: 40px;
    border-radius: 50px;
    box-shadow: 20px 20px 30px #a3b1c6, -20px -20px 30px #ffffff;
}

.clock {
    text-align: center;
}

.time {
    font-size: 72px;
    font-weight: 700;
    color: #4c9a8c;
    text-shadow: 2px 2px 4px #a3b1c6;
    margin-bottom: 10px;
    font-family: 'Monaco', monospace;
    background: #e0e5ec;
    padding: 20px 40px;
    border-radius: 30px;
    box-shadow: inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff;
}

.date {
    font-size: 24px;
    color: #4a4e69;
    font-weight: 500;
}`,
    
    js: `function updateClock() {
    const now = new Date();
    
    // Heure
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('time').textContent = \`\${hours}:\${minutes}:\${seconds}\`;
    
    // Date
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    
    document.getElementById('date').textContent = \`\${dayName} \${day} \${month} \${year}\`;
}

updateClock();
setInterval(updateClock, 1000);`
};