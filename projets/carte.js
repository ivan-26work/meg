window.project = {
    // Nom affiché dans la sidebar
    name: 'Carte Stylée',
    
    // Code HTML complet
    html: `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carte Stylée</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="cards-container">
        <!-- Carte 1 - Style néon -->
        <div class="card neon-card">
            <div class="card-icon">✨</div>
            <h2 class="card-title">Néon</h2>
            <p class="card-text">Une carte avec un effet néon lumineux et des bordures brillantes.</p>
            <button class="card-btn neon-btn">Découvrir</button>
        </div>

        <!-- Carte 2 - Style glassmorphisme -->
        <div class="card glass-card">
            <div class="card-icon">🪟</div>
            <h2 class="card-title">Glassmorphisme</h2>
            <p class="card-text">Effet de verre avec flou et transparence élégante.</p>
            <button class="card-btn glass-btn">Explorer</button>
        </div>

        <!-- Carte 3 - Style 3D -->
        <div class="card threed-card">
            <div class="card-icon">🎲</div>
            <h2 class="card-title">3D</h2>
            <p class="card-text">Effet 3D avec ombres portées et profondeur.</p>
            <button class="card-btn threed-btn">Essayer</button>
        </div>
    </div>
    <script src="script.js"><\/script>
</body>
</html>
`,
    
    // Code CSS
    css: `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    max-width: 1200px;
}

.card {
    width: 300px;
    padding: 30px 20px;
    border-radius: 20px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-10px);
}

.card-icon {
    font-size: 48px;
    margin-bottom: 20px;
}

.card-title {
    font-size: 24px;
    margin-bottom: 15px;
}

.card-text {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 25px;
    opacity: 0.9;
}

.card-btn {
    padding: 12px 30px;
    border: none;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

/* Style Néon */
.neon-card {
    background: #0a0a0a;
    color: #fff;
    border: 2px solid #00ff88;
    box-shadow: 0 0 20px rgba(0, 255, 136, 0.3),
                inset 0 0 20px rgba(0, 255, 136, 0.1);
}

.neon-card:hover {
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.5),
                inset 0 0 30px rgba(0, 255, 136, 0.2);
}

.neon-btn {
    background: transparent;
    color: #00ff88;
    border: 2px solid #00ff88;
    text-shadow: 0 0 5px #00ff88;
}

.neon-btn:hover {
    background: #00ff88;
    color: #0a0a0a;
    box-shadow: 0 0 20px #00ff88;
}

/* Style Glassmorphisme */
.glass-card {
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    color: #fff;
}

.glass-card:hover {
    background: rgba(255, 255, 255, 0.35);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
}

.glass-btn {
    background: rgba(255, 255, 255, 0.3);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
}

.glass-btn:hover {
    background: rgba(255, 255, 255, 0.5);
    transform: scale(1.05);
}

/* Style 3D */
.threed-card {
    background: #fff;
    color: #333;
    box-shadow: 0 10px 0 #b9b9b9,
                0 15px 20px rgba(0,0,0,0.2);
    border-bottom: 3px solid #b9b9b9;
}

.threed-card:hover {
    box-shadow: 0 15px 0 #b9b9b9,
                0 20px 25px rgba(0,0,0,0.2);
}

.threed-btn {
    background: #764ba2;
    color: white;
    box-shadow: 0 5px 0 #4a2d66;
}

.threed-btn:hover {
    background: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 7px 0 #4a2d66;
}

/* Responsive */
@media (max-width: 768px) {
    .cards-container {
        gap: 20px;
    }
    
    .card {
        width: 100%;
        max-width: 350px;
    }
}
`,
    
    // Code JavaScript
    js: `
// Animation au clic sur les boutons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.card-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Effet de clic
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 200);
            
            // Message selon le style de carte
            const card = button.closest('.card');
            const cardTitle = card.querySelector('.card-title').textContent;
            
            // Créer une notification temporaire
            const notification = document.createElement('div');
            notification.textContent = \`✨ Carte \${cardTitle} cliquée !\`;
            notification.style.cssText = \`
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                color: #333;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                animation: slideIn 0.3s ease;
                z-index: 1000;
            \`;
            
            document.body.appendChild(notification);
            
            // Supprimer la notification après 2 secondes
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 2000);
        });
    });
    
    // Ajouter les animations CSS dynamiquement
    const style = document.createElement('style');
    style.textContent = \`
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    \`;
    document.head.appendChild(style);
    
    console.log('Projet Carte Stylée chargé avec succès !');
});
`
};