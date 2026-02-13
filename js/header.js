// js/header.js - Version ACE avec injection position curseur

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initSnippets();
    initDropdowns();
    initAccessibility();
    initColorPicker();
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
    
    // Sélecteur langage
    const langButtons = document.querySelectorAll('#lang-dropdown button');
    const langSelector = document.getElementById('lang-selector');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = e.target.dataset.lang;
            updateSnippets(lang);
            
            if (langSelector) {
                const icon = langSelector.querySelector('i');
                if (lang === 'html') icon.className = 'fab fa-html5';
                if (lang === 'css') icon.className = 'fab fa-css3-alt';
                if (lang === 'js') icon.className = 'fab fa-js';
            }
            
            document.getElementById('lang-dropdown')?.parentElement.classList.remove('active');
        });
    });
}

// 35+ snippets par langage
const snippets = {
    html: [
        '!', 'p', 'div', 'span', 'a', 'img', 'ul', 'li', 'h1', 'h2', 'h3',
        'button', 'btn-click', 'btn-event', 'btn-submit', 'btn-reset',
        'input', 'form', 'select', 'textarea', 'label', 'table', 'br', 'hr',
        'meta', 'link', 'script', 'style', 'head', 'body',
        'class', 'id', 'src', 'href', 'video', 'audio', 'iframe',
        'nav', 'header', 'footer', 'main', 'section', 'article', 'aside'
    ],
    css: [
        'color', 'background', 'margin', 'padding', 'font-size', 'border',
        'display', 'position', 'flex', 'grid', 'width', 'height',
        'text-align', 'box-shadow', 'border-radius', 'opacity', 'z-index',
        'overflow', 'cursor', 'transition', 'transform', 'animation',
        '@media', '@import', '@keyframes', '@font-face', 'hover', 'active',
        '::before', '::after', ':nth-child', ':focus', 'filter',
        'backdrop-filter', 'mix-blend-mode', 'object-fit', 'scroll-behavior'
    ],
    js: [
        'function', 'const', 'let', 'if', 'else', 'for', 'while', 'switch',
        'return', 'console.log', 'document.querySelector', 'addEventListener',
        'setTimeout', 'setInterval', 'Promise', 'async', 'await', 'fetch',
        'try', 'catch', 'throw', 'new', 'class', 'localStorage', 'sessionStorage',
        'JSON.stringify', 'JSON.parse', 'Math.random', 'Date', 'RegExp',
        'Array.map', 'filter', 'reduce', 'find', 'some', 'every', 'includes',
        'split', 'join', 'template literal', 'destructuring', 'spread',
        'default param', 'ternary', 'optional chaining', 'nullish coalescing'
    ]
};

const snippetTemplates = {
    '!': '<!DOCTYPE html>\n<html lang="fr">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Document</title>\n</head>\n<body>\n    \n</body>\n</html>',
    p: '<p></p>',
    div: '<div></div>',
    span: '<span></span>',
    a: '<a href="#"></a>',
    img: '<img src="" alt="">',
    ul: '<ul>\n    <li></li>\n</ul>',
    li: '<li></li>',
    h1: '<h1></h1>',
    h2: '<h2></h2>',
    h3: '<h3></h3>',
    button: '<button></button>',
    'btn-click': '<button onclick="maFonction()">Cliquer</button>',
    'btn-event': '<button id="btn">Cliquer</button>',
    'btn-submit': '<button type="submit">Envoyer</button>',
    'btn-reset': '<button type="reset">Réinitialiser</button>',
    input: '<input type="text" placeholder="">',
    form: '<form action="" method="post">\n    \n</form>',
    select: '<select name="" id="">\n    <option value="">Option 1</option>\n    <option value="">Option 2</option>\n</select>',
    textarea: '<textarea name="" id="" cols="30" rows="10"></textarea>',
    label: '<label for=""></label>',
    table: '<table>\n    <tr>\n        <td></td>\n    </tr>\n</table>',
    br: '<br>',
    hr: '<hr>',
    meta: '<meta charset="UTF-8">',
    link: '<link rel="stylesheet" href="style.css">',
    script: '<script src="script.js"><\/script>',
    style: '<style>\n    \n</style>',
    head: '<head>\n    \n</head>',
    body: '<body>\n    \n</body>',
    class: 'class=""',
    id: 'id=""',
    src: 'src=""',
    href: 'href=""',
    video: '<video src="" controls></video>',
    audio: '<audio src="" controls></audio>',
    iframe: '<iframe src="" frameborder="0"></iframe>',
    nav: '<nav>\n    \n</nav>',
    header: '<header>\n    \n</header>',
    footer: '<footer>\n    \n</footer>',
    main: '<main>\n    \n</main>',
    section: '<section>\n    \n</section>',
    article: '<article>\n    \n</article>',
    aside: '<aside>\n    \n</aside>',
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
    '@import': '@import url("");',
    '@keyframes': '@keyframes animationName {\n    0% { }\n    100% { }\n}',
    '@font-face': '@font-face {\n    font-family: "";\n    src: url("");\n}',
    hover: '&:hover {\n    \n}',
    active: '&:active {\n    \n}',
    '::before': '&::before {\n    content: "";\n    \n}',
    '::after': '&::after {\n    content: "";\n    \n}',
    ':nth-child': '&:nth-child(n) {\n    \n}',
    ':focus': '&:focus {\n    \n}',
    filter: 'filter: ;',
    'backdrop-filter': 'backdrop-filter: ;',
    'mix-blend-mode': 'mix-blend-mode: ;',
    'object-fit': 'object-fit: ;',
    'scroll-behavior': 'scroll-behavior: smooth;',
    function: 'function nom() {\n    \n}',
    const: 'const nom = ;',
    let: 'let nom = ;',
    if: 'if (condition) {\n    \n}',
    else: 'else {\n    \n}',
    for: 'for (let i = 0; i < length; i++) {\n    \n}',
    while: 'while (condition) {\n    \n}',
    switch: 'switch (valeur) {\n    case 1:\n        \n        break;\n    default:\n        \n}',
    return: 'return ;',
    'console.log': 'console.log();',
    'document.querySelector': 'document.querySelector("");',
    addEventListener: 'element.addEventListener("click", () => {\n    \n});',
    setTimeout: 'setTimeout(() => {\n    \n}, 1000);',
    setInterval: 'setInterval(() => {\n    \n}, 1000);',
    Promise: 'new Promise((resolve, reject) => {\n    \n});',
    async: 'async function nom() {\n    \n}',
    await: 'await ;',
    fetch: 'fetch("url")\n    .then(response => response.json())\n    .then(data => console.log(data))\n    .catch(error => console.error(error));',
    try: 'try {\n    \n} catch (error) {\n    \n}',
    catch: 'catch (error) {\n    \n}',
    throw: 'throw new Error();',
    new: 'new ;',
    class: 'class Nom {\n    constructor() {\n        \n    }\n    \n    methode() {\n        \n    }\n}',
    localStorage: 'localStorage.setItem("key", value);\nconst value = localStorage.getItem("key");',
    sessionStorage: 'sessionStorage.setItem("key", value);\nconst value = sessionStorage.getItem("key");',
    'JSON.stringify': 'JSON.stringify(obj)',
    'JSON.parse': 'JSON.parse(jsonString)',
    'Math.random': 'Math.random()',
    Date: 'new Date()',
    RegExp: 'new RegExp("pattern", "i")',
    'Array.map': 'array.map(item => {\n    \n});',
    filter: 'array.filter(item => {\n    return condition;\n});',
    reduce: 'array.reduce((acc, curr) => {\n    return acc + curr;\n}, initialValue);',
    find: 'array.find(item => item === valeur);',
    some: 'array.some(item => item === valeur);',
    every: 'array.every(item => item === valeur);',
    includes: 'array.includes(valeur);',
    split: 'string.split("");',
    join: 'array.join("");',
    'template literal': '`${variable}`',
    destructuring: 'const { propriete } = objet;\nconst [ premier ] = tableau;',
    spread: '[...array]',
    'default param': 'function nom(param = "defaut") {\n    \n}',
    ternary: 'condition ? valeurSiVrai : valeurSiFaux',
    'optional chaining': 'objet?.propriete',
    'nullish coalescing': 'valeur ?? "defaut"'
};

function initSnippets() {
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
    
    let codeToInsert = snippetTemplates[snippetKey] || snippetKey;
    let editor = null;
    
    if (lang === 'html') editor = window.editors?.html;
    if (lang === 'css') editor = window.editors?.css;
    if (lang === 'js') editor = window.editors?.js;
    
    if (editor) {
        const cursor = editor.getCursorPosition();
        editor.session.insert(cursor, codeToInsert);
        editor.focus();
    }
}

function initDropdowns() {
    const langBtn = document.getElementById('lang-selector');
    const langGroup = langBtn?.parentElement;
    
    langBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        langGroup.classList.toggle('active');
        document.getElementById('accessibility-btn')?.parentElement.classList.remove('active');
        document.getElementById('color-picker-btn')?.parentElement.classList.remove('active');
    });
    
    const accessBtn = document.getElementById('accessibility-btn');
    const accessGroup = accessBtn?.parentElement;
    
    accessBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        accessGroup.classList.toggle('active');
        document.getElementById('lang-selector')?.parentElement.classList.remove('active');
        document.getElementById('color-picker-btn')?.parentElement.classList.remove('active');
    });
    
    const colorBtn = document.getElementById('color-picker-btn');
    const colorGroup = colorBtn?.parentElement;
    
    colorBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        colorGroup.classList.toggle('active');
        document.getElementById('lang-selector')?.parentElement.classList.remove('active');
        document.getElementById('accessibility-btn')?.parentElement.classList.remove('active');
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-group')) {
            document.querySelectorAll('.dropdown-group').forEach(group => {
                group.classList.remove('active');
            });
        }
    });
}

function initColorPicker() {
    const colorDropdown = document.getElementById('color-dropdown');
    if (!colorDropdown) return;
    
    colorDropdown.innerHTML = '';
    
    // Interface du sélecteur couleur (version simplifiée)
    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = '#4c9a8c';
    colorInput.style.width = '100%';
    colorInput.style.height = '50px';
    colorInput.style.border = 'none';
    colorInput.style.borderRadius = '10px';
    colorInput.style.marginBottom = '10px';
    colorInput.style.cursor = 'pointer';
    
    const hexInput = document.createElement('input');
    hexInput.type = 'text';
    hexInput.value = '#4c9a8c';
    hexInput.placeholder = '#000000';
    hexInput.style.width = '100%';
    hexInput.style.padding = '10px';
    hexInput.style.borderRadius = '10px';
    hexInput.style.border = 'none';
    hexInput.style.background = '#e0e5ec';
    hexInput.style.marginBottom = '10px';
    hexInput.style.boxShadow = 'inset 3px 3px 6px #a3b1c6, inset -3px -3px 6px #ffffff';
    
    const insertBtn = document.createElement('button');
    insertBtn.textContent = 'Insérer la couleur';
    insertBtn.style.width = '100%';
    insertBtn.style.padding = '10px';
    insertBtn.style.borderRadius = '30px';
    insertBtn.style.border = 'none';
    insertBtn.style.background = '#4c9a8c';
    insertBtn.style.color = 'white';
    insertBtn.style.fontWeight = 'bold';
    insertBtn.style.cursor = 'pointer';
    insertBtn.style.marginBottom = '10px';
    
    colorDropdown.appendChild(colorInput);
    colorDropdown.appendChild(hexInput);
    colorDropdown.appendChild(insertBtn);
    
    // Synchronisation color picker ↔ hex input
    colorInput.addEventListener('input', () => {
        hexInput.value = colorInput.value;
    });
    
    hexInput.addEventListener('input', () => {
        if (hexInput.value.match(/^#[0-9A-Fa-f]{6}$/)) {
            colorInput.value = hexInput.value;
        }
    });
    
    insertBtn.addEventListener('click', () => {
        insertColor(hexInput.value);
    });
}

function insertColor(color) {
    if (!color.match(/^#[0-9A-Fa-f]{6}$/)) {
        color = '#4c9a8c';
    }
    
    let editor = null;
    if (!document.getElementById('html-editor').classList.contains('hidden')) {
        editor = window.editors?.html;
    } else if (!document.getElementById('css-editor').classList.contains('hidden')) {
        editor = window.editors?.css;
    } else if (!document.getElementById('js-editor').classList.contains('hidden')) {
        editor = window.editors?.js;
    }
    
    if (editor) {
        const cursor = editor.getCursorPosition();
        editor.session.insert(cursor, color);
        editor.focus();
    }
    
    document.getElementById('color-picker-btn')?.parentElement.classList.remove('active');
}

function initAccessibility() {
    const fontPlus = document.getElementById('font-plus');
    const fontMinus = document.getElementById('font-minus');
    const contrastToggle = document.getElementById('contrast-toggle');
    const darkModeToggle = document.getElementById('darkmode-toggle');
    
    let fontSize = parseInt(localStorage.getItem('editor_font_size')) || 14;
    
    fontPlus?.addEventListener('click', () => {
        fontSize = Math.min(fontSize + 1, 20);
        document.querySelectorAll('.ace_editor').forEach(editor => {
            editor.style.fontSize = fontSize + 'px';
        });
        localStorage.setItem('editor_font_size', fontSize);
    });
    
    fontMinus?.addEventListener('click', () => {
        fontSize = Math.max(fontSize - 1, 10);
        document.querySelectorAll('.ace_editor').forEach(editor => {
            editor.style.fontSize = fontSize + 'px';
        });
        localStorage.setItem('editor_font_size', fontSize);
    });
    
    const savedSize = localStorage.getItem('editor_font_size');
    if (savedSize) {
        fontSize = parseInt(savedSize);
        document.querySelectorAll('.ace_editor').forEach(editor => {
            editor.style.fontSize = fontSize + 'px';
        });
    }
    
    contrastToggle?.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });
    
    darkModeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('dark_mode', document.body.classList.contains('dark-mode'));
    });
    
    if (localStorage.getItem('dark_mode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// Exposition globale
window.updateSnippets = updateSnippets;
window.insertSnippet = insertSnippet;