// js/side-barre.js

document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    loadProjects();
});

function initSidebar() {
    // Gestionnaire déjà dans header.js pour le toggle
    // Préparation du conteneur
    const projectList = document.getElementById('project-list');
    if (projectList) {
        projectList.innerHTML = '';
    }
}

// 5 projets d'exemple
const projects = [
    {
        name: 'Carte de visite',
        html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carte de visite</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="card">
        <img src="https://placehold.co/100x100/4c9a8c/white?text=MG" alt="Avatar" class="avatar">
        <h2>Marie Dupont</h2>
        <p class="title">Développeuse web</p>
        <p>Créative & passionnée</p>
        <div class="social">
            <span>🐦</span>
            <span>💼</span>
            <span>📧</span>
        </div>
        <button>Contact</button>
    </div>
    <script src="script.js"><\/script>
</body>
</html>`,
        css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(145deg, #e0e5ec, #c2cbd9);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.card {
    background: #e0e5ec;
    max-width: 350px;
    padding: 30px 20px;
    border-radius: 30px;
    box-shadow: 20px 20px 30px #a3b1c6, -20px -20px 30px #ffffff;
    text-align: center;
    transition: 0.3s;
}

.avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 15px;
    box-shadow: 10px 10px 15px #a3b1c6, -10px -10px 15px #ffffff;
}

h2 {
    color: #4a4e69;
    margin-bottom: 5px;
}

.title {
    color: #4c9a8c;
    font-weight: 600;
    margin-bottom: 15px;
}

.social {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 20px 0;
    font-size: 24px;
}

button {
    background: #4c9a8c;
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 30px;
    font-size: 16px;
    box-shadow: 5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff;
    cursor: pointer;
    transition: 0.1s;
}

button:active {
    box-shadow: inset 5px 5px 10px #2f5e55, inset -5px -5px 10px #69d6c3;
}`,
        js: `document.querySelector('button').addEventListener('click', () => {
    alert('Merci pour votre intérêt !');
});

// Animation au survol
const card = document.querySelector('.card');
card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-5px)';
});

card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
});`
    },
    {
        name: 'Todo liste',
        html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ma Todo</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="todo-container">
        <h1>📝 Todo liste</h1>
        <div class="input-group">
            <input type="text" id="taskInput" placeholder="Ajouter une tâche...">
            <button id="addBtn">+</button>
        </div>
        <ul id="taskList"></ul>
    </div>
    <script src="script.js"><\/script>
</body>
</html>`,
        css: `body {
    font-family: 'Inter', sans-serif;
    background: #e0e5ec;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    padding: 20px;
}

.todo-container {
    background: #e0e5ec;
    width: 100%;
    max-width: 450px;
    padding: 30px;
    border-radius: 30px;
    box-shadow: 20px 20px 30px #a3b1c6, -20px -20px 30px #ffffff;
}

h1 {
    color: #4a4e69;
    text-align: center;
    margin-bottom: 30px;
    font-size: 28px;
}

.input-group {
    display: flex;
    gap: 10px;
    margin-bottom: 25px;
}

input {
    flex: 1;
    padding: 12px 20px;
    border: none;
    border-radius: 30px;
    background: #e0e5ec;
    box-shadow: inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff;
    font-size: 16px;
}

input:focus {
    outline: none;
}

#addBtn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background: #4c9a8c;
    color: white;
    font-size: 24px;
    box-shadow: 5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff;
    cursor: pointer;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

li {
    background: #e0e5ec;
    padding: 12px 20px;
    margin-bottom: 10px;
    border-radius: 30px;
    box-shadow: 5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

li button {
    background: #ff6b6b;
    color: white;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
}`,
        js: `const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        const li = document.createElement('li');
        li.innerHTML = \`
            <span>\${text}</span>
            <button onclick="this.parentElement.remove()">✕</button>
        \`;
        taskList.appendChild(li);
        taskInput.value = '';
    }
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});`
    },
    {
        name: 'Calculatrice',
        html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculatrice</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="calculator">
        <div class="display" id="display">0</div>
        <div class="buttons">
            <button onclick="clear_()">C</button>
            <button onclick="append('/')">÷</button>
            <button onclick="append('*')">×</button>
            <button onclick="append('7')">7</button>
            <button onclick="append('8')">8</button>
            <button onclick="append('9')">9</button>
            <button onclick="append('-')">-</button>
            <button onclick="append('4')">4</button>
            <button onclick="append('5')">5</button>
            <button onclick="append('6')">6</button>
            <button onclick="append('+')">+</button>
            <button onclick="append('1')">1</button>
            <button onclick="append('2')">2</button>
            <button onclick="append('3')">3</button>
            <button onclick="calculate()">=</button>
            <button onclick="append('0')" colspan="2">0</button>
            <button onclick="append('.')">.</button>
        </div>
    </div>
    <script src="script.js"><\/script>
</body>
</html>`,
        css: `body {
    background: #e0e5ec;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
    margin: 0;
}

.calculator {
    background: #e0e5ec;
    padding: 25px;
    border-radius: 30px;
    box-shadow: 20px 20px 30px #a3b1c6, -20px -20px 30px #ffffff;
    width: 320px;
}

.display {
    background: #e0e5ec;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 15px;
    box-shadow: inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff;
    font-size: 28px;
    text-align: right;
    color: #4a4e69;
    word-wrap: break-word;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
}

button {
    background: #e0e5ec;
    border: none;
    padding: 15px;
    border-radius: 15px;
    font-size: 20px;
    box-shadow: 5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff;
    cursor: pointer;
    color: #4a4e69;
}

button:active {
    box-shadow: inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff;
}

button[colspan="2"] {
    grid-column: span 2;
}

button:last-child {
    background: #4c9a8c;
    color: white;
}`,
        js: `let display = document.getElementById('display');

function append(value) {
    if (display.innerText === '0') {
        display.innerText = value;
    } else {
        display.innerText += value;
    }
}

function clear_() {
    display.innerText = '0';
}

function calculate() {
    try {
        display.innerText = eval(display.innerText);
    } catch {
        display.innerText = 'Erreur';
    }
}`
    },
    {
        name: 'Compteur',
        html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Compteur</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="counter">
        <h2>Compteur MG_ULTRA</h2>
        <div class="display" id="count">0</div>
        <div class="buttons">
            <button id="decrement">-</button>
            <button id="reset">↺</button>
            <button id="increment">+</button>
        </div>
    </div>
    <script src="script.js"><\/script>
</body>
</html>`,
        css: `body {
    background: #e0e5ec;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
    margin: 0;
}

.counter {
    background: #e0e5ec;
    padding: 30px;
    border-radius: 30px;
    box-shadow: 20px 20px 30px #a3b1c6, -20px -20px 30px #ffffff;
    text-align: center;
    width: 300px;
}

h2 {
    color: #4a4e69;
    margin-bottom: 20px;
}

.display {
    font-size: 64px;
    font-weight: 700;
    color: #4c9a8c;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 15px;
    box-shadow: inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff;
}

.buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
}

.buttons button {
    width: 60px;
    height: 60px;
    border-radius: 15px;
    border: none;
    background: #e0e5ec;
    box-shadow: 5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff;
    font-size: 24px;
    cursor: pointer;
    color: #4a4e69;
}

.buttons button:active {
    box-shadow: inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff;
}

#reset {
    color: #ff6b6b;
}`,
        js: `let count = 0;
const countEl = document.getElementById('count');

document.getElementById('increment').addEventListener('click', () => {
    count++;
    countEl.textContent = count;
});

document.getElementById('decrement').addEventListener('click', () => {
    count--;
    countEl.textContent = count;
});

document.getElementById('reset').addEventListener('click', () => {
    count = 0;
    countEl.textContent = count;
});`
    },
    {
        name: 'Générateur couleur',
        html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Générateur couleur</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="color-box" id="colorBox">#4c9a8c</div>
        <button id="generate">🎲 Générer</button>
        <button id="copy">📋 Copier</button>
    </div>
    <script src="script.js"><\/script>
</body>
</html>`,
        css: `body {
    background: #e0e5ec;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
    margin: 0;
}

.container {
    background: #e0e5ec;
    padding: 30px;
    border-radius: 30px;
    box-shadow: 20px 20px 30px #a3b1c6, -20px -20px 30px #ffffff;
    text-align: center;
    width: 300px;
}

.color-box {
    width: 200px;
    height: 200px;
    margin: 0 auto 20px;
    border-radius: 20px;
    background: #4c9a8c;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
    font-weight: 600;
    text-shadow: 0 2px 5px rgba(0,0,0,0.2);
    box-shadow: 10px 10px 15px #a3b1c6, -10px -10px 15px #ffffff;
}

button {
    background: #e0e5ec;
    border: none;
    padding: 12px 20px;
    margin: 5px;
    border-radius: 30px;
    font-size: 16px;
    box-shadow: 5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff;
    cursor: pointer;
    color: #4a4e69;
}

button:active {
    box-shadow: inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff;
}

#copy {
    background: #4c9a8c;
    color: white;
}`,
        js: `const colorBox = document.getElementById('colorBox');
const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');

function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

generateBtn.addEventListener('click', () => {
    const color = randomColor();
    colorBox.style.backgroundColor = color;
    colorBox.textContent = color;
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(colorBox.textContent);
    const original = copyBtn.textContent;
    copyBtn.textContent = '✅ Copié !';
    setTimeout(() => copyBtn.textContent = original, 1000);
});`
    }
];

function loadProjects() {
    const projectList = document.getElementById('project-list');
    if (!projectList) return;
    
    projects.forEach((project, index) => {
        const btn = document.createElement('button');
        btn.className = 'project-btn';
        btn.textContent = project.name;
        btn.dataset.index = index;
        
        btn.addEventListener('click', () => {
            ejectProject(index);
        });
        
        projectList.appendChild(btn);
    });
}

function ejectProject(index) {
    const project = projects[index];
    if (!project) return;
    
    // Injecte dans les éditeurs
    if (window.editors?.html) {
        window.editors.html.setValue(project.html);
    }
    if (window.editors?.css) {
        window.editors.css.setValue(project.css);
    }
    if (window.editors?.js) {
        window.editors.js.setValue(project.js);
    }
    
    // Sauvegarde automatique
    localStorage.setItem('editor_html', project.html);
    localStorage.setItem('editor_css', project.css);
    localStorage.setItem('editor_js', project.js);
    
    // Feedback visuel
    const btn = event?.target;
    if (btn) {
        btn.style.boxShadow = 'inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff';
        setTimeout(() => {
            btn.style.boxShadow = '5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff';
        }, 200);
    }
}

// Exposition globale
window.ejectProject = ejectProject;
// Appel API_ULTRA après chargement projets par défaut
window.defaultProjects = projects;
if (window.API_ULTRA) {
    setTimeout(() => API_ULTRA.init(), 100);
}