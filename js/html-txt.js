/* html-txt.js - Gestion des fichiers TXT HTML pour MG_ultra - CORRIGÉ */

// Configuration GitHub spécifique HTML
const HTML_TXT_CONFIG = {
    GITHUB_USER: 'ivan-26work',
    GITHUB_REPO: 'meg',
    GITHUB_BRANCH: 'main',
    TXT_BASE_PATH: 'txt/html'
};

class HTMLTXTManager {
    constructor() {
        this.txtFiles = [];
        this.filteredTxts = [];
        this.isLoading = false;
        this.currentSearchTerm = '';
        this.currentTxtContent = null;
        this.currentTxtIndex = 0;
        
        // Éléments DOM - IDs STANDARDS (mêmes que css.html)
        this.txtCardsGrid = document.getElementById('txt-cards-grid');
        this.coursContainer = document.getElementById('cours-container');
        this.txtCardsContainer = document.getElementById('txt-cards-container');
        this.searchInput = document.getElementById('search-input');
        
        // Éléments du modal - IDs STANDARDS
        this.txtModal = document.getElementById('txt-modal');
        this.modalTitle = document.getElementById('txt-modal-title');
        this.modalBody = document.getElementById('txt-modal-content');
        this.modalClose = document.getElementById('close-txt-modal');
        
        this.init();
    }
    
    /**
     * Initialisation
     */
    init() {
        if (!this.txtCardsGrid) {
            console.error('Élément #txt-cards-grid non trouvé');
            return;
        }
        
        this.setupEventListeners();
        this.loadTxtFiles();
    }
    
    /**
     * Configuration des écouteurs d'événements
     */
    setupEventListeners() {
        // Recherche en temps réel
        if (this.searchInput) {
            this.searchInput.addEventListener('input', this.debounce(() => {
                this.handleSearch(this.searchInput.value);
            }, 300));
        }
        
        // Fermeture du modal
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => {
                this.closeTxtModal();
            });
        }
        
        // Fermer modal avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.txtModal && this.txtModal.style.display !== 'none') {
                this.closeTxtModal();
            }
        });
        
        // Fermer modal en cliquant à l'extérieur
        if (this.txtModal) {
            this.txtModal.addEventListener('click', (e) => {
                if (e.target === this.txtModal) {
                    this.closeTxtModal();
                }
            });
        }
        
        // Navigation entre fichiers TXT dans le modal
        document.addEventListener('keydown', (e) => {
            if (this.txtModal && this.txtModal.style.display !== 'none') {
                if (e.key === 'ArrowLeft') {
                    this.showPreviousTxt();
                } else if (e.key === 'ArrowRight') {
                    this.showNextTxt();
                }
            }
        });
        
        // Événements délégués pour les cartes TXT
        if (this.txtCardsGrid) {
            this.txtCardsGrid.addEventListener('click', (e) => {
                const card = e.target.closest('.txt-card');
                if (!card) return;
                
                const txtIndex = parseInt(card.dataset.index);
                if (!isNaN(txtIndex) && this.txtFiles[txtIndex]) {
                    this.openTxtFile(this.txtFiles[txtIndex], txtIndex);
                }
            });
        }
    }
    
    /**
     * Charge la liste des fichiers TXT HTML depuis GitHub
     */
    async loadTxtFiles() {
        this.isLoading = true;
        this.showLoadingState();
        
        try {
            const apiUrl = `https://api.github.com/repos/${HTML_TXT_CONFIG.GITHUB_USER}/${HTML_TXT_CONFIG.GITHUB_REPO}/contents/${HTML_TXT_CONFIG.TXT_BASE_PATH}?ref=${HTML_TXT_CONFIG.GITHUB_BRANCH}`;
            console.log('Chargement TXT depuis:', apiUrl);
            
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                if (response.status === 404) {
                    this.showEmptyState();
                    return;
                }
                throw new Error(`Erreur GitHub: ${response.status}`);
            }
            
            const files = await response.json();
            
            // Filtrer uniquement les fichiers TXT
            this.txtFiles = files
                .filter(file => file.name.toLowerCase().endsWith('.txt'))
                .map((file, index) => ({
                    name: file.name,
                    downloadUrl: file.download_url,
                    rawUrl: `https://raw.githubusercontent.com/${HTML_TXT_CONFIG.GITHUB_USER}/${HTML_TXT_CONFIG.GITHUB_REPO}/${HTML_TXT_CONFIG.GITHUB_BRANCH}/${HTML_TXT_CONFIG.TXT_BASE_PATH}/${file.name}`,
                    size: file.size ? this.formatFileSize(file.size) : 'Inconnu',
                    path: file.path,
                    index: index,
                    category: 'html'
                }));
            
            console.log(`${this.txtFiles.length} fichiers TXT HTML chargés`);
            this.renderTxtCards(this.txtFiles);
            
        } catch (error) {
            console.error('Erreur chargement fichiers TXT HTML:', error);
            this.showErrorState(error.message);
            
        } finally {
            this.isLoading = false;
            this.hideLoadingState();
        }
    }
    
    /**
     * Charge le contenu d'un fichier TXT
     */
    async loadTxtContent(txtFile) {
        try {
            console.log('Chargement contenu:', txtFile.rawUrl);
            const response = await fetch(txtFile.rawUrl);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const content = await response.text();
            
            // Utiliser le formateur TXT
            let formattedContent = content;
            if (window.TXTDisplayManager) {
                formattedContent = window.TXTDisplayManager.formatTextContent(content, txtFile.name);
            } else {
                formattedContent = this.formatTxtContent(content);
            }
            
            return {
                ...txtFile,
                content: content,
                formattedContent: formattedContent
            };
            
        } catch (error) {
            console.error('Erreur chargement contenu TXT:', error);
            throw error;
        }
    }
    
    /**
     * Formate le contenu TXT (fallback)
     */
    formatTxtContent(content) {
        let formatted = this.escapeHTML(content);
        formatted = formatted.replace(/\n/g, '<br>');
        formatted = formatted.replace(/^# (.+)$/gm, '<h2 class="txt-title">$1</h2>');
        formatted = formatted.replace(/^## (.+)$/gm, '<h3 class="txt-subtitle">$1</h3>');
        formatted = formatted.replace(/`([^`]+)`/g, '<code class="txt-inline-code">$1</code>');
        return formatted;
    }
    
    /**
     * Affiche les cartes TXT
     */
    renderTxtCards(txts) {
        if (!this.txtCardsGrid) return;
        
        this.txtCardsGrid.innerHTML = '';
        
        if (txts.length === 0) {
            this.showEmptyState();
            return;
        }
        
        txts.forEach((txt, index) => {
            const card = this.createTxtCard(txt, index);
            this.txtCardsGrid.appendChild(card);
        });
    }
    
    /**
     * Crée une carte TXT
     */
    createTxtCard(txt, index) {
        const card = document.createElement('div');
        card.className = 'txt-card';
        card.dataset.index = index;
        card.style.animationDelay = `${index * 0.05}s`;
        
        const displayName = txt.name.replace('.txt', '').replace(/_/g, ' ');
        
        card.innerHTML = `
            <div class="txt-card-header">
                <i class="fas fa-file-alt txt-card-icon"></i>
                <div class="txt-card-title-wrapper">
                    <h3 class="txt-card-title">${this.escapeHTML(displayName)}</h3>
                    <span class="txt-category">HTML</span>
                </div>
            </div>
            <div class="txt-card-preview">
                <p class="txt-preview-text">Chargement du contenu...</p>
            </div>
            <div class="txt-card-footer">
                <span class="txt-file-size">${txt.size}</span>
                <button class="txt-open-btn" title="Ouvrir en plein écran">
                    <i class="fas fa-expand"></i>
                </button>
            </div>
        `;
        
        this.loadTxtPreview(txt, card);
        return card;
    }
    
    /**
     * Charge un extrait pour prévisualisation
     */
    async loadTxtPreview(txtFile, cardElement) {
        try {
            const content = await this.loadTxtContent(txtFile);
            const previewElement = cardElement.querySelector('.txt-preview-text');
            
            if (previewElement && content.content) {
                const previewText = content.content.substring(0, 150).trim();
                previewElement.textContent = previewText + (content.content.length > 150 ? '...' : '');
            }
        } catch (error) {
            const previewElement = cardElement.querySelector('.txt-preview-text');
            if (previewElement) {
                previewElement.textContent = 'Contenu non disponible';
            }
        }
    }
    
    /**
     * Ouvre un fichier TXT en plein écran
     */
    async openTxtFile(txtFile, index) {
        this.isLoading = true;
        this.showModalLoading();
        
        try {
            const fullContent = await this.loadTxtContent(txtFile);
            this.currentTxtContent = fullContent;
            this.currentTxtIndex = index;
            
            const displayName = txtFile.name.replace('.txt', '').replace(/_/g, ' ');
            
            if (this.modalTitle) {
                this.modalTitle.textContent = displayName;
            }
            
            if (this.modalBody) {
                this.modalBody.innerHTML = fullContent.formattedContent;
            }
            
            if (this.txtModal) {
                this.txtModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
            
            if (this.currentSearchTerm) {
                this.highlightSearchInModal(this.currentSearchTerm);
            }
            
        } catch (error) {
            console.error('Erreur ouverture fichier TXT:', error);
            
            if (this.modalBody) {
                this.modalBody.innerHTML = `
                    <div class="txt-error">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h3>Erreur de chargement</h3>
                        <p>Impossible de charger le fichier HTML.</p>
                        <p><small>${this.escapeHTML(error.message)}</small></p>
                    </div>
                `;
            }
            
        } finally {
            this.isLoading = false;
            this.hideModalLoading();
        }
    }
    
    /**
     * Fichier précédent
     */
    async showPreviousTxt() {
        if (this.txtFiles.length === 0) return;
        
        let newIndex = this.currentTxtIndex - 1;
        if (newIndex < 0) newIndex = this.txtFiles.length - 1;
        
        const txtFile = this.filteredTxts.length > 0 
            ? this.filteredTxts[newIndex] 
            : this.txtFiles[newIndex];
        
        if (txtFile) {
            this.openTxtFile(txtFile, newIndex);
        }
    }
    
    /**
     * Fichier suivant
     */
    async showNextTxt() {
        if (this.txtFiles.length === 0) return;
        
        let newIndex = this.currentTxtIndex + 1;
        if (newIndex >= this.txtFiles.length) newIndex = 0;
        
        const txtFile = this.filteredTxts.length > 0 
            ? this.filteredTxts[newIndex] 
            : this.txtFiles[newIndex];
        
        if (txtFile) {
            this.openTxtFile(txtFile, newIndex);
        }
    }
    
    /**
     * Ferme le modal TXT
     */
    closeTxtModal() {
        if (this.txtModal) {
            this.txtModal.style.display = 'none';
            document.body.style.overflow = '';
        }
        this.currentTxtContent = null;
    }
    
    /**
     * Gère la recherche
     */
    handleSearch(searchTerm) {
        this.currentSearchTerm = searchTerm.toLowerCase().trim();
        
        if (!this.currentSearchTerm) {
            this.renderTxtCards(this.txtFiles);
            return;
        }
        
        this.filteredTxts = this.txtFiles.filter(txt => {
            return txt.name.toLowerCase().includes(this.currentSearchTerm);
        });
        
        this.renderTxtCards(this.filteredTxts);
        this.highlightSearchResults();
    }
    
    /**
     * Met en évidence les résultats
     */
    highlightSearchResults() {
        if (!this.currentSearchTerm || this.currentSearchTerm.length < 2) return;
        
        const titles = this.txtCardsGrid.querySelectorAll('.txt-card-title');
        const regex = new RegExp(`(${this.escapeRegex(this.currentSearchTerm)})`, 'gi');
        
        titles.forEach(title => {
            const originalText = title.textContent;
            const highlightedText = originalText.replace(regex, 
                '<span class="search-highlight">$1</span>'
            );
            
            if (highlightedText !== originalText) {
                title.innerHTML = highlightedText;
            }
        });
    }
    
    /**
     * Met en évidence dans le modal
     */
    highlightSearchInModal(searchTerm) {
        if (!searchTerm || searchTerm.length < 2 || !this.modalBody) return;
        
        const regex = new RegExp(`(${this.escapeRegex(searchTerm)})`, 'gi');
        const modalContent = this.modalBody.innerHTML;
        const highlightedContent = modalContent.replace(regex, 
            '<span class="modal-search-highlight">$1</span>'
        );
        
        if (highlightedContent !== modalContent) {
            this.modalBody.innerHTML = highlightedContent;
        }
    }
    
    /**
     * États d'interface
     */
    showLoadingState() {
        if (!this.txtCardsGrid) return;
        
        this.txtCardsGrid.innerHTML = `
            <div class="txt-loading" style="grid-column: 1 / -1;">
                <div class="spinner"></div>
                <p>Chargement des fichiers HTML TXT...</p>
            </div>
        `;
    }
    
    hideLoadingState() {
        // Géré par renderTxtCards
    }
    
    showModalLoading() {
        if (this.modalBody) {
            this.modalBody.innerHTML = `
                <div class="modal-loading">
                    <div class="spinner"></div>
                    <p>Chargement du contenu HTML...</p>
                </div>
            `;
        }
    }
    
    hideModalLoading() {
        // Le contenu est déjà affiché
    }
    
    showEmptyState() {
        if (!this.txtCardsGrid) return;
        
        this.txtCardsGrid.innerHTML = `
            <div class="txt-empty" style="grid-column: 1 / -1;">
                <i class="fab fa-html5 fa-3x"></i>
                <h3>Aucun fichier HTML TXT trouvé</h3>
                <p>Ajoutez des fichiers .txt dans le dossier <code>txt/html/</code> de GitHub.</p>
            </div>
        `;
    }
    
    showErrorState(errorMessage) {
        if (!this.txtCardsGrid) return;
        
        this.txtCardsGrid.innerHTML = `
            <div class="txt-error" style="grid-column: 1 / -1;">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Erreur de chargement</h3>
                <p>${this.escapeHTML(errorMessage)}</p>
                <button class="txt-retry-btn" onclick="htmlTxtManager.loadTxtFiles()">
                    <i class="fas fa-redo"></i> Réessayer
                </button>
            </div>
        `;
    }
    
    /**
     * Utilitaires
     */
    formatFileSize(bytes) {
        if (!bytes) return 'Inconnu';
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }
    
    debounce(func, wait) {
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
    
    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

// Instance globale
let htmlTxtManager = null;

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier qu'on est sur la page HTML
    const isHtmlPage = window.location.pathname.includes('html.html') || 
                      document.querySelector('.html-tabs') !== null;
    
    if (isHtmlPage) {
        htmlTxtManager = new HTMLTXTManager();
        console.log('HTMLTXTManager initialisé');
    }
});

// Export
window.HTMLTXTManager = HTMLTXTManager;
window.htmlTxtManager = htmlTxtManager;