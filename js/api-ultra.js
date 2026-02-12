// js/api-ultra.js

const API_ULTRA = {
    projects: [],
    
    async init() {
        await this.loadAllProjects();
        this.mergeWithDefaultProjects();
        this.renderToSidebar();
    },
    
    async loadAllProjects() {
        // Liste COMPLÈTE de TOUS tes projets
        // Tu ajoutes manuellement chaque nouveau fichier ici
        const projectFiles = [
            'horloge.js',
            'jeu-pierre.js',
            'formulaire.js',
            'meteo.js',
            'quiz.js',
            'todo-v2.js',
            'calculatrice-scientifique.js',
            'dashboard.js',
            'cryptage.js',
            'memory.js',
            'chronometre.js',
            'notes.js',
            'calendrier.js',
            'e-commerce.js',
            'blog.js'
            // Ajoute ici tous tes projets
        ];
        
        for (const file of projectFiles) {
            try {
                const module = await import(`../projets/${file}`);
                if (module.project) {
                    this.projects.push(module.project);
                    console.log(`✅ Projet chargé: ${module.project.name}`);
                }
            } catch (e) {
                console.warn(`⚠️ ${file} non trouvé`);
            }
        }
    },
    
    mergeWithDefaultProjects() {
        window.defaultProjects = window.defaultProjects || [];
        this.allProjects = [...window.defaultProjects, ...this.projects];
    },
    
    renderToSidebar() {
        const projectList = document.getElementById('project-list');
        if (!projectList) return;
        
        projectList.innerHTML = '';
        
        this.allProjects.forEach((project, index) => {
            const btn = document.createElement('button');
            btn.className = 'project-btn';
            btn.textContent = project.name;
            btn.dataset.index = index;
            btn.addEventListener('click', () => this.ejectProject(index));
            projectList.appendChild(btn);
        });
    },
    
    ejectProject(index) {
        const project = this.allProjects[index];
        if (!project) return;
        
        if (window.editors?.html) window.editors.html.setValue(project.html);
        if (window.editors?.css) window.editors.css.setValue(project.css);
        if (window.editors?.js) window.editors.js.setValue(project.js);
        
        localStorage.setItem('editor_html', project.html);
        localStorage.setItem('editor_css', project.css);
        localStorage.setItem('editor_js', project.js);
    }
};

window.API_ULTRA = API_ULTRA;