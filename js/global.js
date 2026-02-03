/* global.js - Version minimale pour MG_ultra */

class GlobalManager {
    constructor() {
        this.currentMode = 'txt';
        this.currentCours = null;
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setInitialState();
    }
    
    setupEventListeners() {
        // Mode PDF/TXT
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchMode(e.currentTarget.dataset.mode);
            });
        });
        
        // Onglets CSS
        document.querySelectorAll('.css-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                if (this.currentMode === 'txt') {
                    this.showCours(e.currentTarget.dataset.cours);
                }
            });
        });
        
        // Navigation bas (liens natifs HTML, pas besoin de JS)
        // Les liens <a href> fonctionnent déjà nativement
        
        // Recherche
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
        
        // Effacer recherche
        const clearBtn = document.getElementById('clear-search');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearSearch();
            });
        }
    }
    
    setInitialState() {
        // Mode TXT par défaut
        this.switchMode('txt');
    }
    
    switchMode(mode) {
        if (this.currentMode === mode) return;
        
        this.currentMode = mode;
        this.currentCours = null;
        
        // Mettre à jour les boutons de mode
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
        
        // Afficher/masquer les onglets CSS
        const cssTabsWrapper = document.getElementById('css-tabs-wrapper');
        if (cssTabsWrapper) {
            cssTabsWrapper.style.display = mode === 'txt' ? 'block' : 'none';
        }
        
        // Cacher tous les onglets CSS
        document.querySelectorAll('.css-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Afficher la bonne section
        document.querySelectorAll('.content-section').forEach(section => {
            section.style.display = 'none';
        });
        
        if (mode === 'pdf') {
            document.getElementById('section-pdf').style.display = 'block';
            if (window.pdfManager) window.pdfManager.loadPDFs();
        } else if (mode === 'txt') {
            document.getElementById('section-txt').style.display = 'block';
            this.showTxtCards();
            if (window.txtManager) window.txtManager.loadTxtFiles();
        }
        
        // Clear search
        this.clearSearch();
        window.scrollTo(0, 0);
    }
    
    showTxtCards() {
        const txtCards = document.getElementById('txt-cards-container');
        const coursContainer = document.getElementById('cours-container');
        
        if (txtCards) txtCards.style.display = 'block';
        if (coursContainer) coursContainer.style.display = 'none';
        
        document.querySelectorAll('.css-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        this.currentCours = null;
    }
    
    showCours(coursId) {
        if (this.currentMode !== 'txt') return;
        
        // Mettre à jour l'onglet actif
        document.querySelectorAll('.css-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.cours === coursId);
        });
        
        // Afficher le cours, cacher les cartes
        const txtCards = document.getElementById('txt-cards-container');
        const coursContainer = document.getElementById('cours-container');
        
        if (txtCards) txtCards.style.display = 'none';
        if (coursContainer) coursContainer.style.display = 'block';
        
        this.currentCours = coursId;
        
        // Charger le cours
        if (window.coursManager) {
            window.coursManager.loadCours(coursId);
        }
        
        window.scrollTo(0, 0);
    }
    
    handleSearch(searchTerm) {
        // Afficher/masquer le bouton effacer
        const clearBtn = document.getElementById('clear-search');
        if (clearBtn) {
            clearBtn.style.display = searchTerm.length > 0 ? 'flex' : 'none';
        }
        
        // Recherche selon le mode
        if (this.currentMode === 'pdf' && window.pdfManager) {
            window.pdfManager.handleSearch(searchTerm);
        } else if (this.currentMode === 'txt') {
            if (this.currentCours && window.coursManager) {
                window.coursManager.searchInCours(searchTerm, this.currentCours);
            } else if (window.txtManager) {
                window.txtManager.handleSearch(searchTerm);
                this.filterCssTabs(searchTerm);
            }
        }
    }
    
    filterCssTabs(searchTerm) {
        const term = searchTerm.toLowerCase();
        
        document.querySelectorAll('.css-tab').forEach(tab => {
            const tabName = tab.textContent.toLowerCase();
            const tabData = tab.dataset.cours.toLowerCase();
            
            if (term.length === 0 || tabName.includes(term) || tabData.includes(term)) {
                tab.style.display = 'block';
            } else {
                tab.style.display = 'none';
            }
        });
    }
    
    clearSearch() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = '';
            this.handleSearch('');
        }
        
        // Réafficher tous les onglets CSS
        document.querySelectorAll('.css-tab').forEach(tab => {
            tab.style.display = 'block';
        });
    }
}

// Initialisation
let globalManager = null;
document.addEventListener('DOMContentLoaded', () => {
    globalManager = new GlobalManager();
});

// Export pour debug
window.GlobalManager = GlobalManager;