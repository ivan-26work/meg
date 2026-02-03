/* txt.js - Gestion des fichiers TXT pour MG_ultra */

// Configuration GitHub
const TXT_GITHUB_USER = 'ivan-26work';
const TXT_GITHUB_REPO = 'meg';
const TXT_GITHUB_BRANCH = 'main';
const TXT_BASE_PATH = 'txt/css';

class TXTManager {
    constructor() {
        this.txtFiles = [];
        this.filteredTxts = [];
        this.isLoading = false;
        this.currentSearchTerm = '';
        this.currentTxtContent = null;
        this.currentTxtIndex = 0;
        
        // Éléments DOM
        this.txtCardsGrid = document.getElementById('txt-cards-grid');
        this.coursContainer = document.getElementById('cours-container');
        this.txtCardsContainer = document.getElementById('txt-cards-container');
        this.searchInput = document.getElementById('search-input');
        this.txtModal = document.getElementById('txt-modal');
        this.modalTitle = document.querySelector('.modal-title');
        this.modalBody = document.querySelector('.modal-body');
        this.modalClose = document.querySelector('.modal-close');
        
        this.init();
    }
    
    /**
     * Initialisation du gestionnaire TXT
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
            if (e.key === 'Escape' && this.txtModal.style.display !== 'none') {
                this.closeTxtModal();
            }
        });
        
        // Fermer modal en cliquant à l'extérieur
        this.txtModal.addEventListener('click', (e) => {
            if (e.target === this.txtModal) {
                this.closeTxtModal();
            }
        });
        
        // Navigation entre fichiers TXT dans le modal
        document.addEventListener('keydown', (e) => {
            if (this.txtModal.style.display !== 'none') {
                if (e.key === 'ArrowLeft') {
                    this.showPreviousTxt();
                } else if (e.key === 'ArrowRight') {
                    this.showNextTxt();
                }
            }
        });
        
        // Événements délégués pour les cartes TXT
        this.txtCardsGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.txt-card');
            if (!card) return;
            
            const txtIndex = parseInt(card.dataset.index);
            if (!isNaN(txtIndex) && this.txtFiles[txtIndex]) {
                this.openTxtFile(this.txtFiles[txtIndex], txtIndex);
            }
        });
    }
    
    /**
     * Charge la liste des fichiers TXT depuis GitHub
     */
    async loadTxtFiles() {
        this.isLoading = true;
        this.showLoadingState();
        
        try {
            const apiUrl = `https://api.github.com/repos/${TXT_GITHUB_USER}/${TXT_GITHUB_REPO}/contents/${TXT_BASE_PATH}?ref=${TXT_GITHUB_BRANCH}`;
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`Erreur GitHub: ${response.status}`);
            }
            
            const files = await response.json();
            
            // Filtrer uniquement les fichiers TXT
            this.txtFiles = files
                .filter(file => file.name.toLowerCase().endsWith('.txt'))
                .map((file, index) => ({
                    name: file.name,
                    downloadUrl: file.download_url,
                    rawUrl: `https://raw.githubusercontent.com/${TXT_GITHUB_USER}/${TXT_GITHUB_REPO}/${TXT_GITHUB_BRANCH}/${TXT_BASE_PATH}/${file.name}`,
                    size: file.size ? this.formatFileSize(file.size) : 'Inconnu',
                    path: file.path,
                    index: index
                }));
            
            this.renderTxtCards(this.txtFiles);
            
        } catch (error) {
            console.error('Erreur chargement fichiers TXT:', error);
            this.showErrorState(error.message);
            
        } finally {
            this.isLoading = false;
            this.hideLoadingState();
        }
    }
    
    /**
     * Charge le contenu d'un fichier TXT spécifique
     */
    async loadTxtContent(txtFile) {
        try {
            const response = await fetch(txtFile.rawUrl);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const content = await response.text();
            return {
                ...txtFile,
                content: content,
                formattedContent: this.formatTxtContent(content)
            };
            
        } catch (error) {
            console.error('Erreur chargement contenu TXT:', error);
            throw error;
        }
    }
    
    /**
     * Formate le contenu TXT pour l'affichage
     */
    formatTxtContent(content) {
        // Nettoyer le contenu
        let formatted = this.escapeHTML(content);
        
        // Convertir les retours à la ligne en <br>
        formatted = formatted.replace(/\n/g, '<br>');
        
        // Détecter et formater les titres (lignes qui se terminent par :)
        formatted = formatted.replace(/^(.+):<br>/gm, '<h3 class="txt-title">$1</h3>');
        
        // Détecter les listes (lignes qui commencent par - ou *)
        formatted = formatted.replace(/^[*-]\s+(.+)$/gm, '<li>$1</li>');
        formatted = formatted.replace(/(<li>.*<\/li>)/gs, '<ul class="txt-list">$1</ul>');
        
        // Détecter le code (lignes indentées ou entre backticks)
        formatted = formatted.replace(/`(.+?)`/g, '<code class="txt-inline-code">$1</code>');
        
        // Ajouter des paragraphes pour les blocs de texte
        formatted = formatted.replace(/(<br>){2,}/g, '</p><p class="txt-paragraph">');
        formatted = formatted.replace(/^([^<].*)/gm, '<p class="txt-paragraph">$1</p>');
        
        return formatted;
    }
    
    /**
     * Affiche les cartes TXT dans la grille
     */
    renderTxtCards(txts) {
        if (!this.txtCardsGrid) return;
        
        // Nettoyer la grille
        this.txtCardsGrid.innerHTML = '';
        
        if (txts.length === 0) {
            this.showEmptyState();
            return;
        }
        
        // Générer les cartes
        txts.forEach((txt, index) => {
            const card = this.createTxtCard(txt, index);
            this.txtCardsGrid.appendChild(card);
        });
    }
    
    /**
     * Crée une carte TXT individuelle
     */
    createTxtCard(txt, index) {
        const card = document.createElement('div');
        card.className = 'txt-card';
        card.dataset.index = index;
        card.style.animationDelay = `${index * 0.05}s`;
        
        // Nom affichable (sans extension)
        const displayName = txt.name.replace('.txt', '').replace(/_/g, ' ');
        
        card.innerHTML = `
            <div class="txt-card-header">
                <i class="fas fa-file-alt txt-card-icon"></i>
                <h3 class="txt-card-title">${this.escapeHTML(displayName)}</h3>
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
        
        // Charger un extrait du contenu en arrière-plan
        this.loadTxtPreview(txt, card);
        
        return card;
    }
    
    /**
     * Charge un extrait du contenu pour la prévisualisation
     */
    async loadTxtPreview(txtFile, cardElement) {
        try {
            const content = await this.loadTxtContent(txtFile);
            const previewElement = cardElement.querySelector('.txt-preview-text');
            
            if (previewElement && content.content) {
                // Prendre les 150 premiers caractères
                const previewText = content.content.substring(0, 150).trim();
                previewElement.textContent = previewText + (content.content.length > 150 ? '...' : '');
            }
        } catch (error) {
            console.error('Erreur chargement prévisualisation:', error);
        }
    }
    
    /**
     * Ouvre un fichier TXT en plein écran
     */
    async openTxtFile(txtFile, index) {
        this.isLoading = true;
        this.showModalLoading();
        
        try {
            // Charger le contenu complet
            const fullContent = await this.loadTxtContent(txtFile);
            this.currentTxtContent = fullContent;
            this.currentTxtIndex = index;
            
            // Mettre à jour le modal
            const displayName = txtFile.name.replace('.txt', '').replace(/_/g, ' ');
            this.modalTitle.textContent = displayName;
            this.modalBody.innerHTML = fullContent.formattedContent;
            
            // Afficher le modal
            this.txtModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Désactiver le scroll
            
            // Mettre en évidence la recherche si active
            if (this.currentSearchTerm) {
                this.highlightSearchInModal(this.currentSearchTerm);
            }
            
        } catch (error) {
            console.error('Erreur ouverture fichier TXT:', error);
            this.modalBody.innerHTML = `
                <div class="txt-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Erreur de chargement</h3>
                    <p>Impossible de charger le contenu du fichier.</p>
                    <p><small>${this.escapeHTML(error.message)}</small></p>
                </div>
            `;
            
        } finally {
            this.isLoading = false;
            this.hideModalLoading();
        }
    }
    
    /**
     * Affiche le fichier TXT précédent
     */
    async showPreviousTxt() {
        if (this.txtFiles.length === 0) return;
        
        let newIndex = this.currentTxtIndex - 1;
        if (newIndex < 0) newIndex = this.txtFiles.length - 1; // Boucler au dernier
        
        const txtFile = this.filteredTxts.length > 0 
            ? this.filteredTxts[newIndex] 
            : this.txtFiles[newIndex];
        
        if (txtFile) {
            this.openTxtFile(txtFile, newIndex);
        }
    }
    
    /**
     * Affiche le fichier TXT suivant
     */
    async showNextTxt() {
        if (this.txtFiles.length === 0) return;
        
        let newIndex = this.currentTxtIndex + 1;
        if (newIndex >= this.txtFiles.length) newIndex = 0; // Boucler au premier
        
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
        this.txtModal.style.display = 'none';
        document.body.style.overflow = ''; // Réactiver le scroll
        this.currentTxtContent = null;
    }
    
    /**
     * Gère la recherche dans les fichiers TXT
     */
    handleSearch(searchTerm) {
        this.currentSearchTerm = searchTerm.toLowerCase().trim();
        
        if (!this.currentSearchTerm) {
            this.renderTxtCards(this.txtFiles);
            return;
        }
        
        // Filtrer les fichiers TXT
        this.filteredTxts = this.txtFiles.filter(txt => {
            const searchableText = txt.name.toLowerCase();
            return searchableText.includes(this.currentSearchTerm);
        });
        
        // Afficher les résultats filtrés
        this.renderTxtCards(this.filteredTxts);
        
        // Mettre en évidence les résultats
        this.highlightSearchResults();
    }
    
    /**
     * Met en évidence les termes de recherche
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
     * Met en évidence la recherche dans le modal
     */
    highlightSearchInModal(searchTerm) {
        if (!searchTerm || searchTerm.length < 2) return;
        
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
     * Affiche l'état de chargement
     */
    showLoadingState() {
        if (!this.txtCardsGrid) return;
        
        this.txtCardsGrid.innerHTML = `
            <div class="txt-loading" style="grid-column: 1 / -1;">
                <div class="spinner"></div>
                <p>Chargement des fichiers TXT...</p>
            </div>
        `;
    }
    
    /**
     * Cache l'état de chargement
     */
    hideLoadingState() {
        // Géré par renderTxtCards
    }
    
    /**
     * Affiche le chargement dans le modal
     */
    showModalLoading() {
        if (this.modalBody) {
            this.modalBody.innerHTML = `
                <div class="modal-loading">
                    <div class="spinner"></div>
                    <p>Chargement du contenu...</p>
                </div>
            `;
        }
    }
    
    /**
     * Cache le chargement du modal
     */
    hideModalLoading() {
        // Le contenu est déjà affiché
    }
    
    /**
     * Affiche l'état vide
     */
    showEmptyState() {
        if (!this.txtCardsGrid) return;
        
        this.txtCardsGrid.innerHTML = `
            <div class="txt-empty" style="grid-column: 1 / -1;">
                <i class="fas fa-file-alt fa-3x"></i>
                <h3>Aucun fichier TXT trouvé</h3>
                <p>Les fichiers TXT apparaîtront ici une fois ajoutés au dépôt GitHub.</p>
            </div>
        `;
    }
    
    /**
     * Affiche l'état d'erreur
     */
    showErrorState(errorMessage) {
        if (!this.txtCardsGrid) return;
        
        this.txtCardsGrid.innerHTML = `
            <div class="txt-error" style="grid-column: 1 / -1;">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Erreur de chargement</h3>
                <p>Impossible de charger les fichiers TXT depuis GitHub.</p>
                <p><small>${this.escapeHTML(errorMessage)}</small></p>
                <button class="txt-retry-btn" onclick="txtManager.loadTxtFiles()">
                    <i class="fas fa-redo"></i> Réessayer
                </button>
            </div>
        `;
    }
    
    /**
     * Formate la taille d'un fichier
     */
    formatFileSize(bytes) {
        if (!bytes) return 'Inconnu';
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }
    
    /**
     * Debounce pour limiter les appels
     */
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
    
    /**
     * Échappe le HTML
     */
    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    /**
     * Échape les caractères spéciaux pour regex
     */
    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

// Instance globale
let txtManager = null;

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    txtManager = new TXTManager();
});

// Export pour utilisation globale
window.TXTManager = TXTManager;