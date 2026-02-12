/* index.js - Script principal pour la page d'accueil MG_ultra */

// Configuration
const CONFIG = {
    DEBUG: true,
    SIDEBAR_CLOSE_TIMEOUT: 300
};

// Gestionnaire d'état global
const AppState = {
    currentTab: 'css',
    isSidebarOpen: false,
    isDarkMode: localStorage.getItem('darkMode') === 'true'
};

// Éléments DOM
const DOM = {
    // Onglets
    tabButtons: null,
    tabContents: null,
    
    // Sidebar
    sidebar: null,
    sidebarToggle: null,
    sidebarClose: null,
    sidebarOverlay: null,
    
    // Thème
    themeToggle: null
};

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    init();
});

/**
 * Initialisation principale
 */
function init() {
    cacheDOM();
    bindEvents();
    applyTheme();
    loadCurrentTab();
    log('Application initialisée');
}

/**
 * Cache les éléments DOM
 */
function cacheDOM() {
    // Onglets
    DOM.tabButtons = document.querySelectorAll('.tab-btn.pill-btn');
    DOM.tabContents = document.querySelectorAll('.tab-content');
    
    // Sidebar
    DOM.sidebar = document.getElementById('sidebar');
    DOM.sidebarToggle = document.getElementById('sidebar-toggle');
    DOM.sidebarClose = document.getElementById('sidebar-close');
    DOM.sidebarOverlay = document.getElementById('sidebar-overlay');
    
    // Thème
    DOM.themeToggle = document.getElementById('theme-toggle');
    
    log('DOM mis en cache');
}

/**
 * Attache les événements
 */
function bindEvents() {
    // Onglets (uniquement les boutons, pas les liens)
    DOM.tabButtons.forEach(btn => {
        if (btn.tagName === 'BUTTON') {
            btn.addEventListener('click', handleTabClick);
        }
    });
    
    // Sidebar
    if (DOM.sidebarToggle) {
        DOM.sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    if (DOM.sidebarClose) {
        DOM.sidebarClose.addEventListener('click', closeSidebar);
    }
    
    if (DOM.sidebarOverlay) {
        DOM.sidebarOverlay.addEventListener('click', closeSidebar);
    }
    
    // Thème
    if (DOM.themeToggle) {
        DOM.themeToggle.checked = AppState.isDarkMode;
        DOM.themeToggle.addEventListener('change', toggleTheme);
    }
    
    // Gestion des clics hors sidebar
    document.addEventListener('click', handleOutsideClick);
    
    // Touches clavier
    document.addEventListener('keydown', handleKeydown);
    
    // Partage
    const shareBtn = document.querySelector('.share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareSite);
    }
    
    log('Événements attachés');
}

/**
 * Gestion du clic sur les onglets (CSS, HTML, Moi uniquement)
 */
function handleTabClick(e) {
    const tabId = e.currentTarget.dataset.tab;
    activateTab(tabId);
    log(`Onglet activé: ${tabId}`);
}

/**
 * Active un onglet spécifique
 */
function activateTab(tabId) {
    // Désactiver tous les onglets
    DOM.tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    DOM.tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Désactiver tous les styles d'onglets
    document.querySelectorAll('link[id$="-tab-style"]').forEach(link => {
        link.disabled = true;
    });
    
    // Activer l'onglet sélectionné
    const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    const activeContent = document.getElementById(`${tabId}-content`);
    
    if (activeBtn) activeBtn.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
    
    // Activer le CSS spécifique à l'onglet
    const tabStyle = document.getElementById(`${tabId}-tab-style`);
    if (tabStyle) {
        tabStyle.disabled = false;
    }
    
    // Sauvegarder l'onglet actif
    AppState.currentTab = tabId;
    localStorage.setItem('currentTab', tabId);
    
    // Charger le contenu spécifique
    loadTabContent(tabId);
}

/**
 * Charge le contenu d'un onglet
 */
function loadTabContent(tabId) {
    const contentInner = document.getElementById(`${tabId}-content-inner`);
    if (!contentInner) return;
    
    // Afficher le loading
    contentInner.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>Chargement du contenu ${tabId.toUpperCase()}...</p>
        </div>
    `;
    
    // Émettre un événement pour les scripts spécifiques
    setTimeout(() => {
        const event = new CustomEvent(`load-${tabId}-content`, {
            detail: { tabId }
        });
        document.dispatchEvent(event);
        log(`Contenu de l'onglet ${tabId} en cours de chargement`);
    }, 300);
}

/**
 * Charge l'onglet sauvegardé
 */
function loadCurrentTab() {
    const savedTab = localStorage.getItem('currentTab') || 'css';
    activateTab(savedTab);
}

/**
 * Gestion de la sidebar
 */
function toggleSidebar() {
    if (AppState.isSidebarOpen) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

function openSidebar() {
    DOM.sidebar.style.transition = 'none';
    DOM.sidebarOverlay.style.transition = 'none';
    
    DOM.sidebar.classList.add('active');
    DOM.sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    AppState.isSidebarOpen = true;
    
    setTimeout(() => {
        DOM.sidebar.style.transition = '';
        DOM.sidebarOverlay.style.transition = '';
    }, CONFIG.SIDEBAR_CLOSE_TIMEOUT);
    
    log('Sidebar ouverte');
}

function closeSidebar() {
    DOM.sidebar.style.transition = 'none';
    DOM.sidebarOverlay.style.transition = 'none';
    
    DOM.sidebar.classList.remove('active');
    DOM.sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
    AppState.isSidebarOpen = false;
    
    setTimeout(() => {
        DOM.sidebar.style.transition = '';
        DOM.sidebarOverlay.style.transition = '';
    }, CONFIG.SIDEBAR_CLOSE_TIMEOUT);
    
    log('Sidebar fermée');
}

/**
 * Gestion des clics en dehors de la sidebar
 */
function handleOutsideClick(e) {
    if (!AppState.isSidebarOpen) return;
    
    const isSidebarClick = DOM.sidebar?.contains(e.target);
    const isToggleClick = DOM.sidebarToggle?.contains(e.target);
    
    if (!isSidebarClick && !isToggleClick) {
        closeSidebar();
    }
}

/**
 * Gestion du thème sombre/clair
 */
function toggleTheme() {
    AppState.isDarkMode = DOM.themeToggle.checked;
    localStorage.setItem('darkMode', AppState.isDarkMode);
    applyThemeToAllPages();
    log(`Thème changé: ${AppState.isDarkMode ? 'sombre' : 'clair'}`);
}

/**
 * Applique le thème sur la page actuelle
 */
function applyTheme() {
    if (AppState.isDarkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    }
}

/**
 * Applique le thème à toutes les pages
 */
function applyThemeToAllPages() {
    const styleId = 'global-theme-style';
    let style = document.getElementById(styleId);
    
    if (!style) {
        style = document.createElement('style');
        style.id = styleId;
        document.head.appendChild(style);
    }
    
    const themeStyles = AppState.isDarkMode ? `
        :root {
            --home-bg: #1a1a1a;
            --home-text: #e0e0e0;
            --home-text-light: #b0b0b0;
            --home-shadow-dark: #0a0a0a;
            --home-shadow-light: #2a2a2a;
        }
        
        body {
            background: #1a1a1a !important;
            color: #e0e0e0 !important;
        }
        
        .home-theme,
        .css-theme,
        .html-theme {
            background: #1a1a1a !important;
            color: #e0e0e0 !important;
        }
        
        .header-container,
        .content-container,
        .tabs-container,
        .tab-btn.pill-btn,
        .sidebar,
        .sidebar-btn,
        .theme-toggle,
        .profile-circle {
            background: #2d2d2d !important;
            box-shadow: 8px 8px 16px #0a0a0a,
                        -8px -8px 16px #2a2a2a !important;
        }
        
        .sidebar-content {
            box-shadow: inset 4px 4px 8px #0a0a0a,
                        inset -4px -4px 8px #2a2a2a !important;
        }
    ` : `
        :root {
            --home-bg: #e0e5ec;
            --home-text: #2c3e50;
            --home-text-light: #7f8c8d;
            --home-shadow-dark: #b8bec7;
            --home-shadow-light: #ffffff;
        }
        
        body {
            background: #e0e5ec !important;
            color: #2c3e50 !important;
        }
        
        .home-theme,
        .css-theme,
        .html-theme {
            background: #e0e5ec !important;
            color: #2c3e50 !important;
        }
        
        .header-container,
        .content-container,
        .tabs-container,
        .tab-btn.pill-btn,
        .sidebar,
        .sidebar-btn,
        .theme-toggle,
        .profile-circle {
            background: #e0e5ec !important;
            box-shadow: 8px 8px 16px #b8bec7,
                        -8px -8px 16px #ffffff !important;
        }
        
        .sidebar-content {
            box-shadow: inset 4px 4px 8px #b8bec7,
                        inset -4px -4px 8px #ffffff !important;
        }
    `;
    
    style.textContent = themeStyles;
    localStorage.setItem('themeStyles', themeStyles);
}

/**
 * Gestion des touches clavier
 */
function handleKeydown(e) {
    if (e.key === 'Escape' && AppState.isSidebarOpen) {
        closeSidebar();
    }
}

/**
 * Partage du site
 */
function shareSite() {
    if (navigator.share) {
        navigator.share({
            title: 'MG_ultra - Apprentissage Web',
            text: 'Découvrez MG_ultra, une plateforme interactive pour apprendre le développement web !',
            url: window.location.href
        }).catch(err => {
            console.error('Erreur partage:', err);
            fallbackShare();
        });
    } else {
        fallbackShare();
    }
}

function fallbackShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Lien copié dans le presse-papier !');
    }).catch(err => {
        console.error('Erreur copie:', err);
    });
}

/**
 * Utilitaires
 */
function log(message) {
    if (CONFIG.DEBUG) {
        console.log(`[MG_ultra] ${message}`);
    }
}

// Initialisation du thème persistant
if (localStorage.getItem('themeStyles')) {
    const style = document.createElement('style');
    style.id = 'global-theme-persistent';
    style.textContent = localStorage.getItem('themeStyles');
    document.head.appendChild(style);
}