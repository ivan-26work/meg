// js/header.js - MISE À JOUR COMPLÈTE

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

// 35 snippets par langage - VERSION COMPLÈTE
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

// Map des snippets vers leur vraie structure
const snippetTemplates = {
    // HTML - Structure de base
    '!': '<!DOCTYPE html>\n<html lang="fr">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Document</title>\n</head>\n<body>\n    \n</body>\n</html>',
    
    // HTML - Balises de base
    p: '<p>...</p>',
    div: '<div>...</div>',
    span: '<span>...</span>',
    a: '<a href="#">...</a>',
    img: '<img src="" alt="">',
    ul: '<ul>\n    <li>...</li>\n</ul>',
    li: '<li>...</li>',
    h1: '<h1>...</h1>',
    h2: '<h2>...</h2>',
    h3: '<h3>...</h3>',
    
    // HTML - Boutons avec événements
    button: '<button type="button">...</button>',
    'btn-click': '<button onclick="maFonction()">Cliquer</button>',
    'btn-event': '<button id="btn">Cliquer</button>',
    'btn-submit': '<button type="submit">Envoyer</button>',
    'btn-reset': '<button type="reset">Réinitialiser</button>',
    
    // HTML - Formulaires et champs
    input: '<input type="text" placeholder="">',
    form: '<form action="" method="post">\n    \n</form>',
    select: '<select name="" id="">\n    <option value="">Option 1</option>\n    <option value="">Option 2</option>\n</select>',
    textarea: '<textarea name="" id="" cols="30" rows="10"></textarea>',
    label: '<label for="">...</label>',
    table: '<table>\n    <tr>\n        <td>...</td>\n    </tr>\n</table>',
    br: '<br>',
    hr: '<hr>',
    
    // HTML - Métadonnées et ressources
    meta: '<meta charset="UTF-8">',
    link: '<link rel="stylesheet" href="style.css">',
    script: '<script src="script.js"><\/script>',
    style: '<style>\n    \n</style>',
    head: '<head>\n    \n</head>',
    body: '<body>\n    \n</body>',
    
    // HTML - Attributs
    class: 'class=""',
    id: 'id=""',
    src: 'src=""',
    href: 'href=""',
    
    // HTML - Médias
    video: '<video src="" controls></video>',
    audio: '<audio src="" controls></audio>',
    iframe: '<iframe src="" frameborder="0"></iframe>',
    
    // HTML - Structure
    nav: '<nav>\n    \n</nav>',
    header: '<header>\n    \n</header>',
    footer: '<footer>\n    \n</footer>',
    main: '<main>\n    \n</main>',
    section: '<section>\n    \n</section>',
    article: '<article>\n    \n</article>',
    aside: '<aside>\n    \n</aside>',
    
    // CSS - Propriétés de base
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
    
    // CSS - Avancé
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
    
    // JS - Bases
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
    
    // JS - Temporisation
    setTimeout: 'setTimeout(() => {\n    \n}, 1000);',
    setInterval: 'setInterval(() => {\n    \n}, 1000);',
    
    // JS - Promesses et async
    Promise: 'new Promise((resolve, reject) => {\n    \n});',
    async: 'async function nom() {\n    \n}',
    await: 'await ;',
    fetch: 'fetch("url")\n    .then(response => response.json())\n    .then(data => console.log(data))\n    .catch(error => console.error(error));',
    
    // JS - Gestion d'erreurs
    try: 'try {\n    \n} catch (error) {\n    \n}',
    catch: 'catch (error) {\n    \n}',
    throw: 'throw new Error();',
    
    // JS - Classes et objets
    new: 'new ;',
    class: 'class Nom {\n    constructor() {\n        \n    }\n    \n    methode() {\n        \n    }\n}',
    
    // JS - Stockage
    localStorage: 'localStorage.setItem("key", value);\nconst value = localStorage.getItem("key");',
    sessionStorage: 'sessionStorage.setItem("key", value);\nconst value = sessionStorage.getItem("key");',
    'JSON.stringify': 'JSON.stringify(obj)',
    'JSON.parse': 'JSON.parse(jsonString)',
    
    // JS - Math et Date
    'Math.random': 'Math.random()',
    Date: 'new Date()',
    RegExp: 'new RegExp("pattern", "i")',
    
    // JS - Méthodes tableau
    'Array.map': 'array.map(item => {\n    \n});',
    filter: 'array.filter(item => {\n    return condition;\n});',
    reduce: 'array.reduce((acc, curr) => {\n    return acc + curr;\n}, initialValue);',
    find: 'array.find(item => item === valeur);',
    some: 'array.some(item => item === valeur);',
    every: 'array.every(item => item === valeur);',
    includes: 'array.includes(valeur);',
    
    // JS - Méthodes string
    split: 'string.split("");',
    join: 'array.join("");',
    
    // JS - ES6+
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
        const cursor = editor.getCursor();
        editor.replaceRange(codeToInsert, cursor);
        
        const placeholders = ['...', 'nom', 'condition', 'valeur', 'url', 'key', 'value', 'obj', 'array', 'string'];
        let searchPos = '';
        
        for (const ph of placeholders) {
            if (codeToInsert.includes(ph)) {
                searchPos = ph;
                break;
            }
        }
        
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
    
    // 1. SLIDER TEINTE
    const hueContainer = document.createElement('div');
    hueContainer.style.padding = '8px';
    hueContainer.style.marginBottom = '8px';
    
    const hueLabel = document.createElement('div');
    hueLabel.style.display = 'flex';
    hueLabel.style.justifyContent = 'space-between';
    hueLabel.style.marginBottom = '4px';
    hueLabel.style.fontSize = '12px';
    hueLabel.style.color = '#4a4e69';
    hueLabel.innerHTML = '<span>Teinte</span><span id="hue-value">0°</span>';
    
    const hueSlider = document.createElement('input');
    hueSlider.type = 'range';
    hueSlider.min = '0';
    hueSlider.max = '360';
    hueSlider.value = '180';
    hueSlider.style.width = '100%';
    hueSlider.style.accentColor = '#4c9a8c';
    
    // 2. SLIDER SATURATION
    const satContainer = document.createElement('div');
    satContainer.style.padding = '8px';
    satContainer.style.marginBottom = '8px';
    
    const satLabel = document.createElement('div');
    satLabel.style.display = 'flex';
    satLabel.style.justifyContent = 'space-between';
    satLabel.style.marginBottom = '4px';
    satLabel.style.fontSize = '12px';
    satLabel.style.color = '#4a4e69';
    satLabel.innerHTML = '<span>Saturation</span><span id="sat-value">100%</span>';
    
    const satSlider = document.createElement('input');
    satSlider.type = 'range';
    satSlider.min = '0';
    satSlider.max = '100';
    satSlider.value = '100';
    satSlider.style.width = '100%';
    satSlider.style.accentColor = '#4c9a8c';
    
    // 3. SLIDER LUMINOSITÉ
    const lightContainer = document.createElement('div');
    lightContainer.style.padding = '8px';
    lightContainer.style.marginBottom = '8px';
    
    const lightLabel = document.createElement('div');
    lightLabel.style.display = 'flex';
    lightLabel.style.justifyContent = 'space-between';
    lightLabel.style.marginBottom = '4px';
    lightLabel.style.fontSize = '12px';
    lightLabel.style.color = '#4a4e69';
    lightLabel.innerHTML = '<span>Luminosité</span><span id="light-value">50%</span>';
    
    const lightSlider = document.createElement('input');
    lightSlider.type = 'range';
    lightSlider.min = '0';
    lightSlider.max = '100';
    lightSlider.value = '50';
    lightSlider.style.width = '100%';
    lightSlider.style.accentColor = '#4c9a8c';
    
    // 4. APERÇU COULEUR
    const previewContainer = document.createElement('div');
    previewContainer.style.display = 'flex';
    previewContainer.style.alignItems = 'center';
    previewContainer.style.gap = '8px';
    previewContainer.style.padding = '8px';
    previewContainer.style.marginBottom = '8px';
    previewContainer.style.background = '#e0e5ec';
    previewContainer.style.borderRadius = '30px';
    
    const previewColor = document.createElement('div');
    previewColor.style.width = '30px';
    previewColor.style.height = '30px';
    previewColor.style.borderRadius = '50%';
    previewColor.style.boxShadow = 'inset 2px 2px 5px #a3b1c6, inset -2px -2px 5px #ffffff';
    previewColor.style.background = '#4c9a8c';
    
    const previewText = document.createElement('span');
    previewText.style.fontSize = '11px';
    previewText.style.fontWeight = '600';
    previewText.style.color = '#4a4e69';
    previewText.style.fontFamily = 'monospace';
    previewText.textContent = '#4c9a8c';
    
    previewContainer.appendChild(previewColor);
    previewContainer.appendChild(previewText);
    
    // 5. BOUTON INSÉRER
    const insertBtn = document.createElement('button');
    insertBtn.textContent = 'Insérer la couleur';
    insertBtn.style.width = '100%';
    insertBtn.style.padding = '10px';
    insertBtn.style.borderRadius = '30px';
    insertBtn.style.border = 'none';
    insertBtn.style.background = '#4c9a8c';
    insertBtn.style.color = 'white';
    insertBtn.style.fontWeight = '600';
    insertBtn.style.cursor = 'pointer';
    insertBtn.style.marginBottom = '8px';
    insertBtn.style.boxShadow = '5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff';
    
    // 6. INPUT HEX MANUEL
    const hexContainer = document.createElement('div');
    hexContainer.style.display = 'flex';
    hexContainer.style.gap = '4px';
    hexContainer.style.padding = '8px';
    
    const hexInput = document.createElement('input');
    hexInput.type = 'text';
    hexInput.placeholder = '#000000';
    hexInput.value = '#4c9a8c';
    hexInput.style.flex = '1';
    hexInput.style.padding = '8px';
    hexInput.style.borderRadius = '30px';
    hexInput.style.border = 'none';
    hexInput.style.background = '#e0e5ec';
    hexInput.style.boxShadow = 'inset 3px 3px 6px #a3b1c6, inset -3px -3px 6px #ffffff';
    hexInput.style.fontFamily = 'monospace';
    
    const hexBtn = document.createElement('button');
    hexBtn.innerHTML = '<i class="fas fa-check"></i>';
    hexBtn.style.width = '36px';
    hexBtn.style.height = '36px';
    hexBtn.style.borderRadius = '50%';
    hexBtn.style.border = 'none';
    hexBtn.style.background = '#4c9a8c';
    hexBtn.style.color = 'white';
    hexBtn.style.cursor = 'pointer';
    hexBtn.style.boxShadow = '3px 3px 6px #a3b1c6, -3px -3px 6px #ffffff';
    
    hexContainer.appendChild(hexInput);
    hexContainer.appendChild(hexBtn);
    
    // Assemble
    hueContainer.appendChild(hueLabel);
    hueContainer.appendChild(hueSlider);
    satContainer.appendChild(satLabel);
    satContainer.appendChild(satSlider);
    lightContainer.appendChild(lightLabel);
    lightContainer.appendChild(lightSlider);
    
    colorDropdown.appendChild(hueContainer);
    colorDropdown.appendChild(satContainer);
    colorDropdown.appendChild(lightContainer);
    colorDropdown.appendChild(previewContainer);
    colorDropdown.appendChild(insertBtn);
    colorDropdown.appendChild(hexContainer);
    
    // 7. COULEURS PRÉDÉFINIES (grille)
    const presetTitle = document.createElement('div');
    presetTitle.style.padding = '8px 8px 4px';
    presetTitle.style.fontSize = '11px';
    presetTitle.style.fontWeight = '600';
    presetTitle.style.color = '#4a4e69';
    presetTitle.textContent = 'PRÉDÉFINIES';
    
    const presetGrid = document.createElement('div');
    presetGrid.style.display = 'grid';
    presetGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
    presetGrid.style.gap = '6px';
    presetGrid.style.padding = '8px';
    
    const presets = [
        '#ff6b6b', '#4c9a8c', '#51cf66', '#ffd93d',
        '#9775fa', '#ff922b', '#f783ac', '#868e96'
    ];
    
    presets.forEach(color => {
        const swatch = document.createElement('button');
        swatch.style.width = '100%';
        swatch.style.aspectRatio = '1';
        swatch.style.borderRadius = '12px';
        swatch.style.border = 'none';
        swatch.style.background = color;
        swatch.style.boxShadow = '3px 3px 6px #a3b1c6, -3px -3px 6px #ffffff';
        swatch.style.cursor = 'pointer';
        swatch.addEventListener('click', () => {
            updateColorPreview(color);
            hexInput.value = color;
        });
        presetGrid.appendChild(swatch);
    });
    
    colorDropdown.appendChild(presetTitle);
    colorDropdown.appendChild(presetGrid);
    
    // Fonction mise à jour aperçu
    function updateColorPreview(color) {
        previewColor.style.background = color;
        previewText.textContent = color;
        hexInput.value = color;
    }
    
    // Fonction HSL vers HEX
    function hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }
    
    // Événements sliders
    function updateFromSliders() {
        const h = parseInt(hueSlider.value);
        const s = parseInt(satSlider.value);
        const l = parseInt(lightSlider.value);
        
        document.getElementById('hue-value').textContent = `${h}°`;
        document.getElementById('sat-value').textContent = `${s}%`;
        document.getElementById('light-value').textContent = `${l}%`;
        
        const hex = hslToHex(h, s, l);
        updateColorPreview(hex);
    }
    
    hueSlider.addEventListener('input', updateFromSliders);
    satSlider.addEventListener('input', updateFromSliders);
    lightSlider.addEventListener('input', updateFromSliders);
    
    // Input hex manuel
    hexInput.addEventListener('input', (e) => {
        let val = e.target.value;
        if (val.match(/^#[0-9A-Fa-f]{0,6}$/)) {
            if (val.length === 4 || val.length === 7) {
                updateColorPreview(val);
                // Met à jour sliders approximativement
                // (conversion hex->hsl trop complexe, on laisse)
            }
        }
    });
    
    hexBtn.addEventListener('click', () => {
        let color = hexInput.value;
        if (!color.match(/^#[0-9A-Fa-f]{6}$|^#[0-9A-Fa-f]{3}$/)) {
            color = '#4c9a8c';
            hexInput.value = color;
        }
        updateColorPreview(color);
        insertColor(color);
    });
    
    // Bouton insérer
    insertBtn.addEventListener('click', () => {
        insertColor(previewText.textContent);
    });
    
    // Initialisation
    updateFromSliders();
}

function insertColor(color) {
    if (!color.match(/^#[0-9A-Fa-f]{6}$|^#[0-9A-Fa-f]{3}$/)) {
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
        const cursor = editor.getCursor();
        editor.replaceRange(color, cursor);
        editor.focus();
    }
    
    // Ferme dropdown
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