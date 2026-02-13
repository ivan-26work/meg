// js/ace-editor.js - Version complète avec autocomplétion positionnée

window.editors = {};

document.addEventListener('DOMContentLoaded', () => {
    initEditors();
    initTabs();
    initEditorActions();
    setDefaultCode();
    initAutocompletePositioning();
});

function initEditors() {
    ace.require("ace/ext/language_tools");
    
    // HTML Editor
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
    
    // CSS Editor
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
    
    // JS Editor
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

// Positionnement de l'autocomplétion
function initAutocompletePositioning() {
    // Injecter le CSS
    const style = document.createElement('style');
    style.textContent = `
        .ace_autocomplete {
            width: 220px !important;
            max-height: 150px !important;
            min-height: 100px !important;
            position: fixed !important;
            background: rgba(45, 47, 51, 0.85) !important;
            backdrop-filter: blur(8px) !important;
            -webkit-backdrop-filter: blur(8px) !important;
            border: 1px solid rgba(76, 154, 140, 0.5) !important;
            border-radius: 8px !important;
            box-shadow: 0 8px 25px rgba(0,0,0,0.3) !important;
            overflow-y: auto !important;
            z-index: 10000 !important;
            font-size: 12px !important;
            cursor: grab !important;
            user-select: none !important;
        }
        
        .ace_autocomplete:active {
            cursor: grabbing !important;
        }
        
        .ace_autocomplete .ace_line {
            padding: 3px 10px !important;
            color: #e0e5ec !important;
            font-family: 'Fira Code', monospace !important;
            cursor: pointer !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            border-left: 2px solid transparent !important;
            font-size: 11px !important;
            line-height: 1.3 !important;
            transition: all 0.1s !important;
        }
        
        .ace_autocomplete .ace_line:hover {
            border-left-color: #4c9a8c !important;
            background: rgba(76, 154, 140, 0.2) !important;
        }
        
        .ace_autocomplete .ace_selected {
            background: rgba(76, 154, 140, 0.3) !important;
            border-left-color: #4c9a8c !important;
            color: white !important;
            font-weight: 500 !important;
        }
        
        .ace_autocomplete::-webkit-scrollbar {
            width: 4px;
        }
        
        .ace_autocomplete::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.05);
        }
        
        .ace_autocomplete::-webkit-scrollbar-thumb {
            background: #4c9a8c;
            border-radius: 4px;
        }
        
        .ace_autocomplete::before {
            content: '⋮⋮';
            position: absolute;
            top: 2px;
            right: 8px;
            font-size: 10px;
            color: rgba(255,255,255,0.3);
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
    
    // Fonction pour positionner près du curseur
    function positionAutocomplete() {
        const autocomplete = document.querySelector('.ace_autocomplete');
        if (!autocomplete) return;
        
        const editor = getActiveEditor();
        if (!editor) return;
        
        const cursorPos = editor.getCursorPosition();
        const coords = editor.renderer.textToScreenCoordinates(cursorPos.row, cursorPos.column);
        
        let top = coords.pageY - autocomplete.offsetHeight - 10;
        let left = coords.pageX;
        
        // Empêcher de sortir de l'écran
        if (top < 10) top = coords.pageY + 20;
        if (left + autocomplete.offsetWidth > window.innerWidth) {
            left = window.innerWidth - autocomplete.offsetWidth - 10;
        }
        
        autocomplete.style.top = top + 'px';
        autocomplete.style.left = left + 'px';
        autocomplete.style.right = 'auto';
    }
    
    // Observer l'apparition
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.classList.contains('ace_autocomplete')) {
                        setTimeout(positionAutocomplete, 0);
                        
                        // Rendre déplaçable
                        node.addEventListener('mousedown', (e) => {
                            if (e.target === node || e.target.classList.contains('ace_autocomplete')) {
                                e.preventDefault();
                                let startX = e.clientX;
                                let startY = e.clientY;
                                let startLeft = parseInt(node.style.left) || left;
                                let startTop = parseInt(node.style.top) || top;
                                
                                function onMouseMove(e) {
                                    node.style.left = (startLeft + e.clientX - startX) + 'px';
                                    node.style.top = (startTop + e.clientY - startY) + 'px';
                                    node.style.right = 'auto';
                                }
                                
                                function onMouseUp() {
                                    document.removeEventListener('mousemove', onMouseMove);
                                    document.removeEventListener('mouseup', onMouseUp);
                                }
                                
                                document.addEventListener('mousemove', onMouseMove);
                                document.addEventListener('mouseup', onMouseUp);
                            }
                        });
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
}
