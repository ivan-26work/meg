// js/ace-editor.js
window.editors = {};

document.addEventListener('DOMContentLoaded', () => {
    initEditors();
    initTabs();
    initEditorActions();
    setDefaultCode();
});

function initEditors() {
    ace.require("ace/ext/language_tools");
    
    // HTML
    window.editors.html = ace.edit("html-editor");
    window.editors.html.setTheme("ace/theme/dracula");
    window.editors.html.session.setMode("ace/mode/html");
    window.editors.html.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        fontSize: 14,
        showLineNumbers: true,
        tabSize: 4
    });
    
    // CSS
    window.editors.css = ace.edit("css-editor");
    window.editors.css.setTheme("ace/theme/dracula");
    window.editors.css.session.setMode("ace/mode/css");
    window.editors.css.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        fontSize: 14,
        showLineNumbers: true,
        tabSize: 4
    });
    
    // JS
    window.editors.js = ace.edit("js-editor");
    window.editors.js.setTheme("ace/theme/dracula");
    window.editors.js.session.setMode("ace/mode/javascript");
    window.editors.js.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        fontSize: 14,
        showLineNumbers: true,
        tabSize: 4
    });
    
    // Sauvegarde auto
    Object.keys(window.editors).forEach(lang => {
        const saved = localStorage.getItem(`editor_${lang}`);
        if (saved) window.editors[lang].setValue(saved);
        
        window.editors[lang].session.on('change', () => {
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
            
            setTimeout(() => window.editors[lang]?.resize(), 10);
        });
    });
}

function initEditorActions() {
    document.getElementById('undo-btn')?.addEventListener('click', () => {
        getActiveEditor()?.undo();
    });

    document.getElementById('redo-btn')?.addEventListener('click', () => {
        getActiveEditor()?.redo();
    });

    document.getElementById('reset-btn')?.addEventListener('click', () => {
        if (confirm('Effacer le contenu ?')) {
            getActiveEditor()?.setValue('');
        }
    });

    document.getElementById('save-editor-btn')?.addEventListener('click', () => {
        Object.keys(window.editors).forEach(lang => {
            localStorage.setItem(`editor_${lang}`, window.editors[lang].getValue());
        });
        
        const btn = document.getElementById('save-editor-btn');
        btn.style.color = '#4c9a8c';
        setTimeout(() => btn.style.color = '', 500);
    });

    document.getElementById('run-btn')?.addEventListener('click', () => {
        const html = window.editors.html.getValue();
        const css = window.editors.css.getValue();
        const js = window.editors.js.getValue();
        
        const data = { html, css, js };
        localStorage.setItem('preview_data', JSON.stringify(data));
        window.open('preview.html', '_blank');
    });
}

function setDefaultCode() {
    if (!localStorage.getItem('editor_html')) {
        window.editors.html.setValue('<!DOCTYPE html>\n<html>\n<head>\n    <title>Test</title>\n</head>\n<body>\n    <h1>Bonjour !</h1>\n</body>\n</html>');
    }
    if (!localStorage.getItem('editor_css')) {
        window.editors.css.setValue('body {\n    background: #f0f0f0;\n    font-family: sans-serif;\n}');
    }
    if (!localStorage.getItem('editor_js')) {
        window.editors.js.setValue('console.log("Prêt !");\n\n// Ton code ici');
    }
}

function getActiveEditor() {
    if (!document.getElementById('html-editor').classList.contains('hidden')) 
        return window.editors.html;
    if (!document.getElementById('css-editor').classList.contains('hidden')) 
        return window.editors.css;
    return window.editors.js;
}