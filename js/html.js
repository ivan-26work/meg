/* html.js - Histoire et évolution du HTML pour MG_ultra */

// Données historiques narratives - ESSENTIEL
const HTML_HISTORY = {
    introduction: {
        title: "HTML : Les Fondations du Web",
        subtitle: "De simple balise à langage universel",
        content: `
            <div class="history-narrative">
                <h3>La Naissance du Web (1989-1991)</h3>
                <p>Tout commence au <strong>CERN</strong> (Organisation européenne pour la recherche nucléaire) à Genève.</p>
                
                <div class="historical-fact">
                    <strong>Tim Berners-Lee</strong>, physicien britannique, invente trois technologies en 1989 :
                </div>
                
                <div class="invention-grid">
                    <div class="invention">
                        <div class="invention-icon">🌐</div>
                        <h4>HTML</h4>
                        <p>HyperText Markup Language</p>
                        <small>Structure des pages</small>
                    </div>
                    
                    <div class="invention">
                        <div class="invention-icon">🔗</div>
                        <h4>HTTP</h4>
                        <p>HyperText Transfer Protocol</p>
                        <small>Communication client-serveur</small>
                    </div>
                    
                    <div class="invention">
                        <div class="invention-icon">📍</div>
                        <h4>URL</h4>
                        <p>Uniform Resource Locator</p>
                        <small>Adressage des ressources</small>
                    </div>
                </div>
                
                <blockquote class="historical-quote">
                    "Je voulais créer un système où tout pourrait être lié à tout."
                    <cite>- Tim Berners-Lee, 1989</cite>
                </blockquote>
                
                <div class="first-html">
                    <h4>Le premier site web (1991)</h4>
                    <div class="first-html-code">
                        <pre>&lt;HTML&gt;
&lt;HEAD&gt;
&lt;TITLE&gt;The World Wide Web project&lt;/TITLE&gt;
&lt;/HEAD&gt;
&lt;BODY&gt;
&lt;H1&gt;World Wide Web&lt;/H1&gt;
&lt;P&gt;The WorldWideWeb (W3) is a wide-area 
&lt;A href="WhatIs.html"&gt;hypermedia&lt;/A&gt; 
information retrieval initiative...&lt;/P&gt;
&lt;/BODY&gt;
&lt;/HTML&gt;</pre>
                    </div>
                    <p class="note">Note : Les balises étaient en majuscules, il n'y avait que 18 éléments HTML !</p>
                </div>
            </div>
        `
    },
    
    evolution: {
        title: "L'Évolution des Standards",
        subtitle: "Du HTML 1.0 au HTML5",
        content: `
            <div class="evolution-timeline">
                <div class="timeline-item">
                    <div class="timeline-year">1993</div>
                    <div class="timeline-content">
                        <h4>HTML 1.0</h4>
                        <p>Première spécification officielle. 18 éléments seulement.</p>
                        <code class="code-example">&lt;p&gt;, &lt;h1&gt;-&lt;h6&gt;, &lt;a&gt;, &lt;ul&gt;, &lt;li&gt;</code>
                    </div>
                </div>
                
                <div class="timeline-item">
                    <div class="timeline-year">1995</div>
                    <div class="timeline-content">
                        <h4>HTML 2.0</h4>
                        <p>Standardisation par l'IETF. Premiers formulaires.</p>
                        <code class="code-example">&lt;form&gt;, &lt;input&gt;, &lt;textarea&gt;, &lt;select&gt;</code>
                    </div>
                </div>
                
                <div class="timeline-item">
                    <div class="timeline-year">1997</div>
                    <div class="timeline-content">
                        <h4>HTML 3.2</h4>
                        <p>Premier standard W3C. Tables et applets.</p>
                        <code class="code-example">&lt;table&gt;, &lt;tr&gt;, &lt;td&gt;, &lt;applet&gt;</code>
                    </div>
                </div>
                
                <div class="timeline-item">
                    <div class="timeline-year">1999</div>
                    <div class="timeline-content">
                        <h4>HTML 4.01</h4>
                        <p>Séparation structure/présentation. CSS devient essentiel.</p>
                        <code class="code-example">&lt;div&gt;, &lt;span&gt;, class, id</code>
                    </div>
                </div>
                
                <div class="timeline-item">
                    <div class="timeline-year">2014</div>
                    <div class="timeline-content">
                        <h4>HTML5</h4>
                        <p>Révolution sémantique. Support natif multimédia.</p>
                        <code class="code-example">&lt;header&gt;, &lt;article&gt;, &lt;video&gt;, &lt;canvas&gt;</code>
                    </div>
                </div>
            </div>
            
            <div class="html-comparison">
                <h3>Avant/Après HTML5</h3>
                
                <div class="comparison-grid">
                    <div class="comparison-before">
                        <h4>HTML4 (Structure floue)</h4>
                        <pre>&lt;div id="header"&gt;
  &lt;div class="title"&gt;Mon Site&lt;/div&gt;
&lt;/div&gt;

&lt;div class="content"&gt;
  &lt;div class="post"&gt;
    &lt;div class="post-title"&gt;Article&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;div id="footer"&gt;
  &lt;div class="copyright"&gt;© 2023&lt;/div&gt;
&lt;/div&gt;</pre>
                    </div>
                    
                    <div class="comparison-after">
                        <h4>HTML5 (Structure sémantique)</h4>
                        <pre>&lt;header&gt;
  &lt;h1&gt;Mon Site&lt;/h1&gt;
&lt;/header&gt;

&lt;main&gt;
  &lt;article&gt;
    &lt;h2&gt;Article&lt;/h2&gt;
  &lt;/article&gt;
&lt;/main&gt;

&lt;footer&gt;
  &lt;p&gt;© 2023&lt;/p&gt;
&lt;/footer&gt;</pre>
                    </div>
                </div>
                
                <div class="comparison-benefits">
                    <p><strong>Avantages HTML5 :</strong></p>
                    <ul>
                        <li>✅ Meilleure accessibilité (lecteurs d'écran)</li>
                        <li>✅ SEO amélioré (moteurs de recherche)</li>
                        <li>✅ Code plus lisible et maintenable</li>
                        <li>✅ Support natif audio/video</li>
                    </ul>
                </div>
            </div>
        `
    },
    
    semantic: {
        title: "La Révolution Sémantique",
        subtitle: "HTML5 et les balises significatives",
        content: `
            <div class="semantic-showcase">
                <h3>Pourquoi la sémantique ?</h3>
                <p>Avant HTML5, tout était des <code>&lt;div&gt;</code> et <code>&lt;span&gt;</code>. Maintenant, chaque balise a un sens.</p>
                
                <div class="semantic-structure">
                    <h4>Structure sémantique d'une page moderne</h4>
                    <div class="structure-diagram">
                        <div class="semantic-element header">
                            <code>&lt;header&gt;</code>
                            <span>En-tête de page/section</span>
                        </div>
                        
                        <div class="semantic-element nav">
                            <code>&lt;nav&gt;</code>
                            <span>Navigation principale</span>
                        </div>
                        
                        <div class="semantic-element main">
                            <code>&lt;main&gt;</code>
                            <span>Contenu principal unique</span>
                            
                            <div class="nested">
                                <div class="semantic-element article">
                                    <code>&lt;article&gt;</code>
                                    <span>Contenu indépendant (blog, news)</span>
                                </div>
                                
                                <div class="semantic-element section">
                                    <code>&lt;section&gt;</code>
                                    <span>Section thématique</span>
                                </div>
                                
                                <div class="semantic-element aside">
                                    <code>&lt;aside&gt;</code>
                                    <span>Contenu complémentaire</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="semantic-element footer">
                            <code>&lt;footer&gt;</code>
                            <span>Pied de page/section</span>
                        </div>
                    </div>
                </div>
                
                <div class="semantic-benefits">
                    <h4>Impact sur l'écosystème web</h4>
                    
                    <div class="benefits-grid">
                        <div class="benefit">
                            <div class="benefit-icon">👁️</div>
                            <h5>Accessibilité</h5>
                            <p>Les lecteurs d'écran comprennent la structure.</p>
                        </div>
                        
                        <div class="benefit">
                            <div class="benefit-icon">🔍</div>
                            <h5>SEO</h5>
                            <p>Google comprend mieux le contenu.</p>
                        </div>
                        
                        <div class="benefit">
                            <div class="benefit-icon">💻</div>
                            <h5>Développement</h5>
                            <p>Code plus clair et maintenable.</p>
                        </div>
                        
                        <div class="benefit">
                            <div class="benefit-icon">📱</div>
                            <h5>Responsive</h5>
                            <p>Structure adaptative naturelle.</p>
                        </div>
                    </div>
                </div>
                
                <div class="semantic-examples">
                    <h4>Exemples concrets</h4>
                    
                    <div class="example">
                        <h5>Article de blog</h5>
                        <pre>&lt;article&gt;
  &lt;header&gt;
    &lt;h1&gt;Titre de l'article&lt;/h1&gt;
    &lt;time datetime="2024-01-15"&gt;15 janvier 2024&lt;/time&gt;
  &lt;/header&gt;
  
  &lt;section&gt;
    &lt;h2&gt;Introduction&lt;/h2&gt;
    &lt;p&gt;Contenu...&lt;/p&gt;
  &lt;/section&gt;
  
  &lt;footer&gt;
    &lt;p&gt;Auteur : Jean Dupont&lt;/p&gt;
  &lt;/footer&gt;
&lt;/article&gt;</pre>
                    </div>
                </div>
            </div>
        `
    },
    
    future: {
        title: "HTML : Présent et Futur",
        subtitle: "Au-delà des balises",
        content: `
            <div class="html-future">
                <h3>HTML Moderne : Plus qu'un langage de balisage</h3>
                
                <div class="modern-features">
                    <div class="feature">
                        <h4>📱 API HTML5 Intégrées</h4>
                        <p>HTML5 n'est pas juste des balises, c'est un écosystème d'APIs :</p>
                        
                        <div class="api-grid">
                            <div class="api">
                                <code>localStorage</code>
                                <span>Stockage local navigateur</span>
                            </div>
                            
                            <div class="api">
                                <code>geolocation</code>
                                <span>Géolocalisation</span>
                            </div>
                            
                            <div class="api">
                                <code>canvas</code>
                                <span>Dessin et animations</span>
                            </div>
                            
                            <div class="api">
                                <code>web workers</code>
                                <span>Multithreading JavaScript</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="feature">
                        <h4>🌐 Web Components</h4>
                        <p>Création de composants réutilisables natifs :</p>
                        
                        <div class="web-components-example">
                            <pre>&lt;!-- Déclaration --&gt;
&lt;template id="user-card"&gt;
  &lt;style&gt;
    .user-card { /* styles */ }
  &lt;/style&gt;
  &lt;div class="user-card"&gt;
    &lt;slot name="name"&gt;&lt;/slot&gt;
    &lt;slot name="email"&gt;&lt;/slot&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;!-- Utilisation --&gt;
&lt;user-card&gt;
  &lt;span slot="name"&gt;Jean Dupont&lt;/span&gt;
  &lt;span slot="email"&gt;jean@exemple.com&lt;/span&gt;
&lt;/user-card&gt;</pre>
                        </div>
                    </div>
                    
                    <div class="feature">
                        <h4>🚀 HTML Living Standard</h4>
                        <p>HTML n'est plus versionné. C'est un standard vivant :</p>
                        <ul>
                            <li>Nouvelles fonctionnalités ajoutées régulièrement</li>
                            <li>Rétrocompatibilité préservée</li>
                            <li>Évolution basée sur les besoins réels</li>
                        </ul>
                    </div>
                </div>
                
                <div class="future-predictions">
                    <h3>Où va HTML ?</h3>
                    
                    <div class="predictions-grid">
                        <div class="prediction">
                            <h5>🎯 Encore plus sémantique</h5>
                            <p>Nouvelles balises pour des cas d'usage spécifiques.</p>
                        </div>
                        
                        <div class="prediction">
                            <h5>🤖 Intégration IA/ML</h5>
                            <p>Balises pour le machine learning côté client.</p>
                        </div>
                        
                        <div class="prediction">
                            <h5>🎮 Web Gaming</h5>
                            <p>Support amélioré pour les jeux 3D/VR.</p>
                        </div>
                        
                        <div class="prediction">
                            <h5>🔗 Web of Things</h5>
                            <p>HTML pour l'Internet des Objets.</p>
                        </div>
                    </div>
                </div>
                
                <div class="html-conclusion">
                    <h3>Conclusion : L'Héritage de Tim Berners-Lee</h3>
                    <p>En 35 ans, HTML est passé de :</p>
                    
                    <div class="legacy-timeline">
                        <div class="legacy-item">
                            <span class="year">1989</span>
                            <span class="description">18 balises pour documenter la physique</span>
                        </div>
                        
                        <div class="legacy-item">
                            <span class="year">2024</span>
                            <span class="description">Langage universel de 1.9 milliards de sites</span>
                        </div>
                    </div>
                    
                    <blockquote class="final-quote">
                        "Le web tel que je l'ai conçu n'a jamais cessé de se développer. 
                        HTML est son langage, et il continuera d'évoluer avec nous."
                        <cite>- Tim Berners-Lee</cite>
                    </blockquote>
                </div>
            </div>
        `
    }
};

// État simple
let currentHtmlChapter = 'introduction';

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.home-theme')) return;
    
    document.addEventListener('load-html-content', initHtmlModule);
    console.log('Module HTML historique chargé');
});

/**
 * Initialise le module HTML
 */
function initHtmlModule() {
    console.log('Chargement de l\'histoire du HTML...');
    
    const contentInner = document.getElementById('html-content-inner');
    if (!contentInner) return;
    
    createHtmlInterface(contentInner);
    loadHtmlChapter(currentHtmlChapter);
    setupHtmlNavigation();
}

/**
 * Crée l'interface simplifiée
 */
function createHtmlInterface(container) {
    container.innerHTML = `
        <div class="html-module-container">
            <!-- Navigation simple -->
            <nav class="html-module-nav">
                <button class="module-nav-btn active" data-chapter="introduction">
                    <span>Naissance</span>
                </button>
                
                <button class="module-nav-btn" data-chapter="evolution">
                    <span>Évolution</span>
                </button>
                
                <button class="module-nav-btn" data-chapter="semantic">
                    <span>Sémantique</span>
                </button>
                
                <button class="module-nav-btn" data-chapter="future">
                    <span>Futur</span>
                </button>
            </nav>
            
            <!-- Contenu -->
            <main class="html-module-content" id="html-module-content">
                <!-- Chargé dynamiquement -->
            </main>
            
            <!-- Navigation basique -->
            <div class="html-module-footer">
                <button class="html-prev-btn" id="html-prev-btn">
                    ← Précédent
                </button>
                
                <div class="html-chapter-info">
                    <span id="html-chapter-title">Naissance</span>
                    <span class="html-chapter-counter">1/4</span>
                </div>
                
                <button class="html-next-btn" id="html-next-btn">
                    Suivant →
                </button>
            </div>
        </div>
    `;
}

/**
 * Charge un chapitre
 */
function loadHtmlChapter(chapterId) {
    const chapter = HTML_HISTORY[chapterId];
    if (!chapter) return;
    
    currentHtmlChapter = chapterId;
    
    const content = document.getElementById('html-module-content');
    if (!content) return;
    
    // Transition simple
    content.style.opacity = '0.7';
    
    setTimeout(() => {
        content.innerHTML = `
            <article class="html-chapter">
                <header>
                    <h2>${chapter.title}</h2>
                    <p class="chapter-subtitle">${chapter.subtitle}</p>
                </header>
                
                <div class="chapter-body">
                    ${chapter.content}
                </div>
            </article>
        `;
        
        content.style.opacity = '1';
        
        // Mettre à jour la navigation
        updateHtmlNavigation();
        
        // Sauvegarder
        localStorage.setItem('html_current_chapter', chapterId);
        
    }, 200);
}

/**
 * Configure la navigation
 */
function setupHtmlNavigation() {
    // Navigation par boutons
    document.querySelectorAll('.module-nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const chapter = e.currentTarget.dataset.chapter;
            
            // Mettre à jour les boutons actifs
            document.querySelectorAll('.module-nav-btn').forEach(b => {
                b.classList.remove('active');
            });
            e.currentTarget.classList.add('active');
            
            // Charger le chapitre
            loadHtmlChapter(chapter);
        });
    });
    
    // Navigation précédent/suivant
    document.getElementById('html-prev-btn').addEventListener('click', goToPrevHtmlChapter);
    document.getElementById('html-next-btn').addEventListener('click', goToNextHtmlChapter);
}

/**
 * Navigation entre chapitres
 */
function goToPrevHtmlChapter() {
    const chapters = Object.keys(HTML_HISTORY);
    const currentIndex = chapters.indexOf(currentHtmlChapter);
    
    if (currentIndex > 0) {
        const prevChapter = chapters[currentIndex - 1];
        loadHtmlChapter(prevChapter);
        
        // Mettre à jour le bouton de navigation
        document.querySelector(`.module-nav-btn[data-chapter="${prevChapter}"]`)?.click();
    }
}

function goToNextHtmlChapter() {
    const chapters = Object.keys(HTML_HISTORY);
    const currentIndex = chapters.indexOf(currentHtmlChapter);
    
    if (currentIndex < chapters.length - 1) {
        const nextChapter = chapters[currentIndex + 1];
        loadHtmlChapter(nextChapter);
        
        // Mettre à jour le bouton de navigation
        document.querySelector(`.module-nav-btn[data-chapter="${nextChapter}"]`)?.click();
    }
}

/**
 * Met à jour la navigation
 */
function updateHtmlNavigation() {
    const chapters = Object.keys(HTML_HISTORY);
    const currentIndex = chapters.indexOf(currentHtmlChapter);
    
    // Boutons précédent/suivant
    const prevBtn = document.getElementById('html-prev-btn');
    const nextBtn = document.getElementById('html-next-btn');
    
    if (prevBtn) {
        prevBtn.disabled = currentIndex === 0;
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentIndex === chapters.length - 1;
        nextBtn.style.opacity = currentIndex === chapters.length - 1 ? '0.5' : '1';
    }
    
    // Titre et compteur
    const chapterTitle = document.getElementById('html-chapter-title');
    const chapterCounter = document.querySelector('.html-chapter-counter');
    
    if (chapterTitle) {
        chapterTitle.textContent = HTML_HISTORY[currentHtmlChapter].title.split(':')[0];
    }
    
    if (chapterCounter) {
        chapterCounter.textContent = `${currentIndex + 1}/${chapters.length}`;
    }
}

// Charger le dernier chapitre visité
const savedHtmlChapter = localStorage.getItem('html_current_chapter');
if (savedHtmlChapter && HTML_HISTORY[savedHtmlChapter]) {
    currentHtmlChapter = savedHtmlChapter;
}