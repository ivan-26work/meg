window.project = {
    name: 'Space Shooter Python',
    
    html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Space Shooter Python</title>
    <script src="https://cdn.jsdelivr.net/npm/brython@3.12.3/brython.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/brython@3.12.3/brython_stdlib.js"></script>
    <link rel="stylesheet" href="style.css">
</head>
<body onload="brython()">
    <div class="game-wrapper">
        <div class="game-container">
            <div class="game-header">
                <div class="score">🎯 Score: <span id="scoreDisplay">0</span></div>
                <div class="lives">❤️ Vies: <span id="livesDisplay">3</span></div>
                <div class="wave">🌊 Vague: <span id="waveDisplay">1</span></div>
            </div>
            
            <canvas id="gameCanvas" width="800" height="500" style="background: #0a0a2a;"></canvas>
            
            <div class="game-footer">
                <div class="controls">
                    <p>← → pour déplacer | ␣ Espace pour tirer</p>
                </div>
                <button id="restartBtn" class="restart-btn">🚀 Nouvelle partie</button>
            </div>
            
            <div id="gameOver" class="game-over hidden">
                <h2>💀 GAME OVER 💀</h2>
                <p>Score final: <span id="finalScore">0</span></p>
                <p>Vagues complétées: <span id="finalWave">0</span></p>
                <button onclick="window.restartGame()">🔄 Rejouer</button>
            </div>
        </div>
    </div>
    
    <script type="text/python">
        from browser import document, window, timer, html
        from browser.html import CANVAS
        import random
        import math
        import time
        
        # Récupérer les éléments du DOM
        canvas = document["gameCanvas"]
        ctx = canvas.getContext("2d")
        score_span = document["scoreDisplay"]
        lives_span = document["livesDisplay"]
        wave_span = document["waveDisplay"]
        game_over_div = document["gameOver"]
        final_score_span = document["finalScore"]
        final_wave_span = document["finalWave"]
        
        class Particle:
            def __init__(self, x, y, color):
                self.x = x
                self.y = y
                self.vx = random.uniform(-4, 4)
                self.vy = random.uniform(-4, 4)
                self.size = random.randint(3, 8)
                self.color = color
                self.life = 30
                self.max_life = 30
                
            def update(self):
                self.x += self.vx
                self.y += self.vy
                self.vy += 0.2
                self.life -= 1
                
            def draw(self):
                opacity = self.life / self.max_life
                ctx.fillStyle = f"rgba({self.color}, {opacity})"
                ctx.fillRect(int(self.x), int(self.y), self.size, self.size)
        
        class Player:
            def __init__(self):
                self.x = 400
                self.y = 430
                self.width = 40
                self.height = 30
                self.speed = 7
                self.lives = 3
                self.invincible = 0
                self.triple_shot = False
                self.triple_timer = 0
                
            def move_left(self):
                if self.x > 40:
                    self.x -= self.speed
                    
            def move_right(self):
                if self.x < 760:
                    self.x += self.speed
                    
            def draw(self):
                if self.invincible > 0 and self.invincible % 10 < 5:
                    return
                    
                # Corps du vaisseau (CYAN VIF)
                ctx.fillStyle = "#00FFFF"
                ctx.shadowColor = "#00FFFF"
                ctx.shadowBlur = 20
                
                # Triangle principal
                ctx.beginPath()
                ctx.moveTo(self.x, self.y - 25)
                ctx.lineTo(self.x + 25, self.y + 10)
                ctx.lineTo(self.x + 10, self.y + 10)
                ctx.lineTo(self.x, self.y + 5)
                ctx.lineTo(self.x - 10, self.y + 10)
                ctx.lineTo(self.x - 25, self.y + 10)
                ctx.closePath()
                ctx.fill()
                
                # Réacteurs (ORANGE)
                ctx.fillStyle = "#FF8800"
                ctx.shadowColor = "#FF8800"
                ctx.fillRect(self.x - 15, self.y + 5, 8, 12)
                ctx.fillRect(self.x + 7, self.y + 5, 8, 12)
                
                # Effet triple shot (DORÉ)
                if self.triple_shot:
                    ctx.fillStyle = "rgba(255, 215, 0, 0.3)"
                    ctx.shadowBlur = 30
                    ctx.beginPath()
                    ctx.arc(self.x, self.y - 20, 30, 0, 2 * 3.14)
                    ctx.fill()
                    
                ctx.shadowBlur = 0
                    
            def hit(self):
                if self.invincible <= 0:
                    self.lives -= 1
                    self.invincible = 60
                    return True
                return False
                
            def update(self):
                if self.invincible > 0:
                    self.invincible -= 1
                if self.triple_shot:
                    self.triple_timer -= 1
                    if self.triple_timer <= 0:
                        self.triple_shot = False
        
        class Bullet:
            def __init__(self, x, y):
                self.x = x
                self.y = y
                self.speed = 10
                self.size = 6
                
            def update(self):
                self.y -= self.speed
                    
            def draw(self):
                ctx.fillStyle = "#FFFF00"
                ctx.shadowColor = "#FFFF00"
                ctx.shadowBlur = 15
                ctx.beginPath()
                ctx.arc(self.x, self.y, self.size, 0, 2 * 3.14)
                ctx.fill()
                ctx.shadowBlur = 0
                
            def off_screen(self):
                return self.y < 0
        
        class Enemy:
            def __init__(self, x, y, enemy_type=1):
                self.x = x
                self.y = y
                self.type = enemy_type
                self.width = 30
                self.height = 25
                
                if enemy_type == 1:
                    self.speed = 2
                    self.points = 10
                    self.color = "#FF4444"  # Rouge vif
                elif enemy_type == 2:
                    self.speed = 1.5
                    self.points = 20
                    self.color = "#FFAA00"  # Orange vif
                else:
                    self.speed = 1
                    self.points = 30
                    self.color = "#FF44FF"  # Rose vif
                    
                self.angle = 0
                
            def update(self):
                if self.type == 1:
                    self.y += self.speed
                elif self.type == 2:
                    self.y += self.speed
                    self.x += math.sin(self.angle) * 2
                    self.angle += 0.1
                else:
                    self.y += self.speed * 0.5
                    
            def draw(self):
                ctx.fillStyle = self.color
                ctx.shadowColor = self.color
                ctx.shadowBlur = 15
                
                if self.type == 1:
                    # Ennemi rouge carré
                    ctx.fillRect(self.x - 15, self.y - 12, 30, 24)
                    # Yeux blancs
                    ctx.fillStyle = "white"
                    ctx.shadowBlur = 0
                    ctx.fillRect(self.x - 8, self.y - 5, 4, 4)
                    ctx.fillRect(self.x + 4, self.y - 5, 4, 4)
                    
                elif self.type == 2:
                    # Ennemi orange ovale
                    ctx.beginPath()
                    ctx.ellipse(self.x, self.y, 15, 10, 0, 0, 2 * 3.14)
                    ctx.fill()
                    # Yeux
                    ctx.fillStyle = "black"
                    ctx.shadowBlur = 0
                    ctx.beginPath()
                    ctx.arc(self.x - 5, self.y - 3, 3, 0, 2 * 3.14)
                    ctx.fill()
                    ctx.beginPath()
                    ctx.arc(self.x + 5, self.y - 3, 3, 0, 2 * 3.14)
                    ctx.fill()
                    
                else:
                    # Ennemi violet en forme de boss
                    ctx.fillStyle = self.color
                    ctx.fillRect(self.x - 20, self.y - 15, 40, 30)
                    # Yeux rouges
                    ctx.fillStyle = "#FF0000"
                    ctx.shadowBlur = 10
                    ctx.beginPath()
                    ctx.arc(self.x - 8, self.y - 5, 4, 0, 2 * 3.14)
                    ctx.fill()
                    ctx.beginPath()
                    ctx.arc(self.x + 8, self.y - 5, 4, 0, 2 * 3.14)
                    ctx.fill()
                    
                ctx.shadowBlur = 0
                    
        class PowerUp:
            def __init__(self, x, y):
                self.x = x
                self.y = y
                self.type = random.choice(["triple", "life", "score"])
                self.speed = 2
                
            def update(self):
                self.y += self.speed
                
            def draw(self):
                ctx.font = "25px Arial"
                ctx.shadowBlur = 20
                if self.type == "triple":
                    ctx.fillStyle = "#FFD700"
                    ctx.shadowColor = "#FFD700"
                    ctx.fillText("⭐", self.x - 15, self.y)
                elif self.type == "life":
                    ctx.fillStyle = "#FF4444"
                    ctx.shadowColor = "#FF4444"
                    ctx.fillText("❤️", self.x - 15, self.y)
                else:
                    ctx.fillStyle = "#44FF44"
                    ctx.shadowColor = "#44FF44"
                    ctx.fillText("💰", self.x - 15, self.y)
                ctx.shadowBlur = 0
                    
            def apply(self, player, game):
                if self.type == "triple":
                    player.triple_shot = True
                    player.triple_timer = 300
                elif self.type == "life":
                    player.lives += 1
                else:
                    game.score += 50
        
        class Game:
            def __init__(self):
                self.player = Player()
                self.bullets = []
                self.enemies = []
                self.particles = []
                self.powerups = []
                self.score = 0
                self.wave = 1
                self.game_over = False
                self.shoot_cooldown = 0
                self.stars = []
                
                # Créer des étoiles
                for i in range(100):
                    self.stars.append({
                        'x': random.randint(0, 800),
                        'y': random.randint(0, 500),
                        'size': random.randint(1, 3)
                    })
                    
            def spawn_wave(self):
                enemies_count = 5 + self.wave
                for i in range(enemies_count):
                    x = 100 + (i * 70) % 600
                    y = 50 + (i * 30)
                    enemy_type = 1
                    if self.wave > 2 and random.random() < 0.3:
                        enemy_type = 2
                    if self.wave > 4 and random.random() < 0.1:
                        enemy_type = 3
                    self.enemies.append(Enemy(x, y, enemy_type))
                    
            def update(self):
                if self.game_over:
                    return
                    
                self.player.update()
                
                # Mise à jour des étoiles
                for star in self.stars:
                    star['y'] += 1
                    if star['y'] > 500:
                        star['y'] = 0
                        star['x'] = random.randint(0, 800)
                
                # Tir
                if self.shoot_cooldown > 0:
                    self.shoot_cooldown -= 1
                    
                # Balles
                for bullet in self.bullets[:]:
                    bullet.update()
                    if bullet.off_screen():
                        self.bullets.remove(bullet)
                        
                # Ennemis
                for enemy in self.enemies[:]:
                    enemy.update()
                    
                    # Collisions balles
                    for bullet in self.bullets[:]:
                        if (abs(bullet.x - enemy.x) < 25 and 
                            abs(bullet.y - enemy.y) < 20):
                            if bullet in self.bullets:
                                self.bullets.remove(bullet)
                            if enemy in self.enemies:
                                self.enemies.remove(enemy)
                                self.score += enemy.points
                                
                                # Explosion colorée
                                for _ in range(15):
                                    color = enemy.color.replace("#", "")
                                    r = int(color[0:2], 16)
                                    g = int(color[2:4], 16)
                                    b = int(color[4:6], 16)
                                    self.particles.append(Particle(enemy.x, enemy.y, f"{r},{g},{b}"))
                                    
                                if random.random() < 0.15:
                                    self.powerups.append(PowerUp(enemy.x, enemy.y))
                                break
                                
                    # Collision joueur
                    if (abs(enemy.x - self.player.x) < 30 and 
                        abs(enemy.y - self.player.y) < 25):
                        if self.player.hit():
                            for _ in range(20):
                                self.particles.append(Particle(self.player.x, self.player.y, "0,255,255"))
                            if enemy in self.enemies:
                                self.enemies.remove(enemy)
                                
                    if enemy.y > 500:
                        if enemy in self.enemies:
                            self.enemies.remove(enemy)
                            
                # Power-ups
                for power in self.powerups[:]:
                    power.update()
                    if (abs(power.x - self.player.x) < 25 and 
                        abs(power.y - self.player.y) < 25):
                        power.apply(self.player, self)
                        self.powerups.remove(power)
                    elif power.y > 500:
                        self.powerups.remove(power)
                        
                # Particules
                for particle in self.particles[:]:
                    particle.update()
                    if particle.life <= 0:
                        self.particles.remove(particle)
                        
                # Nouvelle vague
                if len(self.enemies) == 0:
                    self.wave += 1
                    self.spawn_wave()
                    
                # Game over
                if self.player.lives <= 0:
                    self.game_over = True
                    final_score_span.textContent = str(self.score)
                    final_wave_span.textContent = str(self.wave)
                    game_over_div.classList.remove("hidden")
                    
            def draw(self):
                # Ciel étoilé
                ctx.fillStyle = "#0a0a2a"
                ctx.fillRect(0, 0, 800, 500)
                
                # Étoiles scintillantes
                for star in self.stars:
                    brightness = random.randint(150, 255)
                    ctx.fillStyle = f"rgb({brightness}, {brightness}, {brightness})"
                    ctx.fillRect(star['x'], star['y'], star['size'], star['size'])
                
                # Game elements
                self.player.draw()
                
                for bullet in self.bullets:
                    bullet.draw()
                    
                for enemy in self.enemies:
                    enemy.draw()
                    
                for power in self.powerups:
                    power.draw()
                    
                for particle in self.particles:
                    particle.draw()
                    
                # Mise à jour scores
                score_span.textContent = str(self.score)
                lives_span.textContent = str(self.player.lives)
                wave_span.textContent = str(self.wave)
                
            def shoot(self):
                if self.shoot_cooldown <= 0 and not self.game_over:
                    if self.player.triple_shot:
                        self.bullets.append(Bullet(self.player.x, self.player.y - 20))
                        self.bullets.append(Bullet(self.player.x - 15, self.player.y - 15))
                        self.bullets.append(Bullet(self.player.x + 15, self.player.y - 15))
                    else:
                        self.bullets.append(Bullet(self.player.x, self.player.y - 20))
                    self.shoot_cooldown = 8
                    
        # Initialisation
        game = Game()
        game.spawn_wave()
        
        # Contrôles
        keys = {}
        
        def on_key_down(event):
            keys[event.key] = True
            if event.key == " ":  # Empêcher le défilement de la page
                event.preventDefault()
            
        def on_key_up(event):
            keys[event.key] = False
            
        document.bind("keydown", on_key_down)
        document.bind("keyup", on_key_up)
        
        def update_game():
            if not game.game_over:
                if "ArrowLeft" in keys:
                    game.player.move_left()
                if "ArrowRight" in keys:
                    game.player.move_right()
                if " " in keys:
                    game.shoot()
                    
            game.update()
            game.draw()
            
        def restart_game():
            nonlocal game
            game = Game()
            game.spawn_wave()
            game_over_div.classList.add("hidden")
            
        window.restartGame = restart_game
        timer.set_interval(update_game, 16)
        
    <\/script>
</body>
</html>
`,
    
    css: `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #000428 0%, #004e92 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.game-wrapper {
    padding: 20px;
}

.game-container {
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 0 50px rgba(0, 255, 255, 0.3);
    border: 1px solid rgba(0, 255, 255, 0.3);
}

.game-header {
    display: flex;
    justify-content: space-between;
    padding: 15px 25px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    margin-bottom: 15px;
    color: white;
    font-size: 22px;
    font-weight: bold;
    border: 1px solid #00ffff;
    text-shadow: 0 0 10px cyan;
}

.score, .lives, .wave {
    padding: 5px 20px;
    background: rgba(0, 255, 255, 0.1);
    border-radius: 5px;
    border: 1px solid rgba(0, 255, 255, 0.5);
}

#gameCanvas {
    display: block;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 0 0 30px cyan;
    cursor: none;
}

.game-footer {
    margin-top: 15px;
    text-align: center;
    color: white;
}

.controls p {
    margin-bottom: 10px;
    font-size: 18px;
    text-shadow: 0 0 5px cyan;
    background: rgba(0, 0, 0, 0.5);
    padding: 8px;
    border-radius: 5px;
}

.restart-btn {
    background: linear-gradient(45deg, cyan, blue);
    color: white;
    border: none;
    padding: 12px 35px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid white;
    text-shadow: 0 0 5px black;
}

.restart-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px cyan;
    background: linear-gradient(45deg, #00ffff, #0066ff);
}

.game-over {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.95);
    padding: 40px;
    border-radius: 20px;
    text-align: center;
    color: white;
    border: 3px solid cyan;
    box-shadow: 0 0 100px cyan;
    z-index: 1000;
    animation: glow 2s infinite;
}

@keyframes glow {
    0%, 100% { box-shadow: 0 0 50px cyan; }
    50% { box-shadow: 0 0 100px cyan; }
}

.game-over h2 {
    font-size: 48px;
    margin-bottom: 20px;
    color: cyan;
    text-shadow: 0 0 20px cyan;
}

.game-over p {
    font-size: 24px;
    margin-bottom: 15px;
    color: white;
}

.game-over button {
    background: cyan;
    color: black;
    border: none;
    padding: 15px 40px;
    font-size: 20px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    transition: all 0.3s ease;
    border: 2px solid white;
}

.game-over button:hover {
    transform: scale(1.1);
    background: #00ffff;
    box-shadow: 0 0 50px cyan;
}

.hidden {
    display: none;
}

@media (max-width: 850px) {
    .game-wrapper {
        transform: scale(0.8);
    }
}
`,
    
    js: `// Le jeu est en Python dans la balise script`
};