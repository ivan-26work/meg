// js/editor.js

window.editors = {};

document.addEventListener('DOMContentLoaded', () => {
    initEditors();
    initTabs();
    initEditorActions();
    initSnippetInjection();
    initConsoleToggle();
    setDefaultCode();
});

function initEditors() {
    // Éditeur HTML
    window.editors.html = CodeMirror(document.getElementById('html-editor'), {
        mode: 'xml',
        theme: 'dracula',
        lineNumbers: true,
        indentUnit: 4,
        autoCloseTags: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        lineWrapping: false,
        scrollPastEnd: false,
        value: ''
    });

    // Éditeur CSS
    window.editors.css = CodeMirror(document.getElementById('css-editor'), {
        mode: 'css',
        theme: 'dracula',
        lineNumbers: true,
        indentUnit: 4,
        autoCloseBrackets: true,
        matchBrackets: true,
        lineWrapping: false,
        scrollPastEnd: false,
        value: ''
    });

    // Éditeur JS
    window.editors.js = CodeMirror(document.getElementById('js-editor'), {
        mode: 'javascript',
        theme: 'dracula',
        lineNumbers: true,
        indentUnit: 4,
        autoCloseBrackets: true,
        matchBrackets: true,
        lineWrapping: false,
        scrollPastEnd: false,
        value: ''
    });

    // Sauvegarde auto localStorage
    Object.keys(window.editors).forEach(lang => {
        const saved = localStorage.getItem(`editor_${lang}`);
        if (saved) window.editors[lang].setValue(saved);
        
        window.editors[lang].on('change', () => {
            localStorage.setItem(`editor_${lang}`, window.editors[lang].getValue());
        });
    });
}

function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const wrappers = {
        html: document.getElementById('html-editor'),
        css: document.getElementById('css-editor'),
        js: document.getElementById('js-editor')
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            Object.values(wrappers).forEach(w => w.classList.add('hidden'));
            
            tab.classList.add('active');
            const lang = tab.dataset.editor;
            if (wrappers[lang]) wrappers[lang].classList.remove('hidden');
            
            setTimeout(() => window.editors[lang]?.refresh(), 10);
        });
    });
}

function initEditorActions() {
    // Undo
    document.getElementById('undo-btn')?.addEventListener('click', () => {
        const active = getActiveEditor();
        if (active) active.undo();
    });

    // Redo
    document.getElementById('redo-btn')?.addEventListener('click', () => {
        const active = getActiveEditor();
        if (active) active.redo();
    });

    // Reset
    document.getElementById('reset-btn')?.addEventListener('click', () => {
        const active = getActiveEditor();
        if (active) active.setValue('');
    });

    // Sauvegarde manuelle
    document.getElementById('save-editor-btn')?.addEventListener('click', () => {
        Object.keys(window.editors).forEach(lang => {
            localStorage.setItem(`editor_${lang}`, window.editors[lang].getValue());
        });
        
        const btn = document.getElementById('save-editor-btn');
        btn.style.color = '#4c9a8c';
        setTimeout(() => btn.style.color = '', 500);
    });

    // Run
    document.getElementById('run-btn')?.addEventListener('click', () => {
        const html = window.editors.html.getValue();
        const css = window.editors.css.getValue();
        const js = window.editors.js.getValue();
        
        const data = { html, css, js };
        localStorage.setItem('preview_data', JSON.stringify(data));
        window.open('preview.html', '_blank');
    });
}

function initSnippetInjection() {
    window.insertSnippetAtCursor = function(lang, snippet) {
        const editor = window.editors[lang];
        if (!editor) return;
        
        const cursor = editor.getCursor();
        editor.replaceRange(snippet, cursor);
        editor.focus();
    };
}

function initConsoleToggle() {
    const consoleBtn = document.getElementById('console-toggle');
    const consolePanel = document.getElementById('consolePanel');
    const closeBtn = document.getElementById('close-console');
    const editorContainer = document.querySelector('.editor-container');
    const editorHeader = document.querySelector('.editor-header');

    if (!consolePanel || !editorContainer) return;

    // État initial
    consolePanel.classList.add('hidden');

    // Bouton header : toggle éditeur ↔ console
    if (consoleBtn) {
        consoleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isHidden = consolePanel.classList.contains('hidden');
            
            if (isHidden) {
                // Affiche console, masque éditeur
                consolePanel.classList.remove('hidden');
                editorContainer.style.display = 'none';
                if (editorHeader) editorHeader.style.display = 'none';
                
                // Capture les erreurs
                if (window.captureErrors) window.captureErrors();
            } else {
                // Masque console, affiche éditeur
                consolePanel.classList.add('hidden');
                editorContainer.style.display = 'block';
                if (editorHeader) editorHeader.style.display = 'flex';
            }
        });
    }

    // Croix : ferme console
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            consolePanel.classList.add('hidden');
            editorContainer.style.display = 'block';
            if (editorHeader) editorHeader.style.display = 'flex';
        });
    }
}

function setDefaultCode() {
    // HTML par défaut
    if (!localStorage.getItem('editor_html')) {
        window.editors.html.setValue(`<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Bonjour, monde !</h1>
    <script src="script.js"><\/script>
</body>
</html>`);
    }

    // CSS par défaut
    if (!localStorage.getItem('editor_css')) {
        window.editors.css.setValue(`body {
    font-family: system-ui, sans-serif;
    margin: 0;
    padding: 2rem;
    background: #f5f5f5;
    color: #333;
}

h1 {
    color: #4c9a8c;
}`);
    }

    // JS par défaut
    if (!localStorage.getItem('editor_js')) {
        window.editors.js.setValue(`console.log('JavaScript chargé !');

document.querySelector('h1')?.addEventListener('click', () => {
    alert('Clic sur le titre !');
});`);
    }
}

function getActiveEditor() {
    if (!document.getElementById('html-editor').classList.contains('hidden')) 
        return window.editors.html;
    if (!document.getElementById('css-editor').classList.contains('hidden')) 
        return window.editors.css;
    if (!document.getElementById('js-editor').classList.contains('hidden')) 
        return window.editors.js;
    return window.editors.html;
}

// Configuration scroll : s'arrête à la dernière ligne
document.addEventListener('DOMContentLoaded', () => {
    const editorContainer = document.querySelector('.editor-container');
    if (editorContainer) {
        editorContainer.style.overflowX = 'auto';
        editorContainer.style.overflowY = 'auto';
        editorContainer.style.maxHeight = '100%';
    }
});

// Exposition globale
window.getActiveEditor = getActiveEditor;