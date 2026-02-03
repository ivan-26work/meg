/* txt-display.js - Style et formatage avancé des fichiers TXT */

class TXTDisplayManager {
    constructor() {
        this.currentFile = null;
        this.formatters = {
            'css': this.formatCSSText.bind(this),
            'html': this.formatHTMLText.bind(this),
            'js': this.formatJSText.bind(this),
            'default': this.formatDefaultText.bind(this)
        };
    }
    
    /**
     * Formatte le contenu TXT pour l'affichage dans le modal
     */
    formatTextContent(content, fileName = '') {
        // Détecter le type de fichier par extension ou contenu
        const fileType = this.detectFileType(fileName, content);
        const formatter = this.formatters[fileType] || this.formatters.default;
        
        return formatter(content, fileName);
    }
    
    /**
     * Détecte le type de fichier
     */
    detectFileType(fileName, content) {
        const ext = fileName.toLowerCase().split('.').pop();
        
        if (ext === 'css' || content.includes('css') || content.includes('{') && content.includes('}')) {
            return 'css';
        } else if (ext === 'html' || content.includes('<html') || content.includes('<div')) {
            return 'html';
        } else if (ext === 'js' || content.includes('function') || content.includes('const ') || content.includes('let ')) {
            return 'js';
        }
        
        return 'default';
    }
    
    /**
     * Formatte le texte CSS
     */
    formatCSSText(content, fileName) {
        let html = '<div class="txt-content css-content">';
        
        // Séparer en sections
        const sections = this.splitIntoSections(content);
        
        sections.forEach(section => {
            if (section.type === 'comment') {
                html += `<div class="css-comment">${this.escapeHTML(section.content)}</div>`;
            } else if (section.type === 'selector') {
                html += `<div class="css-selector">${this.escapeHTML(section.selector)}</div>`;
                html += `<div class="css-properties">`;
                section.properties.forEach(prop => {
                    const [property, value] = prop.split(':').map(s => s.trim());
                    html += `<div class="css-property">
                        <span class="css-prop-name">${property}:</span>
                        <span class="css-prop-value">${value}</span>
                    </div>`;
                });
                html += `</div>`;
            } else if (section.type === 'title') {
                html += `<h3 class="txt-section-title">${this.escapeHTML(section.content)}</h3>`;
            } else {
                html += `<p class="txt-paragraph">${this.formatParagraph(section.content)}</p>`;
            }
        });
        
        html += '</div>';
        return html;
    }
    
    /**
     * Formatte le texte HTML
     */
    formatHTMLText(content, fileName) {
        let html = '<div class="txt-content html-content">';
        
        // Colorisation syntaxique basique
        content = this.escapeHTML(content);
        
        // Mise en évidence des balises
        content = content.replace(/&lt;(\/?)(\w+)([^&]*)&gt;/g, 
            '&lt;<span class="html-tag">$1$2</span>$3&gt;');
        
        // Mise en évidence des attributs
        content = content.replace(/(\w+)=&quot;([^&]*)&quot;/g,
            '<span class="html-attr">$1</span>=&quot;<span class="html-value">$2</span>&quot;');
        
        html += `<pre class="html-code">${content}</pre>`;
        html += '</div>';
        
        return html;
    }
    
    /**
     * Formatte le texte JavaScript
     */
    formatJSText(content, fileName) {
        let html = '<div class="txt-content js-content">';
        
        content = this.escapeHTML(content);
        
        // Mise en évidence des mots-clés
        const keywords = ['function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally', 'class', 'extends', 'import', 'export', 'default', 'async', 'await'];
        
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            content = content.replace(regex, `<span class="js-keyword">${keyword}</span>`);
        });
        
        // Mise en évidence des strings
        content = content.replace(/(['"])(.*?)\1/g, 
            '$1<span class="js-string">$2</span>$1');
        
        // Mise en évidence des commentaires
        content = content.replace(/\/\/.*$/gm, 
            '<span class="js-comment">$&</span>');
        
        html += `<pre class="js-code">${content}</pre>`;
        html += '</div>';
        
        return html;
    }
    
    /**
     * Formatte le texte par défaut
     */
    formatDefaultText(content, fileName) {
        let html = '<div class="txt-content default-content">';
        
        // Séparer en lignes
        const lines = content.split('\n');
        let inCodeBlock = false;
        let inList = false;
        
        lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            
            // Détection des blocs de code
            if (trimmedLine.startsWith('```') || trimmedLine.startsWith('~~~')) {
                inCodeBlock = !inCodeBlock;
                html += inCodeBlock ? '<pre class="txt-code-block">' : '</pre>';
                return;
            }
            
            if (inCodeBlock) {
                html += this.escapeHTML(line) + '\n';
                return;
            }
            
            // Titres (lignes avec === ou --- en dessous)
            if (index < lines.length - 1) {
                const nextLine = lines[index + 1].trim();
                if ((nextLine.match(/^=+$/) || nextLine.match(/^-+$/)) && trimmedLine) {
                    html += `<h2 class="txt-main-title">${this.escapeHTML(trimmedLine)}</h2>`;
                    return;
                }
            }
            
            // Sous-titres (lignes terminant par :)
            if (trimmedLine.endsWith(':') && !trimmedLine.includes('http')) {
                html += `<h3 class="txt-subtitle">${this.escapeHTML(trimmedLine)}</h3>`;
                return;
            }
            
            // Listes
            if (trimmedLine.match(/^[-*•]\s/)) {
                if (!inList) {
                    html += '<ul class="txt-list">';
                    inList = true;
                }
                const itemText = trimmedLine.substring(2);
                html += `<li class="txt-list-item">${this.formatInlineElements(itemText)}</li>`;
                return;
            } else if (inList && trimmedLine === '') {
                html += '</ul>';
                inList = false;
                return;
            }
            
            // Tableaux basiques (lignes avec |)
            if (trimmedLine.includes('|') && trimmedLine.split('|').length > 2) {
                if (trimmedLine.replace(/[^|]/g, '').length > 1) { // Au moins 2 pipes
                    const cells = trimmedLine.split('|').map(cell => cell.trim());
                    if (index === 0 || lines[index-1].trim().includes('|---')) {
                        html += '<table class="txt-table"><thead><tr>';
                        cells.forEach(cell => {
                            if (cell) html += `<th>${this.escapeHTML(cell)}</th>`;
                        });
                        html += '</tr></thead><tbody>';
                    } else if (!trimmedLine.includes('---')) {
                        html += '<tr>';
                        cells.forEach(cell => {
                            if (cell) html += `<td>${this.escapeHTML(cell)}</td>`;
                        });
                        html += '</tr>';
                    }
                    return;
                }
            }
            
            // Paragraphes
            if (trimmedLine) {
                html += `<p class="txt-paragraph">${this.formatParagraph(trimmedLine)}</p>`;
            } else if (index > 0 && lines[index-1].trim()) {
                html += '<br>';
            }
        });
        
        // Fermer les éléments ouverts
        if (inList) html += '</ul>';
        
        html += '</div>';
        return html;
    }
    
    /**
     * Formate un paragraphe avec éléments inline
     */
    formatParagraph(text) {
        // Échapper le HTML
        let formatted = this.escapeHTML(text);
        
        // Liens [texte](url)
        formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, 
            '<a href="$2" target="_blank" class="txt-link">$1</a>');
        
        // Code inline `code`
        formatted = formatted.replace(/`([^`]+)`/g, 
            '<code class="txt-inline-code">$1</code>');
        
        // Gras **texte** ou __texte__
        formatted = formatted.replace(/(\*\*|__)(.*?)\1/g, 
            '<strong class="txt-bold">$2</strong>');
        
        // Italique *texte* ou _texte_
        formatted = formatted.replace(/(\*|_)(.*?)\1/g, 
            '<em class="txt-italic">$2</em>');
        
        // Liens simples http/https
        formatted = formatted.replace(/(https?:\/\/[^\s]+)/g, 
            '<a href="$1" target="_blank" class="txt-external-link">$1</a>');
        
        return formatted;
    }
    
    /**
     * Formate les éléments inline (pour les listes)
     */
    formatInlineElements(text) {
        return this.formatParagraph(text);
    }
    
    /**
     * Sépare le CSS en sections
     */
    splitIntoSections(content) {
        const lines = content.split('\n');
        const sections = [];
        let currentSelector = null;
        let currentProperties = [];
        let inComment = false;
        let commentBuffer = '';
        
        lines.forEach(line => {
            const trimmed = line.trim();
            
            // Commentaires multi-lignes
            if (trimmed.startsWith('/*')) {
                inComment = true;
                commentBuffer = trimmed.substring(2);
                return;
            }
            
            if (inComment) {
                if (trimmed.endsWith('*/')) {
                    commentBuffer += '\n' + trimmed.substring(0, trimmed.length - 2);
                    sections.push({
                        type: 'comment',
                        content: commentBuffer.trim()
                    });
                    inComment = false;
                    commentBuffer = '';
                } else {
                    commentBuffer += '\n' + trimmed;
                }
                return;
            }
            
            // Commentaires sur une ligne
            if (trimmed.startsWith('//') || trimmed.startsWith('/*') && trimmed.endsWith('*/')) {
                sections.push({
                    type: 'comment',
                    content: trimmed.replace(/^\/\/\s*|\/\*|\*\//g, '')
                });
                return;
            }
            
            // Fin d'un sélecteur CSS
            if (currentSelector && trimmed === '}') {
                sections.push({
                    type: 'selector',
                    selector: currentSelector,
                    properties: currentProperties
                });
                currentSelector = null;
                currentProperties = [];
                return;
            }
            
            // Nouveau sélecteur CSS
            if (trimmed && !trimmed.startsWith('@') && trimmed.endsWith('{')) {
                currentSelector = trimmed.substring(0, trimmed.length - 1).trim();
                return;
            }
            
            // Propriété CSS
            if (currentSelector && trimmed.includes(':')) {
                currentProperties.push(trimmed);
                return;
            }
            
            // Titres (lignes vides suivies de texte)
            if (trimmed && (trimmed.toUpperCase() === trimmed || trimmed.endsWith(':'))) {
                sections.push({
                    type: 'title',
                    content: trimmed
                });
                return;
            }
            
            // Texte normal
            if (trimmed) {
                sections.push({
                    type: 'text',
                    content: trimmed
                });
            }
        });
        
        return sections;
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
     * Applique le style au modal
     */
    applyStyles() {
        if (document.getElementById('txt-display-styles')) return;
        
        const styles = `
            /* Styles pour l'affichage des TXT */
            .txt-content {
                line-height: 1.6;
                color: #333;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
            }
            
            /* Titres */
            .txt-main-title {
                color: #2196f3;
                font-size: 2rem;
                margin: 30px 0 15px;
                padding-bottom: 10px;
                border-bottom: 2px solid rgba(33, 150, 243, 0.2);
            }
            
            .txt-section-title, .txt-subtitle {
                color: #2196f3;
                font-size: 1.5rem;
                margin: 25px 0 12px;
                font-weight: 600;
            }
            
            /* Paragraphes */
            .txt-paragraph {
                margin-bottom: 16px;
                text-align: justify;
            }
            
            /* Listes */
            .txt-list {
                margin: 15px 0 20px 25px;
                padding: 0;
                list-style-type: none;
            }
            
            .txt-list-item {
                margin-bottom: 8px;
                padding-left: 20px;
                position: relative;
            }
            
            .txt-list-item::before {
                content: '•';
                color: #2196f3;
                position: absolute;
                left: 0;
                font-size: 1.2rem;
            }
            
            /* Liens */
            .txt-link, .txt-external-link {
                color: #2196f3;
                text-decoration: none;
                border-bottom: 1px dotted #2196f3;
            }
            
            .txt-link:hover, .txt-external-link:hover {
                color: #1976d2;
                border-bottom-style: solid;
            }
            
            /* Code */
            .txt-inline-code {
                background: rgba(33, 150, 243, 0.1);
                color: #1976d2;
                padding: 2px 6px;
                border-radius: 4px;
                font-family: 'Consolas', monospace;
                font-size: 0.9em;
                border: 1px solid rgba(33, 150, 243, 0.2);
            }
            
            .txt-code-block {
                background: #2d3748;
                color: #e2e8f0;
                padding: 20px;
                border-radius: 8px;
                overflow-x: auto;
                margin: 20px 0;
                font-family: 'Consolas', monospace;
                font-size: 0.95rem;
                line-height: 1.5;
                tab-size: 4;
            }
            
            /* Tableaux */
            .txt-table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
                background: white;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            
            .txt-table th {
                background: #2196f3;
                color: white;
                padding: 12px;
                text-align: left;
                font-weight: 600;
            }
            
            .txt-table td {
                padding: 10px 12px;
                border-bottom: 1px solid #e0e5ec;
            }
            
            .txt-table tr:hover {
                background: rgba(33, 150, 243, 0.05);
            }
            
            /* Styles CSS spécifiques */
            .css-content {
                font-family: 'Consolas', 'Monaco', monospace;
            }
            
            .css-selector {
                color: #9c27b0;
                font-weight: 600;
                margin-top: 15px;
                font-size: 1.1em;
            }
            
            .css-properties {
                margin-left: 20px;
                margin-bottom: 15px;
            }
            
            .css-property {
                margin-bottom: 5px;
            }
            
            .css-prop-name {
                color: #2196f3;
                font-weight: 600;
            }
            
            .css-prop-value {
                color: #4caf50;
                margin-left: 10px;
            }
            
            .css-comment {
                color: #7d8da6;
                font-style: italic;
                margin: 10px 0;
                padding-left: 15px;
                border-left: 3px solid #7d8da6;
            }
            
            /* Styles HTML spécifiques */
            .html-tag {
                color: #e91e63;
                font-weight: 600;
            }
            
            .html-attr {
                color: #2196f3;
            }
            
            .html-value {
                color: #4caf50;
            }
            
            /* Styles JS spécifiques */
            .js-keyword {
                color: #e91e63;
                font-weight: 600;
            }
            
            .js-string {
                color: #4caf50;
            }
            
            .js-comment {
                color: #7d8da6;
                font-style: italic;
            }
            
            /* Mise en forme du texte */
            .txt-bold {
                font-weight: 700;
            }
            
            .txt-italic {
                font-style: italic;
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .txt-content {
                    padding: 15px;
                }
                
                .txt-main-title {
                    font-size: 1.6rem;
                }
                
                .txt-section-title, .txt-subtitle {
                    font-size: 1.3rem;
                }
                
                .txt-code-block {
                    padding: 15px;
                    font-size: 0.85rem;
                }
                
                .txt-table {
                    font-size: 0.9rem;
                }
                
                .txt-table th, .txt-table td {
                    padding: 8px 10px;
                }
            }
            
            @media (max-width: 480px) {
                .txt-content {
                    padding: 10px;
                }
                
                .txt-list {
                    margin-left: 15px;
                }
                
                .css-properties {
                    margin-left: 10px;
                }
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.id = 'txt-display-styles';
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }
}

// Instance globale
const txtDisplayManager = new TXTDisplayManager();

// Appliquer les styles au chargement
document.addEventListener('DOMContentLoaded', () => {
    txtDisplayManager.applyStyles();
});

// Exporter pour utilisation
window.TXTDisplayManager = txtDisplayManager;

// Intégration avec txt.js existant
if (window.TXTManager) {
    // Monter le formateur sur le manager existant
    const originalLoadTxtContent = window.TXTManager.prototype.loadTxtContent;
    window.TXTManager.prototype.loadTxtContent = async function(txtFile) {
        const content = await originalLoadTxtContent.call(this, txtFile);
        
        // Formater le contenu
        if (content && content.content) {
            content.formattedContent = txtDisplayManager.formatTextContent(
                content.content, 
                content.name
            );
        }
        
        return content;
    };
}