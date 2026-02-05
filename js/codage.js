/* codage.js - Environnement de codage HTML/CSS pour MG_ultra - Version avec timer bloqué pour utilisateurs connectés */

// Configuration
const CODAGE_CONFIG = {
    MAX_TIME: 7200000, // 2h en ms
    SAVE_KEY: 'mg_codage_save',
    AUTO_SAVE_INTERVAL: 30000, // 30 secondes
    DEFAULT_HTML: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mon Projet</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Bonjour le monde !</h1>
    <p>Commencez à coder ici...</p>
</body>
</html>`,
    DEFAULT_CSS: `/* Votre CSS ici */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background: #f5f5f5;
}

h1 {
    color: #333;
    text-align: center;
}

p {
    color: #666;
    line-height: 1.6;
}`
};

// État de l'éditeur
const CodageState = {
    htmlCode: '',
    cssCode: '',
    isPreviewMode: false,
    lastSaveTime: null,
    autoSaveInterval: null,
    isSaving: false,
    lineNumbers: {
        html: 1,
        css: 1
    },
    timerRunning: false,
    timerPaused: false,
    timeLeft: CODAGE_CONFIG.MAX_TIME,
    timerInterval: null
};

// Éléments DOM spécifiques au codage
const CodageDOM = {
    container: null,
    header: null,
    editorContainer: null,
    previewContainer: null,
    htmlEditor: null,
    cssEditor: null,
    htmlLineNumbers: null,
    cssLineNumbers: null,
    timerDisplay: null,
    previewBtn: null,
    saveBtn: null,
    timerStatus: null // Nouvel élément pour le statut du timer
};

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier qu'on est sur la page d'accueil
    if (!document.querySelector('.home-theme')) return;
    
    // Écouter l'événement de chargement de l'onglet codage
    document.addEventListener('load-codage-content', initCodage);
    
    // Écouter l'événement de recherche dans le codage
    document.addEventListener('search-codage', handleCodageSearch);
    
    console.log('Codage.js chargé et prêt - Version avec timer bloqué pour utilisateurs connectés');
});

/**
 * Vérifie si l'utilisateur est connecté
 */
function isUserAuthenticated() {
    // Vérifier via AuthManager (auth.js)
    if (window.AuthManager && typeof window.AuthManager.isAuthenticated === 'function') {
        return window.AuthManager.isAuthenticated();
    }
    
    // Vérifier via localStorage (fallback)
    const userData = localStorage.getItem('mg_user');
    return userData !== null && userData !== undefined;
}

/**
 * Initialise l'environnement de codage
 */
function initCodage() {
    console.log('Initialisation de l\'environnement de codage...');
    
    // Vérifier si l'utilisateur est connecté
    const isAuthenticated = isUserAuthenticated();
    
    createCodageInterface(isAuthenticated);
    loadSavedCode();
    setupCodageEvents();
    updateLineNumbers();
    
    if (!isAuthenticated) {
        // Timer seulement pour les non-connectés
        startCodageTimer();
        showCodageNotification('Timer activé', 'Votre session de codage est limitée à 2 heures.', 'info');
    } else {
        // Pas de timer pour les connectés
        showCodageNotification('Timer désactivé', 'En tant qu\'utilisateur connecté, vous avez un temps illimité.', 'success');
    }
    
    startAutoSave();
    console.log('Environnement de codage initialisé - Utilisateur connecté:', isAuthenticated);
}

/**
 * Crée l'interface de codage
 */
function createCodageInterface(isAuthenticated) {
    const contentInner = document.getElementById('codage-content-inner');
    if (!contentInner) return;
    
    // Déterminer le texte du timer en fonction de l'authentification
    const timerText = isAuthenticated ? 
        '<span class="timer-unlimited">∞ Illimité</span>' : 
        '<span id="timer-display">02:00:00</span>';
    
    const timerStatus = isAuthenticated ? 
        '<div class="timer-status unlimited"><i class="fas fa-infinity"></i> Connecté - Temps illimité</div>' :
        '<div class="timer-status limited"><i class="fas fa-clock"></i> Invité - Session limitée à 2h</div>';
    
    contentInner.innerHTML = `
        <div class="codage-container" id="codage-container">
            <!-- Header avec timer et boutons -->
            <header class="codage-header" id="codage-header">
                <div class="codage-timer" id="codage-timer">
                    <i class="far ${isAuthenticated ? 'fa-infinity' : 'fa-clock'}"></i>
                    ${timerText}
                </div>
                ${timerStatus}
                <div class="codage-buttons">
                    <button class="codage-btn preview-btn" id="preview-btn" title="Prévisualiser">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="codage-btn save-btn" id="save-btn" title="Enregistrer">
                        <i class="fas fa-save"></i>
                    </button>
                </div>
            </header>
            
            <!-- Éditeur (mode édition) -->
            <div class="codage-editor" id="codage-editor">
                <div class="editor-grid">
                    <!-- Éditeur HTML -->
                    <div class="editor-section html-editor">
                        <div class="editor-header">
                            <i class="fab fa-html5"></i>
                            <span>HTML</span>
                        </div>
                        <div class="editor-wrapper">
                            <div class="line-numbers" id="html-line-numbers">1</div>
                            <textarea class="code-editor html-code" 
                                      id="html-editor" 
                                      placeholder="Écrivez votre HTML ici..."
                                      spellcheck="false"></textarea>
                        </div>
                    </div>
                    
                    <!-- Éditeur CSS -->
                    <div class="editor-section css-editor">
                        <div class="editor-header">
                            <i class="fab fa-css3-alt"></i>
                            <span>CSS</span>
                        </div>
                        <div class="editor-wrapper">
                            <div class="line-numbers" id="css-line-numbers">1</div>
                            <textarea class="code-editor css-code" 
                                      id="css-editor" 
                                      placeholder="Écrivez votre CSS ici..."
                                      spellcheck="false"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Prévisualisation (mode preview) -->
            <div class="codage-preview" id="codage-preview" style="display: none;">
                <div class="preview-header">
                    <i class="fas fa-desktop"></i>
                    <span>Prévisualisation</span>
                    <button class="preview-back-btn" id="preview-back-btn" title="Retour à l'édition">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
                <iframe class="preview-frame" id="preview-frame" title="Prévisualisation"></iframe>
            </div>
            
            <!-- Indicateur de sauvegarde -->
            <div class="save-indicator" id="save-indicator">
                <i class="fas fa-check"></i>
                <span>Enregistré</span>
            </div>
        </div>
    `;
    
    // Mettre en cache les éléments DOM
    cacheCodageDOM();
}

/**
 * Met en cache les éléments DOM du codage
 */
function cacheCodageDOM() {
    CodageDOM.container = document.getElementById('codage-container');
    CodageDOM.header = document.getElementById('codage-header');
    CodageDOM.editorContainer = document.getElementById('codage-editor');
    CodageDOM.previewContainer = document.getElementById('codage-preview');
    CodageDOM.htmlEditor = document.getElementById('html-editor');
    CodageDOM.cssEditor = document.getElementById('css-editor');
    CodageDOM.htmlLineNumbers = document.getElementById('html-line-numbers');
    CodageDOM.cssLineNumbers = document.getElementById('css-line-numbers');
    CodageDOM.timerDisplay = document.getElementById('timer-display');
    CodageDOM.previewBtn = document.getElementById('preview-btn');
    CodageDOM.saveBtn = document.getElementById('save-btn');
    CodageDOM.previewFrame = document.getElementById('preview-frame');
    CodageDOM.previewBackBtn = document.getElementById('preview-back-btn');
    CodageDOM.saveIndicator = document.getElementById('save-indicator');
    CodageDOM.timerStatus = document.querySelector('.timer-status');
}

/**
 * Configure les événements du codage
 */
function setupCodageEvents() {
    if (!CodageDOM.htmlEditor || !CodageDOM.cssEditor) return;
    
    // Éditeurs
    CodageDOM.htmlEditor.addEventListener('input', handleCodeInput);
    CodageDOM.cssEditor.addEventListener('input', handleCodeInput);
    
    CodageDOM.htmlEditor.addEventListener('keydown', handleTabKey);
    CodageDOM.cssEditor.addEventListener('keydown', handleTabKey);
    
    CodageDOM.htmlEditor.addEventListener('scroll', syncLineNumbersScroll);
    CodageDOM.cssEditor.addEventListener('scroll', syncLineNumbersScroll);
    
    // Boutons
    if (CodageDOM.previewBtn) {
        CodageDOM.previewBtn.addEventListener('click', togglePreview);
    }
    
    if (CodageDOM.saveBtn) {
        CodageDOM.saveBtn.addEventListener('click', saveCode);
    }
    
    if (CodageDOM.previewBackBtn) {
        CodageDOM.previewBackBtn.addEventListener('click', togglePreview);
    }
    
    // Redimensionnement
    window.addEventListener('resize', updateLineNumbers);
}

/**
 * Gère l'entrée de code
 */
function handleCodeInput(e) {
    const editor = e.target;
    const isHtml = editor === CodageDOM.htmlEditor;
    
    if (isHtml) {
        CodageState.htmlCode = editor.value;
    } else {
        CodageState.cssCode = editor.value;
    }
    
    updateLineNumbers();
    
    // Mettre à jour le dernier changement
    CodageState.lastSaveTime = Date.now();
}

/**
 * Gère la touche Tab pour l'indentation
 */
function handleTabKey(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        
        const editor = e.target;
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        
        // Ajouter 4 espaces
        editor.value = editor.value.substring(0, start) + '    ' + editor.value.substring(end);
        
        // Déplacer le curseur
        editor.selectionStart = editor.selectionEnd = start + 4;
        
        // Mettre à jour l'état
        if (editor === CodageDOM.htmlEditor) {
            CodageState.htmlCode = editor.value;
        } else {
            CodageState.cssCode = editor.value;
        }
        
        updateLineNumbers();
    }
}

/**
 * Synchronise le scroll des numéros de ligne
 */
function syncLineNumbersScroll(e) {
    const editor = e.target;
    const isHtml = editor === CodageDOM.htmlEditor;
    const lineNumbers = isHtml ? CodageDOM.htmlLineNumbers : CodageDOM.cssLineNumbers;
    
    if (lineNumbers) {
        lineNumbers.scrollTop = editor.scrollTop;
    }
}

/**
 * Met à jour les numéros de ligne
 */
function updateLineNumbers() {
    if (!CodageDOM.htmlEditor || !CodageDOM.cssEditor) return;
    
    // HTML
    const htmlLines = CodageDOM.htmlEditor.value.split('\n').length;
    CodageState.lineNumbers.html = htmlLines;
    
    if (CodageDOM.htmlLineNumbers) {
        let numbers = '';
        for (let i = 1; i <= htmlLines; i++) {
            numbers += i + '\n';
        }
        CodageDOM.htmlLineNumbers.innerHTML = numbers;
        CodageDOM.htmlLineNumbers.scrollTop = CodageDOM.htmlEditor.scrollTop;
    }
    
    // CSS
    const cssLines = CodageDOM.cssEditor.value.split('\n').length;
    CodageState.lineNumbers.css = cssLines;
    
    if (CodageDOM.cssLineNumbers) {
        let numbers = '';
        for (let i = 1; i <= cssLines; i++) {
            numbers += i + '\n';
        }
        CodageDOM.cssLineNumbers.innerHTML = numbers;
        CodageDOM.cssLineNumbers.scrollTop = CodageDOM.cssEditor.scrollTop;
    }
}

/**
 * Démarre le timer du codage (seulement pour non-connectés)
 */
function startCodageTimer() {
    if (isUserAuthenticated()) {
        console.log('Utilisateur connecté - Timer désactivé');
        return;
    }
    
    if (CodageState.timerInterval) {
        clearInterval(CodageState.timerInterval);
    }
    
    // Charger le temps restant sauvegardé
    const savedTime = loadSavedTime();
    CodageState.timeLeft = savedTime || CODAGE_CONFIG.MAX_TIME;
    
    CodageState.timerRunning = true;
    CodageState.timerPaused = false;
    
    CodageState.timerInterval = setInterval(() => {
        if (!CodageState.timerPaused && CodageState.timerRunning) {
            CodageState.timeLeft -= 1000;
            
            if (CodageState.timeLeft <= 0) {
                CodageState.timeLeft = 0;
                CodageState.timerRunning = false;
                clearInterval(CodageState.timerInterval);
                handleTimeUp();
            }
            
            updateTimerDisplay();
            
            // Sauvegarder le temps restant toutes les minutes
            if (CodageState.timeLeft % 60000 === 0) {
                saveCurrentTime();
            }
        }
    }, 1000);
    
    updateTimerDisplay();
    
    // Notifications intermédiaires
    scheduleTimeNotifications();
}

/**
 * Charge le temps sauvegardé
 */
function loadSavedTime() {
    try {
        const saved = localStorage.getItem(CODAGE_CONFIG.SAVE_KEY);
        if (saved) {
            const saveData = JSON.parse(saved);
            return saveData.timeLeft || CODAGE_CONFIG.MAX_TIME;
        }
    } catch (error) {
        console.error('Erreur chargement temps:', error);
    }
    return null;
}

/**
 * Sauvegarde le temps actuel
 */
function saveCurrentTime() {
    try {
        const saveData = {
            timeLeft: CodageState.timeLeft,
            timestamp: Date.now()
        };
        localStorage.setItem('mg_codage_timer', JSON.stringify(saveData));
    } catch (error) {
        console.error('Erreur sauvegarde temps:', error);
    }
}

/**
 * Met à jour l'affichage du timer
 */
function updateTimerDisplay() {
    if (!CodageDOM.timerDisplay) return;
    
    if (isUserAuthenticated()) {
        // Pour les utilisateurs connectés, afficher "Illimité"
        CodageDOM.timerDisplay.innerHTML = '<span class="timer-unlimited">∞ Illimité</span>';
        return;
    }
    
    const hours = Math.floor(CodageState.timeLeft / 3600000);
    const minutes = Math.floor((CodageState.timeLeft % 3600000) / 60000);
    const seconds = Math.floor((CodageState.timeLeft % 60000) / 1000);
    
    CodageDOM.timerDisplay.textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Changer la couleur quand il reste peu de temps
    if (CodageState.timeLeft < 300000) { // 5 minutes
        CodageDOM.timerDisplay.style.color = '#e74c3c';
        CodageDOM.timerDisplay.classList.add('warning');
    } else if (CodageState.timeLeft < 900000) { // 15 minutes
        CodageDOM.timerDisplay.style.color = '#f39c12';
        CodageDOM.timerDisplay.classList.remove('warning');
        CodageDOM.timerDisplay.classList.add('alert');
    } else {
        CodageDOM.timerDisplay.style.color = '';
        CodageDOM.timerDisplay.classList.remove('warning', 'alert');
    }
}

/**
 * Planifie les notifications de temps
 */
function scheduleTimeNotifications() {
    if (isUserAuthenticated()) return;
    
    // Notification à 30 minutes
    if (CodageState.timeLeft > 1800000) {
        setTimeout(() => {
            if (CodageState.timerRunning) {
                showCodageNotification('30 minutes restantes', 'Il vous reste 30 minutes de codage.', 'info');
            }
        }, CodageState.timeLeft - 1800000);
    }
    
    // Notification à 15 minutes
    if (CodageState.timeLeft > 900000) {
        setTimeout(() => {
            if (CodageState.timerRunning) {
                showCodageNotification('15 minutes restantes', 'Il vous reste 15 minutes de codage.', 'warning');
            }
        }, CodageState.timeLeft - 900000);
    }
    
    // Notification à 5 minutes
    if (CodageState.timeLeft > 300000) {
        setTimeout(() => {
            if (CodageState.timerRunning) {
                showCodageNotification('5 minutes restantes', 'Il vous reste 5 minutes de codage. Pensez à sauvegarder !', 'warning');
            }
        }, CodageState.timeLeft - 300000);
    }
}

/**
 * Gère la fin du temps
 */
function handleTimeUp() {
    showCodageNotification('Temps écoulé', 'Votre session de codage a expiré. Connectez-vous pour un temps illimité.', 'error');
    
    // Sauvegarder automatiquement
    saveCode(true);
    
    // Désactiver les éditeurs
    if (CodageDOM.htmlEditor) CodageDOM.htmlEditor.disabled = true;
    if (CodageDOM.cssEditor) CodageDOM.cssEditor.disabled = true;
    
    // Revenir à l'onglet CSS après délai
    setTimeout(() => {
        if (window.activateTab) {
            window.activateTab('css');
        }
    }, 5000);
}

/**
 * Bascule entre mode édition et prévisualisation
 */
function togglePreview() {
    if (CodageState.isPreviewMode) {
        // Retour à l'édition
        CodageDOM.editorContainer.style.display = 'flex';
        CodageDOM.previewContainer.style.display = 'none';
        CodageState.isPreviewMode = false;
        
        if (CodageDOM.previewBtn) {
            CodageDOM.previewBtn.innerHTML = '<i class="fas fa-eye"></i>';
            CodageDOM.previewBtn.title = 'Prévisualiser';
        }
    } else {
        // Aller en prévisualisation
        updatePreview();
        CodageDOM.editorContainer.style.display = 'none';
        CodageDOM.previewContainer.style.display = 'flex';
        CodageState.isPreviewMode = true;
        
        if (CodageDOM.previewBtn) {
            CodageDOM.previewBtn.innerHTML = '<i class="fas fa-edit"></i>';
            CodageDOM.previewBtn.title = 'Retour à l\'édition';
        }
    }
}

/**
 * Met à jour la prévisualisation
 */
function updatePreview() {
    if (!CodageDOM.previewFrame) return;
    
    const html = CodageState.htmlCode || CODAGE_CONFIG.DEFAULT_HTML;
    const css = CodageState.cssCode || CODAGE_CONFIG.DEFAULT_CSS;
    
    // Créer un document complet
    const previewHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${css}</style>
        </head>
        <body>
            ${html.includes('<body>') ? html.replace(/<body[^>]*>|<\/body>/gi, '') : html}
        </body>
        </html>
    `;
    
    // Écrire dans l'iframe
    const iframeDoc = CodageDOM.previewFrame.contentDocument || 
                     CodageDOM.previewFrame.contentWindow.document;
    
    iframeDoc.open();
    iframeDoc.write(previewHTML);
    iframeDoc.close();
}

/**
 * Sauvegarde le code
 */
function saveCode(isAutoSave = false) {
    if (CodageState.isSaving) return;
    
    CodageState.isSaving = true;
    
    // Mettre à jour l'état depuis les éditeurs
    if (CodageDOM.htmlEditor) {
        CodageState.htmlCode = CodageDOM.htmlEditor.value;
    }
    if (CodageDOM.cssEditor) {
        CodageState.cssCode = CodageDOM.cssEditor.value;
    }
    
    // Préparer les données
    const saveData = {
        html: CodageState.htmlCode,
        css: CodageState.cssCode,
        timestamp: Date.now(),
        timeLeft: isUserAuthenticated() ? null : CodageState.timeLeft // Ne pas sauvegarder le temps pour les connectés
    };
    
    // Sauvegarder dans localStorage
    try {
        localStorage.setItem(CODAGE_CONFIG.SAVE_KEY, JSON.stringify(saveData));
        
        // Afficher l'indicateur de sauvegarde
        showSaveIndicator();
        
        if (!isAutoSave) {
            showCodageNotification('Enregistré', 'Votre code a été sauvegardé avec succès.', 'success');
        }
        
        console.log('Code sauvegardé:', saveData);
        
    } catch (error) {
        console.error('Erreur sauvegarde:', error);
        showCodageNotification('Erreur', 'Impossible de sauvegarder le code.', 'error');
    }
    
    CodageState.isSaving = false;
    CodageState.lastSaveTime = Date.now();
}

/**
 * Affiche l'indicateur de sauvegarde
 */
function showSaveIndicator() {
    if (!CodageDOM.saveIndicator) return;
    
    CodageDOM.saveIndicator.classList.add('show');
    
    setTimeout(() => {
        CodageDOM.saveIndicator.classList.remove('show');
    }, 2000);
}

/**
 * Charge le code sauvegardé
 */
function loadSavedCode() {
    try {
        const saved = localStorage.getItem(CODAGE_CONFIG.SAVE_KEY);
        
        if (saved) {
            const saveData = JSON.parse(saved);
            
            CodageState.htmlCode = saveData.html || CODAGE_CONFIG.DEFAULT_HTML;
            CodageState.cssCode = saveData.css || CODAGE_CONFIG.DEFAULT_CSS;
            
            // Ne charger le temps que si l'utilisateur n'est pas connecté
            if (!isUserAuthenticated()) {
                CodageState.timeLeft = saveData.timeLeft || CODAGE_CONFIG.MAX_TIME;
            }
            
            // Mettre à jour les éditeurs
            if (CodageDOM.htmlEditor) {
                CodageDOM.htmlEditor.value = CodageState.htmlCode;
            }
            if (CodageDOM.cssEditor) {
                CodageDOM.cssEditor.value = CodageState.cssCode;
            }
            
            console.log('Code chargé depuis la sauvegarde');
            
        } else {
            // Première utilisation
            CodageState.htmlCode = CODAGE_CONFIG.DEFAULT_HTML;
            CodageState.cssCode = CODAGE_CONFIG.DEFAULT_CSS;
            
            if (CodageDOM.htmlEditor) {
                CodageDOM.htmlEditor.value = CodageState.htmlCode;
            }
            if (CodageDOM.cssEditor) {
                CodageDOM.cssEditor.value = CodageState.cssCode;
            }
        }
        
    } catch (error) {
        console.error('Erreur chargement sauvegarde:', error);
        
        // Valeurs par défaut
        CodageState.htmlCode = CODAGE_CONFIG.DEFAULT_HTML;
        CodageState.cssCode = CODAGE_CONFIG.DEFAULT_CSS;
        
        if (CodageDOM.htmlEditor) {
            CodageDOM.htmlEditor.value = CodageState.htmlCode;
        }
        if (CodageDOM.cssEditor) {
            CodageDOM.cssEditor.value = CodageState.cssCode;
        }
    }
}

/**
 * Démarre la sauvegarde automatique
 */
function startAutoSave() {
    if (CodageState.autoSaveInterval) {
        clearInterval(CodageState.autoSaveInterval);
    }
    
    CodageState.autoSaveInterval = setInterval(() => {
        if (CodageState.htmlCode || CodageState.cssCode) {
            saveCode(true);
        }
    }, CODAGE_CONFIG.AUTO_SAVE_INTERVAL);
}

/**
 * Gère la recherche dans le codage
 */
function handleCodageSearch(e) {
    const searchTerm = e.detail.searchTerm.toLowerCase();
    
    if (!searchTerm) {
        // Réinitialiser la surbrillance
        resetHighlight();
        return;
    }
    
    // Rechercher dans le HTML
    if (CodageDOM.htmlEditor && CodageState.htmlCode) {
        highlightInEditor(CodageDOM.htmlEditor, searchTerm);
    }
    
    // Rechercher dans le CSS
    if (CodageDOM.cssEditor && CodageState.cssCode) {
        highlightInEditor(CodageDOM.cssEditor, searchTerm);
    }
}

/**
 * Met en surbrillance le texte dans un éditeur
 */
function highlightInEditor(editor, searchTerm) {
    const text = editor.value;
    const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
    
    // Créer un span temporaire pour la surbrillance
    const highlighted = text.replace(regex, '<mark class="search-highlight">$1</mark>');
    
    // Stocker la position du curseur
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    
    // Remplacer temporairement (juste pour l'affichage de recherche)
    // Note: Pour un vrai éditeur, on devrait créer un système de surbrillance plus sophistiqué
    console.log('Recherche dans le code:', searchTerm);
}

/**
 * Réinitialise la surbrillance
 */
function resetHighlight() {
    // Implémentation simplifiée
    console.log('Réinitialisation de la surbrillance');
}

/**
 * Échape les caractères spéciaux pour regex
 */
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Affiche une notification spécifique au codage
 */
function showCodageNotification(title, message, type = 'info') {
    if (window.showNotification) {
        window.showNotification(type, title, message);
    } else {
        console.log(`[${type.toUpperCase()}] ${title}: ${message}`);
        // Fallback simple
        alert(`${title}: ${message}`);
    }
}

/**
 * Nettoyage à la fermeture
 */
window.addEventListener('beforeunload', () => {
    // Sauvegarder avant de quitter
    if (CodageState.htmlCode || CodageState.cssCode) {
        saveCode(true);
    }
    
    // Sauvegarder le temps restant (seulement pour non-connectés)
    if (!isUserAuthenticated() && CodageState.timerRunning) {
        saveCurrentTime();
    }
    
    // Nettoyer les intervalles
    if (CodageState.autoSaveInterval) {
        clearInterval(CodageState.autoSaveInterval);
    }
    
    if (CodageState.timerInterval) {
        clearInterval(CodageState.timerInterval);
    }
});

// Export pour utilisation globale
window.CodageManager = {
    saveCode: () => saveCode(false),
    togglePreview,
    updatePreview,
    getState: () => ({ ...CodageState }),
    isUserAuthenticated,
    pauseTimer: () => { CodageState.timerPaused = true; },
    resumeTimer: () => { CodageState.timerPaused = false; }
};