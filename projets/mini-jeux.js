window.project = {
    // Nom affiché dans la sidebar
    name: 'Runner Game',
    
    // Code HTML complet
    html: `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Runner Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game-container">
        <div class="game-header">
            <div class="score">Score: <span id="score">0</span></div>
            <div class="high-score">Record: <span id="highScore">0</span></div>
        </div>
        
        <canvas id="gameCanvas" width="400" height="600"></canvas>
        
        <div class="game-controls">
            <p>Utilise les flèches ← ↑ → pour te déplacer</p>
            <button id="restartBtn" class="restart-btn">Nouvelle partie</button>
        </div>
        
        <div id="gameOver" class="game-over hidden">
            <h2>Game Over!</h2>
            <p>Score: <span id="finalScore">0</span></p>
            <button onclick="restartGame()">Rejouer</button>
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
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.game-container {
    background: #1a1a2e;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

.game-header {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    margin-bottom: 10px;
    background: #16213e;
    border-radius: 10px;
    color: white;
    font-size: 18px;
    font-weight: bold;
}

.score, .high-score {
    padding: 5px 15px;
    background: #0f3460;
    border-radius: 5px;
}

#gameCanvas {
    display: block;
    margin: 0 auto;
    background: linear-gradient(180deg, #87CEEB 0%, #98D8E8 100%);
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    cursor: none;
}

.game-controls {
    text-align: center;
    margin-top: 15px;
    color: white;
}

.game-controls p {
    margin-bottom: 10px;
    font-size: 14px;
    opacity: 0.8;
}

.restart-btn {
    background: #e94560;
    color: white;
    border: none;
    padding: 10px 30px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.restart-btn:hover {
    background: #ff6b8b;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(233, 69, 96, 0.4);
}

.game-over {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(26, 26, 46, 0.95);
    padding: 40px;
    border-radius: 20px;
    text-align: center;
    color: white;
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    z-index: 1000;
    backdrop-filter: blur(10px);
}

.game-over h2 {
    font-size: 36px;
    margin-bottom: 20px;
    color: #e94560;
}

.game-over p {
    font-size: 24px;
    margin-bottom: 30px;
}

.game-over button {
    background: #e94560;
    color: white;
    border: none;
    padding: 15px 40px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.game-over button:hover {
    background: #ff6b8b;
    transform: scale(1.05);
}

.hidden {
    display: none;
}

/* Animation pour les obstacles */
@keyframes obstacleMove {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(5px);
    }
}
`,
    
    // Code JavaScript
    js: `
// Configuration du canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const gameOverDiv = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');

// Dimensions
const LANE_COUNT = 3;
const LANE_WIDTH = canvas.width / LANE_COUNT;
const PLAYER_SIZE = 30;
const OBSTACLE_SIZE = 30;
const PLAYER_Y = canvas.height - 80;

// Variables du jeu
let playerX = canvas.width / 2 - PLAYER_SIZE / 2;
let playerLane = 1; // 0: gauche, 1: milieu, 2: droite
let obstacles = [];
let score = 0;
let highScore = localStorage.getItem('runnerHighScore') || 0;
let gameRunning = false;
let gameSpeed = 3;
let frameCount = 0;
let animationId;

// Afficher le record
highScoreElement.textContent = highScore;

// Classe pour les obstacles
class Obstacle {
    constructor(lane) {
        this.lane = lane;
        this.x = lane * LANE_WIDTH + (LANE_WIDTH - OBSTACLE_SIZE) / 2;
        this.y = -OBSTACLE_SIZE;
        this.width = OBSTACLE_SIZE;
        this.height = OBSTACLE_SIZE;
    }
    
    update() {
        this.y += gameSpeed;
    }
    
    draw() {
        // Obstacle (train)
        ctx.fillStyle = '#FF4444';
        ctx.shadowColor = '#990000';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 5);
        ctx.fill();
        
        // Détails
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowBlur = 0;
        ctx.fillRect(this.x + 5, this.y + 5, 5, 5);
        ctx.fillRect(this.x + this.width - 10, this.y + 5, 5, 5);
        ctx.fillRect(this.x + 5, this.y + this.height - 10, 5, 5);
        ctx.fillRect(this.x + this.width - 10, this.y + this.height - 10, 5, 5);
        
        ctx.shadowBlur = 0;
    }
}

// Helper pour les rectangles arrondis
CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.quadraticCurveTo(x + w, y, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r);
    this.lineTo(x, y + r);
    this.quadraticCurveTo(x, y, x + r, y);
    return this;
};

// Dessiner le joueur
function drawPlayer() {
    // Corps
    ctx.fillStyle = '#4CAF50';
    ctx.shadowColor = '#2E7D32';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(playerX + PLAYER_SIZE/2, PLAYER_Y + PLAYER_SIZE/2, PLAYER_SIZE/2, 0, Math.PI * 2);
    ctx.fill();
    
    // Yeux
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(playerX + PLAYER_SIZE/2 - 5, PLAYER_Y + PLAYER_SIZE/2 - 5, 5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(playerX + PLAYER_SIZE/2 - 7, PLAYER_Y + PLAYER_SIZE/2 - 7, 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(playerX + PLAYER_SIZE/2 + 5, PLAYER_Y + PLAYER_SIZE/2 - 5, 5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(playerX + PLAYER_SIZE/2 + 3, PLAYER_Y + PLAYER_SIZE/2 - 7, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Casquette
    ctx.fillStyle = '#FF5722';
    ctx.fillRect(playerX + 5, PLAYER_Y - 5, 20, 8);
}

// Dessiner les voies
function drawLanes() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.setLineDash([15, 15]);
    
    for (let i = 1; i < LANE_COUNT; i++) {
        ctx.beginPath();
        ctx.moveTo(i * LANE_WIDTH, 0);
        ctx.lineTo(i * LANE_WIDTH, canvas.height);
        ctx.stroke();
    }
    
    ctx.setLineDash([]);
}

// Mettre à jour le jeu
function update() {
    if (!gameRunning) return;
    
    // Générer des obstacles
    if (frameCount % 60 === 0) { // Toutes les ~1 secondes à 60fps
        const lane = Math.floor(Math.random() * LANE_COUNT);
        obstacles.push(new Obstacle(lane));
    }
    
    // Mettre à jour les obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].update();
        
        // Vérifier la collision
        if (obstacles[i].lane === playerLane) {
            if (obstacles[i].y + obstacles[i].height > PLAYER_Y && 
                obstacles[i].y < PLAYER_Y + PLAYER_SIZE) {
                gameOver();
                return;
            }
        }
        
        // Supprimer les obstacles sortis
        if (obstacles[i].y > canvas.height) {
            obstacles.splice(i, 1);
            // Augmenter le score
            score += 10;
            scoreElement.textContent = score;
            
            // Augmenter la vitesse tous les 100 points
            if (score % 100 === 0) {
                gameSpeed += 0.5;
            }
        }
    }
    
    frameCount++;
}

// Dessiner le jeu
function draw() {
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dessiner les voies
    drawLanes();
    
    // Dessiner les obstacles
    obstacles.forEach(obstacle => obstacle.draw());
    
    // Dessiner le joueur
    drawPlayer();
}

// Boucle de jeu
function gameLoop() {
    update();
    draw();
    animationId = requestAnimationFrame(gameLoop);
}

// Démarrer le jeu
function startGame() {
    gameRunning = true;
    obstacles = [];
    score = 0;
    gameSpeed = 3;
    frameCount = 0;
    playerLane = 1;
    playerX = playerLane * LANE_WIDTH + (LANE_WIDTH - PLAYER_SIZE) / 2;
    scoreElement.textContent = score;
    gameOverDiv.classList.add('hidden');
    gameLoop();
}

// Game Over
function gameOver() {
    gameRunning = false;
    cancelAnimationFrame(animationId);
    
    // Mettre à jour le record
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('runnerHighScore', highScore);
        highScoreElement.textContent = highScore;
    }
    
    finalScoreElement.textContent = score;
    gameOverDiv.classList.remove('hidden');
}

// Redémarrer le jeu
function restartGame() {
    startGame();
}

// Contrôles clavier
document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    
    switch(e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            if (playerLane > 0) {
                playerLane--;
                playerX = playerLane * LANE_WIDTH + (LANE_WIDTH - PLAYER_SIZE) / 2;
            }
            break;
        case 'ArrowRight':
            e.preventDefault();
            if (playerLane < LANE_COUNT - 1) {
                playerLane++;
                playerX = playerLane * LANE_WIDTH + (LANE_WIDTH - PLAYER_SIZE) / 2;
            }
            break;
    }
});

// Bouton restart
document.getElementById('restartBtn').addEventListener('click', restartGame);

// Démarrer automatiquement
startGame();

// Empêcher le défilement de la page avec les flèches
window.addEventListener('keydown', (e) => {
    if (e.key.startsWith('Arrow')) {
        e.preventDefault();
    }
});
`
};