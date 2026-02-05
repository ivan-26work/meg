/* css.js - Histoire et évolution du CSS pour MG_ultra */

// Données historiques narratives - ESSENTIEL
const CSS_HISTORY = {
    introduction: {
        title: "CSS : L'Art de Styliser le Web",
        subtitle: "De simple feuille de style à langage de design complet",
        content: `
            <div class="history-narrative">
                <h3>La Naissance d'une Révolution (1994)</h3>
                <p>Imaginez le web en 1994 : des pages monochromes, des tableaux pour la mise en page, du texte brut.</p>
                
                <div class="historical-fact">
                    <strong>Håkon Wium Lie</strong>, travaillant au CERN avec Tim Berners-Lee, propose une idée révolutionnaire : 
                    séparer le contenu (HTML) de la présentation (CSS).
                </div>
                
                <blockquote class="historical-quote">
                    "Le HTML devrait décrire la structure, pas l'apparence. Nous avons besoin d'un langage séparé pour le style."
                    <cite>- Håkon Wium Lie, 1994</cite>
                </blockquote>
                
                <div class="code-comparison">
                    <div class="code-before">
                        <h4>AVANT CSS (HTML seul)</h4>
                        <pre>&lt;table border="1" cellpadding="10"&gt;
  &lt;tr&gt;
    &lt;td bgcolor="gray"&gt;
      &lt;font face="Arial" color="white"&gt;
        Titre
      &lt;/font&gt;
    &lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</pre>
                    </div>
                    
                    <div class="code-after">
                        <h4>APRÈS CSS</h4>
                        <pre>&lt;table class="header"&gt;
  &lt;tr&gt;
    &lt;td&gt;
      &lt;h1&gt;Titre&lt;/h1&gt;
    &lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;

&lt;style&gt;
.header {
    background: gray;
    padding: 10px;
}
.header h1 {
    font-family: Arial;
    color: white;
}
&lt;/style&gt;</pre>
                    </div>
                </div>
            </div>
        `
    },
    
    evolution: {
        title: "L'Évolution Technique",
        subtitle: "De CSS1 à CSS4 : 25 ans d'innovation",
        content: `
            <div class="evolution-timeline">
                <div class="timeline-item">
                    <div class="timeline-year">1996</div>
                    <div class="timeline-content">
                        <h4>CSS Level 1</h4>
                        <p>Première spécification officielle. Propriétés basiques : couleurs, polices, marges.</p>
                        <code class="code-example">body { color: black; background: white; }</code>
                    </div>
                </div>
                
                <div class="timeline-item">
                    <div class="timeline-year">1998</div>
                    <div class="timeline-content">
                        <h4>CSS Level 2</h4>
                        <p>Positionnement absolu, médias types (impression), z-index.</p>
                        <code class="code-example">position: absolute; top: 0; left: 0;</code>
                    </div>
                </div>
                
                <div class="timeline-item">
                    <div class="timeline-year">2011</div>
                    <div class="timeline-content">
                        <h4>CSS3 - La Révolution</h4>
                        <p>Modules séparés : transitions, animations, flexbox, grid, variables CSS.</p>
                        <code class="code-example">transition: all 0.3s ease; border-radius: 10px;</code>
                    </div>
                </div>
                
                <div class="timeline-item">
                    <div class="timeline-year">Aujourd'hui</div>
                    <div class="timeline-content">
                        <h4>CSS Moderne</h4>
                        <p>Container Queries, Nesting, View Transitions, Subgrid.</p>
                        <code class="code-example">@container (width > 400px) { & .title { font-size: 2rem; } }</code>
                    </div>
                </div>
            </div>
            
            <div class="evolution-impact">
                <h3>Impact sur le Design Web</h3>
                <div class="impact-grid">
                    <div class="impact-item">
                        <div class="impact-icon">📱</div>
                        <h4>Responsive Design</h4>
                        <p>Media queries permettent une adaptation parfaite à tous les écrans.</p>
                    </div>
                    
                    <div class="impact-item">
                        <div class="impact-icon">⚡</div>
                        <h4>Performances</h4>
                        <p>Animations CSS > JavaScript (GPU acceleration).</p>
                    </div>
                    
                    <div class="impact-item">
                        <div class="impact-icon">🎨</div>
                        <h4>Design Systems</h4>
                        <p>Variables CSS pour des systèmes cohérents.</p>
                    </div>
                    
                    <div class="impact-item">
                        <div class="impact-icon">♿</div>
                        <h4>Accessibilité</h4>
                        <p>Contraste, focus states, préférences utilisateur.</p>
                    </div>
                </div>
            </div>
        `
    },
    
    utility: {
        title: "Utilité Moderne",
        subtitle: "Bien plus qu'une simple couche de peinture",
        content: `
            <div class="utility-showcase">
                <div class="showcase-item">
                    <h3>1. Variables CSS (Custom Properties)</h3>
                    <p>Créer des systèmes de design cohérents et modifiables à la volée.</p>
                    
                    <div class="showcase-code">
                        <pre>:root {
    --primary: #3498db;
    --secondary: #2ecc71;
    --spacing: 1rem;
}

.button {
    background: var(--primary);
    padding: var(--spacing);
}

/* Mode sombre */
.dark-theme {
    --primary: #2980b9;
}</pre>
                    </div>
                </div>
                
                <div class="showcase-item">
                    <h3>2. CSS Grid & Flexbox</h3>
                    <p>Des layouts complexes sans hacks ni frameworks.</p>
                    
                    <div class="showcase-code">
                        <pre>.container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 1rem;
}

/* Flexbox pour l'alignement */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}</pre>
                    </div>
                </div>
                
                <div class="showcase-item">
                    <h3>3. Animations Natives</h3>
                    <p>Performantes et accessibles directement en CSS.</p>
                    
                    <div class="showcase-code">
                        <pre>@keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
}

.element {
    animation: slideIn 0.3s ease;
    will-change: transform; /* Optimisation GPU */
}</pre>
                    </div>
                </div>
                
                <div class="showcase-item">
                    <h3>4. Design Néomorphique</h3>
                    <p>Le style emblématique de MG_ultra, pure CSS.</p>
                    
                    <div class="showcase-code">
                        <pre>.neo-element {
    background: #e0e5ec;
    border-radius: 20px;
    box-shadow: 8px 8px 16px #b8bec7,
                -8px -8px 16px #ffffff;
}

.neo-element:active {
    box-shadow: inset 4px 4px 8px #b8bec7,
                inset -4px -4px 8px #ffffff;
}</pre>
                    </div>
                </div>
            </div>
        `
    },
    
    future: {
        title: "Le Futur du CSS",
        subtitle: "Où allons-nous ?",
        content: `
            <div class="future-predictions">
                <h3>Technologies Émergentes</h3>
                
                <div class="prediction">
                    <h4>🔄 CSS Nesting (2023)</h4>
                    <p>Écrire du CSS comme du Sass/Stylus, nativement.</p>
                    <pre>.card {
    padding: 1rem;
    
    & .title {
        font-size: 2rem;
        
        &:hover {
            color: var(--primary);
        }
    }
}</pre>
                </div>
                
                <div class="prediction">
                    <h4>📦 Container Queries (2023)</h4>
                    <p>Styliser basé sur la taille du conteneur, pas de la fenêtre.</p>
                    <pre>@container (width > 400px) {
    .component {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}</pre>
                </div>
                
                <div class="prediction">
                    <h4>🎭 View Transitions API (2024)</h4>
                    <p>Animations de navigation fluides entre les pages.</p>
                    <pre>/* Transition entre vues */
::view-transition-old(page) {
    animation: fade-out 0.3s ease;
}

::view-transition-new(page) {
    animation: fade-in 0.3s ease;
}</pre>
                </div>
                
                <div class="future-conclusion">
                    <h3>Conclusion</h3>
                    <p>Le CSS est passé d'un simple outil de couleur et de police à un <strong>langage de design complet</strong> capable de :</p>
                    <ul>
                        <li>Créer des layouts complexes (Grid, Flexbox)</li>
                        <li>Animer des interfaces (Transitions, Animations)</li>
                        <li>Gérer des thèmes dynamiques (Variables CSS)</li>
                        <li>Optimiser les performances (GPU acceleration)</li>
                        <li>Respecter l'accessibilité (Media queries, Contrast)</li>
                    </ul>
                    <p class="final-quote">"Le CSS n'est plus une contrainte, mais un super-pouvoir pour les designers et développeurs."</p>
                </div>
            </div>
        `
    }
};

// État simple
let currentChapter = 'introduction';

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.home-theme')) return;
    
    document.addEventListener('load-css-content', initCssModule);
    console.log('Module CSS historique chargé');
});

/**
 * Initialise le module CSS
 */
function initCssModule() {
    console.log('Chargement de l\'histoire du CSS...');
    
    const contentInner = document.getElementById('css-content-inner');
    if (!contentInner) return;
    
    createCssInterface(contentInner);
    loadCssChapter(currentChapter);
    setupCssNavigation();
}

/**
 * Crée l'interface simplifiée
 */
function createCssInterface(container) {
    container.innerHTML = `
        <div class="css-module-container">
            <!-- Navigation simple -->
            <nav class="css-module-nav">
                <button class="module-nav-btn active" data-chapter="introduction">
                    <span>Introduction</span>
                </button>
                
                <button class="module-nav-btn" data-chapter="evolution">
                    <span>Évolution</span>
                </button>
                
                <button class="module-nav-btn" data-chapter="utility">
                    <span>Utilité</span>
                </button>
                
                <button class="module-nav-btn" data-chapter="future">
                    <span>Futur</span>
                </button>
            </nav>
            
            <!-- Contenu -->
            <main class="css-module-content" id="css-module-content">
                <!-- Chargé dynamiquement -->
            </main>
            
            <!-- Navigation basique -->
            <div class="css-module-footer">
                <button class="css-prev-btn" id="css-prev-btn">
                    ← Précédent
                </button>
                
                <div class="css-chapter-info">
                    <span id="css-chapter-title">Introduction</span>
                    <span class="css-chapter-counter">1/4</span>
                </div>
                
                <button class="css-next-btn" id="css-next-btn">
                    Suivant →
                </button>
            </div>
        </div>
    `;
}

/**
 * Charge un chapitre
 */
function loadCssChapter(chapterId) {
    const chapter = CSS_HISTORY[chapterId];
    if (!chapter) return;
    
    currentChapter = chapterId;
    
    const content = document.getElementById('css-module-content');
    if (!content) return;
    
    // Transition simple
    content.style.opacity = '0.7';
    
    setTimeout(() => {
        content.innerHTML = `
            <article class="css-chapter">
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
        updateCssNavigation();
        
        // Sauvegarder
        localStorage.setItem('css_current_chapter', chapterId);
        
    }, 200);
}

/**
 * Configure la navigation
 */
function setupCssNavigation() {
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
            loadCssChapter(chapter);
        });
    });
    
    // Navigation précédent/suivant
    document.getElementById('css-prev-btn').addEventListener('click', goToPrevCssChapter);
    document.getElementById('css-next-btn').addEventListener('click', goToNextCssChapter);
}

/**
 * Navigation entre chapitres
 */
function goToPrevCssChapter() {
    const chapters = Object.keys(CSS_HISTORY);
    const currentIndex = chapters.indexOf(currentChapter);
    
    if (currentIndex > 0) {
        const prevChapter = chapters[currentIndex - 1];
        loadCssChapter(prevChapter);
        
        // Mettre à jour le bouton de navigation
        document.querySelector(`.module-nav-btn[data-chapter="${prevChapter}"]`)?.click();
    }
}

function goToNextCssChapter() {
    const chapters = Object.keys(CSS_HISTORY);
    const currentIndex = chapters.indexOf(currentChapter);
    
    if (currentIndex < chapters.length - 1) {
        const nextChapter = chapters[currentIndex + 1];
        loadCssChapter(nextChapter);
        
        // Mettre à jour le bouton de navigation
        document.querySelector(`.module-nav-btn[data-chapter="${nextChapter}"]`)?.click();
    }
}

/**
 * Met à jour la navigation
 */
function updateCssNavigation() {
    const chapters = Object.keys(CSS_HISTORY);
    const currentIndex = chapters.indexOf(currentChapter);
    
    // Boutons précédent/suivant
    const prevBtn = document.getElementById('css-prev-btn');
    const nextBtn = document.getElementById('css-next-btn');
    
    if (prevBtn) {
        prevBtn.disabled = currentIndex === 0;
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentIndex === chapters.length - 1;
        nextBtn.style.opacity = currentIndex === chapters.length - 1 ? '0.5' : '1';
    }
    
    // Titre et compteur
    const chapterTitle = document.getElementById('css-chapter-title');
    const chapterCounter = document.querySelector('.css-chapter-counter');
    
    if (chapterTitle) {
        chapterTitle.textContent = CSS_HISTORY[currentChapter].title;
    }
    
    if (chapterCounter) {
        chapterCounter.textContent = `${currentIndex + 1}/${chapters.length}`;
    }
}

// Charger le dernier chapitre visité
const savedChapter = localStorage.getItem('css_current_chapter');
if (savedChapter && CSS_HISTORY[savedChapter]) {
    currentChapter = savedChapter;
}