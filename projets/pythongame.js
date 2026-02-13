window.project = {
    // Nom affiché dans la sidebar
    name: 'Jeu Python (Pyodide)',
    
    // Code HTML complet
    html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Jeu Python</title>
    <!-- Pyodide CDN -->
    <script src="https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: Arial; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            min-height: 100vh; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            padding: 20px;
        }
        .game-container { 
            background: white; 
            padding: 30px; 
            border-radius: 20px; 
            box-shadow: 0 20px 40px rgba(0,0,0,0.1); 
            text-align: center;
            max-width: 500px;
            width: 100%;
        }
        h1 { color: #333; margin-bottom: 20px; }
        #status { 
            background: #f0f0f0; 
            padding: 10px; 
            border-radius: 5px; 
            margin: 10px 0;
            color: #666;
        }
        #output { 
            background: #1a1a2e; 
            color: #fff; 
            padding: 20px; 
            border-radius: 10px; 
            min-height: 200px;
            text-align: left;
            font-family: monospace;
            margin: 20px 0;
            white-space: pre-wrap;
        }
        button { 
            background: #4CAF50; 
            color: white; 
            border: none; 
            padding: 10px 30px; 
            border-radius: 5px; 
            font-size: 16px; 
            cursor: pointer; 
            margin: 5px;
        }
        button:hover { background: #45a049; }
        input { 
            padding: 10px; 
            font-size: 16px; 
            border: 2px solid #ddd; 
            border-radius: 5px; 
            width: 100%;
            margin: 10px 0;
        }
        .hidden { display: none; }
    </style>
</head>
<body>
    <div class="game-container">
        <h1>🎮 Jeu du Devin (Python)</h1>
        <div id="status">⏳ Chargement de Python...</div>
        <div id="output">Initialisation...</div>
        <div id="controls" class="hidden">
            <input type="number" id="guessInput" placeholder="Entre ton nombre (1-100)" min="1" max="100">
            <button id="guessBtn">Deviner</button>
            <button id="newGameBtn">Nouvelle partie</button>
        </div>
    </div>

    <script>
        let pyodide;
        let gameActive = false;

        async function initPyodide() {
            document.getElementById('status').textContent = '⏳ Installation de Python...';
            
            try {
                // Charger Pyodide
                pyodide = await loadPyodide({
                    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
                });
                
                document.getElementById('status').textContent = '✅ Python chargé !';
                
                // Code Python du jeu
                const pythonCode = \`
import random
import sys
from js import document, alert

class JeuDevin:
    def __init__(self):
        self.nombre_secret = random.randint(1, 100)
        self.essais = 0
        self.partie_terminee = False
        
    def afficher(self, message):
        """Affiche un message dans la zone de texte"""
        output = document.getElementById("output")
        output.innerHTML += message + "\\n"
        # Auto-scroll
        output.scrollTop = output.scrollHeight
        
    def demarrer(self):
        self.afficher("🔍 J'ai choisi un nombre entre 1 et 100.")
        self.afficher("À toi de deviner !")
        self.partie_terminee = False
        
    def deviner(self, nombre):
        if self.partie_terminee:
            self.afficher("Partie terminée ! Clique sur 'Nouvelle partie'")
            return
            
        self.essais += 1
        
        if nombre < 1 or nombre > 100:
            self.afficher("❌ Entre un nombre entre 1 et 100 !")
            return
            
        if nombre < self.nombre_secret:
            self.afficher(f"📈 {nombre} : C'est plus grand ! (Essai #{self.essais})")
        elif nombre > self.nombre_secret:
            self.afficher(f"📉 {nombre} : C'est plus petit ! (Essai #{self.essais})")
        else:
            self.afficher(f"🎉 BRAVO ! C'était bien {nombre} !")
            self.afficher(f"✅ Trouvé en {self.essais} essai{'s' if self.essais > 1 else ''} !")
            
            if self.essais <= 5:
                self.afficher("🏆 Score : Excellent !")
            elif self.essais <= 10:
                self.afficher("👍 Score : Bien !")
            else:
                self.afficher("💪 Score : Peut mieux faire !")
                
            self.partie_terminee = True

# Créer une instance du jeu
jeu = JeuDevin()

# Fonctions appelables depuis JavaScript
def demarrer_jeu():
    jeu.__init__()
    jeu.demarrer()
    
def faire_deviner(nombre):
    jeu.deviner(nombre)
\`;

                // Exécuter le code Python
                await pyodide.runPythonAsync(pythonCode);
                
                document.getElementById('status').textContent = '✅ Jeu prêt !';
                document.getElementById('controls').classList.remove('hidden');
                
                // Démarrer le jeu
                pyodide.globals.get('demarrer_jeu')();
                gameActive = true;
                
            } catch (error) {
                document.getElementById('status').textContent = '❌ Erreur de chargement';
                document.getElementById('output').innerHTML = 'Erreur : ' + error;
                console.error(error);
            }
        }

        // Initialiser au chargement
        initPyodide();

        // Gérer les boutons
        document.getElementById('guessBtn').addEventListener('click', () => {
            const input = document.getElementById('guessInput');
            const guess = parseInt(input.value);
            
            if (!isNaN(guess) && guess >= 1 && guess <= 100) {
                pyodide.globals.get('faire_deviner')(guess);
                input.value = '';
                input.focus();
            } else {
                alert('Entre un nombre valide entre 1 et 100 !');
            }
        });

        document.getElementById('newGameBtn').addEventListener('click', () => {
            document.getElementById('output').innerHTML = ''; // Effacer l'output
            pyodide.globals.get('demarrer_jeu')();
            document.getElementById('guessInput').focus();
        });

        // Permettre d'appuyer sur Entrée
        document.getElementById('guessInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('guessBtn').click();
            }
        });
    </script>
</body>
</html>
`,
    
    css: `/* Le CSS est déjà inclus dans le HTML pour simplifier */`,
    js: `// Tout est dans le HTML pour ce projet`
};