/* auth.js - Gestion simplifiée de l'authentification MG_ultra */

// Configuration
const CONFIG = {
    DEBUG: true,
    REDIRECT_DELAY: 1500,
    MESSAGE_TIMEOUT: 5000
};

// État de l'authentification
const AuthState = {
    isAuthenticated: false,
    userData: null,
    isLoading: false,
    currentTab: 'connexion'
};

// Éléments DOM (seront initialisés plus tard)
let DOM = {};

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    initializeAuth();
});

/**
 * Initialise l'authentification
 */
function initializeAuth() {
    try {
        // Charger l'état depuis localStorage
        loadSavedAuth();
        
        // Mettre en cache les éléments DOM
        cacheDOM();
        
        // Attacher les événements
        bindEvents();
        
        log('✅ Auth initialisée');
        
    } catch (error) {
        console.error('❌ Erreur initialisation auth:', error);
        showError('Erreur d\'initialisation du système d\'authentification');
    }
}

/**
 * Charge l'état d'authentification sauvegardé
 */
function loadSavedAuth() {
    try {
        const savedUser = localStorage.getItem('mg_user');
        if (savedUser) {
            AuthState.userData = JSON.parse(savedUser);
            AuthState.isAuthenticated = true;
            log('Utilisateur chargé depuis localStorage');
        }
    } catch (e) {
        console.error('Erreur chargement utilisateur:', e);
    }
}

/**
 * Met en cache les éléments DOM
 */
function cacheDOM() {
    DOM = {
        // Onglets
        tabButtons: document.querySelectorAll('.auth-tab-btn'),
        forms: document.querySelectorAll('.auth-form'),
        
        // Connexion
        loginForm: document.getElementById('connexion-form'),
        loginEmail: document.getElementById('login-email'),
        loginPassword: document.getElementById('login-password'),
        loginSubmit: document.getElementById('login-submit'),
        loginRemember: document.getElementById('remember-me'),
        
        // Inscription
        signupForm: document.getElementById('inscription-form'),
        signupFirstname: document.getElementById('signup-firstname'),
        signupLastname: document.getElementById('signup-lastname'),
        signupEmail: document.getElementById('signup-email'),
        signupPassword: document.getElementById('signup-password'),
        signupConfirm: document.getElementById('signup-confirm'),
        signupSubmit: document.getElementById('signup-submit'),
        termsAgreement: document.getElementById('terms-agreement'),
        
        // Google
        googleAuthBtn: document.getElementById('google-auth-btn'),
        
        // Messages
        successMessage: document.getElementById('success-message'),
        errorMessage: document.getElementById('error-message'),
        successText: document.getElementById('success-text'),
        errorText: document.getElementById('error-text'),
        
        // Utilitaires
        passwordToggles: document.querySelectorAll('.password-toggle'),
        switchFormLinks: document.querySelectorAll('.switch-form'),
        messageCloseBtns: document.querySelectorAll('.message-close')
    };
}

/**
 * Attache les événements
 */
function bindEvents() {
    // Onglets
    if (DOM.tabButtons) {
        DOM.tabButtons.forEach(btn => {
            btn.addEventListener('click', handleTabClick);
        });
    }
    
    // Connexion
    if (DOM.loginForm) {
        DOM.loginForm.addEventListener('submit', handleLogin);
    }
    
    // Inscription
    if (DOM.signupForm) {
        DOM.signupForm.addEventListener('submit', handleSignup);
    }
    
    // Google (simulation pour le moment)
    if (DOM.googleAuthBtn) {
        DOM.googleAuthBtn.addEventListener('click', handleGoogleAuth);
    }
    
    // Basculer la visibilité des mots de passe
    if (DOM.passwordToggles) {
        DOM.passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', togglePasswordVisibility);
        });
    }
    
    // Basculer entre les formulaires
    if (DOM.switchFormLinks) {
        DOM.switchFormLinks.forEach(link => {
            link.addEventListener('click', handleSwitchForm);
        });
    }
    
    // Fermer les messages
    if (DOM.messageCloseBtns) {
        DOM.messageCloseBtns.forEach(btn => {
            btn.addEventListener('click', closeMessage);
        });
    }
    
    // Validation en temps réel
    if (DOM.signupPassword) {
        DOM.signupPassword.addEventListener('input', validatePasswordStrength);
    }
    
    if (DOM.signupConfirm) {
        DOM.signupConfirm.addEventListener('input', validatePasswordMatch);
    }
}

/**
 * Gère le clic sur les onglets
 */
function handleTabClick(e) {
    e.preventDefault();
    
    const tabId = e.currentTarget.dataset.tab;
    
    // Désactiver tous les onglets
    DOM.tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Désactiver tous les formulaires
    DOM.forms.forEach(form => {
        form.classList.remove('active');
    });
    
    // Activer l'onglet sélectionné
    e.currentTarget.classList.add('active');
    
    // Afficher le formulaire correspondant
    const activeForm = document.getElementById(`${tabId}-form`);
    if (activeForm) {
        activeForm.classList.add('active');
    }
    
    AuthState.currentTab = tabId;
    
    // Réinitialiser les messages
    closeAllMessages();
}

/**
 * Gère la connexion (simulation pour le moment)
 */
async function handleLogin(e) {
    e.preventDefault();
    
    if (!validateLoginForm()) return;
    
    const email = DOM.loginEmail.value.trim();
    const password = DOM.loginPassword.value;
    const rememberMe = DOM.loginRemember?.checked || false;
    
    setLoading(DOM.loginSubmit, true);
    
    try {
        // SIMULATION - À remplacer par Firebase
        await simulateAuthRequest('login', { email, password });
        
        // Créer l'objet utilisateur
        const userData = {
            uid: generateId(),
            email: email,
            name: email.split('@')[0],
            photoURL: 'assets/logo.png',
            provider: 'email',
            rememberMe: rememberMe
        };
        
        // Sauvegarder
        saveUserData(userData, rememberMe);
        
        // Afficher le succès
        showSuccess(`Bienvenue ${userData.name} ! Redirection en cours...`);
        
        // Rediriger après délai
        setTimeout(() => {
            redirectToIndex(userData);
        }, CONFIG.REDIRECT_DELAY);
        
    } catch (error) {
        showError(error.message || 'Erreur de connexion');
    } finally {
        setLoading(DOM.loginSubmit, false);
    }
}

/**
 * Gère l'inscription (simulation pour le moment)
 */
async function handleSignup(e) {
    e.preventDefault();
    
    if (!validateSignupForm()) return;
    
    const firstName = DOM.signupFirstname.value.trim();
    const lastName = DOM.signupLastname.value.trim();
    const email = DOM.signupEmail.value.trim();
    const password = DOM.signupPassword.value;
    
    setLoading(DOM.signupSubmit, true);
    
    try {
        // SIMULATION - À remplacer par Firebase
        await simulateAuthRequest('signup', { email, password, firstName, lastName });
        
        // Créer l'objet utilisateur
        const userData = {
            uid: generateId(),
            email: email,
            name: `${firstName} ${lastName}`,
            firstName: firstName,
            lastName: lastName,
            photoURL: 'assets/logo.png',
            provider: 'email'
        };
        
        // Sauvegarder
        saveUserData(userData, true);
        
        // Afficher le succès
        showSuccess(`Compte créé avec succès ! Bienvenue ${firstName} !`);
        
        // Rediriger après délai
        setTimeout(() => {
            redirectToIndex(userData);
        }, CONFIG.REDIRECT_DELAY);
        
    } catch (error) {
        showError(error.message || 'Erreur d\'inscription');
    } finally {
        setLoading(DOM.signupSubmit, false);
    }
}

/**
 * Gère l'authentification Google (simulation)
 */
async function handleGoogleAuth() {
    setLoading(DOM.googleAuthBtn, true);
    
    try {
        // SIMULATION - À remplacer par Firebase Google Auth
        await simulateAuthRequest('google', {});
        
        // Créer l'objet utilisateur Google
        const userData = {
            uid: generateId(),
            email: 'utilisateur.google@gmail.com',
            name: 'Utilisateur Google',
            photoURL: 'assets/logo.png',
            provider: 'google'
        };
        
        // Sauvegarder
        saveUserData(userData, true);
        
        // Afficher le succès
        showSuccess('Connexion Google réussie !');
        
        // Rediriger après délai
        setTimeout(() => {
            redirectToIndex(userData);
        }, CONFIG.REDIRECT_DELAY);
        
    } catch (error) {
        showError(error.message || 'Erreur d\'authentification Google');
    } finally {
        setLoading(DOM.googleAuthBtn, false);
    }
}

/**
 * Simule une requête d'authentification (à remplacer par Firebase)
 */
function simulateAuthRequest(type, data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulation de délai réseau
            if (CONFIG.DEBUG) {
                log(`Simulation ${type}:`, data);
            }
            
            // Simulation d'erreurs aléatoires (pour le test)
            const shouldFail = Math.random() < 0.1; // 10% de chance d'échec
            
            if (shouldFail) {
                const errors = {
                    login: 'Email ou mot de passe incorrect',
                    signup: 'Cet email est déjà utilisé',
                    google: 'Erreur d\'authentification Google'
                };
                reject(new Error(errors[type] || 'Erreur d\'authentification'));
                return;
            }
            
            resolve({ success: true, type });
        }, 1000); // 1 seconde de délai
    });
}

/**
 * Valide le formulaire de connexion
 */
function validateLoginForm() {
    let isValid = true;
    
    // Réinitialiser les erreurs
    clearErrors();
    
    // Email
    const email = DOM.loginEmail.value.trim();
    if (!email) {
        showFieldError('login-email', 'L\'email est requis');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('login-email', 'Email invalide');
        isValid = false;
    }
    
    // Mot de passe
    const password = DOM.loginPassword.value;
    if (!password) {
        showFieldError('login-password', 'Le mot de passe est requis');
        isValid = false;
    } else if (password.length < 6) {
        showFieldError('login-password', 'Le mot de passe doit contenir au moins 6 caractères');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Valide le formulaire d'inscription
 */
function validateSignupForm() {
    let isValid = true;
    
    // Réinitialiser les erreurs
    clearErrors();
    
    // Prénom
    const firstName = DOM.signupFirstname.value.trim();
    if (!firstName) {
        showFieldError('signup-firstname', 'Le prénom est requis');
        isValid = false;
    } else if (firstName.length < 2) {
        showFieldError('signup-firstname', 'Le prénom doit contenir au moins 2 caractères');
        isValid = false;
    }
    
    // Nom
    const lastName = DOM.signupLastname.value.trim();
    if (!lastName) {
        showFieldError('signup-lastname', 'Le nom est requis');
        isValid = false;
    } else if (lastName.length < 2) {
        showFieldError('signup-lastname', 'Le nom doit contenir au moins 2 caractères');
        isValid = false;
    }
    
    // Email
    const email = DOM.signupEmail.value.trim();
    if (!email) {
        showFieldError('signup-email', 'L\'email est requis');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('signup-email', 'Email invalide');
        isValid = false;
    }
    
    // Mot de passe
    const password = DOM.signupPassword.value;
    if (!password) {
        showFieldError('signup-password', 'Le mot de passe est requis');
        isValid = false;
    } else if (password.length < 8) {
        showFieldError('signup-password', 'Le mot de passe doit contenir au moins 8 caractères');
        isValid = false;
    }
    
    // Confirmation
    const confirm = DOM.signupConfirm.value;
    if (!confirm) {
        showFieldError('signup-confirm', 'Veuillez confirmer votre mot de passe');
        isValid = false;
    } else if (password !== confirm) {
        showFieldError('signup-confirm', 'Les mots de passe ne correspondent pas');
        isValid = false;
    }
    
    // Conditions
    if (!DOM.termsAgreement?.checked) {
        showError('Veuillez accepter les conditions d\'utilisation');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Valide la force du mot de passe
 */
function validatePasswordStrength() {
    const password = DOM.signupPassword.value;
    const errorElement = document.getElementById('signup-password-error');
    
    if (!password || !errorElement) return;
    
    if (password.length < 8) {
        errorElement.textContent = 'Le mot de passe doit contenir au moins 8 caractères';
        errorElement.style.display = 'block';
    } else {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

/**
 * Valide la correspondance des mots de passe
 */
function validatePasswordMatch() {
    const password = DOM.signupPassword.value;
    const confirm = DOM.signupConfirm.value;
    const errorElement = document.getElementById('signup-confirm-error');
    
    if (!confirm || !errorElement) return;
    
    if (password !== confirm) {
        errorElement.textContent = 'Les mots de passe ne correspondent pas';
        errorElement.style.display = 'block';
    } else {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

/**
 * Sauvegarde les données utilisateur
 */
function saveUserData(userData, remember = true) {
    try {
        AuthState.userData = userData;
        AuthState.isAuthenticated = true;
        
        // Sauvegarder dans localStorage
        localStorage.setItem('mg_user', JSON.stringify(userData));
        
        // Sauvegarder l'état de connexion
        if (remember) {
            localStorage.setItem('mg_remember', 'true');
        }
        
        log('Utilisateur sauvegardé:', userData);
        
    } catch (error) {
        console.error('Erreur sauvegarde utilisateur:', error);
    }
}

/**
 * Redirige vers index.html
 */
function redirectToIndex(userData) {
    // Préparer l'URL avec les données utilisateur (optionnel)
    const url = new URL('index.html', window.location.origin);
    
    // Ajouter un paramètre pour indiquer la connexion réussie
    url.searchParams.set('auth', 'success');
    url.searchParams.set('user', userData.name);
    
    // Rediriger
    window.location.href = url.toString();
}

/**
 * Affiche un message de succès
 */
function showSuccess(message) {
    if (DOM.successMessage && DOM.successText) {
        DOM.successText.textContent = message;
        DOM.successMessage.style.display = 'flex';
        
        // Auto-fermeture après délai
        setTimeout(() => {
            if (DOM.successMessage) {
                DOM.successMessage.style.display = 'none';
            }
        }, CONFIG.MESSAGE_TIMEOUT);
    }
}

/**
 * Affiche un message d'erreur
 */
function showError(message) {
    if (DOM.errorMessage && DOM.errorText) {
        DOM.errorText.textContent = message;
        DOM.errorMessage.style.display = 'flex';
    }
}

/**
 * Affiche une erreur de champ spécifique
 */
function showFieldError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

/**
 * Efface toutes les erreurs
 */
function clearErrors() {
    const errorElements = document.querySelectorAll('.input-error');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
    
    // Fermer les messages globaux
    closeAllMessages();
}

/**
 * Ferme tous les messages
 */
function closeAllMessages() {
    if (DOM.successMessage) {
        DOM.successMessage.style.display = 'none';
    }
    if (DOM.errorMessage) {
        DOM.errorMessage.style.display = 'none';
    }
}

/**
 * Ferme un message
 */
function closeMessage(e) {
    const message = e.currentTarget.closest('.message');
    if (message) {
        message.style.display = 'none';
    }
}

/**
 * Définit l'état de chargement d'un bouton
 */
function setLoading(button, isLoading) {
    if (!button) return;
    
    const btnText = button.querySelector('.btn-text');
    const btnLoader = button.querySelector('.btn-loader');
    
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
        if (btnText) btnText.style.opacity = '0';
        if (btnLoader) btnLoader.style.display = 'flex';
    } else {
        button.classList.remove('loading');
        button.disabled = false;
        if (btnText) btnText.style.opacity = '1';
        if (btnLoader) btnLoader.style.display = 'none';
    }
}

/**
 * Bascule la visibilité d'un mot de passe
 */
function togglePasswordVisibility(e) {
    const targetId = e.currentTarget.dataset.target;
    const passwordInput = document.getElementById(targetId);
    
    if (!passwordInput) return;
    
    const type = passwordInput.getAttribute('type');
    const icon = e.currentTarget.querySelector('i');
    
    if (type === 'password') {
        passwordInput.setAttribute('type', 'text');
        if (icon) {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    } else {
        passwordInput.setAttribute('type', 'password');
        if (icon) {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
}

/**
 * Bascule entre les formulaires
 */
function handleSwitchForm(e) {
    e.preventDefault();
    
    const targetTab = e.currentTarget.dataset.switchTo;
    
    // Trouver et cliquer sur l'onglet correspondant
    const targetTabBtn = document.querySelector(`.auth-tab-btn[data-tab="${targetTab}"]`);
    if (targetTabBtn) {
        targetTabBtn.click();
    }
}

/**
 * Vérifie si un email est valide
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Génère un ID unique
 */
function generateId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Log pour le debug
 */
function log(...args) {
    if (CONFIG.DEBUG) {
        console.log('[Auth]', ...args);
    }
}

/**
 * Déconnexion (pour index.js)
 */
function logout() {
    AuthState.userData = null;
    AuthState.isAuthenticated = false;
    
    // Supprimer de localStorage
    localStorage.removeItem('mg_user');
    localStorage.removeItem('mg_remember');
    
    log('Utilisateur déconnecté');
}

/**
 * Export des fonctions pour index.js
 */
window.AuthManager = {
    logout,
    getCurrentUser: () => AuthState.userData,
    isAuthenticated: () => AuthState.isAuthenticated
};

// Initialisation de secours
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAuth);
} else {
    setTimeout(initializeAuth, 100);
}