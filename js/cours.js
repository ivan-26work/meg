/* cours.js - Gestion des 10 cours statiques CSS pour MG_ultra */

class CoursManager {
    constructor() {
        this.coursData = this.getCoursData();
        this.currentCours = null;
        this.searchResults = [];
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadInitialCours();
    }
    
    setupEventListeners() {
        // Rien à faire ici, les événements sont gérés par global.js
    }
    
    /**
     * Données des 10 cours statiques CSS
     */
    getCoursData() {
        return {
            'background': {
                titre: 'Background CSS',
                definition: 'La propriété background en CSS permet de définir l\'apparence de l\'arrière-plan d\'un élément HTML. C\'est une propriété raccourcie qui combine plusieurs sous-propriétés.',
                role: 'Le background sert à :<br>• Définir une couleur de fond unie<br>• Ajouter des images d\'arrière-plan<br>• Créer des dégradés complexes<br>• Contrôler la répétition, la position et la taille des images<br>• Définir l\'origine et la taille de l\'arrière-plan',
                usage: 'Utilisez background pour :<br>• Améliorer la visibilité du contenu<br>• Créer des designs visuellement attrayants<br>• Ajouter des textures ou des motifs<br>• Créer des effets de superposition<br>• Mettre en valeur des éléments importants',
                exempleCode: `.element {
    /* Exemple 1: Couleur simple */
    background: #3498db;
    
    /* Exemple 2: Image avec répétition */
    background: url('image.jpg') repeat;
    
    /* Exemple 3: Dégradé linéaire */
    background: linear-gradient(to right, #ff7e5f, #feb47b);
    
    /* Exemple 4: Combinaison image et couleur */
    background: #3498db url('pattern.png') center/cover no-repeat;
    
    /* Exemple 5: Dégradé radial */
    background: radial-gradient(circle, #ff7e5f, #feb47b);
    
    /* Exemple 6: Position fixe */
    background: url('bg.jpg') fixed center/cover;
}`,
                exempleResultat: `<div class="demo-bg" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; color: white; text-align: center;">
    <h3 style="margin: 0;">Fond avec dégradé</h3>
    <p style="margin: 10px 0 0 0;">Linear-gradient(135deg, #667eea, #764ba2)</p>
</div>
<div class="demo-bg" style="background: url('https://via.placeholder.com/150') center/cover no-repeat; padding: 30px; border-radius: 10px; margin-top: 20px; color: white; text-shadow: 0 1px 3px rgba(0,0,0,0.8);">
    <h3 style="margin: 0;">Fond avec image</h3>
    <p style="margin: 10px 0 0 0;">Image centrée et couvrante</p>
</div>`
            },
            
            'border': {
                titre: 'Border CSS',
                definition: 'La propriété border permet de créer des bordures autour des éléments. C\'est une propriété raccourcie pour border-width, border-style et border-color.',
                role: 'Les bordures servent à :<br>• Délimiter visuellement des éléments<br>• Créer des séparations entre sections<br>• Ajouter des effets décoratifs<br>• Mettre en valeur des boutons ou cartes<br>• Créer des cadres pour les images',
                usage: 'Utilisez border pour :<br>• Créer des cartes avec bordures arrondies<br>• Souligner des titres ou éléments importants<br>• Créer des séparateurs entre les sections<br>• Ajouter des effets hover sur les boutons<br>• Créer des cadres photos',
                exempleCode: `.element {
    /* Exemple 1: Bordure simple */
    border: 2px solid #3498db;
    
    /* Exemple 2: Bordures arrondies */
    border: 3px solid #e74c3c;
    border-radius: 15px;
    
    /* Exemple 3: Bordure sur un côté */
    border-bottom: 4px solid #2ecc71;
    
    /* Exemple 4: Style de bordure pointillée */
    border: 2px dashed #f39c12;
    
    /* Exemple 5: Ombre de bordure */
    border: 1px solid #ddd;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    
    /* Exemple 6: Bordure avec gradient */
    border: 5px solid;
    border-image: linear-gradient(45deg, #ff7e5f, #feb47b) 1;
}`,
                exempleResultat: `<div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
    <div style="border: 2px solid #3498db; padding: 20px; border-radius: 8px; text-align: center; flex: 1; min-width: 150px;">
        <strong>Solid</strong><br>2px #3498db
    </div>
    <div style="border: 2px dashed #f39c12; padding: 20px; border-radius: 8px; text-align: center; flex: 1; min-width: 150px;">
        <strong>Dashed</strong><br>2px #f39c12
    </div>
    <div style="border: 2px dotted #9b59b6; padding: 20px; border-radius: 8px; text-align: center; flex: 1; min-width: 150px;">
        <strong>Dotted</strong><br>2px #9b59b6
    </div>
</div>`
            },
            
            'margin-padding': {
                titre: 'Margin & Padding',
                definition: 'Margin et padding sont deux propriétés CSS essentielles pour l\'espacement. Margin crée de l\'espace à l\'extérieur d\'un élément, tandis que padding crée de l\'espace à l\'intérieur.',
                role: 'Margin sert à :<br>• Séparer les éléments entre eux<br>• Centrer horizontalement (margin: auto)<br>• Créer des espaces entre sections<br>• Gérer l\'espacement du layout<br><br>Padding sert à :<br>• Créer de l\'espace entre le contenu et la bordure<br>• Améliorer la lisibilité du texte<br>• Agrandir la zone cliquable des boutons<br>• Créer des cartes avec contenu aéré',
                usage: 'Utilisez margin/padding pour :<br>• Créer des grilles bien espacées<br>• Améliorer l\'expérience utilisateur sur mobile<br>• Créer des cartes avec contenu confortable<br>• Gérer les espacements responsives<br>• Centrer des éléments',
                exempleCode: `.element {
    /* MARGIN */
    /* Tous les côtés */
    margin: 20px;
    
    /* Haut/Bas - Gauche/Droite */
    margin: 20px 40px;
    
    /* Haut - Droite - Bas - Gauche */
    margin: 10px 20px 30px 40px;
    
    /* Centrage horizontal */
    margin: 0 auto;
    
    /* Marges individuelles */
    margin-top: 15px;
    margin-right: 25px;
    margin-bottom: 15px;
    margin-left: 25px;
    
    /* PADDING */
    padding: 15px;
    padding: 10px 20px;
    padding: 5px 10px 15px 20px;
    
    /* Box-sizing important */
    box-sizing: border-box; /* Inclut padding dans la largeur */
}

/* Utilisation pratique */
.card {
    padding: 20px;
    margin-bottom: 30px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.button {
    padding: 12px 24px;
    margin: 0 10px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}`,
                exempleResultat: `<div style="display: flex; flex-direction: column; gap: 30px; margin-top: 20px;">
    <div style="border: 2px solid #e74c3c; background: #fff5f5; padding: 20px; border-radius: 8px;">
        <div style="background: #3498db; color: white; padding: 15px; margin: 15px; border-radius: 5px; text-align: center;">
            Élément avec margin: 15px et padding: 15px
        </div>
        <p style="text-align: center; margin: 10px 0 0 0; color: #666;">
            La zone bleue est le padding, l'espace autour est le margin
        </p>
    </div>
    
    <div style="display: flex; justify-content: center; gap: 10px;">
        <button style="padding: 10px 20px; margin: 5px; background: #2ecc71; color: white; border: none; border-radius: 5px;">
            Bouton 1
        </button>
        <button style="padding: 10px 20px; margin: 5px; background: #e74c3c; color: white; border: none; border-radius: 5px;">
            Bouton 2
        </button>
    </div>
</div>`
            },
            
            'display': {
                titre: 'Display CSS',
                definition: 'La propriété display détermine comment un élément est affiché dans le flux du document. C\'est l\'une des propriétés CSS les plus importantes pour le layout.',
                role: 'Display contrôle :<br>• Si un élément est block, inline ou inline-block<br>• La création de layouts flexbox (flex)<br>• La création de grilles CSS (grid)<br>• La visibilité des éléments (none)<br>• Le comportement des éléments table',
                usage: 'Utilisez display pour :<br>• Créer des layouts flexbox responsives<br>• Construire des grilles CSS complexes<br>• Contrôler l\'affichage des éléments sur mobile<br>• Créer des menus de navigation<br>• Gérer l\'alignement vertical/horizontal',
                exempleCode: `.element {
    /* Valeurs de base */
    display: block;     /* Prend toute la largeur */
    display: inline;    /* S'adapte au contenu */
    display: inline-block; /* Mix des deux */
    display: none;      /* Caché */
    
    /* Layout moderne */
    display: flex;      /* Flexbox */
    display: grid;      /* CSS Grid */
    
    /* Pour les tables */
    display: table;
    display: table-cell;
    display: table-row;
}

/* FLEXBOX */
.container {
    display: flex;
    justify-content: center;    /* Alignement horizontal */
    align-items: center;        /* Alignement vertical */
    flex-wrap: wrap;            /* Retour à la ligne */
    gap: 20px;                  /* Espacement */
}

/* GRID */
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 colonnes égales */
    gap: 20px;
}

/* Responsive */
@media (max-width: 768px) {
    .element {
        display: block; /* Passe en block sur mobile */
    }
}`,
                exempleResultat: `<div style="display: flex; flex-direction: column; gap: 30px; margin-top: 20px;">
    <div style="display: flex; gap: 10px; background: #f8f9fa; padding: 20px; border-radius: 8px;">
        <div style="background: #3498db; color: white; padding: 15px; border-radius: 5px; flex: 1; text-align: center;">
            Flex Item 1
        </div>
        <div style="background: #2ecc71; color: white; padding: 15px; border-radius: 5px; flex: 1; text-align: center;">
            Flex Item 2
        </div>
        <div style="background: #e74c3c; color: white; padding: 15px; border-radius: 5px; flex: 1; text-align: center;">
            Flex Item 3
        </div>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; background: #f8f9fa; padding: 20px; border-radius: 8px;">
        <div style="background: #9b59b6; color: white; padding: 15px; border-radius: 5px; text-align: center;">
            Grid Cell 1
        </div>
        <div style="background: #f39c12; color: white; padding: 15px; border-radius: 5px; text-align: center;">
            Grid Cell 2
        </div>
        <div style="background: #1abc9c; color: white; padding: 15px; border-radius: 5px; text-align: center;">
            Grid Cell 3
        </div>
    </div>
</div>`
            },
            
            'position': {
                titre: 'Position CSS',
                definition: 'La propriété position détermine comment un élément est positionné dans le document. Elle permet de créer des overlays, menus fixes, et contrôler précisément l\'emplacement.',
                role: 'Position permet de :<br>• Fixer des éléments à l\'écran (fixed)<br>• Positionner absolument par rapport au parent (absolute)<br>• Maintenir dans le flux avec décalage (relative)<br>• Coller lors du scroll (sticky)<br>• Positionner par rapport au viewport',
                usage: 'Utilisez position pour :<br>• Créer des menus de navigation fixes<br>• Faire des modals et overlays<br>• Créer des tooltips<br>• Positionner des badges ou notifications<br>• Créer des designs avec éléments superposés',
                exempleCode: `.element {
    /* Valeurs possibles */
    position: static;    /* Par défaut */
    position: relative;  /* Position relative */
    position: absolute;  /* Position absolue */
    position: fixed;     /* Fixe par rapport à la fenêtre */
    position: sticky;    /* Collant lors du scroll */
    
    /* Décalages avec position non-static */
    top: 10px;
    right: 20px;
    bottom: 30px;
    left: 40px;
    
    /* Z-index pour l\'ordre d\'empilement */
    z-index: 10;
}

/* Exemples pratiques */
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2000;
}

.tooltip {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
}

.sticky-nav {
    position: sticky;
    top: 0;
    background: white;
    z-index: 500;
}`,
                exempleResultat: `<div style="position: relative; height: 200px; background: #f8f9fa; border: 2px dashed #ddd; border-radius: 8px; margin-top: 20px; padding: 20px;">
    <div style="position: absolute; top: 20px; left: 20px; background: #3498db; color: white; padding: 10px 15px; border-radius: 5px;">
        Absolute Top-Left
    </div>
    
    <div style="position: absolute; top: 20px; right: 20px; background: #2ecc71; color: white; padding: 10px 15px; border-radius: 5px;">
        Absolute Top-Right
    </div>
    
    <div style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background: #e74c3c; color: white; padding: 10px 15px; border-radius: 5px;">
        Absolute Centered Bottom
    </div>
    
    <div style="position: relative; top: 70px; left: 50%; transform: translateX(-50%); background: #9b59b6; color: white; padding: 10px 15px; border-radius: 5px; width: fit-content;">
        Relative Centered
    </div>
</div>`
            },
            
            'flex': {
                titre: 'Flexbox CSS',
                definition: 'Flexbox (Flexible Box Layout) est un modèle de layout CSS moderne qui permet de distribuer l\'espace entre les éléments d\'un conteneur, même lorsque leur taille est inconnue ou dynamique.',
                role: 'Flexbox est idéal pour :<br>• Centrer verticalement et horizontalement<br>• Créer des layouts responsives<br>• Distribuer l\'espace entre éléments<br>• Créer des grilles flexibles<br>• Aligner des éléments de tailles différentes<br>• Réorganiser l\'ordre des éléments',
                usage: 'Utilisez Flexbox pour :<br>• Navigation bars responsives<br>• Cartes alignées avec hauteurs égales<br>• Centrage parfait d\'éléments<br>• Formulaires avec labels alignés<br>• Galleries d\'images responsives<br>• Layouts de pages entières',
                exempleCode: `.container {
    display: flex;
    /* Direction principale */
    flex-direction: row;         /* Par défaut */
    flex-direction: row-reverse;
    flex-direction: column;
    flex-direction: column-reverse;
    
    /* Alignement sur l\'axe principal */
    justify-content: flex-start; /* Par défaut */
    justify-content: flex-end;
    justify-content: center;
    justify-content: space-between;
    justify-content: space-around;
    justify-content: space-evenly;
    
    /* Alignement sur l\'axe secondaire */
    align-items: stretch;        /* Par défaut */
    align-items: flex-start;
    align-items: flex-end;
    align-items: center;
    align-items: baseline;
    
    /* Gestion du retour à la ligne */
    flex-wrap: nowrap;           /* Par défaut */
    flex-wrap: wrap;
    flex-wrap: wrap-reverse;
    
    /* Espacement */
    gap: 20px;
}

/* Propriétés des enfants */
.item {
    /* Taille flexible */
    flex: 1;                    /* Prend l'espace disponible */
    flex: 0 1 auto;            /* Par défaut */
    flex: 2 1 200px;           /* flex-grow, flex-shrink, flex-basis */
    
    /* Ordre */
    order: 1;                  /* Contrôle l'ordre d'affichage */
    
    /* Alignement individuel */
    align-self: center;
}

/* Centrage parfait */
.centered {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}`,
                exempleResultat: `<div style="display: flex; flex-direction: column; gap: 30px; margin-top: 20px;">
    <div style="display: flex; justify-content: space-between; background: #f8f9fa; padding: 20px; border-radius: 8px;">
        <div style="background: #3498db; color: white; padding: 15px; border-radius: 5px; text-align: center;">
            Space Between
        </div>
        <div style="background: #2ecc71; color: white; padding: 15px; border-radius: 5px; text-align: center;">
            Space Between
        </div>
        <div style="background: #e74c3c; color: white; padding: 15px; border-radius: 5px; text-align: center;">
            Space Between
        </div>
    </div>
    
    <div style="display: flex; justify-content: center; align-items: center; height: 100px; background: #f8f9fa; border-radius: 8px;">
        <div style="background: #9b59b6; color: white; padding: 15px; border-radius: 5px; text-align: center;">
            Centré parfaitement
        </div>
    </div>
    
    <div style="display: flex; flex-wrap: wrap; gap: 10px; background: #f8f9fa; padding: 20px; border-radius: 8px;">
        <div style="background: #f39c12; color: white; padding: 15px; border-radius: 5px; text-align: center; flex: 1; min-width: 100px;">
            Wrap 1
        </div>
        <div style="background: #1abc9c; color: white; padding: 15px; border-radius: 5px; text-align: center; flex: 1; min-width: 100px;">
            Wrap 2
        </div>
        <div style="background: #e74c3c; color: white; padding: 15px; border-radius: 5px; text-align: center; flex: 1; min-width: 100px;">
            Wrap 3
        </div>
    </div>
</div>`
            },
            
            'typography': {
                titre: 'Typography CSS',
                definition: 'La typographie en CSS contrôle l\'apparence du texte : polices, tailles, espacements, couleurs et styles. C\'est essentiel pour la lisibilité et l\'expérience utilisateur.',
                role: 'Les propriétés typographiques permettent de :<br>• Définir la famille de polices<br>• Contrôler la taille du texte<br>• Gérer l\'épaisseur (bold, light)<br>• Ajuster l\'espacement des lignes et lettres<br>• Changer la couleur du texte<br>• Ajouter des ombres ou effets',
                usage: 'Utilisez la typographie pour :<br>• Créer une hiérarchie visuelle claire<br>• Améliorer la lisibilité sur tous les appareils<br>• Créer une identité visuelle cohérente<br>• Mettre en valeur les titres et citations<br>• Optimiser l\'accessibilité',
                exempleCode: `.element {
    /* Famille de polices */
    font-family: 'Arial', sans-serif;
    font-family: 'Georgia', serif;
    font-family: 'Courier New', monospace;
    font-family: system-ui, -apple-system, sans-serif; /* Moderne */
    
    /* Taille */
    font-size: 16px;            /* Pixels */
    font-size: 1rem;            /* Relative à la racine */
    font-size: 1.2em;           /* Relative au parent */
    font-size: 120%;            /* Pourcentage */
    
    /* Poids */
    font-weight: 400;           /* Normal */
    font-weight: 700;           /* Bold */
    font-weight: 300;           /* Light */
    font-weight: 900;           /* Black */
    
    /* Style et variantes */
    font-style: normal;
    font-style: italic;
    font-style: oblique;
    
    /* Espacement */
    line-height: 1.5;           /* Hauteur de ligne */
    letter-spacing: 0.5px;      /* Espacement des lettres */
    word-spacing: 2px;          /* Espacement des mots */
    text-align: left;           /* Alignement */
    
    /* Couleur et effets */
    color: #333;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
    
    /* Transformation */
    text-transform: uppercase;
    text-transform: lowercase;
    text-transform: capitalize;
    
    /* Décoration */
    text-decoration: none;
    text-decoration: underline;
    text-decoration: line-through;
}`,
                exempleResultat: `<div style="display: flex; flex-direction: column; gap: 25px; margin-top: 20px;">
    <div style="font-family: 'Georgia', serif; font-size: 2rem; color: #2c3e50; font-weight: 700;">
        Titre Principal (Georgia, 2rem, Bold)
    </div>
    
    <div style="font-family: 'Arial', sans-serif; font-size: 1.2rem; color: #34495e; line-height: 1.6;">
        Ceci est un paragraphe avec une hauteur de ligne généreuse pour une meilleure lisibilité. Arial, 1.2rem, line-height 1.6.
    </div>
    
    <div style="display: flex; gap: 15px; flex-wrap: wrap;">
        <span style="font-weight: 300; background: #f8f9fa; padding: 8px 15px; border-radius: 5px;">
            Light (300)
        </span>
        <span style="font-weight: 400; background: #f8f9fa; padding: 8px 15px; border-radius: 5px;">
            Normal (400)
        </span>
        <span style="font-weight: 700; background: #f8f9fa; padding: 8px 15px; border-radius: 5px;">
            Bold (700)
        </span>
        <span style="font-weight: 900; background: #f8f9fa; padding: 8px 15px; border-radius: 5px;">
            Black (900)
        </span>
    </div>
    
    <div style="display: flex; gap: 15px; flex-wrap: wrap;">
        <span style="text-transform: uppercase; background: #3498db; color: white; padding: 8px 15px; border-radius: 5px;">
            Uppercase
        </span>
        <span style="text-decoration: underline; background: #2ecc71; color: white; padding: 8px 15px; border-radius: 5px;">
            Underline
        </span>
        <span style="font-style: italic; background: #e74c3c; color: white; padding: 8px 15px; border-radius: 5px;">
            Italic
        </span>
    </div>
</div>`
            },
            
            'text': {
                titre: 'Text CSS',
                definition: 'Les propriétés text en CSS contrôlent spécifiquement l\'affichage et le formatage du texte : alignement, décoration, transformation, ombres et espacement.',
                role: 'Les propriétés text permettent de :<br>• Aligner le texte (gauche, centre, droite, justifié)<br>• Ajouter des décorations (souligné, barré)<br>• Transformer le texte (majuscules, minuscules)<br>• Ajouter des ombres pour effet de profondeur<br>• Gérer le débordement avec ellipsis<br>• Contrôler la direction (RTL)',
                usage: 'Utilisez les propriétés text pour :<br>• Créer des titres avec ombres portées<br>• Mettre en forme les citations<br>• Gérer les textes longs avec ellipsis<br>• Créer des effets sur les liens<br>• Améliorer l\'accessibilité des textes<br>• Gérer les langues RTL (arabe, hébreu)',
                exempleCode: `.element {
    /* Alignement */
    text-align: left;
    text-align: center;
    text-align: right;
    text-align: justify;
    
    /* Décoration */
    text-decoration: none;
    text-decoration: underline;
    text-decoration: overline;
    text-decoration: line-through;
    text-decoration: underline overline;
    
    /* Transformation */
    text-transform: none;
    text-transform: uppercase;
    text-transform: lowercase;
    text-transform: capitalize;
    
    /* Ombre de texte */
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    text-shadow: 0 1px 0 #fff, 0 2px 0 #ddd; /* Effet relief */
    
    /* Indentation */
    text-indent: 2em;
    
    /* Espacement */
    letter-spacing: 1px;
    word-spacing: 3px;
    line-height: 1.8;
    
    /* Gestion du débordement */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
    /* Direction */
    direction: ltr; /* Left to right */
    direction: rtl; /* Right to left */
}

/* Exemples pratiques */
.heading {
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.link {
    text-decoration: none;
    color: #3498db;
}

.link:hover {
    text-decoration: underline;
}

.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
}`,
                exempleResultat: `<div style="display: flex; flex-direction: column; gap: 25px; margin-top: 20px;">
    <div style="text-align: center; text-transform: uppercase; letter-spacing: 2px; text-shadow: 1px 1px 3px rgba(0,0,0,0.2); background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; border-radius: 8px; font-size: 1.5rem;">
        Titre avec ombre et majuscules
    </div>
    
    <div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;">
        <div style="text-align: left; background: #f8f9fa; padding: 15px; border-radius: 5px; flex: 1; min-width: 150px;">
            <strong>Aligné à gauche</strong><br>
            Lorem ipsum dolor sit amet.
        </div>
        <div style="text-align: center; background: #f8f9fa; padding: 15px; border-radius: 5px; flex: 1; min-width: 150px;">
            <strong>Centré</strong><br>
            Consectetur adipiscing elit.
        </div>
        <div style="text-align: right; background: #f8f9fa; padding: 15px; border-radius: 5px; flex: 1; min-width: 150px;">
            <strong>Aligné à droite</strong><br>
            Sed do eiusmod tempor.
        </div>
    </div>
    
    <div style="display: flex; gap: 15px; flex-wrap: wrap;">
        <span style="text-decoration: underline; background: #3498db; color: white; padding: 8px 15px; border-radius: 5px;">
            Underline
        </span>
        <span style="text-decoration: line-through; background: #e74c3c; color: white; padding: 8px 15px; border-radius: 5px;">
            Line Through
        </span>
        <span style="text-decoration: overline; background: #2ecc71; color: white; padding: 8px 15px; border-radius: 5px;">
            Overline
        </span>
    </div>
    
    <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 300px; background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #f39c12;">
        Ce texte est trop long et sera coupé avec des points de suspension...
    </div>
</div>`
            },
            
            'box-shadow': {
                titre: 'Box Shadow CSS',
                definition: 'La propriété box-shadow ajoute une ou plusieurs ombres à un élément. Elle permet de créer des effets de profondeur, de relief et de mettre en valeur visuellement des éléments.',
                role: 'Box-shadow sert à :<br>• Créer des effets de profondeur (cartes, boutons)<br>• Simuler l\'élévation d\'éléments<br>• Mettre en valeur des composants<br>• Créer des bordures décoratives<br>• Ajouter des effets hover interactifs<br>• Créer des designs modernes et matériels',
                usage: 'Utilisez box-shadow pour :<br>• Créer des cartes avec ombres portées<br>• Ajouter des effets hover sur les boutons<br>• Créer des modals qui semblent flotter<br>• Simuler des boutons enfoncés (inset)<br>• Créer des séparateurs visuels<br>• Ajouter de la profondeur aux interfaces',
                exempleCode: `.element {
    /* Syntaxe : offset-x | offset-y | blur-radius | spread-radius | color */
    box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
    
    /* Ombres multiples */
    box-shadow: 0 2px 4px rgba(0,0,0,0.1),
                0 4px 8px rgba(0,0,0,0.1),
                0 8px 16px rgba(0,0,0,0.1);
    
    /* Ombre intérieure (inset) */
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
    
    /* Différents effets */
    box-shadow: 0 1px 3px rgba(0,0,0,0.12); /* Léger */
    box-shadow: 0 4px 6px rgba(0,0,0,0.1); /* Moyen */
    box-shadow: 0 10px 25px rgba(0,0,0,0.15); /* Élevé */
    box-shadow: 0 20px 40px rgba(0,0,0,0.2); /* Très élevé */
    
    /* Ombres colorées */
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
    box-shadow: 0 6px 20px rgba(46, 204, 113, 0.25);
    
    /* Effets spéciaux */
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.5); /* Bordure ombrée */
}

/* Exemples pratiques */
.card {
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    transition: box-shadow 0.3s ease;
}

.card:hover {
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.button {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.button:active {
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
}

.modal {
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}`,
                exempleResultat: `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 25px; margin-top: 20px;">
    <div style="box-shadow: 0 1px 3px rgba(0,0,0,0.12); padding: 25px; border-radius: 8px; background: white; text-align: center;">
        <strong>Léger</strong><br>0 1px 3px
    </div>
    
    <div style="box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 25px; border-radius: 8px; background: white; text-align: center;">
        <strong>Moyen</strong><br>0 4px 6px
    </div>
    
    <div style="box-shadow: 0 10px 25px rgba(0,0,0,0.15); padding: 25px; border-radius: 8px; background: white; text-align: center;">
        <strong>Élevé</strong><br>0 10px 25px
    </div>
    
    <div style="box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3); padding: 25px; border-radius: 8px; background: white; text-align: center;">
        <strong>Coloré</strong><br>bleu avec 0.3 opacité
    </div>
    
    <div style="box-shadow: inset 0 2px 4px rgba(0,0,0,0.1); padding: 25px; border-radius: 8px; background: #f8f9fa; text-align: center;">
        <strong>Inset</strong><br>ombre intérieure
    </div>
    
    <div style="box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1); padding: 25px; border-radius: 8px; background: white; text-align: center;">
        <strong>Multiples</strong><br>3 ombres superposées
    </div>
</div>`
            },
            
            'transform': {
                titre: 'Transform & Transition CSS',
                definition: 'Transform permet de modifier la forme, la position ou l\'orientation d\'un élément. Transition permet d\'animer les changements de propriétés CSS de manière fluide.',
                role: 'Transform permet de :<br>• Déplacer, tourner, mettre à l\'échelle, incliner<br>• Créer des effets 3D<br>• Changer le point d\'origine des transformations<br><br>Transition permet de :<br>• Animer les changements de propriétés CSS<br>• Créer des effets hover fluides<br>• Améliorer l\'expérience utilisateur<br>• Créer des interfaces dynamiques',
                usage: 'Utilisez transform/transition pour :<br>• Créer des animations sur les boutons<br>• Faire des cartes qui se retournent (flip)<br>• Créer des menus animés<br>• Ajouter des effets de parallaxe<br>• Créer des loaders et spinners<br>• Animer les modals et tooltips',
                exempleCode: `.element {
    /* TRANSFORM */
    /* Translation (déplacement) */
    transform: translateX(50px);
    transform: translateY(-20px);
    transform: translate(30px, 40px);
    
    /* Rotation */
    transform: rotate(45deg);
    transform: rotateX(20deg);   /* 3D */
    transform: rotateY(30deg);   /* 3D */
    
    /* Mise à l'échelle */
    transform: scale(1.2);       /* Agrandir */
    transform: scaleX(0.8);      /* Réduire horizontalement */
    transform: scaleY(1.5);      /* Agrandir verticalement */
    
    /* Inclinaison (skew) */
    transform: skewX(15deg);
    transform: skewY(-10deg);
    transform: skew(15deg, -10deg);
    
    /* Combinaisons */
    transform: translate(50px, 50px) rotate(45deg) scale(1.2);
    
    /* Origine de la transformation */
    transform-origin: center;     /* Par défaut */
    transform-origin: top left;
    transform-origin: 20% 80%;
    
    /* TRANSITION */
    /* Syntaxe : property | duration | timing-function | delay */
    transition: all 0.3s ease;
    
    /* Propriétés spécifiques */
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition: opacity 0.2s linear, transform 0.3s ease;
    
    /* Durées */
    transition-duration: 0.3s;
    transition-duration: 400ms;
    
    /* Fonctions de timing */
    transition-timing-function: ease;        /* Par défaut */
    transition-timing-function: linear;
    transition-timing-function: ease-in;
    transition-timing-function: ease-out;
    transition-timing-function: ease-in-out;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Bounce */
    
    /* Délai */
    transition-delay: 0.1s;
}`,
                exempleResultat: `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 25px; margin-top: 20px;">
    <div style="transform: rotate(10deg); background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 25px; border-radius: 8px; text-align: center; transition: transform 0.3s ease;">
        <strong>Rotation</strong><br>rotate(10deg)
    </div>
    
    <div style="transform: scale(1.1); background: linear-gradient(135deg, #2ecc71, #27ae60); color: white; padding: 25px; border-radius: 8px; text-align: center; transition: transform 0.3s ease;">
        <strong>Scale</strong><br>scale(1.1)
    </div>
    
    <div style="transform: skewX(-10deg); background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; padding: 25px; border-radius: 8px; text-align: center; transition: transform 0.3s ease;">
        <strong>Skew</strong><br>skewX(-10deg)
    </div>
    
    <div style="transform: translateY(-10px); background: linear-gradient(135deg, #f39c12, #d35400); color: white; padding: 25px; border-radius: 8px; text-align: center; transition: transform 0.3s ease;">
        <strong>Translate</strong><br>translateY(-10px)
    </div>
</div>

<div style="margin-top: 30px; padding: 30px; background: #f8f9fa; border-radius: 10px; border-left: 4px solid #3498db;">
    <h4 style="margin: 0 0 15px 0; color: #2c3e50;">Exemple avec Transition</h4>
    <div style="display: flex; gap: 15px; flex-wrap: wrap;">
        <button style="padding: 12px 24px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer; transition: all 0.3s ease;"
                onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 12px rgba(52, 152, 219, 0.3)';"
                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)'">
            Survoler moi
        </button>
        
        <div style="width: 50px; height: 50px; background: #2ecc71; border-radius: 50%; margin: 10px; transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);"
             onclick="this.style.transform = this.style.transform === 'rotate(360deg)' ? 'rotate(0deg)' : 'rotate(360deg)'"
             style="cursor: pointer;">
        </div>
    </div>
    <p style="margin: 15px 0 0 0; color: #666; font-size: 0.9em;">
        Clique sur le cercle pour le faire tourner avec animation bounce
    </p>
</div>`
            }
        };
    }
    
    /**
     * Charge un cours spécifique
     */
    loadCours(coursId) {
        this.currentCours = coursId;
        const cours = this.coursData[coursId];
        
        if (!cours) {
            console.error('Cours non trouvé:', coursId);
            return;
        }
        
        this.displayCours(cours);
    }
    
    /**
     * Affiche le cours dans le conteneur
     */
    displayCours(cours) {
        const container = document.getElementById('cours-container');
        if (!container) return;
        
        container.innerHTML = this.generateCoursHTML(cours);
        
        // Appliquer le style au code
        this.applyCodeStyling();
    }
    
    /**
     * Génère le HTML du cours
     */
    generateCoursHTML(cours) {
        return `
            <article class="cours-article">
                <header class="cours-header">
                    <h1 class="cours-title">${cours.titre}</h1>
                    <div class="cours-meta">
                        <span class="cours-category">CSS Property</span>
                        <span class="cours-difficulty">Débutant</span>
                    </div>
                </header>
                
                <section class="cours-section definition-section">
                    <h2 class="section-title">
                        <i class="fas fa-book"></i> Définition
                    </h2>
                    <div class="section-content">
                        <p>${cours.definition}</p>
                    </div>
                </section>
                
                <section class="cours-section role-section">
                    <h2 class="section-title">
                        <i class="fas fa-tasks"></i> Rôle
                    </h2>
                    <div class="section-content">
                        <p>${cours.role}</p>
                    </div>
                </section>
                
                <section class="cours-section usage-section">
                    <h2 class="section-title">
                        <i class="fas fa-code"></i> Usage
                    </h2>
                    <div class="section-content">
                        <p>${cours.usage}</p>
                    </div>
                </section>
                
                <section class="cours-section examples-section">
                    <h2 class="section-title">
                        <i class="fas fa-laptop-code"></i> Exemples
                    </h2>
                    
                    <div class="example-container">
                        <div class="code-example">
                            <div class="code-header">
                                <span>CSS</span>
                                <button class="copy-code-btn" onclick="coursManager.copyCode(this)">
                                    <i class="fas fa-copy"></i> Copier
                                </button>
                            </div>
                            <pre class="code-block"><code class="css">${this.escapeHTML(cours.exempleCode)}</code></pre>
                        </div>
                        
                        <div class="result-example">
                            <div class="result-header">
                                <span>Résultat</span>
                            </div>
                            <div class="result-preview">
                                ${cours.exempleResultat}
                            </div>
                        </div>
                    </div>
                </section>
                
                <footer class="cours-footer">
                    <div class="cours-navigation">
                        <button class="prev-cours" onclick="coursManager.navigatePrev()">
                            <i class="fas fa-chevron-left"></i> Précédent
                        </button>
                        <button class="next-cours" onclick="coursManager.navigateNext()">
                            Suivant <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </footer>
            </article>
        `;
    }
    
    /**
     * Applique le style au code
     */
    applyCodeStyling() {
        // Cette fonction peut être étendue pour colorer la syntaxe
        const codeBlocks = document.querySelectorAll('.code-block code');
        codeBlocks.forEach(block => {
            block.innerHTML = this.highlightCSS(block.textContent);
        });
    }
    
    /**
     * Coloration syntaxique CSS basique
     */
    highlightCSS(code) {
        // Échapper le HTML
        let highlighted = this.escapeHTML(code);
        
        // Commentaires
        highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, 
            '<span class="code-comment">$&</span>');
        
        // Propriétés CSS
        highlighted = highlighted.replace(/([a-zA-Z-]+)(?=\s*:)/g, 
            '<span class="code-property">$1</span>');
        
        // Valeurs importantes
        highlighted = highlighted.replace(/:\s*([^;{}]+)(?=;|})/g, 
            ': <span class="code-value">$1</span>');
        
        // Sélecteurs
        highlighted = highlighted.replace(/(\.|#)?([a-zA-Z-]+)(?=\s*{)/g, 
            '<span class="code-selector">$1$2</span>');
        
        return highlighted;
    }
    
    /**
     * Recherche dans le cours actuel
     */
    searchInCours(searchTerm, coursId) {
        if (!searchTerm.trim()) {
            this.clearSearchHighlights();
            return;
        }
        
        const cours = this.coursData[coursId];
        if (!cours) return;
        
        // Mettre en évidence dans toutes les sections
        this.highlightText(searchTerm, coursId);
    }
    
    /**
     * Met en évidence le texte recherché
     */
    highlightText(searchTerm, coursId) {
        this.clearSearchHighlights();
        
        const container = document.getElementById('cours-container');
        if (!container) return;
        
        const regex = new RegExp(`(${this.escapeRegex(searchTerm)})`, 'gi');
        const walker = document.createTreeWalker(
            container,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        let node;
        const nodes = [];
        
        while (node = walker.nextNode()) {
            if (node.textContent.match(regex)) {
                nodes.push(node);
            }
        }
        
        nodes.forEach(node => {
            const span = document.createElement('span');
            span.className = 'search-highlight';
            span.innerHTML = node.textContent.replace(regex, 
                '<mark class="search-match">$1</mark>');
            
            node.parentNode.replaceChild(span, node);
        });
    }
    
    /**
     * Efface les surbrillances de recherche
     */
    clearSearchHighlights() {
        const highlights = document.querySelectorAll('.search-highlight');
        highlights.forEach(highlight => {
            const text = highlight.textContent;
            highlight.parentNode.replaceChild(
                document.createTextNode(text), 
                highlight
            );
        });
    }
    
    /**
     * Navigation entre cours
     */
    navigatePrev() {
        const coursIds = Object.keys(this.coursData);
        const currentIndex = coursIds.indexOf(this.currentCours);
        
        if (currentIndex > 0) {
            const prevCours = coursIds[currentIndex - 1];
            this.loadCours(prevCours);
            
            // Mettre à jour l'onglet actif
            document.querySelectorAll('.css-tab').forEach(tab => {
                tab.classList.toggle('active', tab.dataset.cours === prevCours);
            });
        }
    }
    
    navigateNext() {
        const coursIds = Object.keys(this.coursData);
        const currentIndex = coursIds.indexOf(this.currentCours);
        
        if (currentIndex < coursIds.length - 1) {
            const nextCours = coursIds[currentIndex + 1];
            this.loadCours(nextCours);
            
            // Mettre à jour l'onglet actif
            document.querySelectorAll('.css-tab').forEach(tab => {
                tab.classList.toggle('active', tab.dataset.cours === nextCours);
            });
        }
    }
    
    /**
     * Copie le code dans le presse-papier
     */
    copyCode(button) {
        const codeBlock = button.closest('.code-example').querySelector('code');
        const text = codeBlock.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Copié!';
            button.style.background = '#2ecc71';
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.background = '';
            }, 2000);
        }).catch(err => {
            console.error('Erreur de copie:', err);
            button.innerHTML = '<i class="fas fa-times"></i> Erreur';
            button.style.background = '#e74c3c';
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-copy"></i> Copier';
                button.style.background = '';
            }, 2000);
        });
    }
    
    /**
     * Charge le premier cours
     */
    loadInitialCours() {
        const firstCours = Object.keys(this.coursData)[0];
        this.loadCours(firstCours);
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
const coursManager = new CoursManager();

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Appliquer les styles CSS
    coursManager.applyCoursStyles();
});

// Exporter pour utilisation globale
window.CoursManager = CoursManager;
window.coursManager = coursManager;

// Méthode pour appliquer les styles CSS
CoursManager.prototype.applyCoursStyles = function() {
    if (document.getElementById('cours-styles')) return;
    
    const styles = `
        /* Styles pour les cours statiques */
        .cours-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .cours-article {
            background: white;
            border-radius: 15px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            animation: coursFadeIn 0.5s ease;
        }
        
        @keyframes coursFadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .cours-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .cours-title {
            font-size: 2.2rem;
            margin: 0 0 15px 0;
            font-weight: 700;
        }
        
        .cours-meta {
            display: flex;
            justify-content: center;
            gap: 15px;
            font-size: 0.9rem;
            opacity: 0.9;
        }
        
        .cours-category, .cours-difficulty {
            background: rgba(255, 255, 255, 0.2);
            padding: 5px 15px;
            border-radius: 20px;
        }
        
        .cours-section {
            padding: 30px;
            border-bottom: 1px solid #eee;
        }
        
        .cours-section:last-child {
            border-bottom: none;
        }
        
        .section-title {
            color: #2c3e50;
            font-size: 1.5rem;
            margin: 0 0 20px 0;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .section-title i {
            color: #3498db;
        }
        
        .section-content {
            font-size: 1.1rem;
            line-height: 1.7;
            color: #34495e;
        }
        
        .section-content ul {
            margin: 15px 0;
            padding-left: 25px;
        }
        
        .section-content li {
            margin-bottom: 8px;
        }
        
        .example-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-top: 20px;
        }
        
        @media (max-width: 900px) {
            .example-container {
                grid-template-columns: 1fr;
            }
        }
        
        .code-example, .result-example {
            background: #f8f9fa;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        
        .code-header, .result-header {
            background: #2c3e50;
            color: white;
            padding: 12px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 600;
        }
        
        .copy-code-btn {
            background: rgba(255, 255, 255, 0.15);
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.85rem;
            transition: background 0.3s ease;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .copy-code-btn:hover {
            background: rgba(255, 255, 255, 0.25);
        }
        
        .code-block {
            margin: 0;
            padding: 20px;
            background: #2d3748;
            color: #e2e8f0;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 0.95rem;
            line-height: 1.5;
            max-height: 400px;
            overflow-y: auto;
            tab-size: 4;
        }
        
        .code-block::-webkit-scrollbar {
            width: 8px;
        }
        
        .code-block::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2);
        }
        
        .code-block::-webkit-scrollbar-thumb {
            background: #4a5568;
            border-radius: 4px;
        }
        
        /* Coloration syntaxique */
        .code-comment {
            color: #7d8da6;
            font-style: italic;
        }
        
        .code-property {
            color: #90cdf4;
        }
        
        .code-value {
            color: #feb2b2;
        }
        
        .code-selector {
            color: #9ae6b4;
            font-weight: 600;
        }
        
        .result-preview {
            padding: 25px;
            background: white;
            min-height: 200px;
            max-height: 400px;
            overflow-y: auto;
        }
        
        .result-preview::-webkit-scrollbar {
            width: 8px;
        }
        
        .result-preview::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        
        .result-preview::-webkit-scrollbar-thumb {
            background: #ddd;
            border-radius: 4px;
        }
        
        .cours-footer {
            padding: 25px 30px;
            background: #f8f9fa;
            border-top: 1px solid #eee;
        }
        
        .cours-navigation {
            display: flex;
            justify-content: space-between;
        }
        
        .prev-cours, .next-cours {
            background: #3498db;
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(52, 152, 219, 0.2);
        }
        
        .prev-cours:hover, .next-cours:hover {
            background: #2980b9;
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(52, 152, 219, 0.3);
        }
        
        .prev-cours:active, .next-cours:active {
            transform: translateY(0);
        }
        
        /* Surbrillance recherche */
        .search-match {
            background-color: #ffeb3b;
            color: #000;
            padding: 1px 3px;
            border-radius: 3px;
            font-weight: 600;
            animation: highlightPulse 0.5s ease;
        }
        
        @keyframes highlightPulse {
            0% { background-color: transparent; }
            100% { background-color: #ffeb3b; }
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .cours-container {
                padding: 10px;
            }
            
            .cours-header {
                padding: 20px;
            }
            
            .cours-title {
                font-size: 1.8rem;
            }
            
            .cours-section {
                padding: 20px;
            }
            
            .section-title {
                font-size: 1.3rem;
            }
            
            .section-content {
                font-size: 1rem;
            }
            
            .code-block {
                padding: 15px;
                font-size: 0.85rem;
            }
            
            .result-preview {
                padding: 15px;
            }
            
            .prev-cours, .next-cours {
                padding: 10px 20px;
                font-size: 0.9rem;
            }
        }
        
        @media (max-width: 480px) {
            .cours-title {
                font-size: 1.5rem;
            }
            
            .cours-meta {
                flex-direction: column;
                align-items: center;
                gap: 8px;
            }
            
            .example-container {
                gap: 20px;
            }
            
            .cours-navigation {
                flex-direction: column;
                gap: 15px;
            }
            
            .prev-cours, .next-cours {
                width: 100%;
                justify-content: center;
            }
        }
        
        /* Accessibilité */
        @media (prefers-reduced-motion: reduce) {
            .cours-article {
                animation: none;
            }
            
            .search-match {
                animation: none;
            }
        }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.id = 'cours-styles';
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
};