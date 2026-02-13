// js/console.js - Gestion complète de la console

document.addEventListener('DOMContentLoaded', () => {
    initConsole();
});

function initConsole() {
    const consoleBtn = document.getElementById('console-toggle');
    const consolePanel = document.getElementById('consolePanel');
    const closeBtn = document.getElementById('close-console');
    const clearBtn = document.getElementById('clear-console');
    const consoleContent = document.getElementById('consoleContent');
    
    if (!consolePanel || !consoleContent) return;
    
    // État initial
    consolePanel.classList.add('hidden');
    
    // Ouverture/fermeture
    if (consoleBtn) {
        consoleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            consolePanel.classList.toggle('hidden');
            
            if (!consolePanel.classList.contains('hidden')) {
                captureConsoleMethods();
                // Exécute le code JS actuel dans la console
                executeCurrentCode();
            }
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            consolePanel.classList.add('hidden');
        });
    }
    
    // Bouton effacer (à ajouter dans le HTML)
    if (clearBtn) {
        clearBtn.addEventListener('click', clearConsole);
    }
    
    // Capture les erreurs globales
    window.addEventListener('error', (event) => {
        if (!consolePanel.classList.contains('hidden')) {
            appendToConsole('error', `${event.message} (ligne ${event.lineno})`);
        }
    });
    
    window.addEventListener('unhandledrejection', (event) => {
        if (!consolePanel.classList.contains('hidden')) {
            appendToConsole('error', `Promise non gérée : ${event.reason}`);
        }
    });
    
    // Sauvegarde des méthodes originales
    storeOriginalConsole();
}

let originalConsole = {};

function storeOriginalConsole() {
    originalConsole = {
        log: console.log,
        error: console.error,
        warn: console.warn,
        info: console.info
    };
}

function captureConsoleMethods() {
    // Restaure d'abord les originales
    console.log = originalConsole.log;
    console.error = originalConsole.error;
    console.warn = originalConsole.warn;
    console.info = originalConsole.info;
    
    // Puis les surcharge
    console.log = function(...args) {
        appendToConsole('log', args.map(formatArg).join(' '));
        originalConsole.log.apply(console, args);
    };
    
    console.error = function(...args) {
        appendToConsole('error', args.map(formatArg).join(' '));
        originalConsole.error.apply(console, args);
    };
    
    console.warn = function(...args) {
        appendToConsole('warn', args.map(formatArg).join(' '));
        originalConsole.warn.apply(console, args);
    };
    
    console.info = function(...args) {
        appendToConsole('info', args.map(formatArg).join(' '));
        originalConsole.info.apply(console, args);
    };
}

function executeCurrentCode() {
    const jsCode = window.editors?.js?.getValue() || '';
    if (!jsCode.trim()) return;
    
    try {
        // Crée une fonction async pour exécuter le code
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

function formatArg(arg) {
    if (arg === null) return 'null';
    if (arg === undefined) return 'undefined';
    if (arg instanceof Error) return arg.toString();
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
    
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    let icon = '📋';
    if (type === 'error') icon = '❌';
    if (type === 'warn') icon = '⚠️';
    if (type === 'info') icon = 'ℹ️';
    
    line.innerHTML = `<span class="console-time">[${timestamp}]</span> ${icon} ${message}`;
    
    consoleContent.appendChild(line);
    consoleContent.scrollTop = consoleContent.scrollHeight;
    
    // Limite à 200 lignes
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

// Commande manuelle dans la console
function executeCommand(command) {
    if (!command.trim()) return;
    
    appendToConsole('command', `› ${command}`);
    
    try {
        const result = eval(command);
        if (result !== undefined) {
            appendToConsole('log', formatArg(result));
        }
    } catch (error) {
        appendToConsole('error', error.toString());
    }
}

// Exposition globale
window.clearConsole = clearConsole;
window.executeCommand = executeCommand;