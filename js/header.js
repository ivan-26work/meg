// js/header.js

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initSnippets();
    initDropdowns();
    initAccessibility();
});

function initHeader() {
    // Menu toggle sidebar
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('closed');
        });
    }
    
    // Sélecteur langage - met à jour les snippets et l'icône
    const langButtons = document.querySelectorAll('#lang-dropdown button');
    const langSelector = document.getElementById('lang-selector');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = e.target.dataset.lang;
            updateSnippets(lang);
            
            // Change icône sélecteur
            if (langSelector) {
                const icon = langSelector.querySelector('i');
                if (lang === 'html') icon.className = 'fab fa-html5';
                if (lang === 'css') icon.className = 'fab fa-css3-alt';
                if (lang === 'js') icon.className = 'fab fa-js';
            }
            
            // Ferme dropdown
            document.getElementById('lang-dropdown')?.parentElement.classList.remove('active');
        });
    });
}

// 25 snippets par langage - VERSION CORRIGÉE avec vraie structure
const snippets = {
    html: [
        'p', 'div', 'span', 'a', 'img', 'ul', 'li', 'h1', 'h2', 'button',
        'input', 'form', 'table', 'br', 'hr', 'strong', 'em', 'section', 'article', 'header',
        'footer', 'nav', 'main', 'aside', 'label'
    ],
    css: [
        'color', 'background', 'margin', 'padding', 'font-size', 'border', 'display', 'position',
        'flex', 'grid', 'width', 'height', 'text-align', 'box-shadow', 'border-radius', 'opacity',
        'z-index', 'overflow', 'cursor', 'transition', 'transform', 'animation', '@media', 'hover', 'active'
    ],
    js: [
        'function', 'const', 'let', 'if', 'else', 'for', 'while', 'switch', 'case', 'break',
        'return', 'console.log', 'document.querySelector', 'addEventListener', 'setTimeout',
        'setInterval', 'Promise', 'async', 'await', 'fetch', 'try', 'catch', 'throw', 'new', 'class'
    ]
};

// Map des snippets vers leur vraie structure
const snippetTemplates = {
    // HTML
    p: '<p>...</p>',
    div: '<div>...</div>',
    span: '<span>...</span>',
    a: '<a href="#">...</a>',
    img: '<img src="" alt="">',
    ul: '<ul>\n    <li>...</li>\n</ul>',
    li: '<li>...</li>',
    h1: '<h1>...</h1>',
    h2: '<h2>...</h2>',
    button: '<button>...</button>',
    input: '<input type="text">',
    form: '<form>\n    \n</form>',
    table: '<table>\n    <tr>\n        <td>...</td>\n    </tr>\n</table>',
    br: '<br>',
    hr: '<hr>',
    strong: '<strong>...</strong>',
    em: '<em>...</em>',
    section: '<section>\n    \n</section>',
    article: '<article>\n    \n</article>',
    header: '<header>\n    \n</header>',
    footer: '<footer>\n    \n</footer>',
    nav: '<nav>\n    \n</nav>',
    main: '<main>\n    \n</main>',
    aside: '<aside>\n    \n</aside>',
    label: '<label>...</label>',
    
    // CSS
    color: 'color: ;',
    background: 'background: ;',
    margin: 'margin: ;',
    padding: 'padding: ;',
    'font-size': 'font-size: ;',
    border: 'border: ;',
    display: 'display: ;',
    position: 'position: ;',
    flex: 'display: flex;\n',
    grid: 'display: grid;\n',
    width: 'width: ;',
    height: 'height: ;',
    'text-align': 'text-align: ;',
    'box-shadow': 'box-shadow: ;',
    'border-radius': 'border-radius: ;',
    opacity: 'opacity: ;',
    'z-index': 'z-index: ;',
    overflow: 'overflow: ;',
    cursor: 'cursor: ;',
    transition: 'transition: ;',
    transform: 'transform: ;',
    animation: 'animation: ;',
    '@media': '@media screen and (max-width: 768px) {\n    \n}',
    hover: '&:hover {\n    \n}',
    active: '&:active {\n    \n}',
    
    // JS
    function: 'function nom() {\n    \n}',
    const: 'const nom = ;',
    let: 'let nom = ;',
    if: 'if (condition) {\n    \n}',
    else: 'else {\n    \n}',
    for: 'for (let i = 0; i < length; i++) {\n    \n}',
    while: 'while (condition) {\n    \n}',
    switch: 'switch (valeur) {\n    case 1:\n        \n        break;\n    default:\n        \n}',
    case: 'case :\n    \n    break;',
    break: 'break;',
    return: 'return ;',
    'console.log': 'console.log();',
    'document.querySelector': 'document.querySelector(\'\');',
    addEventListener: 'element.addEventListener(\'click\', () => {\n    \n});',
    setTimeout: 'setTimeout(() => {\n    \n}, 1000);',
    setInterval: 'setInterval(() => {\n    \n}, 1000);',
    Promise: 'new Promise((resolve, reject) => {\n    \n});',
    async: 'async function nom() {\n    \n}',
    await: 'await ;',
    fetch: 'fetch(\'url\')\n    .then(response => response.json())\n    .then(data => console.log(data));',
    try: 'try {\n    \n} catch (error) {\n    \n}',
    catch: 'catch (error) {\n    \n}',
    throw: 'throw new Error();',
    new: 'new ;',
    class: 'class Nom {\n    constructor() {\n        \n    }\n}'
};

function initSnippets() {
    // Initialise avec HTML par défaut
    updateSnippets('html');
}

function updateSnippets(lang) {
    const snippetBar = document.getElementById('snippet-bar');
    if (!snippetBar) return;
    
    snippetBar.innerHTML = '';
    
    snippets[lang].forEach(snippet => {
        const btn = document.createElement('button');
        btn.className = 'snippet-btn';
        btn.textContent = `[ ${snippet} ]`;
        btn.dataset.snippet = snippet;
        btn.dataset.lang = lang;
        
        btn.addEventListener('click', insertSnippet);
        snippetBar.appendChild(btn);
    });
}

function insertSnippet(e) {
    const snippetKey = e.target.dataset.snippet;
    const lang = e.target.dataset.lang;
    
    // Récupère le template ou utilise la clé par défaut
    let codeToInsert = snippetTemplates[snippetKey] || snippetKey;
    
    // Éditeur actif
    let editor = null;
    if (lang === 'html') editor = window.editors?.html;
    if (lang === 'css') editor = window.editors?.css;
    if (lang === 'js') editor = window.editors?.js;
    
    if (editor) {
        const cursor = editor.getCursor();
        editor.replaceRange(codeToInsert, cursor);
        
        // Positionne le curseur intelligemment
        if (codeToInsert.includes('...') || codeToInsert.includes('nom') || codeToInsert.includes('condition')) {
            const searchPos = codeToInsert.indexOf('...') !== -1 ? '...' : 
                             codeToInsert.indexOf('nom') !== -1 ? 'nom' : 
                             codeToInsert.indexOf('condition') !== -1 ? 'condition' : '';
            
            if (searchPos) {
                const from = {
                    line: cursor.line,
                    ch: cursor.ch + codeToInsert.indexOf(searchPos)
                };
                const to = {
                    line: cursor.line,
                    ch: cursor.ch + codeToInsert.indexOf(searchPos) + searchPos.length
                };
                editor.setSelection(from, to);
            }
        }
        
        editor.focus();
    }
}

function initDropdowns() {
    // Dropdown langage
    const langBtn = document.getElementById('lang-selector');
    const langGroup = langBtn?.parentElement;
    
    langBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        langGroup.classList.toggle('active');
        
        // Ferme l'autre dropdown
        document.getElementById('accessibility-btn')?.parentElement.classList.remove('active');
    });
    
    // Dropdown accessibilité
    const accessBtn = document.getElementById('accessibility-btn');
    const accessGroup = accessBtn?.parentElement;
    
    accessBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        accessGroup.classList.toggle('active');
        
        // Ferme l'autre dropdown
        document.getElementById('lang-selector')?.parentElement.classList.remove('active');
    });
    
    // Fermer dropdowns au clic ailleurs
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-group')) {
            document.querySelectorAll('.dropdown-group').forEach(group => {
                group.classList.remove('active');
            });
        }
    });
}

function initAccessibility() {
    const fontPlus = document.getElementById('font-plus');
    const fontMinus = document.getElementById('font-minus');
    const contrastToggle = document.getElementById('contrast-toggle');
    const darkModeToggle = document.getElementById('darkmode-toggle');
    
    let fontSize = 14;
    
    fontPlus?.addEventListener('click', () => {
        fontSize = Math.min(fontSize + 1, 20);
        document.querySelectorAll('.CodeMirror').forEach(cm => {
            cm.style.fontSize = fontSize + 'px';
        });
        localStorage.setItem('editor_font_size', fontSize);
    });
    
    fontMinus?.addEventListener('click', () => {
        fontSize = Math.max(fontSize - 1, 10);
        document.querySelectorAll('.CodeMirror').forEach(cm => {
            cm.style.fontSize = fontSize + 'px';
        });
        localStorage.setItem('editor_font_size', fontSize);
    });
    
    // Restaure taille police
    const savedSize = localStorage.getItem('editor_font_size');
    if (savedSize) {
        fontSize = parseInt(savedSize);
        document.querySelectorAll('.CodeMirror').forEach(cm => {
            cm.style.fontSize = fontSize + 'px';
        });
    }
    
    contrastToggle?.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });
    
    // Mode nuit
    darkModeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('dark_mode', document.body.classList.contains('dark-mode'));
    });
    
    // Restaure mode nuit
    if (localStorage.getItem('dark_mode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// Expose pour editor.js
window.updateSnippets = updateSnippets;
window.insertSnippet = insertSnippet;