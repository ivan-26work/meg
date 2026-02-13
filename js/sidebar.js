// js/sidebar.js

// Projets locaux (5 exemples complets)
const LOCAL_PROJECTS = [
    {
        name: 'Carte de visite',
        html: '<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Carte</title>\n    <link rel="stylesheet" href="style.css">\n</head>\n<body>\n    <div class="card">\n        <h2>Marie Dupont</h2>\n        <p>Développeuse</p>\n        <button>Contact</button>\n    </div>\n</body>\n</html>',
        css: 'body { background: #f0f2f5; display: flex; justify-content: center; align-items: center; min-height: 100vh; }\n.card { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; }\nh2 { color: #333; }\nbutton { background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }',
        js: 'document.querySelector("button").addEventListener("click", () => alert("Bonjour !"));'
    },
    {
        name: 'Compteur',
        html: '<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Compteur</title>\n    <link rel="stylesheet" href="style.css">\n</head>\n<body>\n    <div class="counter">\n        <h2>Compteur</h2>\n        <div class="display" id="count">0</div>\n        <button id="inc">+</button>\n        <button id="dec">-</button>\n        <button id="reset">Reset</button>\n    </div>\n    <script src="script.js"><\/script>\n</body>\n</html>',
        css: 'body { font-family: Arial; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f0f2f5; }\n.counter { background: white; padding: 30px; border-radius: 10px; text-align: center; }\n.display { font-size: 48px; margin: 20px; }\nbutton { margin: 5px; padding: 10px 20px; font-size: 16px; cursor: pointer; }',
        js: 'let count = 0;\nconst countEl = document.getElementById("count");\ndocument.getElementById("inc").addEventListener("click", () => { count++; countEl.textContent = count; });\ndocument.getElementById("dec").addEventListener("click", () => { count--; countEl.textContent = count; });\ndocument.getElementById("reset").addEventListener("click", () => { count = 0; countEl.textContent = count; });'
    },
    {
        name: 'Todo simple',
        html: '<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Todo</title>\n    <link rel="stylesheet" href="style.css">\n</head>\n<body>\n    <div class="todo">\n        <h2>Ma liste</h2>\n        <input id="task" placeholder="Nouvelle tâche">\n        <button id="add">Ajouter</button>\n        <ul id="list"></ul>\n    </div>\n    <script src="script.js"><\/script>\n</body>\n</html>',
        css: 'body { font-family: Arial; background: #f0f2f5; padding: 20px; }\n.todo { max-width: 400px; margin: auto; background: white; padding: 20px; border-radius: 10px; }\ninput { width: 70%; padding: 8px; }\nbutton { padding: 8px 15px; background: #667eea; color: white; border: none; cursor: pointer; }\nul { list-style: none; padding: 0; }\nli { padding: 8px; margin: 5px 0; background: #f8f9fa; display: flex; justify-content: space-between; }',
        js: 'const input = document.getElementById("task");\nconst addBtn = document.getElementById("add");\nconst list = document.getElementById("list");\n\nfunction addTask() {\n    if(input.value.trim()) {\n        const li = document.createElement("li");\n        li.innerHTML = input.value + \' <button onclick="this.parentElement.remove()">✕</button>\';\n        list.appendChild(li);\n        input.value = "";\n    }\n}\n\naddBtn.addEventListener("click", addTask);\ninput.addEventListener("keypress", (e) => { if(e.key === "Enter") addTask(); });'
    },
    {
        name: 'Convertisseur',
        html: '<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Convertisseur</title>\n    <link rel="stylesheet" href="style.css">\n</head>\n<body>\n    <div class="converter">\n        <h2>EUR → USD</h2>\n        <input id="euros" type="number" value="1">\n        <p>= <span id="dollars">1.09</span> USD</p>\n    </div>\n    <script src="script.js"><\/script>\n</body>\n</html>',
        css: 'body { font-family: Arial; background: #f0f2f5; display: flex; justify-content: center; align-items: center; min-height: 100vh; }\n.converter { background: white; padding: 40px; border-radius: 10px; text-align: center; }\ninput { padding: 10px; font-size: 18px; width: 200px; }\nspan { font-size: 24px; font-weight: bold; color: #667eea; }',
        js: 'const euros = document.getElementById("euros");\nconst dollars = document.getElementById("dollars");\nconst rate = 1.09;\n\nfunction convert() {\n    dollars.textContent = (euros.value * rate).toFixed(2);\n}\n\neuros.addEventListener("input", convert);\nconvert();'
    },
    {
        name: 'Couleur aléatoire',
        html: '<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Générateur</title>\n    <link rel="stylesheet" href="style.css">\n</head>\n<body>\n    <div class="box" id="box">Clique</div>\n    <button id="btn">Changer couleur</button>\n    <script src="script.js"><\/script>\n</body>\n</html>',
        css: 'body { font-family: Arial; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background: #f0f2f5; }\n.box { width: 200px; height: 200px; background: #667eea; margin: 20px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; }\nbutton { padding: 10px 20px; cursor: pointer; }',
        js: 'const box = document.getElementById("box");\nconst btn = document.getElementById("btn");\n\nfunction randomColor() {\n    return "#" + Math.floor(Math.random()*16777215).toString(16);\n}\n\nbtn.addEventListener("click", () => {\n    box.style.backgroundColor = randomColor();\n});'
    }
];

let allProjects = [...LOCAL_PROJECTS];

document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    renderProjects();
    loadGitHubProjects();
});

function initSidebar() {
    const projectList = document.getElementById('project-list');
    if (projectList) projectList.innerHTML = '';
    
    // Crée le footer de statut s'il n'existe pas
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && !document.getElementById('github-status')) {
        const footer = document.createElement('div');
        footer.className = 'sidebar-footer';
        footer.id = 'github-status';
        footer.innerHTML = '<span class="github-indicator">⬇️ Chargement...</span>';
        sidebar.appendChild(footer);
    }
}

function renderProjects() {
    const projectList = document.getElementById('project-list');
    if (!projectList) return;
    
    projectList.innerHTML = '';
    
    allProjects.forEach((project, index) => {
        const btn = document.createElement('button');
        btn.className = 'project-btn';
        btn.textContent = project.name;
        btn.dataset.index = index;
        btn.addEventListener('click', () => ejectProject(index));
        projectList.appendChild(btn);
    });
}

async function loadGitHubProjects() {
    const statusEl = document.getElementById('github-status');
    if (!statusEl) return;
    
    statusEl.innerHTML = '<span class="github-indicator">🔄 Chargement GitHub...</span>';
    
    try {
        const listUrl = 'https://api.github.com/repos/ivan-26work/meg/contents/projets?ref=main';
        const response = await fetch(listUrl);
        
        if (!response.ok) throw new Error('GitHub API error');
        
        const files = await response.json();
        const jsFiles = files.filter(f => f.name.endsWith('.js') && f.type === 'file');
        
        if (jsFiles.length === 0) {
            statusEl.innerHTML = '<span class="github-indicator">📁 Aucun projet GitHub</span>';
            return;
        }
        
        let count = 0;
        
        for (const file of jsFiles) {
            try {
                const rawUrl = `https://raw.githubusercontent.com/ivan-26work/meg/main/projets/${file.name}`;
                const codeResponse = await fetch(rawUrl);
                const code = await codeResponse.text();
                
                // Exécute le code dans un contexte contrôlé pour récupérer window.project
                const temp = {};
                const func = new Function('window', code + '; return window.project;');
                const project = func(temp);
                
                if (project && project.name) {
                    allProjects.push({
                        name: project.name,
                        html: project.html || '',
                        css: project.css || '',
                        js: project.js || ''
                    });
                    count++;
                }
            } catch (e) {
                console.warn(`Erreur ${file.name}:`, e);
            }
        }
        
        statusEl.innerHTML = count > 0 
            ? `<span class="github-indicator">✅ ${count} projets GitHub chargés</span>`
            : '<span class="github-indicator">⚠️ Aucun projet valide trouvé</span>';
        
        renderProjects();
        
    } catch (error) {
        console.warn('GitHub indisponible');
        statusEl.innerHTML = '<span class="github-indicator">⚠️ Mode hors-ligne (5 projets locaux)</span>';
    }
}

function ejectProject(index) {
    const project = allProjects[index];
    if (!project) return;
    
    if (window.editors?.html) window.editors.html.setValue(project.html);
    if (window.editors?.css) window.editors.css.setValue(project.css);
    if (window.editors?.js) window.editors.js.setValue(project.js);
    
    localStorage.setItem('editor_html', project.html);
    localStorage.setItem('editor_css', project.css);
    localStorage.setItem('editor_js', project.js);
    
    // Feedback visuel
    const btn = document.querySelector(`[data-index="${index}"]`);
    if (btn) {
        btn.style.transform = 'scale(0.98)';
        setTimeout(() => btn.style.transform = '', 150);
    }
}

// Exposition globale
window.ejectProject = ejectProject;