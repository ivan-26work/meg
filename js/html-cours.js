/* html-cours.js - Cours HTML complets et structurés */
class HtmlCoursManager {
    constructor() {
        this.coursData = this.getCoursData();
        this.currentCours = null;
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        console.log('HTML Cours Manager initialisé - 10 cours prêts');
    }
    
    getCoursData() {
        return {
            'structure': {
                titre: 'Structure HTML de base',
                role: 'La structure HTML est le squelette fondamental de toute page web. Elle définit la hiérarchie et l\'organisation du contenu.',
                usage: 'À utiliser sur TOUTES les pages web pour :<br>• Définir le type de document (DOCTYPE)<br>• Structurer le contenu avec des balises sémantiques<br>• Déclarer les métadonnées (head)<br>• Organiser le contenu visible (body)',
                exempleCode: `<!DOCTYPE html>
<html lang="fr">
<head>
    <!-- Métadonnées -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ma Première Page</title>
    <!-- Styles et scripts -->
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
</head>
<body>
    <!-- Contenu visible -->
    <header>
        <h1>Mon Site Web</h1>
        <nav>Navigation</nav>
    </header>
    
    <main>
        <article>
            <h2>Article Principal</h2>
            <p>Contenu de l'article...</p>
        </article>
    </main>
    
    <footer>
        <p>&copy; 2023 Mon Site</p>
    </footer>
</body>
</html>`,
                exempleResultat: `<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #e74c3c;">
    <h3 style="color: #2c3e50; margin-top: 0;">Structure de page HTML</h3>
    <div style="background: white; padding: 15px; border-radius: 5px; font-family: monospace; font-size: 0.9em;">
        &lt;!DOCTYPE html&gt;<br>
        &lt;html&gt;<br>
        &nbsp;&nbsp;&lt;head&gt;...&lt;/head&gt;<br>
        &nbsp;&nbsp;&lt;body&gt;<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&lt;header&gt;En-tête&lt;/header&gt;<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&lt;main&gt;Contenu principal&lt;/main&gt;<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&lt;footer&gt;Pied de page&lt;/footer&gt;<br>
        &nbsp;&nbsp;&lt;/body&gt;<br>
        &lt;/html&gt;
    </div>
</div>`
            },
            
            'headings': {
                titre: 'Les Titres HTML (h1 à h6)',
                role: 'Les titres créent une hiérarchie visuelle et sémantique dans votre document. Ils sont essentiels pour l\'accessibilité et le SEO.',
                usage: 'Utilisez les titres pour :<br>• Structurer votre contenu de manière logique<br>• Améliorer l\'accessibilité (lecteurs d\'écran)<br>• Optimiser le référencement (SEO)<br>• Guider l\'utilisateur dans la lecture<br><br>Règles :<br>• Un seul h1 par page<br>• Ne pas sauter de niveaux (h1 → h2 → h3)<br>• Être cohérent dans toute la page',
                exempleCode: `<h1>Titre Principal - Niveau 1</h1>
<h2>Sous-titre - Niveau 2</h2>
<h3>Section - Niveau 3</h3>
<h4>Sous-section - Niveau 4</h4>
<h5>Détail - Niveau 5</h5>
<h6>Information fine - Niveau 6</h6>

<!-- Exemple réel -->
<article>
    <h1>Guide complet du HTML</h1>
    <h2>Introduction au HTML</h2>
    <h3>Qu\'est-ce que le HTML ?</h3>
    <p>Le HTML est...</p>
    
    <h3>Historique</h3>
    <p>Créé en 1991...</p>
    
    <h2>Les Balises de base</h2>
    <h3>Les titres</h3>
    <h3>Les paragraphes</h3>
</article>`,
                exempleResultat: `<div style="font-family: sans-serif; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <h1 style="color: #e74c3c; border-bottom: 2px solid #e74c3c; padding-bottom: 10px;">Titre Principal - Niveau 1</h1>
    <h2 style="color: #2c3e50; margin-left: 10px;">Sous-titre - Niveau 2</h2>
    <h3 style="color: #34495e; margin-left: 20px;">Section - Niveau 3</h3>
    <h4 style="color: #7f8c8d; margin-left: 30px;">Sous-section - Niveau 4</h4>
    <h5 style="color: #95a5a6; margin-left: 40px;">Détail - Niveau 5</h5>
    <h6 style="color: #bdc3c7; margin-left: 50px;">Information fine - Niveau 6</h6>
</div>`
            },
            
            'paragraphs': {
                titre: 'Paragraphes et Textes',
                role: 'Les paragraphes structurent le contenu textuel en unités logiques et lisibles.',
                usage: 'Utilisez les balises de texte pour :<br>• Organiser le contenu en paragraphes cohérents<br>• Créer des sauts de ligne lorsque nécessaire<br>• Afficher du texte préformaté (code, poésie)<br>• Séparer visuellement des sections<br><br>Balises :<br>• &lt;p&gt; : Paragraphe principal<br>• &lt;br&gt; : Saut de ligne<br>• &lt;hr&gt; : Séparateur thématique<br>• &lt;pre&gt; : Texte préformaté',
                exempleCode: `<p>Ceci est un paragraphe normal. Il contient plusieurs phrases qui forment une unité de sens.</p>

<p>Un autre paragraphe avec<br>
un saut de ligne forcé<br>
en milieu de paragraphe.</p>

<hr>

<p>Texte après un séparateur thématique.</p>

<pre>
Texte préformaté :
  - Garde les espaces
  - Garde les retours à la ligne
  - Idéal pour du code
</pre>

<p>Balises de mise en forme : <strong>gras</strong>, <em>italique</em>, <u>souligné</u>, <code>code</code>.</p>`,
                exempleResultat: `<div style="font-family: sans-serif; line-height: 1.6; padding: 20px; background: white; border-radius: 8px;">
    <p style="margin-bottom: 15px;">Ceci est un paragraphe normal. Il contient plusieurs phrases qui forment une unité de sens.</p>
    
    <p style="margin-bottom: 15px;">Un autre paragraphe avec<br>
    un saut de ligne forcé<br>
    en milieu de paragraphe.</p>
    
    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
    
    <p style="margin-bottom: 15px;">Texte après un séparateur thématique.</p>
    
    <pre style="background: #f8f9fa; padding: 15px; border-radius: 5px; font-family: monospace; border-left: 4px solid #3498db;">
Texte préformaté :
  - Garde les espaces
  - Garde les retours à la ligne
  - Idéal pour du code
    </pre>
    
    <p style="margin-top: 15px;">
        Balises de mise en forme : 
        <strong style="color: #e74c3c;">gras</strong>, 
        <em style="color: #2ecc71;">italique</em>, 
        <u style="color: #3498db;">souligné</u>, 
        <code style="background: #f8f9fa; padding: 2px 6px; border-radius: 3px; font-family: monospace;">code</code>.
    </p>
</div>`
            },
            
            'links': {
                titre: 'Liens Hypertextes',
                role: 'Les liens connectent les pages web entre elles et créent la navigation sur internet.',
                usage: 'Utilisez les liens pour :<br>• Naviguer entre les pages de votre site<br>• Référencer des ressources externes<br>• Créer des ancres vers des sections spécifiques<br>• Ouvrir des applications (email, téléphone)<br><br>Attributs importants :<br>• href : URL de destination<br>• target : Comment ouvrir (_blank, _self)<br>• rel : Relation avec la page cible<br>• title : Info-bulle au survol',
                exempleCode: `<!-- Lien vers une page externe -->
<a href="https://www.example.com" target="_blank" rel="noopener">
    Visiter Example.com
</a>

<!-- Lien vers une page interne -->
<a href="/about.html">À propos</a>

<!-- Ancre dans la même page -->
<a href="#section2">Aller à la section 2</a>
<h2 id="section2">Section 2</h2>

<!-- Lien email -->
<a href="mailto:contact@example.com?subject=Question">
    Nous contacter
</a>

<!-- Lien téléphone -->
<a href="tel:+33123456789">Appeler le service</a>

<!-- Lien avec info-bulle -->
<a href="/help.html" title="Centre d'aide et support">
    Aide
</a>`,
                exempleResultat: `<div style="font-family: sans-serif; padding: 20px; background: white; border-radius: 8px; display: flex; flex-wrap: wrap; gap: 15px;">
    <a href="#" style="color: #3498db; text-decoration: none; padding: 8px 15px; background: #f8f9fa; border-radius: 5px; border: 1px solid #e0e0e0;">
        Lien normal
    </a>
    
    <a href="#" style="color: #e74c3c; text-decoration: none; padding: 8px 15px; background: #fff5f5; border-radius: 5px; border: 1px solid #ffcccc;">
        Lien externe (nouvel onglet)
    </a>
    
    <a href="#" style="color: #2ecc71; text-decoration: none; padding: 8px 15px; background: #f0fff4; border-radius: 5px; border: 1px solid #c6f6d5;">
        Lien interne
    </a>
    
    <a href="#" style="color: #9b59b6; text-decoration: none; padding: 8px 15px; background: #f9f0ff; border-radius: 5px; border: 1px solid #e9d8fd;">
        Lien email
    </a>
    
    <a href="#" style="color: #e67e22; text-decoration: none; padding: 8px 15px; background: #fffaf0; border-radius: 5px; border: 1px solid #fed7aa;">
        Lien téléphone
    </a>
</div>
<div style="margin-top: 15px; padding: 15px; background: #f8f9fa; border-radius: 5px; font-size: 0.9em; color: #666;">
    <strong>Fonctionnalités :</strong><br>
    • Survolez les liens pour voir l'effet<br>
    • Cliquez pour voir le comportement (simulé)<br>
    • Chaque type a un style différent
</div>`
            },
            
            'images': {
                titre: 'Images et Graphiques',
                role: 'Les images enrichissent le contenu, illustrent les idées et améliorent l\'expérience utilisateur.',
                usage: 'Utilisez les images pour :<br>• Illustrer du contenu textuel<br>• Créer une identité visuelle<br>• Améliorer l\'engagement des utilisateurs<br>• Rendre les instructions plus claires<br><br>Bonnes pratiques :<br>• Toujours utiliser l\'attribut alt<br>• Optimiser le poids des images<br>• Utiliser des formats modernes (WebP)<br>• Rendre les images responsives',
                exempleCode: `<!-- Image basique -->
<img src="photo.jpg" alt="Description de la photo">

<!-- Image avec dimensions -->
<img src="logo.png" alt="Logo du site" width="200" height="100">

<!-- Image responsive -->
<img src="banner.jpg" 
     alt="Bannière principale"
     srcset="banner-400.jpg 400w,
             banner-800.jpg 800w,
             banner-1200.jpg 1200w"
     sizes="(max-width: 600px) 400px,
            (max-width: 1200px) 800px,
            1200px">

<!-- Image avec figure et légende -->
<figure>
    <img src="diagramme.png" alt="Diagramme du processus">
    <figcaption>Figure 1 : Diagramme du processus de développement</figcaption>
</figure>

<!-- Image avec lien -->
<a href="grande-image.jpg">
    <img src="miniature.jpg" alt="Voir en grand">
</a>`,
                exempleResultat: `<div style="font-family: sans-serif; padding: 20px; background: white; border-radius: 8px;">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
        <div style="text-align: center;">
            <div style="width: 150px; height: 100px; background: linear-gradient(135deg, #667eea, #764ba2); margin: 0 auto 10px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                Image 1
            </div>
            <small style="color: #666;">alt="Image de démo"</small>
        </div>
        
        <div style="text-align: center;">
            <div style="width: 200px; height: 100px; background: linear-gradient(135deg, #2ecc71, #27ae60); margin: 0 auto 10px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                Logo
            </div>
            <small style="color: #666;">width="200" height="100"</small>
        </div>
        
        <div style="text-align: center; grid-column: span 2;">
            <figure style="margin: 0;">
                <div style="width: 100%; height: 120px; background: linear-gradient(135deg, #e74c3c, #c0392b); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-bottom: 10px;">
                    Figure avec légende
                </div>
                <figcaption style="font-style: italic; color: #666; font-size: 0.9em;">
                    Ceci est une légende descriptive sous l'image
                </figcaption>
            </figure>
        </div>
    </div>
    
    <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px; font-size: 0.9em; color: #666;">
        <strong>Simulation d'images :</strong><br>
        • Les "images" ci-dessus sont des divs colorés pour la démo<br>
        • En pratique, ce serait des vraies images avec src="..."<br>
        • L'attribut alt est essentiel pour l'accessibilité
    </div>
</div>`
            },
            
            'lists': {
                titre: 'Listes HTML',
                role: 'Les listes organisent l\'information en items structurés, améliorant la lisibilité.',
                usage: 'Utilisez les listes pour :<br>• Présenter des éléments sans ordre particulier (ul)<br>• Montrer une séquence ou des étapes (ol)<br>• Définir des termes et leurs descriptions (dl)<br>• Créer des menus de navigation<br>• Structurer des données complexes',
                exempleCode: `<!-- Liste non ordonnée -->
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ul>

<!-- Liste ordonnée -->
<ol>
    <li>Préchauffer le four</li>
    <li>Mélanger les ingrédients</li>
    <li>Cuire 30 minutes</li>
</ol>

<!-- Liste de définition -->
<dl>
    <dt>HTML</dt>
    <dd>Langage de balisage pour structurer le web</dd>
    
    <dt>CSS</dt>
    <dd>Langage de style pour présenter le web</dd>
</dl>

<!-- Liste imbriquée -->
<ul>
    <li>Frontend
        <ul>
            <li>HTML</li>
            <li>CSS</li>
        </ul>
    </li>
    <li>Backend
        <ul>
            <li>PHP</li>
            <li>Python</li>
        </ul>
    </li>
</ul>`,
                exempleResultat: `<div style="font-family: sans-serif; padding: 20px; background: white; border-radius: 8px; display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
    <div>
        <h4 style="color: #e74c3c; margin-top: 0;">Liste non ordonnée</h4>
        <ul style="list-style-type: disc; padding-left: 20px;">
            <li style="margin-bottom: 8px;">HTML</li>
            <li style="margin-bottom: 8px;">CSS</li>
            <li style="margin-bottom: 8px;">JavaScript</li>
        </ul>
        
        <h4 style="color: #e74c3c; margin-top: 20px;">Liste ordonnée</h4>
        <ol style="padding-left: 20px;">
            <li style="margin-bottom: 8px;">Préchauffer le four</li>
            <li style="margin-bottom: 8px;">Mélanger les ingrédients</li>
            <li style="margin-bottom: 8px;">Cuire 30 minutes</li>
        </ol>
    </div>
    
    <div>
        <h4 style="color: #e74c3c; margin-top: 0;">Liste de définition</h4>
        <dl>
            <dt style="font-weight: bold; color: #2c3e50; margin-top: 10px;">HTML</dt>
            <dd style="margin-left: 20px; color: #666; margin-bottom: 15px;">Langage de balisage pour structurer le web</dd>
            
            <dt style="font-weight: bold; color: #2c3e50;">CSS</dt>
            <dd style="margin-left: 20px; color: #666; margin-bottom: 15px;">Langage de style pour présenter le web</dd>
        </dl>
        
        <h4 style="color: #e74c3c; margin-top: 20px;">Liste imbriquée</h4>
        <ul style="list-style-type: disc; padding-left: 20px;">
            <li>Frontend
                <ul style="list-style-type: circle; padding-left: 20px;">
                    <li>HTML</li>
                    <li>CSS</li>
                </ul>
            </li>
            <li>Backend
                <ul style="list-style-type: circle; padding-left: 20px;">
                    <li>PHP</li>
                    <li>Python</li>
                </ul>
            </li>
        </ul>
    </div>
</div>`
            },
            
            'tables': {
                titre: 'Tableaux HTML',
                role: 'Les tableaux présentent des données tabulaires de manière structurée et lisible.',
                usage: 'Utilisez les tableaux pour :<br>• Afficher des données comparatives<br>• Présenter des horaires ou calendriers<br>• Créer des grilles de prix<br>• Organiser des données statistiques<br><br>À éviter pour :<br>• La mise en page du site (utiliser CSS Grid/Flex)<br>• La présentation de contenu non-tabulaire',
                exempleCode: `<!-- Tableau simple -->
<table>
    <tr>
        <th>Nom</th>
        <th>Âge</th>
        <th>Ville</th>
    </tr>
    <tr>
        <td>Alice</td>
        <td>25</td>
        <td>Paris</td>
    </tr>
    <tr>
        <td>Bob</td>
        <td>30</td>
        <td>Lyon</td>
    </tr>
</table>

<!-- Tableau avec en-tête, corps et pied -->
<table>
    <thead>
        <tr>
            <th colspan="3">Informations des employés</th>
        </tr>
        <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Département</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>001</td>
            <td>Marie</td>
            <td>Marketing</td>
        </tr>
        <tr>
            <td>002</td>
            <td>Pierre</td>
            <td>Développement</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="3">Total : 2 employés</td>
        </tr>
    </tfoot>
</table>

<!-- Tableau avec fusion de cellules -->
<table>
    <tr>
        <th rowspan="2">Mois</th>
        <th colspan="2">Ventes</th>
    </tr>
    <tr>
        <th>Produit A</th>
        <th>Produit B</th>
    </tr>
    <tr>
        <td>Janvier</td>
        <td>150</td>
        <td>200</td>
    </tr>
</table>`,
                exempleResultat: `<div style="font-family: sans-serif; padding: 20px; background: white; border-radius: 8px; overflow-x: auto;">
    <h4 style="color: #e74c3c; margin-top: 0;">Tableau simple</h4>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
        <thead>
            <tr style="background: #e74c3c; color: white;">
                <th style="padding: 12px; text-align: left; border: 1px solid #c0392b;">Nom</th>
                <th style="padding: 12px; text-align: left; border: 1px solid #c0392b;">Âge</th>
                <th style="padding: 12px; text-align: left; border: 1px solid #c0392b;">Ville</th>
            </tr>
        </thead>
        <tbody>
            <tr style="background: #fff5f5;">
                <td style="padding: 10px; border: 1px solid #ffe0e0;">Alice</td>
                <td style="padding: 10px; border: 1px solid #ffe0e0;">25</td>
                <td style="padding: 10px; border: 1px solid #ffe0e0;">Paris</td>
            </tr>
            <tr style="background: white;">
                <td style="padding: 10px; border: 1px solid #ffe0e0;">Bob</td>
                <td style="padding: 10px; border: 1px solid #ffe0e0;">30</td>
                <td style="padding: 10px; border: 1px solid #ffe0e0;">Lyon</td>
            </tr>
        </tbody>
    </table>
    
    <h4 style="color: #e74c3c;">Tableau avec fusion</h4>
    <table style="width: 100%; border-collapse: collapse;">
        <thead>
            <tr style="background: #2c3e50; color: white;">
                <th style="padding: 12px; border: 1px solid #1a252f;" rowspan="2">Mois</th>
                <th style="padding: 12px; border: 1px solid #1a252f;" colspan="2">Ventes</th>
            </tr>
            <tr style="background: #34495e; color: white;">
                <th style="padding: 12px; border: 1px solid #1a252f;">Produit A</th>
                <th style="padding: 12px; border: 1px solid #1a252f;">Produit B</th>
            </tr>
        </thead>
        <tbody>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px; border: 1px solid #ddd;">Janvier</td>
                <td style="padding: 10px; border: 1px solid #ddd;">150</td>
                <td style="padding: 10px; border: 1px solid #ddd;">200</td>
            </tr>
            <tr style="background: white;">
                <td style="padding: 10px; border: 1px solid #ddd;">Février</td>
                <td style="padding: 10px; border: 1px solid #ddd;">180</td>
                <td style="padding: 10px; border: 1px solid #ddd;">220</td>
            </tr>
        </tbody>
    </table>
</div>`
            },
            
            'forms': {
                titre: 'Formulaires HTML',
                role: 'Les formulaires collectent des données des utilisateurs et les envoient au serveur.',
                usage: 'Utilisez les formulaires pour :<br>• Authentification (login/mot de passe)<br>• Contact (nom, email, message)<br>• Inscriptions (newsletter, compte)<br>• Recherche (champ de recherche)<br>• Commandes (panier, paiement)<br><br>Bonnes pratiques :<br>• Associer chaque champ à un label<br>• Utiliser les types de input appropriés<br>• Valider côté client avec HTML5<br>• Rendre accessible avec ARIA',
                exempleCode: `<!-- Formulaire de contact -->
<form action="/contact" method="POST">
    <fieldset>
        <legend>Informations personnelles</legend>
        
        <div>
            <label for="name">Nom complet :</label>
            <input type="text" id="name" name="name" required 
                   placeholder="Votre nom" minlength="2">
        </div>
        
        <div>
            <label for="email">Email :</label>
            <input type="email" id="email" name="email" required
                   placeholder="exemple@mail.com">
        </div>
        
        <div>
            <label for="phone">Téléphone :</label>
            <input type="tel" id="phone" name="phone"
                   pattern="[0-9]{10}">
        </div>
    </fieldset>
    
    <fieldset>
        <legend>Votre message</legend>
        
        <div>
            <label for="subject">Sujet :</label>
            <select id="subject" name="subject">
                <option value="">Choisir un sujet</option>
                <option value="support">Support technique</option>
                <option value="sales">Service commercial</option>
                <option value="other">Autre</option>
            </select>
        </div>
        
        <div>
            <label for="message">Message :</label>
            <textarea id="message" name="message" rows="5"
                      placeholder="Votre message..."></textarea>
        </div>
        
        <div>
            <label>
                <input type="checkbox" name="newsletter">
                S'abonner à la newsletter
            </label>
        </div>
    </fieldset>
    
    <button type="submit">Envoyer</button>
    <button type="reset">Réinitialiser</button>
</form>`,
                exempleResultat: `<div style="font-family: sans-serif; padding: 20px; background: white; border-radius: 8px;">
    <form style="max-width: 600px; margin: 0 auto;">
        <fieldset style="border: 2px solid #e74c3c; border-radius: 8px; padding: 20px; margin-bottom: 20px; background: #fff5f5;">
            <legend style="color: #e74c3c; font-weight: bold; padding: 0 10px;">Informations personnelles</legend>
            
            <div style="margin-bottom: 15px;">
                <label for="demo-name" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: 500;">Nom complet :</label>
                <input type="text" id="demo-name" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box;"
                       placeholder="Votre nom">
            </div>
            
            <div style="margin-bottom: 15px;">
                <label for="demo-email" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: 500;">Email :</label>
                <input type="email" id="demo-email" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box;"
                       placeholder="exemple@mail.com">
            </div>
            
            <div style="margin-bottom: 15px;">
                <label for="demo-phone" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: 500;">Téléphone :</label>
                <input type="tel" id="demo-phone" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box;"
                       placeholder="01 23 45 67 89">
            </div>
        </fieldset>
        
        <fieldset style="border: 2px solid #3498db; border-radius: 8px; padding: 20px; margin-bottom: 20px; background: #f0f8ff;">
            <legend style="color: #3498db; font-weight: bold; padding: 0 10px;">Votre message</legend>
            
            <div style="margin-bottom: 15px;">
                <label for="demo-subject" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: 500;">Sujet :</label>
                <select id="demo-subject" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box; background: white;">
                    <option value="">Choisir un sujet</option>
                    <option value="support">Support technique</option>
                    <option value="sales">Service commercial</option>
                    <option value="other">Autre</option>
                </select>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label for="demo-message" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: 500;">Message :</label>
                <textarea id="demo-message" rows="4" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box;"
                          placeholder="Votre message..."></textarea>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: flex; align-items: center; gap: 8px; color: #2c3e50;">
                    <input type="checkbox">
                    S'abonner à la newsletter
                </label>
            </div>
        </fieldset>
        
        <div style="display: flex; gap: 15px;">
            <button type="submit" style="padding: 12px 25px; background: #2ecc71; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                Envoyer
            </button>
            <button type="reset" style="padding: 12px 25px; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                Réinitialiser
            </button>
        </div>
    </form>
    
    <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px; font-size: 0.9em; color: #666;">
        <strong>Note :</strong> Ce formulaire est une simulation. Dans un vrai formulaire, les champs auraient des attributs name, required, etc.
    </div>
</div>`
            },
            
            'semantic': {
                titre: 'HTML Sémantique',
                role: 'Le HTML sémantique donne du sens au contenu, améliorant l\'accessibilité, le SEO et la maintenabilité.',
                usage: 'Utilisez les balises sémantiques pour :<br>• Améliorer l\'accessibilité (lecteurs d\'écran)<br>• Optimiser le référencement (SEO)<br>• Faciliter la maintenance du code<br>• Créer une structure claire et logique<br><br>Règles :<br>• Utiliser &lt;main&gt; pour le contenu principal<br>• Une seule balise &lt;main&gt; par page<br>• &lt;article&gt; pour du contenu indépendant<br>• &lt;section&gt; pour regrouper du contenu thématique',
                exempleCode: `<!-- Structure sémantique d'une page -->
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Mon Blog Sémantique</title>
</head>
<body>
    <!-- En-tête de la page -->
    <header>
        <h1>Mon Blog</h1>
        <nav aria-label="Navigation principale">
            <ul>
                <li><a href="/">Accueil</a></li>
                <li><a href="/articles">Articles</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <!-- Contenu principal unique -->
    <main>
        <!-- Article indépendant -->
        <article>
            <header>
                <h2>Introduction au HTML Sémantique</h2>
                <time datetime="2023-10-15">15 octobre 2023</time>
            </header>
            
            <section>
                <h3>Pourquoi utiliser le HTML sémantique ?</h3>
                <p>Le HTML sémantique améliore l'accessibilité...</p>
            </section>
            
            <section>
                <h3>Les balises principales</h3>
                <p>Voici les balises sémantiques les plus importantes...</p>
            </section>
            
            <footer>
                <p>Écrit par : John Doe</p>
                <a href="#comments">Voir les commentaires</a>
            </footer>
        </article>
        
        <!-- Barre latérale -->
        <aside>
            <h3>Articles récents</h3>
            <nav aria-label="Articles récents">
                <ul>
                    <li><a href="/article1">Article 1</a></li>
                    <li><a href="/article2">Article 2</a></li>
                </ul>
            </nav>
        </aside>
    </main>
    
    <!-- Pied de page -->
    <footer>
        <p>&copy; 2023 Mon Blog. Tous droits réservés.</p>
        <nav aria-label="Navigation du pied de page">
            <a href="/mentions">Mentions légales</a>
            <a href="/confidentialite">Confidentialité</a>
        </nav>
    </footer>
</body>
</html>`,
                exempleResultat: `<div style="font-family: sans-serif; padding: 20px; background: white; border-radius: 8px;">
    <div style="border: 3px solid #e74c3c; border-radius: 8px; overflow: hidden;">
        <!-- Header -->
        <div style="background: #e74c3c; color: white; padding: 15px; border-bottom: 2px solid #c0392b;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin: 0;">&lt;header&gt;</h3>
                <small style="opacity: 0.8;">En-tête de la page</small>
            </div>
        </div>
        
        <!-- Main -->
        <div style="padding: 20px; background: #fff5f5;">
            <div style="border: 2px dashed #e74c3c; padding: 15px; margin-bottom: 15px; border-radius: 5px;">
                <div style="color: #e74c3c; font-weight: bold; margin-bottom: 10px;">&lt;main&gt; (contenu principal)</div>
                
                <!-- Article -->
                <div style="border: 2px solid #3498db; padding: 15px; margin-bottom: 15px; border-radius: 5px; background: #f0f8ff;">
                    <div style="color: #3498db; font-weight: bold; margin-bottom: 10px;">&lt;article&gt; (contenu indépendant)</div>
                    <div style="padding-left: 15px;">
                        <div style="margin-bottom: 10px; border-left: 3px solid #2ecc71; padding-left: 10px;">
                            <strong style="color: #2ecc71;">&lt;section&gt;</strong><br>
                            <small style="color: #666;">Regroupement thématique</small>
                        </div>
                        <div style="margin-bottom: 10px; border-left: 3px solid #f39c12; padding-left: 10px;">
                            <strong style="color: #f39c12;">&lt;section&gt;</strong><br>
                            <small style="color: #666;">Autre section</small>
                        </div>
                    </div>
                </div>
                
                <!-- Aside -->
                <div style="border: 2px solid #9b59b6; padding: 15px; border-radius: 5px; background: #f9f0ff;">
                    <div style="color: #9b59b6; font-weight: bold;">&lt;aside&gt; (contenu secondaire)</div>
                    <small style="color: #666;">Barre latérale, informations connexes</small>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #2c3e50; color: white; padding: 15px; border-top: 2px solid #1a252f;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 style="margin: 0; color: #ecf0f1;">&lt;footer&gt;</h4>
                <small style="opacity: 0.8;">Pied de page</small>
            </div>
        </div>
    </div>
    
    <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px; font-size: 0.9em; color: #666;">
        <strong>Légende :</strong><br>
        • Chaque couleur représente une balise sémantique différente<br>
        • La structure montre la hiérarchie naturelle d'une page<br>
        • Les lecteurs d'écran utilisent ces balises pour naviguer
    </div>
</div>`
            },
            
            'multimedia': {
                titre: 'Multimedia HTML5',
                role: 'Les éléments multimédias enrichissent le contenu avec de la vidéo, de l\'audio et des intégrations interactives.',
                usage: 'Utilisez le multimédia pour :<br>• Intégrer des vidéos explicatives<br>• Ajouter des podcasts ou musiques<br>• Créer des présentations interactives<br>• Intégrer des cartes ou contenus externes<br><br>Formats recommandés :<br>• Vidéo : MP4 (H.264), WebM<br>• Audio : MP3, OGG, WAV<br>• Sous-titres : WebVTT',
                exempleCode: `<!-- Vidéo HTML5 -->
<video controls width="600">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    <track src="subtitles-fr.vtt" kind="subtitles" 
           srclang="fr" label="Français">
    Votre navigateur ne supporte pas la vidéo HTML5.
</video>

<!-- Audio HTML5 -->
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    Votre navigateur ne supporte pas l'audio HTML5.
</audio>

<!-- YouTube intégré -->
<iframe width="560" height="315" 
        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
</iframe>

<!-- Figure multimédia -->
<figure>
    <video controls>
        <source src="tutoriel.mp4" type="video/mp4">
    </video>
    <figcaption>
        Tutoriel vidéo sur le HTML - durée : 5 minutes
    </figcaption>
</figure>`,
                exempleResultat: `<div style="font-family: sans-serif; padding: 20px; background: white; border-radius: 8px;">
    <h4 style="color: #e74c3c; margin-top: 0;">Éléments multimédias (simulation)</h4>
    
    <!-- Simulation vidéo -->
    <div style="border: 2px solid #e74c3c; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
        <div style="background: #e74c3c; color: white; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
            <strong>&lt;video&gt; - Simulation</strong>
            <small>Contrôles : lecture, volume, plein écran</small>
        </div>
        <div style="background: #1a1a1a; height: 200px; display: flex; align-items: center; justify-content: center; position: relative;">
            <div style="color: white; font-size: 2em;">▶</div>
            <div style="position: absolute; bottom: 10px; left: 10px; right: 10px; background: rgba(0,0,0,0.7); padding: 5px; border-radius: 3px;">
                <div style="width: 70%; height: 4px; background: #e74c3c; border-radius: 2px;"></div>
            </div>
        </div>
        <div style="padding: 10px; background: #fff5f5; font-size: 0.9em; color: #666;">
            <strong>Simulation d'une vidéo HTML5 :</strong><br>
            • Source : video.mp4 (MP4/H.264)<br>
            • Sous-titres : Français (.vtt)<br>
            • Contrôles natifs du navigateur
        </div>
    </div>
    
    <!-- Simulation audio -->
    <div style="border: 2px solid #3498db; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
        <div style="background: #3498db; color: white; padding: 10px;">
            <strong>&lt;audio&gt; - Simulation</strong>
        </div>
        <div style="padding: 15px; background: #f0f8ff; display: flex; align-items: center; gap: 15px;">
            <div style="width: 40px; height: 40px; background: #3498db; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white;">
                ♫
            </div>
            <div style="flex: 1;">
                <div style="width: 100%; height: 4px; background: #ddd; border-radius: 2px; margin-bottom: 5px;">
                    <div style="width: 30%; height: 100%; background: #3498db; border-radius: 2px;"></div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.8em; color: #666;">
                    <span>0:45</span>
                    <span>2:30</span>
                </div>
            </div>
            <div style="color: #3498db; font-weight: bold;">||</div>
        </div>
    </div>
    
    <!-- Simulation YouTube -->
    <div style="border: 2px solid #ff0000; border-radius: 8px; overflow: hidden;">
        <div style="background: #ff0000; color: white; padding: 10px;">
            <strong>&lt;iframe&gt; - Intégration YouTube</strong>
        </div>
        <div style="background: #282828; height: 150px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; padding: 20px;">
            <div style="font-size: 2em; margin-bottom: 10px;">▶</div>
            <div>YouTube</div>
            <small style="opacity: 0.7; margin-top: 5px;">Vidéo intégrée depuis YouTube</small>
        </div>
        <div style="padding: 10px; background: #fff5f5; font-size: 0.9em; color: #666;">
            <strong>Caractéristiques :</strong><br>
            • Lecture directement dans la page<br>
            • Pas de téléchargement nécessaire<br>
            • Contrôles YouTube complets
        </div>
    </div>
</div>`
            }
        };
    }
    
    setupEventListeners() {
        // Gestion des onglets HTML
        document.querySelectorAll('.css-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.onTabClick(e);
            });
        });
        
        // Navigation entre cours
        document.addEventListener('click', (e) => {
            if (e.target.closest('.html-prev-cours')) {
                this.navigatePrev();
            }
            if (e.target.closest('.html-next-cours')) {
                this.navigateNext();
            }
        });
        
        // Copie de code
        document.addEventListener('click', (e) => {
            const copyBtn = e.target.closest('.html-copy-code-btn');
            if (copyBtn) {
                this.copyCode(copyBtn);
            }
        });
        
        // Recherche (si l'utilisateur cherche dans les cours affichés)
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
    }
    
    onTabClick(e) {
        const coursId = e.currentTarget.dataset.cours;
        
        // Mettre à jour l'onglet actif
        document.querySelectorAll('.css-tab').forEach(t => {
            t.classList.remove('active');
        });
        e.currentTarget.classList.add('active');
        
        // Basculer vers la vue cours
        this.showCoursSection();
        
        // Charger le cours
        this.loadCours(coursId);
    }
    
    showCoursSection() {
        const txtCards = document.getElementById('txt-cards-grid');
        const coursContainer = document.getElementById('cours-container');
        
        if (txtCards) txtCards.style.display = 'none';
        if (coursContainer) {
            coursContainer.style.display = 'block';
            coursContainer.classList.add('html-theme');
        }
    }
    
    loadCours(coursId) {
        this.currentCours = coursId;
        const cours = this.coursData[coursId];
        
        if (!cours) {
            console.error('Cours non trouvé:', coursId);
            return;
        }
        
        // Injecter le cours
        const container = document.getElementById('cours-container');
        if (container) {
            container.innerHTML = this.generateCoursHTML(cours);
            this.highlightCode();
        }
    }
    
    generateCoursHTML(cours) {
        return `
            <article class="html-cours-article">
                <header class="html-cours-header">
                    <h1 class="html-cours-title">${cours.titre}</h1>
                    <div class="html-cours-meta">
                        <span class="html-cours-category">HTML</span>
                        <span class="html-cours-difficulty">Fondamental</span>
                    </div>
                </header>
                
                <section class="html-cours-section">
                    <h2 class="html-section-title">
                        <i class="fas fa-info-circle"></i> Rôle
                    </h2>
                    <div class="html-section-content">
                        ${cours.role.split('<br>').map(item => `<p>${item}</p>`).join('')}
                    </div>
                </section>
                
                <section class="html-cours-section">
                    <h2 class="html-section-title">
                        <i class="fas fa-check-circle"></i> Usage
                    </h2>
                    <div class="html-section-content">
                        ${cours.usage.split('<br>').map(item => `<p>${item}</p>`).join('')}
                    </div>
                </section>
                
                ${cours.exempleCode ? `
                <section class="html-cours-section">
                    <h2 class="html-section-title">
                        <i class="fas fa-code"></i> Exemples
                    </h2>
                    
                    <div class="html-example-container">
                        <div class="html-code-example">
                            <div class="html-code-header">
                                <span>CODE HTML</span>
                                <button class="html-copy-code-btn">
                                    <i class="fas fa-copy"></i> Copier le code
                                </button>
                            </div>
                            <pre class="html-code-block"><code>${this.escapeHTML(cours.exempleCode)}</code></pre>
                        </div>
                        
                        <div class="html-result-example">
                            <div class="html-result-header">
                                <span>RÉSULTAT VISUEL</span>
                            </div>
                            <div class="html-result-preview">
                                ${cours.exempleResultat}
                            </div>
                        </div>
                    </div>
                </section>
                ` : ''}
                
                <footer class="html-cours-footer">
                    <div class="html-cours-navigation">
                        <button class="html-prev-cours">
                            <i class="fas fa-chevron-left"></i> Cours précédent
                        </button>
                        <button class="html-next-cours">
                            Cours suivant <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </footer>
            </article>
        `;
    }
    
    highlightCode() {
        const codeBlocks = document.querySelectorAll('.html-code-block code');
        codeBlocks.forEach(block => {
            let html = block.innerHTML;
            
            // Colorer les balises HTML
            html = html.replace(/&lt;(\/?)([a-zA-Z][a-zA-Z0-9]*)([^&]*)&gt;/g, 
                '&lt;<span class="html-tag">$1$2</span>$3&gt;');
            
            // Colorer les attributs
            html = html.replace(/([a-zA-Z-]+)=/g, 
                '<span class="html-attr">$1</span>=');
            
            // Colorer les valeurs
            html = html.replace(/&quot;([^&]+)&quot;/g, 
                '&quot;<span class="html-value">$1</span>&quot;');
            
            // Colorer les commentaires
            html = html.replace(/&lt;!--([^&]+)--&gt;/g, 
                '&lt;!--<span class="html-comment">$1</span>--&gt;');
            
            block.innerHTML = html;
        });
    }
    
    navigatePrev() {
        const coursIds = Object.keys(this.coursData);
        const index = coursIds.indexOf(this.currentCours);
        
        if (index > 0) {
            const prevCours = coursIds[index - 1];
            this.loadCours(prevCours);
            this.updateActiveTab(prevCours);
        }
    }
    
    navigateNext() {
        const coursIds = Object.keys(this.coursData);
        const index = coursIds.indexOf(this.currentCours);
        
        if (index < coursIds.length - 1) {
            const nextCours = coursIds[index + 1];
            this.loadCours(nextCours);
            this.updateActiveTab(nextCours);
        }
    }
    
    updateActiveTab(coursId) {
        document.querySelectorAll('.css-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.cours === coursId);
        });
    }
    
    copyCode(button) {
        const codeBlock = button.closest('.html-code-example').querySelector('code');
        const text = codeBlock.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Copié !';
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
                button.innerHTML = '<i class="fas fa-copy"></i> Copier le code';
                button.style.background = '';
            }, 2000);
        });
    }
    
    handleSearch(term) {
        if (!term.trim() || !this.currentCours) return;
        
        // Recherche simple dans le cours actuel
        const container = document.getElementById('cours-container');
        if (!container) return;
        
        this.highlightSearch(container, term);
    }
    
    highlightSearch(container, term) {
        // Nettoyer les anciennes surbrillances
        const oldHighlights = container.querySelectorAll('.html-search-match');
        oldHighlights.forEach(h => {
            const parent = h.parentNode;
            parent.replaceChild(document.createTextNode(h.textContent), h);
            parent.normalize();
        });
        
        // Nouvelle recherche
        const walker = document.createTreeWalker(
            container,
            NodeFilter.SHOW_TEXT,
            null
        );
        
        let node;
        const nodes = [];
        
        while (node = walker.nextNode()) {
            if (node.textContent.toLowerCase().includes(term.toLowerCase())) {
                nodes.push(node);
            }
        }
        
        nodes.forEach(node => {
            const span = document.createElement('span');
            const regex = new RegExp(`(${this.escapeRegex(term)})`, 'gi');
            span.innerHTML = node.textContent.replace(regex, 
                '<mark class="html-search-match">$1</mark>');
            
            node.parentNode.replaceChild(span, node);
        });
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

// Initialisation globale
let htmlCoursManager;

document.addEventListener('DOMContentLoaded', () => {
    htmlCoursManager = new HtmlCoursManager();
    console.log('✅ HTML Cours Manager prêt avec 10 cours');
});

// Export pour debug
window.HtmlCoursManager = HtmlCoursManager;
window.htmlCoursManager = htmlCoursManager;