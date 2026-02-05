/* index.js - Script principal pour la page d'accueil MG_ultra */

// Configuration
const CONFIG = {
    DEBUG: true,
    NOTIFICATION_TIMEOUT: 5000,
    SIDEBAR_CLOSE_TIMEOUT: 300
};

// Gestionnaire d'état global
const AppState = {
    currentTab: 'css',
    isSidebarOpen: false,
    isDarkMode: localStorage.getItem('darkMode') === 'true',
    isAuthenticated: false,
    userData: null,
    notifications: [],
    codageTimer: null,
    codageStartTime: null
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
    themeToggle: null,
    
    // Recherche
    searchInput: null,
    clearSearchBtn: null,
    
    // Notifications
    notificationsContainer: null,
    
    // Auth
    authBtn: null,
    userProfile: null
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
    setupAuth();
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
    
    // Recherche
    DOM.searchInput = document.getElementById('home-search');
    DOM.clearSearchBtn = document.querySelector('.clear-btn');
    
    // Notifications
    DOM.notificationsContainer = document.querySelector('.notifications-container');
    if (!DOM.notificationsContainer) {
        DOM.notificationsContainer = createNotificationsContainer();
    }
    
    // Auth
    DOM.authBtn = document.getElementById('auth-btn');
    DOM.userProfile = document.getElementById('user-profile');
    
    log('DOM mis en cache');
}

/**
 * Crée le conteneur de notifications s'il n'existe pas
 */
function createNotificationsContainer() {
    const container = document.createElement('div');
    container.className = 'notifications-container';
    document.body.appendChild(container);
    return container;
}

/**
 * Attache les événements
 */
function bindEvents() {
    // Onglets
    DOM.tabButtons.forEach(btn => {
        btn.addEventListener('click', handleTabClick);
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
    
    // Recherche
    if (DOM.searchInput) {
        DOM.searchInput.addEventListener('input', handleSearch);
        DOM.searchInput.addEventListener('focus', handleSearchFocus);
        DOM.searchInput.addEventListener('blur', handleSearchBlur);
    }
    
    if (DOM.clearSearchBtn) {
        DOM.clearSearchBtn.addEventListener('click', clearSearch);
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
 * Gestion du clic sur les onglets
 */
function handleTabClick(e) {
    const tabId = e.currentTarget.dataset.tab;
    
    // Vérifier l'accès pour certains onglets
    if (['jeux', 'moi'].includes(tabId) && !AppState.isAuthenticated) {
        showNotification('error', 'Accès restreint', 'Connectez-vous pour accéder à cette fonctionnalité.');
        return;
    }
    
    // Vérifier le timer pour le codage
    if (tabId === 'codage' && AppState.codageTimer && AppState.codageStartTime) {
        const elapsed = Date.now() - AppState.codageStartTime;
        const timeLeft = 7200000 - elapsed; // 2h en ms
        if (timeLeft <= 0) {
            showNotification('warning', 'Temps écoulé', 'Votre session de codage a expiré. Reconnectez-vous pour continuer.');
            return;
        }
    }
    
    // Activer l'onglet
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
    
    // Charger dynamiquement le contenu
    setTimeout(() => {
        // Ici, le contenu sera injecté par le script spécifique de l'onglet
        // Ex: css.js injectera le contenu dans #css-content-inner
        log(`Contenu de l'onglet ${tabId} en cours de chargement`);
        
        // Émettre un événement pour les scripts spécifiques
        const event = new CustomEvent(`load-${tabId}-content`, {
            detail: { tabId }
        });
        document.dispatchEvent(event);
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
    // Désactiver les animations pour éviter les bugs
    DOM.sidebar.style.transition = 'none';
    DOM.sidebarOverlay.style.transition = 'none';
    
    // Ouvrir
    DOM.sidebar.classList.add('active');
    DOM.sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    AppState.isSidebarOpen = true;
    
    // Réactiver les transitions après l'ouverture
    setTimeout(() => {
        DOM.sidebar.style.transition = '';
        DOM.sidebarOverlay.style.transition = '';
    }, CONFIG.SIDEBAR_CLOSE_TIMEOUT);
    
    log('Sidebar ouverte');
}

function closeSidebar() {
    // Désactiver les animations pour éviter les bugs
    DOM.sidebar.style.transition = 'none';
    DOM.sidebarOverlay.style.transition = 'none';
    
    // Fermer
    DOM.sidebar.classList.remove('active');
    DOM.sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
    AppState.isSidebarOpen = false;
    
    // Réactiver les transitions après la fermeture
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
    
    const isSidebarClick = DOM.sidebar.contains(e.target);
    const isToggleClick = DOM.sidebarToggle.contains(e.target);
    
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
    
    // Appliquer le thème sur TOUTES les pages
    applyThemeToAllPages();
    
    showNotification('success', 'Thème modifié', 
        AppState.isDarkMode ? 'Mode sombre activé' : 'Mode clair activé'
    );
    
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
 * Applique le thème à toutes les pages (css.html, html.html)
 */
function applyThemeToAllPages() {
    // Créer un style global qui s'applique à toutes les pages
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
        .profile-circle,
        .search-bar,
        .mode-buttons,
        .css-tab,
        .nav-buttons,
        .nav-btn {
            background: #2d2d2d !important;
            box-shadow: 8px 8px 16px #0a0a0a,
                        -8px -8px 16px #2a2a2a !important;
        }
        
        .search-bar,
        .sidebar-content {
            box-shadow: inset 4px 4px 8px #0a0a0a,
                        inset -4px -4px 8px #2a2a2a !important;
        }
        
        input, textarea, select {
            background: #2d2d2d !important;
            color: #e0e0e0 !important;
            border-color: #404040 !important;
        }
        
        .notification {
            background: #2d2d2d !important;
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
        .profile-circle,
        .search-bar,
        .mode-buttons,
        .css-tab,
        .nav-buttons,
        .nav-btn {
            background: #e0e5ec !important;
            box-shadow: 8px 8px 16px #b8bec7,
                        -8px -8px 16px #ffffff !important;
        }
        
        .search-bar,
        .sidebar-content {
            box-shadow: inset 4px 4px 8px #b8bec7,
                        inset -4px -4px 8px #ffffff !important;
        }
        
        input, textarea, select {
            background: #e0e5ec !important;
            color: #2c3e50 !important;
            border-color: #b8bec7 !important;
        }
        
        .notification {
            background: #e0e5ec !important;
        }
    `;
    
    style.textContent = themeStyles;
    
    // Sauvegarder dans localStorage pour les autres pages
    localStorage.setItem('themeStyles', themeStyles);
}

/**
 * Gestion de la recherche
 */
function handleSearch(e) {
    const value = e.target.value.trim();
    
    // Afficher/masquer le bouton clear
    if (DOM.clearSearchBtn) {
        if (value.length > 0) {
            DOM.clearSearchBtn.classList.add('visible');
        } else {
            DOM.clearSearchBtn.classList.remove('visible');
        }
    }
    
    // Recherche dans le contenu actif
    searchInCurrentTab(value);
}

function handleSearchFocus() {
    DOM.searchInput.parentElement.classList.add('focused');
}

function handleSearchBlur() {
    DOM.searchInput.parentElement.classList.remove('focused');
}

function clearSearch() {
    if (DOM.searchInput) {
        DOM.searchInput.value = '';
        DOM.clearSearchBtn.classList.remove('visible');
        searchInCurrentTab('');
        DOM.searchInput.focus();
    }
}

/**
 * Recherche dans l'onglet actif
 */
function searchInCurrentTab(searchTerm) {
    const activeContent = document.querySelector('.tab-content.active .tab-content-inner');
    if (!activeContent || searchTerm.length < 2) return;
    
    // Ici, chaque script d'onglet gérera sa propre recherche
    const event = new CustomEvent(`search-${AppState.currentTab}`, {
        detail: { searchTerm }
    });
    document.dispatchEvent(event);
}

/**
 * Gestion des touches clavier
 */
function handleKeydown(e) {
    // Escape : fermer sidebar ou modal
    if (e.key === 'Escape') {
        if (AppState.isSidebarOpen) {
            closeSidebar();
        }
        closeAllModals();
    }
    
    // Ctrl + K : focus sur la recherche
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (DOM.searchInput) {
            DOM.searchInput.focus();
        }
    }
}

/**
 * Ferme tous les modals ouverts
 */
function closeAllModals() {
    document.querySelectorAll('.notification-overlay.active').forEach(modal => {
        modal.classList.remove('active');
    });
}

/**
 * Gestion de l'authentification
 */
function setupAuth() {
    // Vérifier si l'utilisateur est déjà connecté
    const savedUser = localStorage.getItem('mg_user');
    if (savedUser) {
        try {
            AppState.userData = JSON.parse(savedUser);
            AppState.isAuthenticated = true;
            updateAuthUI();
            log('Utilisateur connecté depuis localStorage');
        } catch (e) {
            console.error('Erreur parsing user data:', e);
        }
    }
    
    // Écouter les événements de connexion
    document.addEventListener('user-login', (e) => {
        AppState.userData = e.detail.user;
        AppState.isAuthenticated = true;
        localStorage.setItem('mg_user', JSON.stringify(e.detail.user));
        updateAuthUI();
        showNotification('success', 'Connexion réussie', `Bienvenue ${e.detail.user.name || 'utilisateur'} !`);
    });
    
    document.addEventListener('user-logout', () => {
        AppState.userData = null;
        AppState.isAuthenticated = false;
        localStorage.removeItem('mg_user');
        updateAuthUI();
        showNotification('info', 'Déconnexion', 'Vous êtes maintenant déconnecté.');
    });
}

/**
 * Met à jour l'UI d'authentification
 */
function updateAuthUI() {
    if (!DOM.userProfile || !DOM.authBtn) return;
    
    if (AppState.isAuthenticated && AppState.userData) {
        // Mode connecté
        DOM.userProfile.classList.add('connected');
        DOM.userProfile.innerHTML = `
            <div class="profile-connected">
                <div class="profile-circle">
                    <img src="${AppState.userData.photoURL || './assets/logo.png'}" alt="${AppState.userData.name}">
                </div>
                <span class="profile-name">${AppState.userData.name || 'Utilisateur'}</span>
            </div>
        `;
        
        // Mettre à jour le bouton auth
        const authGroup = document.getElementById('auth-group');
        if (authGroup) {
            authGroup.innerHTML = `
                <h3 class="sidebar-group-title">Compte</h3>
                <button class="sidebar-btn logout-btn" id="logout-btn">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Déconnexion</span>
                </button>
            `;
            
            // Attacher l'événement de déconnexion
            document.getElementById('logout-btn').addEventListener('click', () => {
                localStorage.removeItem('mg_user');
                AppState.isAuthenticated = false;
                AppState.userData = null;
                updateAuthUI();
                
                const event = new CustomEvent('user-logout');
                document.dispatchEvent(event);
            });
        }
    } else {
        // Mode non connecté
        DOM.userProfile.classList.remove('connected');
        DOM.userProfile.innerHTML = `
            <div class="profile-default">
                <div class="profile-circle">
                    <i class="fas fa-user"></i>
                </div>
                <span class="profile-name">Connectez-vous</span>
            </div>
        `;
        
        // Restaurer le bouton auth
        const authGroup = document.getElementById('auth-group');
        if (authGroup) {
            authGroup.innerHTML = `
                <h3 class="sidebar-group-title">Compte</h3>
                <a href="auth.html" class="sidebar-btn auth-btn" id="auth-btn">
                    <i class="fas fa-sign-in-alt"></i>
                    <span>Connexion / Inscription</span>
                </a>
            `;
        }
    }
    
    // Désactiver/activer les onglets selon l'authentification
    updateTabAccess();
}

/**
 * Met à jour l'accès aux onglets selon l'authentification
 */
function updateTabAccess() {
    const jeuxBtn = document.querySelector('.tab-btn[data-tab="jeux"]');
    const moiBtn = document.querySelector('.tab-btn[data-tab="moi"]');
    
    if (jeuxBtn && moiBtn) {
        if (!AppState.isAuthenticated) {
            jeuxBtn.classList.add('disabled');
            moiBtn.classList.add('disabled');
            jejsBtn.title = 'Connectez-vous pour accéder aux jeux';
            moiBtn.title = 'Connectez-vous pour accéder à votre dashboard';
        } else {
            jeuxBtn.classList.remove('disabled');
            moiBtn.classList.remove('disabled');
            jeuxBtn.title = '';
            moiBtn.title = '';
        }
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
        }).then(() => {
            showNotification('success', 'Partage réussi', 'Merci de partager MG_ultra !');
        }).catch(err => {
            console.error('Erreur partage:', err);
            fallbackShare();
        });
    } else {
        fallbackShare();
    }
}

function fallbackShare() {
    // Copier le lien dans le presse-papier
    navigator.clipboard.writeText(window.location.href).then(() => {
        showNotification('success', 'Lien copié', 'Le lien a été copié dans le presse-papier !');
    }).catch(err => {
        console.error('Erreur copie:', err);
        showNotification('error', 'Erreur', 'Impossible de partager le site');
    });
}

/**
 * Système de notifications
 */
function showNotification(type, title, message) {
    const id = 'notification-' + Date.now();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const notification = document.createElement('div');
    notification.id = id;
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-header">
            <div class="notification-title">
                <i class="fas fa-${getNotificationIcon(type)}"></i>
                <span>${title}</span>
            </div>
            <button class="notification-close" onclick="removeNotification('${id}')">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="notification-body">${message}</div>
        <div class="notification-footer">
            <div class="notification-time">
                <i class="far fa-clock"></i>
                <span>${timestamp}</span>
            </div>
            <div class="notification-actions">
                <button class="notification-action-btn" onclick="expandNotification('${id}')">
                    <i class="fas fa-expand-alt"></i>
                </button>
                <button class="notification-action-btn delete" onclick="removeNotification('${id}', true)">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        </div>
    `;
    
    DOM.notificationsContainer.appendChild(notification);
    
    // Auto-suppression après timeout
    const timeout = setTimeout(() => {
        removeNotification(id);
    }, CONFIG.NOTIFICATION_TIMEOUT);
    
    // Sauvegarder la notification
    AppState.notifications.push({
        id,
        type,
        title,
        message,
        timestamp,
        timeout
    });
    
    // Limiter à 5 notifications max
    if (DOM.notificationsContainer.children.length > 5) {
        const firstChild = DOM.notificationsContainer.firstElementChild;
        if (firstChild) {
            removeNotification(firstChild.id);
        }
    }
    
    log(`Notification ${type}: ${title}`);
    
    // Retourner l'ID pour gestion externe
    return id;
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function removeNotification(id, immediate = false) {
    const notification = document.getElementById(id);
    if (!notification) return;
    
    if (immediate) {
        notification.remove();
    } else {
        notification.classList.add('exit');
        setTimeout(() => {
            notification.remove();
        }, 400);
    }
    
    // Nettoyer le timeout et l'état
    const notifIndex = AppState.notifications.findIndex(n => n.id === id);
    if (notifIndex !== -1) {
        clearTimeout(AppState.notifications[notifIndex].timeout);
        AppState.notifications.splice(notifIndex, 1);
    }
}

function expandNotification(id) {
    const notification = AppState.notifications.find(n => n.id === id);
    if (!notification) return;
    
    // Créer l'overlay
    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay active';
    overlay.innerHTML = `
        <div class="notification-modal">
            <div class="notification-modal-header">
                <div class="notification-modal-title">
                    <i class="fas fa-${getNotificationIcon(notification.type)}"></i>
                    <span>${notification.title}</span>
                </div>
                <button class="notification-modal-close" onclick="this.closest('.notification-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="notification-modal-body">
                ${notification.message}
            </div>
            <div class="notification-modal-footer">
                <button class="notification-modal-btn delete" onclick="removeNotification('${id}', true); this.closest('.notification-overlay').remove()">
                    <i class="far fa-trash-alt"></i> Supprimer
                </button>
                <button class="notification-modal-btn close" onclick="this.closest('.notification-overlay').remove()">
                    <i class="fas fa-times"></i> Fermer
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Fermer en cliquant à l'extérieur
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}

/**
 * Gestion du timer pour le codage
 */
function startCodageTimer() {
    if (AppState.codageTimer) {
        clearInterval(AppState.codageTimer);
    }
    
    AppState.codageStartTime = Date.now();
    AppState.codageTimer = setInterval(() => {
        const elapsed = Date.now() - AppState.codageStartTime;
        const timeLeft = 7200000 - elapsed; // 2h en ms
        
        if (timeLeft <= 0) {
            clearInterval(AppState.codageTimer);
            AppState.codageTimer = null;
            
            if (AppState.currentTab === 'codage') {
                showNotification('warning', 'Temps écoulé', 'Votre session de codage a expiré. Reconnectez-vous pour continuer.');
                activateTab('css');
            }
        }
        
        // Mettre à jour l'affichage du temps dans l'onglet codage
        if (AppState.currentTab === 'codage') {
            updateCodageTimerDisplay(timeLeft);
        }
    }, 60000); // Vérifier toutes les minutes
}

function updateCodageTimerDisplay(timeLeft) {
    const timerElement = document.getElementById('codage-timer');
    if (!timerElement) return;
    
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    timerElement.textContent = `Temps restant: ${hours}h ${minutes}m`;
}

/**
 * Utilitaires
 */
function log(message) {
    if (CONFIG.DEBUG) {
        console.log(`[MG_ultra] ${message}`);
    }
}

/**
 * Exports globaux pour les fonctions utilisées dans les attributs onclick
 */
window.removeNotification = removeNotification;
window.expandNotification = expandNotification;

// Initialisation du thème pour les autres pages au chargement
if (localStorage.getItem('themeStyles')) {
    const style = document.createElement('style');
    style.id = 'global-theme-persistent';
    style.textContent = localStorage.getItem('themeStyles');
    document.head.appendChild(style);
}