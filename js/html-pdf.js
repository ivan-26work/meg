/* html-pdf.js - Gestion des PDF HTML pour MG_ultra */

// Configuration GitHub spécifique HTML
const HTML_PDF_CONFIG = {
    GITHUB_USER: 'ivan-26work',
    GITHUB_REPO: 'meg',
    GITHUB_BRANCH: 'main',
    PDF_BASE_PATH: 'pdf/html'  // Chemin modifié pour HTML
};

class HTMLPDFManager {
    constructor() {
        this.pdfList = [];
        this.filteredPDFs = [];
        this.isLoading = false;
        this.currentSearchTerm = '';
        
        // Éléments DOM spécifiques HTML
        this.pdfContainer = document.getElementById('pdf-container');
        this.searchInput = document.getElementById('search-input');
        
        this.init();
    }
    
    /**
     * Initialisation du gestionnaire PDF HTML
     */
    init() {
        if (!this.pdfContainer) {
            console.error('Élément #pdf-container non trouvé sur la page HTML');
            return;
        }
        
        this.setupEventListeners();
        this.loadPDFs();
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
        
        // Événements délégués pour les cartes PDF
        this.pdfContainer.addEventListener('click', (e) => {
            const card = e.target.closest('.pdf-card');
            if (!card) return;
            
            const pdfName = card.dataset.pdfName;
            const pdfUrl = card.dataset.pdfUrl;
            
            // Bouton d'ouverture
            if (e.target.closest('.pdf-open-btn')) {
                e.stopPropagation();
                this.openPDF(pdfUrl, pdfName);
                return;
            }
            
            // Bouton de téléchargement
            if (e.target.closest('.pdf-download-btn')) {
                e.stopPropagation();
                this.downloadPDF(pdfName, pdfUrl);
                return;
            }
            
            // Clic sur la carte (ouverture aussi)
            this.openPDF(pdfUrl, pdfName);
        });
        
        // Fermer modal PDF avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closePDFModal();
            }
        });
    }
    
    /**
     * Charge la liste des PDF HTML depuis GitHub
     */
    async loadPDFs() {
        this.isLoading = true;
        this.showLoadingState();
        
        try {
            const apiUrl = `https://api.github.com/repos/${HTML_PDF_CONFIG.GITHUB_USER}/${HTML_PDF_CONFIG.GITHUB_REPO}/contents/${HTML_PDF_CONFIG.PDF_BASE_PATH}?ref=${HTML_PDF_CONFIG.GITHUB_BRANCH}`;
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                // Si le dossier n'existe pas encore, montrer message
                if (response.status === 404) {
                    this.showEmptyState();
                    return;
                }
                throw new Error(`Erreur GitHub: ${response.status}`);
            }
            
            const files = await response.json();
            
            // Filtrer uniquement les fichiers PDF
            this.pdfList = files
                .filter(file => file.name.toLowerCase().endsWith('.pdf'))
                .map(file => ({
                    name: file.name,
                    downloadUrl: file.download_url,
                    rawUrl: `https://raw.githubusercontent.com/${HTML_PDF_CONFIG.GITHUB_USER}/${HTML_PDF_CONFIG.GITHUB_REPO}/${HTML_PDF_CONFIG.GITHUB_BRANCH}/${HTML_PDF_CONFIG.PDF_BASE_PATH}/${file.name}`,
                    size: file.size ? this.formatFileSize(file.size) : 'Inconnu',
                    path: file.path,
                    category: 'html'
                }));
            
            this.renderPDFs(this.pdfList);
            
        } catch (error) {
            console.error('Erreur chargement PDFs HTML:', error);
            this.showErrorState(error.message);
            
        } finally {
            this.isLoading = false;
            this.hideLoadingState();
        }
    }
    
    /**
     * Affiche les cartes PDF dans le conteneur
     */
    renderPDFs(pdfs) {
        if (!this.pdfContainer) return;
        
        // Nettoyer le conteneur
        this.pdfContainer.innerHTML = '';
        
        if (pdfs.length === 0) {
            this.showEmptyState();
            return;
        }
        
        // Créer la grille avec classe spécifique HTML
        const grid = document.createElement('div');
        grid.className = 'pdf-grid html-pdf-grid';
        
        // Générer les cartes
        pdfs.forEach((pdf, index) => {
            const card = this.createPDFCard(pdf, index);
            grid.appendChild(card);
        });
        
        this.pdfContainer.appendChild(grid);
    }
    
    /**
     * Crée une carte PDF pour HTML
     */
    createPDFCard(pdf, index) {
        const card = document.createElement('div');
        card.className = 'pdf-card html-pdf-card';
        card.dataset.pdfName = pdf.name;
        card.dataset.pdfUrl = pdf.rawUrl;
        
        // Nom affichable (sans extension)
        const displayName = pdf.name.replace('.pdf', '').replace(/_/g, ' ');
        
        card.innerHTML = `
            <div class="pdf-card-header html-pdf-header">
                <i class="fas fa-file-pdf pdf-card-icon html-pdf-icon"></i>
                <h3 class="pdf-card-title html-pdf-title">${this.escapeHTML(displayName)}</h3>
            </div>
            <div class="pdf-card-meta html-pdf-meta">
                <span class="pdf-file-size html-pdf-size">${pdf.size}</span>
                <span class="pdf-category html-pdf-category">HTML</span>
            </div>
            <div class="pdf-card-actions html-pdf-actions">
                <button class="pdf-open-btn html-pdf-open-btn" title="Ouvrir">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="pdf-download-btn html-pdf-download-btn" title="Télécharger">
                    <i class="fas fa-download"></i>
                </button>
            </div>
        `;
        
        return card;
    }
    
    /**
     * Ouvre un PDF dans Google Docs Viewer
     */
    openPDF(pdfUrl, pdfName) {
        if (!pdfUrl) return;
        
        const encodedUrl = encodeURIComponent(pdfUrl);
        const viewerUrl = `https://docs.google.com/viewer?url=${encodedUrl}&embedded=true`;
        
        // Créer le modal
        this.createPDFModal(pdfName, viewerUrl, pdfUrl);
    }
    
    /**
     * Crée un modal pour visualiser le PDF
     */
    createPDFModal(pdfName, viewerUrl, downloadUrl) {
        // Nettoyer les modals existants
        this.closePDFModal();
        
        // Créer l'overlay
        const overlay = document.createElement('div');
        overlay.className = 'pdf-modal-overlay html-pdf-modal-overlay';
        overlay.id = 'html-pdf-modal-overlay';
        
        // Créer le modal
        const modal = document.createElement('div');
        modal.className = 'pdf-modal html-pdf-modal';
        
        // Header
        const modalHeader = document.createElement('div');
        modalHeader.className = 'pdf-modal-header html-pdf-modal-header';
        
        const title = document.createElement('h3');
        title.textContent = pdfName.replace('.pdf', '');
        title.className = 'pdf-modal-title html-pdf-modal-title';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'pdf-modal-close html-pdf-modal-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.setAttribute('aria-label', 'Fermer');
        closeBtn.onclick = () => this.closePDFModal();
        
        modalHeader.appendChild(title);
        modalHeader.appendChild(closeBtn);
        
        // Contenu (iframe)
        const modalContent = document.createElement('div');
        modalContent.className = 'pdf-modal-content html-pdf-modal-content';
        
        const iframe = document.createElement('iframe');
        iframe.src = viewerUrl;
        iframe.title = `Visualisateur PDF: ${pdfName}`;
        iframe.allow = 'fullscreen';
        
        modalContent.appendChild(iframe);
        
        // Footer avec actions
        const modalFooter = document.createElement('div');
        modalFooter.className = 'pdf-modal-footer html-pdf-modal-footer';
        
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'pdf-modal-download-btn html-pdf-download-btn';
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Télécharger';
        downloadBtn.onclick = () => this.downloadPDF(pdfName, downloadUrl);
        
        const newTabBtn = document.createElement('button');
        newTabBtn.className = 'pdf-modal-newtab-btn html-pdf-newtab-btn';
        newTabBtn.innerHTML = '<i class="fas fa-external-link-alt"></i> Nouvel onglet';
        newTabBtn.onclick = () => window.open(downloadUrl, '_blank');
        
        modalFooter.appendChild(downloadBtn);
        modalFooter.appendChild(newTabBtn);
        
        // Assemblage
        modal.appendChild(modalHeader);
        modal.appendChild(modalContent);
        modal.appendChild(modalFooter);
        overlay.appendChild(modal);
        
        // Ajouter au DOM
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
        
        // Focus sur le bouton de fermeture
        closeBtn.focus();
    }
    
    /**
     * Ferme le modal PDF
     */
    closePDFModal() {
        const overlay = document.getElementById('html-pdf-modal-overlay');
        if (overlay) {
            document.body.removeChild(overlay);
            document.body.style.overflow = '';
        }
    }
    
    /**
     * Télécharge un PDF
     */
    downloadPDF(filename, url) {
        // Créer un lien invisible
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        
        // Ajouter au DOM, cliquer, et nettoyer
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Feedback visuel
        this.showDownloadFeedback(filename);
    }
    
    /**
     * Affiche un feedback de téléchargement
     */
    showDownloadFeedback(filename) {
        // Créer une notification
        const notification = document.createElement('div');
        notification.className = 'pdf-download-notification html-download-notification';
        
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Téléchargement de <strong>${this.escapeHTML(filename)}</strong> démarré</span>
        `;
        
        document.body.appendChild(notification);
        
        // Supprimer après 3 secondes
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    /**
     * Gère la recherche dans les PDF
     */
    handleSearch(searchTerm) {
        this.currentSearchTerm = searchTerm.toLowerCase().trim();
        
        if (!this.currentSearchTerm) {
            this.renderPDFs(this.pdfList);
            return;
        }
        
        // Filtrer les PDFs
        this.filteredPDFs = this.pdfList.filter(pdf => {
            const searchableText = pdf.name.toLowerCase();
            return searchableText.includes(this.currentSearchTerm);
        });
        
        // Afficher les résultats filtrés
        this.renderPDFs(this.filteredPDFs);
        
        // Mettre en évidence les résultats
        this.highlightSearchResults();
    }
    
    /**
     * Met en évidence les termes de recherche
     */
    highlightSearchResults() {
        if (!this.currentSearchTerm || this.currentSearchTerm.length < 2) return;
        
        const regex = new RegExp(`(${this.escapeRegex(this.currentSearchTerm)})`, 'gi');
        const titles = this.pdfContainer.querySelectorAll('.html-pdf-title');
        
        titles.forEach(title => {
            const originalText = title.textContent;
            const highlightedText = originalText.replace(regex, 
                '<span class="pdf-search-highlight html-search-highlight">$1</span>'
            );
            
            if (highlightedText !== originalText) {
                title.innerHTML = highlightedText;
            }
        });
    }
    
    /**
     * Affiche l'état de chargement
     */
    showLoadingState() {
        if (!this.pdfContainer) return;
        
        this.pdfContainer.innerHTML = `
            <div class="pdf-loading html-pdf-loading">
                <div class="pdf-spinner html-pdf-spinner"></div>
                <p>Chargement des PDFs HTML...</p>
            </div>
        `;
    }
    
    /**
     * Cache l'état de chargement
     */
    hideLoadingState() {
        // Géré par renderPDFs
    }
    
    /**
     * Affiche l'état vide
     */
    showEmptyState() {
        if (!this.pdfContainer) return;
        
        this.pdfContainer.innerHTML = `
            <div class="pdf-empty html-pdf-empty">
                <i class="fab fa-html5"></i>
                <h3>Aucun PDF HTML trouvé</h3>
                <p>Ajoutez des fichiers PDF dans le dossier <code>pdf/html/</code> de votre dépôt GitHub.</p>
                <p class="hint">Exemple : <code>structure-html.pdf</code>, <code>formulaires.pdf</code></p>
            </div>
        `;
    }
    
    /**
     * Affiche l'état d'erreur
     */
    showErrorState(errorMessage) {
        if (!this.pdfContainer) return;
        
        this.pdfContainer.innerHTML = `
            <div class="pdf-error html-pdf-error">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Erreur de chargement</h3>
                <p>${this.escapeHTML(errorMessage)}</p>
                <button class="pdf-retry-btn html-pdf-retry-btn" onclick="htmlPdfManager.loadPDFs()">
                    <i class="fas fa-redo"></i> Réessayer
                </button>
            </div>
        `;
    }
    
    /**
     * Formate la taille d'un fichier
     */
    formatFileSize(bytes) {
        if (!bytes) return 'N/A';
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

// Instance globale pour HTML
let htmlPdfManager = null;

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier qu'on est sur la page HTML
    if (document.body.classList.contains('html-theme') || 
        window.location.pathname.includes('html.html')) {
        htmlPdfManager = new HTMLPDFManager();
    }
});

// Export pour utilisation globale
window.HTMLPDFManager = HTMLPDFManager;
window.htmlPdfManager = htmlPdfManager;