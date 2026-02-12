// js/console.js

document.addEventListener('DOMContentLoaded', () => {
    initConsole();
});

function initConsole() {
    const consolePanel = document.getElementById('consolePanel');
    if (!consolePanel) return;

    // Ajoute les contrôles console
    addConsoleControls();
    
    // Écoute les changements dans l'éditeur JS
    if (window.editors?.js) {
        window.editors.js.on('change', debounce(() => {
            if (!consolePanel.classList.contains('hidden')) {
                executeAndCapture();
            }
        }, 800));
    }
    
    // Capture au premier affichage
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if (!consolePanel.classList.contains('hidden')) {
                    clearConsole();
                    executeAndCapture();
                }
            }
        });
    });
    
    observer.observe(consolePanel, { attributes: true });
}

function addConsoleControls() {
    const consoleHeader = document.querySelector('.console-header');
    if (!consoleHeader) return;
    
    // Garde le bouton close existant, ajoute nouveaux contrôles
    const closeBtn = consoleHeader.querySelector('#close-console');
    
    // Crée groupe de contrôles gauche
    const controlsLeft = document.createElement('div');
    controlsLeft.className = 'console-controls-left';
    
    // Bouton copier
    const copyBtn = document.createElement('button');
    copyBtn.className = 'pill-icon small';
    copyBtn.title = 'Copier la console';
    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
    copyBtn.addEventListener('click', copyConsoleContent);
    
    // Bouton effacer
    const clearBtn = document.createElement('button');
    clearBtn.className = 'pill-icon small';
    clearBtn.title = 'Effacer la console';
    clearBtn.innerHTML = '<i class="fas fa-trash"></i>';
    clearBtn.addEventListener('click', clearConsole);
    
    // Input ligne de commande
    const commandInput = document.createElement('input');
    commandInput.type = 'text';
    commandInput.className = 'console-command';
    commandInput.placeholder = '› Exécuter du code... (Entrée)';
    commandInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            executeCommand(commandInput.value);
            commandInput.value = '';
        }
    });
    
    controlsLeft.appendChild(copyBtn);
    controlsLeft.appendChild(clearBtn);
    
    // Insère les contrôles avant le closeBtn
    consoleHeader.insertBefore(controlsLeft, consoleHeader.firstChild);
    consoleHeader.insertBefore(commandInput, closeBtn);
}

function executeCommand(code) {
    if (!code.trim()) return;
    
    // Affiche la commande
    appendToConsole('command', `› ${code}`);
    
    try {
        // Crée une fonction pour évaluer le code dans le contexte de la page
        const result = eval(code);
        
        // Affiche le résultat
        if (result !== undefined) {
            let output;
            if (result instanceof Promise) {
                output = 'Promise { <pending> }';
                result.then(val => {
                    appendToConsole('log', `Promise résolue: ${formatArg(val)}`);
                }).catch(err => {
                    appendToConsole('error', `Promise rejetée: ${formatArg(err)}`);
                });
            } else {
                output = formatArg(result);
                appendToConsole('log', output);
            }
        }
    } catch (error) {
        appendToConsole('error', error.toString());
    }
}

function copyConsoleContent() {
    const consoleContent = document.getElementById('consoleContent');
    if (!consoleContent) return;
    
    const text = Array.from(consoleContent.children)
        .map(line => line.textContent)
        .join('\n');
    
    navigator.clipboard.writeText(text).then(() => {
        // Feedback visuel
        const copyBtn = document.querySelector('.console-controls-left .fa-copy');
        if (copyBtn) {
            copyBtn.style.color = '#4c9a8c';
            setTimeout(() => copyBtn.style.color = '', 500);
        }
    });
}

function executeAndCapture() {
    clearConsole();
    
    const jsCode = window.editors?.js?.getValue() || '';
    if (!jsCode.trim()) return;
    
    captureConsoleMethods();
    
    try {
        const asyncWrapper = new Function(`
            return (async () => {
                try {
                    ${jsCode}
                } catch (error) {
                    console.error(error);
                }
            })()
        `);
        
        asyncWrapper();
    } catch (error) {
        appendToConsole('error', error.toString());
    }
}

function captureConsoleMethods() {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalInfo = console.info;
    
    console.log = function(...args) {
        appendToConsole('log', args.map(formatArg).join(' '));
        originalLog.apply(console, args);
    };
    
    console.error = function(...args) {
        appendToConsole('error', args.map(formatArg).join(' '));
        originalError.apply(console, args);
    };
    
    console.warn = function(...args) {
        appendToConsole('warn', args.map(formatArg).join(' '));
        originalWarn.apply(console, args);
    };
    
    console.info = function(...args) {
        appendToConsole('log', args.map(formatArg).join(' '));
        originalInfo.apply(console, args);
    };
    
    window.onerror = (msg, url, line, col, error) => {
        appendToConsole('error', `${msg} (ligne ${line})`);
    };
    
    window.onunhandledrejection = (event) => {
        appendToConsole('error', `Promise non gérée : ${event.reason}`);
    };
}

function formatArg(arg) {
    if (arg === null) return 'null';
    if (arg === undefined) return 'undefined';
    if (arg instanceof Error) return arg.message;
    if (typeof arg === 'object') {
        try {
            return JSON.stringify(arg, null, 2);
        } catch {
            return arg.toString();
        }
    }
    return String(arg);
}

function appendToConsole(type, message) {
    const consoleContent = document.getElementById('consoleContent');
    if (!consoleContent) return;

    const line = document.createElement('div');
    line.className = `console-line console-${type}`;
    
    const timestamp = new Date().toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    let icon = '';
    if (type === 'error') icon = '❌';
    if (type === 'log') icon = '📋';
    if (type === 'warn') icon = '⚠️';
    if (type === 'command') icon = '›';

    line.innerHTML = `<span class="console-time">[${timestamp}]</span> ${icon} ${message}`;
    
    consoleContent.appendChild(line);
    consoleContent.scrollTop = consoleContent.scrollHeight;

    while (consoleContent.children.length > 200) {
        consoleContent.removeChild(consoleContent.children[0]);
    }
}

function clearConsole() {
    const consoleContent = document.getElementById('consoleContent');
    if (consoleContent) {
        consoleContent.innerHTML = '';
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.clearConsole = clearConsole;
window.executeAndCapture = executeAndCapture;