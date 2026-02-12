/* html-cours.js - Cours HTML complets - Style pur (classes) */
class HtmlCoursManager {
    constructor() {
        this.coursData = this.getCoursData();
        this.currentCours = null;
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        console.log('✅ 10 cours HTML chargés - Structure pure');
    }
    
    getCoursData() {
        return {
            'structure': {
                titre: '1. Les balises HTML : les briques du web',
                role: `Le HTML fonctionne avec des BALISES. 
Une balise, c'est comme une brique Lego : chaque forme a une fonction différente.`,
                usage: `📌 <strong>Une balise, ça s'écrit entre chevrons :</strong>
<br><br>
• Balise ouvrante : &lt;p&gt;
• Balise fermante : &lt;/p&gt;  (le / = fermeture)
• Contenu : ce qui est entre les deux
<br><br>
✅ <strong>Presque TOUTES les balises fonctionnent comme ça :</strong>
&lt;balise&gt;contenu&lt;/balise&gt;
<br><br>
❌ <strong>Exceptions (balises orphelines) :</strong>
&lt;br&gt; (saut de ligne), &lt;hr&gt; (ligne), &lt;img&gt; (image)`,
                exempleCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Ma première page</title>
  </head>
  <body>
    <p>Bonjour le monde !</p>
    <p>
      Je suis un paragraphe avec<br>
      un saut de ligne.
    </p>
  </body>
</html>`,
                exempleResultat: `<div class="demo-result">
    <div class="demo-tab">
        <span class="demo-tab-icon">🔴</span>
        <span class="demo-tab-title">Ma première page</span>
    </div>
    <div class="demo-content">
        <p>Bonjour le monde !</p>
        <p>Je suis un paragraphe avec<br>un saut de ligne.</p>
    </div>
</div>`,
                aRetenir: `🎯 <strong>CE QU'IL FAUT RETENIR :</strong>
<br><br>
1️⃣ Une balise = une instruction entre &lt; &gt;
<br>
2️⃣ Presque toujours : ouverture + fermeture
<br>
3️⃣ &lt;body&gt; = tout ce qui s'affiche
<br>
4️⃣ &lt;head&gt; = les réglages (invisible)
<br>
5️⃣ &lt;br&gt; = saut de ligne (orphelin)`
            },
            
            'headings': {
                titre: '2. Structure de base : le squelette de la page',
                role: `Toute page HTML a la même structure de base. 
C'est le squelette universel du web.`,
                usage: `📌 <strong>Les 4 blocs indispensables :</strong>
<br><br>
<strong>&lt;!DOCTYPE html&gt;</strong>
→ Déclare que c'est du HTML5
<br><br>
<strong>&lt;html&gt;</strong>
→ La racine du document
<br><br>
<strong>&lt;head&gt;</strong>
→ Infos pour le navigateur (invisible)
<br><br>
<strong>&lt;body&gt;</strong>
→ Contenu visible par l'utilisateur`,
                exempleCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Mon site</title>
  </head>
  <body>
    <h1>Titre principal</h1>
    <p>Bienvenue sur mon site !</p>
  </body>
</html>`,
                exempleResultat: `<div class="demo-result">
    <div class="demo-tab">
        <span class="demo-tab-icon">🔴</span>
        <span class="demo-tab-title">Mon site</span>
    </div>
    <div class="demo-content">
        <h1 style="margin:0 0 10px 0;">Titre principal</h1>
        <p style="margin:0;">Bienvenue sur mon site !</p>
    </div>
</div>`,
                aRetenir: `🎯 <strong>CE QU'IL FAUT RETENIR :</strong>
<br><br>
1️⃣ &lt;!DOCTYPE html&gt; = HTML5
<br>
2️⃣ &lt;head&gt; = invisible, paramètres
<br>
3️⃣ &lt;body&gt; = visible, contenu
<br>
4️⃣ &lt;title&gt; = texte dans l'onglet
<br>
5️⃣ Cette structure est OBLIGATOIRE sur toutes les pages`
            },
            
            'paragraphs': {
                titre: '3. Les titres : hiérarchiser le contenu',
                role: `Les titres organisent votre texte comme les chapitres d'un livre.
Ils sont essentiels pour la lisibilité et le référencement.`,
                usage: `📌 <strong>6 niveaux de titres :</strong>
<br><br>
&lt;h1&gt;Titre principal&lt;/h1&gt; → UN SEUL par page
<br>
&lt;h2&gt;Sous-titre&lt;/h2&gt; → Plusieurs possibles
<br>
&lt;h3&gt;Section&lt;/h3&gt;
<br>
&lt;h4&gt;Sous-section&lt;/h4&gt;
<br>
&lt;h5&gt;Détail&lt;/h5&gt;
<br>
&lt;h6&gt;Note fine&lt;/h6&gt;
<br><br>
⚠️ <strong>Règle d'or :</strong> Ne sautez PAS de niveaux (h1 → h2 → h3)`,
                exempleCode: `<h1>Mon blog voyage</h1>
<h2>Japon</h2>
<h3>Tokyo</h3>
<h3>Kyoto</h3>
<h2>Italie</h2>
<h3>Rome</h3>
<h3>Venise</h3>`,
                exempleResultat: `<div class="demo-content">
    <h1 style="font-size:2em; margin:0 0 10px 0;">Mon blog voyage</h1>
    <h2 style="font-size:1.5em; margin:15px 0 5px 0;">Japon</h2>
    <h3 style="font-size:1.2em; margin:5px 0 5px 20px;">• Tokyo</h3>
    <h3 style="font-size:1.2em; margin:5px 0 5px 20px;">• Kyoto</h3>
    <h2 style="font-size:1.5em; margin:15px 0 5px 0;">Italie</h2>
    <h3 style="font-size:1.2em; margin:5px 0 5px 20px;">• Rome</h3>
    <h3 style="font-size:1.2em; margin:5px 0 5px 20px;">• Venise</h3>
</div>`,
                aRetenir: `🎯 <strong>CE QU'IL FAUT RETENIR :</strong>
<br><br>
1️⃣ Un seul &lt;h1&gt; par page
<br>
2️⃣ h1 > h2 > h3 > h4 > h5 > h6
<br>
3️⃣ Ne sautez jamais de niveau
<br>
4️⃣ Google utilise les titres pour comprendre votre page`
            },
            
            'links': {
                titre: '4. Les paragraphes et le texte',
                role: `Les paragraphes structurent le texte en blocs lisibles.
Sans eux, tout s'affiche à la suite.`,
                usage: `📌 <strong>Balises de texte essentielles :</strong>
<br><br>
<strong>&lt;p&gt;</strong> = paragraphe (bloc)
<br>
<strong>&lt;strong&gt;</strong> = <strong>texte important</strong> (gras)
<br>
<strong>&lt;em&gt;</strong> = <em>texte accentué</em> (italique)
<br>
<strong>&lt;br&gt;</strong> = saut de ligne (orphelin)
<br>
<strong>&lt;hr&gt;</strong> = ligne de séparation
<br><br>
✅ <strong>Un paragraphe = une idée</strong>`,
                exempleCode: `<p>
  <strong>Attention :</strong> offre 
  <em>limitée</em> dans le temps.
</p>
<hr>
<p>
  Marie Dupont<br>
  15 rue des Lilas<br>
  75000 Paris
</p>`,
                exempleResultat: `<div class="demo-content">
    <p><strong style="color:#e74c3c;">Attention :</strong> offre <em>limitée</em> dans le temps.</p>
    <hr style="border:1px solid #ddd; margin:15px 0;">
    <p>Marie Dupont<br>15 rue des Lilas<br>75000 Paris</p>
</div>`,
                aRetenir: `🎯 <strong>CE QU'IL FAUT RETENIR :</strong>
<br><br>
1️⃣ &lt;p&gt; = bloc de texte
<br>
2️⃣ &lt;strong&gt; = important (gras)
<br>
3️⃣ &lt;em&gt; = insistance (italique)
<br>
4️⃣ &lt;br&gt; = retour à la ligne
<br>
5️⃣ &lt;hr&gt; = séparation thématique`
            },
            
            'images': {
                titre: '5. Les liens : connecter le web',
                role: `Sans liens, le web n'est pas un web.
Les liens relient les pages entre elles.`,
                usage: `📌 <strong>La balise &lt;a&gt; (ancre) :</strong>
<br><br>
&lt;a href="https://google.com"&gt;Google&lt;/a&gt;
<br><br>
• <strong>href</strong> = destination (URL)
• <strong>target="_blank"</strong> = nouvel onglet
<br><br>
📌 <strong>4 types de liens :</strong>
<br>
1️⃣ Site externe : https://...
<br>
2️⃣ Page interne : contact.html
<br>
3️⃣ Ancre : #section (même page)
<br>
4️⃣ Email : mailto:contact@site.com`,
                exempleCode: `<a href="https://google.com" target="_blank">
  Google (nouvel onglet)
</a>
<br>
<a href="contact.html">Page contact</a>
<br>
<a href="#footer">Aller en bas</a>

<footer id="footer">
  <p>© 2024 - Pied de page</p>
</footer>`,
                exempleResultat: `<div class="demo-content">
    <a href="#" style="color:#3498db; text-decoration:none; display:inline-block; margin-bottom:10px;">🔗 Google (nouvel onglet)</a>
    <br>
    <a href="#" style="color:#2ecc71; text-decoration:none; display:inline-block; margin-bottom:10px;">📄 Page contact</a>
    <br>
    <a href="#" style="color:#e74c3c; text-decoration:none; display:inline-block; margin-bottom:15px;">⬇️ Aller en bas</a>
    <div style="background:#f5f5f5; padding:10px; margin-top:10px;">
        <p style="margin:0;">© 2024 - Pied de page</p>
    </div>
</div>`,
                aRetenir: `🎯 <strong>CE QU'IL FAUT RETENIR :</strong>
<br><br>
1️⃣ &lt;a href="URL"&gt;texte&lt;/a&gt;
<br>
2️⃣ target="_blank" = nouvel onglet
<br>
3️⃣ # = ancre dans la même page
<br>
4️⃣ mailto: = lien email
<br>
5️⃣ Toujours https:// devant les liens externes`
            },
            
            'lists': {
                titre: '6. Les images : afficher des visuels',
                role: `Les images illustrent le contenu.
C'est une balise ORPHELINE (pas de fermeture).`,
                usage: `📌 <strong>&lt;img&gt; = image</strong>
<br><br>
&lt;img src="chat.jpg" alt="Un chat roux"&gt;
<br><br>
<strong>2 attributs OBLIGATOIRES :</strong>
<br>
• <strong>src</strong> = chemin du fichier
• <strong>alt</strong> = description (accessibilité)
<br><br>
✅ <strong>Pourquoi alt est vital ?</strong>
<br>
• Aveugles : entendent cette description
• Google : comprend l'image
• Image cassée : texte visible`,
                exempleCode: `<img src="https://via.placeholder.com/300x200/3498db/ffffff?text=Image+demo" 
     alt="Exemple d'image">

<figure>
  <img src="https://via.placeholder.com/100x100/e74c3c/ffffff?text=Logo" 
       alt="Logo" width="100" height="100">
  <figcaption>Logo du site</figcaption>
</figure>`,
                exempleResultat: `<div class="demo-content">
    <img src="https://via.placeholder.com/300x200/3498db/ffffff?text=Image+demo" alt="Exemple d'image" style="max-width:100%; border-radius:8px; margin-bottom:15px;">
    <figure style="margin:0;">
        <img src="https://via.placeholder.com/100x100/e74c3c/ffffff?text=Logo" alt="Logo" width="100" height="100" style="border-radius:8px;">
        <figcaption style="margin-top:5px; font-style:italic; color:#666;">Logo du site</figcaption>
    </figure>
</div>`,
                aRetenir: `🎯 <strong>CE QU'IL FAUT RETENIR :</strong>
<br><br>
1️⃣ &lt;img src="..." alt="..."&gt; → pas de fermeture
<br>
2️⃣ src = OÙ est l'image
<br>
3️⃣ alt = QUOI (obligatoire)
<br>
4️⃣ width/height = dimensions (pixels)
<br>
5️⃣ &lt;figcaption&gt; = légende sous l'image`
            },
            
            'tables': {
                titre: '7. Les listes : organiser les informations',
                role: `Les listes présentent des éléments de façon structurée.
Deux types : ordonnées et non ordonnées.`,
                usage: `📌 <strong>Liste non ordonnée &lt;ul&gt; (points)</strong>
<br>
&lt;ul&gt;
<br>&nbsp;&nbsp;&lt;li&gt;HTML&lt;/li&gt;
<br>&nbsp;&nbsp;&lt;li&gt;CSS&lt;/li&gt;
<br>&lt;/ul&gt;
<br><br>
📌 <strong>Liste ordonnée &lt;ol&gt; (chiffres)</strong>
<br>
&lt;ol&gt;
<br>&nbsp;&nbsp;&lt;li&gt;Préchauffer&lt;/li&gt;
<br>&nbsp;&nbsp;&lt;li&gt;Mélanger&lt;/li&gt;
<br>&lt;/ol&gt;
<br><br>
✅ <strong>&lt;li&gt;</strong> = item de liste (toujours dedans)`,
                exempleCode: `<h3>Courses :</h3>
<ul>
  <li>Pain</li>
  <li>Lait</li>
  <li>Œufs</li>
</ul>

<h3>Recette :</h3>
<ol>
  <li>Préchauffer le four</li>
  <li>Mélanger</li>
  <li>Cuire 30 min</li>
</ol>`,
                exempleResultat: `<div class="demo-content">
    <h3 style="margin:0 0 10px 0;">Courses :</h3>
    <ul style="margin-bottom:25px;">
        <li>Pain</li>
        <li>Lait</li>
        <li>Œufs</li>
    </ul>
    <h3 style="margin:0 0 10px 0;">Recette :</h3>
    <ol>
        <li>Préchauffer le four</li>
        <li>Mélanger</li>
        <li>Cuire 30 min</li>
    </ol>
</div>`,
                aRetenir: `🎯 <strong>CE QU'IL FAUT RETENIR :</strong>
<br><br>
1️⃣ &lt;ul&gt; = liste à puces (sans ordre)
<br>
2️⃣ &lt;ol&gt; = liste numérotée (ordre)
<br>
3️⃣ &lt;li&gt; = élément de liste
<br>
4️⃣ On peut imbriquer les listes
<br>
5️⃣ Utilisez &lt;ol&gt; pour les étapes, &lt;ul&gt; pour les options`
            },
            
            'forms': {
                titre: '8. Les tableaux : pour les données',
                role: `Les tableaux affichent des données structurées.
Ils ne servent PAS à la mise en page.`,
                usage: `📌 <strong>Structure d'un tableau :</strong>
<br><br>
&lt;table&gt;
<br>&nbsp;&nbsp;&lt;tr&gt; ← ligne
<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;th&gt;En-tête&lt;/th&gt;
<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;td&gt;Cellule&lt;/td&gt;
<br>&nbsp;&nbsp;&lt;/tr&gt;
<br>&lt;/table&gt;
<br><br>
• <strong>&lt;tr&gt;</strong> = ligne
• <strong>&lt;th&gt;</strong> = en-tête (gras)
• <strong>&lt;td&gt;</strong> = cellule normale`,
                exempleCode: `<table border="1" cellpadding="8">
  <tr>
    <th>Jour</th>
    <th>Matin</th>
    <th>Après-midi</th>
  </tr>
  <tr>
    <td>Lundi</td>
    <td>9h-12h</td>
    <td>14h-18h</td>
  </tr>
  <tr>
    <td>Mardi</td>
    <td>9h-12h</td>
    <td>Fermé</td>
  </tr>
</table>`,
                exempleResultat: `<div class="demo-content">
    <table style="border-collapse:collapse; width:100%;">
        <tr style="background:#e74c3c; color:white;">
            <th style="padding:8px; border:1px solid #c0392b;">Jour</th>
            <th style="padding:8px; border:1px solid #c0392b;">Matin</th>
            <th style="padding:8px; border:1px solid #c0392b;">Après-midi</th>
        </tr>
        <tr style="background:#fff5f5;">
            <td style="padding:8px; border:1px solid #ffe0e0;">Lundi</td>
            <td style="padding:8px; border:1px solid #ffe0e0;">9h-12h</td>
            <td style="padding:8px; border:1px solid #ffe0e0;">14h-18h</td>
        </tr>
        <tr>
            <td style="padding:8px; border:1px solid #ffe0e0;">Mardi</td>
            <td style="padding:8px; border:1px solid #ffe0e0;">9h-12h</td>
            <td style="padding:8px; border:1px solid #ffe0e0;"><span style="color:#e74c3c;">Fermé</span></td>
        </tr>
    </table>
</div>`,
                aRetenir: `🎯 <strong>CE QU'IL FAUT RETENIR :</strong>
<br><br>
1️⃣ &lt;table&gt; = conteneur
<br>
2️⃣ &lt;tr&gt; = ligne
<br>
3️⃣ &lt;th&gt; = cellule en-tête (gras)
<br>
4️⃣ &lt;td&gt; = cellule normale
<br>
5️⃣ Jamais de tableaux pour la mise en page !`
            },
            
            'semantic': {
                titre: '9. Les formulaires : dialoguer avec l\'utilisateur',
                role: `Les formulaires reçoivent des données de l'utilisateur.
Inscription, contact, recherche...`,
                usage: `📌 <strong>Structure de base :</strong>
<br><br>
&lt;form&gt;
<br>&nbsp;&nbsp;&lt;label&gt;Nom :&lt;/label&gt;
<br>&nbsp;&nbsp;&lt;input type="text" name="nom"&gt;
<br>&nbsp;&nbsp;&lt;button type="submit"&gt;Envoyer&lt;/button&gt;
<br>&lt;/form&gt;
<br><br>
📌 <strong>Types d'input courants :</strong>
<br>
• text = texte court
• email = adresse mail
• password = mot de passe (masqué)
• checkbox = case à cocher
• radio = choix unique`,
                exempleCode: `<form>
  <label>Nom :</label>
  <input type="text" placeholder="Votre nom">
  <br><br>
  <label>Email :</label>
  <input type="email" placeholder="exemple@mail.com">
  <br><br>
  <label>
    <input type="checkbox"> 
    Newsletter
  </label>
  <br><br>
  <button type="submit">S'inscrire</button>
</form>`,
                exempleResultat: `<div class="demo-content">
    <form style="max-width:400px;">
        <label style="display:block; margin-bottom:5px; font-weight:500;">Nom :</label>
        <input type="text" placeholder="Votre nom" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:5px; margin-bottom:15px;">
        
        <label style="display:block; margin-bottom:5px; font-weight:500;">Email :</label>
        <input type="email" placeholder="exemple@mail.com" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:5px; margin-bottom:15px;">
        
        <label style="display:flex; align-items:center; gap:8px; margin-bottom:15px;">
            <input type="checkbox"> Newsletter
        </label>
        
        <button style="background:#2ecc71; color:white; border:none; padding:10px 20px; border-radius:5px; cursor:pointer;">
            S'inscrire
        </button>
    </form>
</div>`,
                aRetenir: `🎯 <strong>CE QU'IL FAUT RETENIR :</strong>
<br><br>
1️⃣ &lt;form&gt; = conteneur du formulaire
<br>
2️⃣ &lt;input&gt; = champ (type différent selon donnée)
<br>
3️⃣ &lt;label&gt; = texte associé au champ
<br>
4️⃣ &lt;button type="submit"&gt; = envoi
<br>
5️⃣ placeholder = texte grisé dans le champ`
            },
            
            'multimedia': {
                titre: '10. Les balises sémantiques : du HTML qui a du sens',
                role: `Les balises sémantiques donnent du sens au contenu.
Plus clair pour vous, Google et les aveugles.`,
                usage: `📌 <strong>Les 7 balises à connaître :</strong>
<br><br>
<strong>&lt;header&gt;</strong> = en-tête (haut de page)
<br>
<strong>&lt;nav&gt;</strong> = menu de navigation
<br>
<strong>&lt;main&gt;</strong> = contenu principal (1 seul)
<br>
<strong>&lt;article&gt;</strong> = contenu indépendant
<br>
<strong>&lt;section&gt;</strong> = groupe thématique
<br>
<strong>&lt;aside&gt;</strong> = contenu secondaire (sidebar)
<br>
<strong>&lt;footer&gt;</strong> = pied de page
<br><br>
✅ <strong>Règle :</strong> Si vous écrivez &lt;div class="header"&gt;, utilisez &lt;header&gt;`,
                exempleCode: `<body>
  <header>
    <h1>Mon blog</h1>
    <nav>
      <a href="/">Accueil</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>
  
  <main>
    <article>
      <h2>Article du jour</h2>
      <p>Contenu de l'article...</p>
    </article>
    
    <aside>
      <h3>Articles récents</h3>
      <ul>
        <li><a href="#">Article 1</a></li>
        <li><a href="#">Article 2</a></li>
      </ul>
    </aside>
  </main>
  
  <footer>
    <p>© 2024 Mon blog</p>
  </footer>
</body>`,
                exempleResultat: `<div style="font-family:sans-serif; border:1px solid #ddd; border-radius:8px; overflow:hidden;">
    <div style="background:#e74c3c; color:white; padding:15px;">
        <div style="display:flex; justify-content:space-between;">
            <h3 style="margin:0;">Mon blog</h3>
            <div><a href="#" style="color:white; margin-left:15px;">Accueil</a><a href="#" style="color:white; margin-left:15px;">Contact</a></div>
        </div>
    </div>
    <div style="display:flex; padding:20px;">
        <div style="flex:2; background:#f9f9f9; padding:15px; border-radius:5px; margin-right:15px;">
            <h4 style="margin-top:0;">Article du jour</h4>
            <p style="margin:0;">Contenu de l'article...</p>
        </div>
        <div style="flex:1; background:#f0f0f0; padding:15px; border-radius:5px;">
            <h4 style="margin-top:0;">Articles récents</h4>
            <ul style="margin:0;">
                <li><a href="#">Article 1</a></li>
                <li><a href="#">Article 2</a></li>
            </ul>
        </div>
    </div>
    <div style="background:#2c3e50; color:white; padding:15px;">
        <p style="margin:0;">© 2024 Mon blog</p>
    </div>
</div>`,
                aRetenir: `🎯 <strong>CE QU'IL FAUT RETENIR :</strong>
<br><br>
1️⃣ &lt;header&gt; = en-tête
<br>
2️⃣ &lt;nav&gt; = menu
<br>
3️⃣ &lt;main&gt; = contenu principal (1 seul)
<br>
4️⃣ &lt;article&gt; = contenu indépendant
<br>
5️⃣ &lt;footer&gt; = pied de page
<br><br>
✅ <strong>BONUS :</strong> Google et les lecteurs d'écran adorent !`
            }
        };
    }
    
    setupEventListeners() {
        document.querySelectorAll('.css-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.onTabClick(e);
            });
        });
        
        document.addEventListener('click', (e) => {
            if (e.target.closest('.html-prev-cours')) {
                this.navigatePrev();
            }
            if (e.target.closest('.html-next-cours')) {
                this.navigateNext();
            }
        });
        
        document.addEventListener('click', (e) => {
            const copyBtn = e.target.closest('.html-copy-code-btn');
            if (copyBtn) {
                this.copyCode(copyBtn);
            }
        });
    }
    
    onTabClick(e) {
        const coursId = e.currentTarget.dataset.cours;
        
        document.querySelectorAll('.css-tab').forEach(t => {
            t.classList.remove('active');
        });
        e.currentTarget.classList.add('active');
        
        this.showCoursSection();
        this.loadCours(coursId);
    }
    
    showCoursSection() {
        const txtCards = document.getElementById('txt-cards-grid');
        const coursContainer = document.getElementById('cours-container');
        
        if (txtCards) txtCards.style.display = 'none';
        if (coursContainer) {
            coursContainer.style.display = 'block';
        }
    }
    
    loadCours(coursId) {
        this.currentCours = coursId;
        const cours = this.coursData[coursId];
        if (!cours) return;
        
        const container = document.getElementById('cours-container');
        if (container) {
            container.innerHTML = this.generateCoursHTML(cours);
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    generateCoursHTML(cours) {
        return `
            <article class="html-cours-article">
                
                <h1 class="html-cours-title">
                    ${cours.titre}
                </h1>
                
                <div class="html-cours-meta">
                    <span class="html-cours-category">HTML</span>
                    <span class="html-cours-difficulty">Débutant</span>
                </div>
                
                <section class="html-cours-section">
                    <h2 class="html-section-title">
                        <i class="fas fa-info-circle"></i>
                        À quoi ça sert ?
                    </h2>
                    <div class="html-section-content">
                        <p>${cours.role}</p>
                    </div>
                </section>
                
                <section class="html-cours-section">
                    <h2 class="html-section-title">
                        <i class="fas fa-check-circle"></i>
                        Comment l'utiliser ?
                    </h2>
                    <div class="html-section-content">
                        ${cours.usage}
                    </div>
                </section>
                
                <section class="html-cours-section">
                    <h2 class="html-section-title">
                        <i class="fas fa-code"></i>
                        Exemple concret
                    </h2>
                    
                    <div class="html-code-example">
                        <div class="html-code-header">
                            <span>exemple.html</span>
                            <button class="html-copy-code-btn">
                                <i class="fas fa-copy"></i> Copier
                            </button>
                        </div>
                        <pre class="html-code-block"><code>${this.escapeHTML(cours.exempleCode)}</code></pre>
                    </div>
                </section>
                
                <section class="html-cours-section">
                    <h2 class="html-section-title">
                        <i class="fas fa-eye"></i>
                        Ce que ça donne
                    </h2>
                    
                    <div class="html-result-example">
                        <div class="html-result-header">
                            <span>Aperçu</span>
                        </div>
                        <div class="html-result-preview">
                            ${cours.exempleResultat}
                        </div>
                    </div>
                </section>
                
                <section class="html-cours-section">
                    <h2 class="html-section-title">
                        <i class="fas fa-check-circle"></i>
                        À retenir
                    </h2>
                    <div class="html-retention-block">
                        <div class="html-retention-content">
                            ${cours.aRetenir}
                        </div>
                    </div>
                </section>
                
                <footer class="html-cours-footer">
                    <div class="html-cours-navigation">
                        <button class="html-prev-cours">
                            <i class="fas fa-chevron-left"></i>
                            Précédent
                        </button>
                        <button class="html-next-cours">
                            Suivant
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </footer>
                
            </article>
        `;
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
                button.innerHTML = '<i class="fas fa-copy"></i> Copier';
                button.style.background = '';
            }, 2000);
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
    
    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialisation
let htmlCoursManager;
document.addEventListener('DOMContentLoaded', () => {
    htmlCoursManager = new HtmlCoursManager();
    
    setTimeout(() => {
        const firstTab = document.querySelector('.css-tab[data-cours="structure"]');
        if (firstTab) {
            firstTab.click();
        }
    }, 100);
});

window.HtmlCoursManager = HtmlCoursManager;
window.htmlCoursManager = htmlCoursManager;