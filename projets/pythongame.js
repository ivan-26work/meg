window.project = {
    // Nom affiché dans la sidebar
    name: 'Space Shooter Python',
    
    // Code HTML complet
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
                <div class="score">Score: <span id="scoreDisplay">0</span></div>
                <div class="lives">Vies: <span id="livesDisplay">3</span></div>
                <div class="wave">Vague: <span id="waveDisplay">1</span></div>
            </div>
            
            <canvas id="gameCanvas" width="800" height="500"></canvas>
            
            <div class="game-footer">
                <div class="controls">
                    <p>← → pour déplacer | Espace pour tirer</p>
                </div>
                <button id="restartBtn" class="restart-btn">Nouvelle partie</button>
            </div>
            
            <div id="gameOver" class="game-over hidden">
                <h2>GAME OVER</h2>
                <p>Score final: <span id="finalScore">0</span></p>
                <p>Vagues complétées: <span id="finalWave">0</span></p>
                <button onclick="window.restartGame()">Rejouer</button>
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
            """Effets de particules pour les explosions"""
            def __init__(self, x, y, color):
                self.x = x
                self.y = y
                self.vx = random.uniform(-3, 3)
                self.vy = random.uniform(-3, 3)
                self.size = random.randint(2, 5)
                self.color = color
                self.life = 30
                self.max_life = 30
                
            def update(self):
                self.x += self.vx
                self.y += self.vy
                self.vy += 0.1  # gravité
                self.life -= 1
                
            def draw(self):
                opacity = self.life / self.max_life
                ctx.fillStyle = f"rgba({self.color}, {opacity})"
                ctx.fillRect(self.x, self.y, self.size, self.size)
        
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
                if self.x > 30:
                    self.x -= self.speed
                    
            def move_right(self):
                if self.x < 770:
                    self.x += self.speed
                    
            def draw(self):
                # Effet d'invincibilité (clignotement)
                if self.invincible > 0 and self.invincible % 10 < 5:
                    return
                    
                # Vaisseau principal
                ctx.fillStyle = "#4CAF50"
                ctx.beginPath()
                ctx.moveTo(self.x, self.y - 15)
                ctx.lineTo(self.x + 20, self.y + 10)
                ctx.lineTo(self.x + 5, self.y + 5)
                ctx.lineTo(self.x, self.y + 10)
                ctx.lineTo(self.x - 5, self.y + 5)
                ctx.lineTo(self.x - 20, self.y + 10)
                ctx.closePath()
                ctx.fill()
                
                # Effet triple shot
                if self.triple_shot:
                    ctx.fillStyle = "rgba(255, 215, 0, 0.3)"
                    ctx.beginPath()
                    ctx.arc(self.x, self.y - 20, 20, 0, 2 * math.pi)
                    ctx.fill()
                    
            def hit(self):
                if self.invincible <= 0:
                    self.lives -= 1
                    self.invincible = 60  # 1 seconde à 60fps
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
            def __init__(self, x, y, angle=0):
                self.x = x
                self.y = y
                self.speed = 8
                self.size = 4
                self.angle = angle
                
            def update(self):
                if self.angle == 0:
                    self.y -= self.speed
                else:
                    self.x += math.sin(self.angle) * self.speed
                    self.y -= math.cos(self.angle) * self.speed
                    
            def draw(self):
                ctx.fillStyle = "#FFD700"
                ctx.beginPath()
                ctx.arc(self.x, self.y, self.size, 0, 2 * math.pi)
                ctx.fill()
                
            def off_screen(self):
                return self.y < 0 or self.x < 0 or self.x > 800
        
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
                    self.color = "#FF4444"
                elif enemy_type == 2:
                    self.speed = 1.5
                    self.points = 20
                    self.color = "#FF8844"
                else:
                    self.speed = 1
                    self.points = 30
                    self.color = "#FF44FF"
                    
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
                    if random.random() < 0.01:
                        self.shoot()
                        
            def draw(self):
                ctx.fillStyle = self.color
                
                if self.type == 1:
                    # Ennemi simple
                    ctx.fillRect(self.x - 15, self.y - 12, 30, 24)
                elif self.type == 2:
                    # Ennemi serpent
                    ctx.beginPath()
                    ctx.arc(self.x, self.y, 15, 0, 2 * math.pi)
                    ctx.fill()
                else:
                    # Ennemi boss
                    ctx.fillStyle = "#FF44FF"
                    ctx.fillRect(self.x - 20, self.y - 15, 40, 30)
                    
            def shoot(self):
                if random.random() < 0.02:
                    return Bullet(self.x, self.y + 10, 0)
                return None
                    
        class PowerUp:
            def __init__(self, x, y):
                self.x = x
                self.y = y
                self.type = random.choice(["triple", "life", "score"])
                self.speed = 2
                
            def update(self):
                self.y += self.speed
                
            def draw(self):
                if self.type == "triple":
                    ctx.fillStyle = "#FFD700"
                    ctx.fillText("★", self.x - 5, self.y - 5)
                elif self.type == "life":
                    ctx.fillStyle = "#FF4444"
                    ctx.fillText("❤️", self.x - 5, self.y - 5)
                else:
                    ctx.fillStyle = "#44FF44"
                    ctx.fillText("💰", self.x - 5, self.y - 5)
                    
            def apply(self, player, game):
                if self.type == "triple":
                    player.triple_shot = True
                    player.triple_timer = 300  # 5 secondes
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
                self.enemy_bullets = []
                
            def spawn_wave(self):
                enemies_count = 5 + self.wave * 2
                for i in range(enemies_count):
                    x = random.randint(50, 750)
                    y = random.randint(30, 200)
                    enemy_type = 1
                    if self.wave > 3 and random.random() < 0.3:
                        enemy_type = 2
                    if self.wave > 5 and random.random() < 0.1:
                        enemy_type = 3
                    self.enemies.append(Enemy(x, y, enemy_type))
                    
            def update(self):
                if self.game_over:
                    return
                    
                # Mettre à jour le joueur
                self.player.update()
                
                # Tir
                if self.shoot_cooldown > 0:
                    self.shoot_cooldown -= 1
                    
                # Mettre à jour les balles
                for bullet in self.bullets[:]:
                    bullet.update()
                    if bullet.off_screen():
                        self.bullets.remove(bullet)
                        
                # Mettre à jour les ennemis
                for enemy in self.enemies[:]:
                    enemy.update()
                    
                    # Collision avec les balles
                    for bullet in self.bullets[:]:
                        if (abs(bullet.x - enemy.x) < 20 and 
                            abs(bullet.y - enemy.y) < 15):
                            if bullet in self.bullets:
                                self.bullets.remove(bullet)
                            if enemy in self.enemies:
                                self.enemies.remove(enemy)
                                self.score += enemy.points
                                
                                # Explosion
                                for _ in range(10):
                                    color = "255, 68, 68"
                                    self.particles.append(Particle(enemy.x, enemy.y, color))
                                    
                                # Chance de power-up
                                if random.random() < 0.1:
                                    self.powerups.append(PowerUp(enemy.x, enemy.y))
                                break
                                
                    # Collision avec le joueur
                    if (abs(enemy.x - self.player.x) < 25 and 
                        abs(enemy.y - self.player.y) < 25):
                        if self.player.hit():
                            for _ in range(20):
                                color = "76, 175, 80"
                                self.particles.append(Particle(self.player.x, self.player.y, color))
                            self.enemies.remove(enemy)
                            
                    # Ennemi sorti de l'écran
                    if enemy.y > 500:
                        self.enemies.remove(enemy)
                        if not self.player.hit():
                            self.player.lives -= 1
                            
                # Mettre à jour les power-ups
                for power in self.powerups[:]:
                    power.update()
                    if (abs(power.x - self.player.x) < 20 and 
                        abs(power.y - self.player.y) < 20):
                        power.apply(self.player, self)
                        self.powerups.remove(power)
                    elif power.y > 500:
                        self.powerups.remove(power)
                        
                # Mettre à jour les particules
                for particle in self.particles[:]:
                    particle.update()
                    if particle.life <= 0:
                        self.particles.remove(particle)
                        
                # Vérifier si la vague est terminée
                if len(self.enemies) == 0:
                    self.wave += 1
                    self.spawn_wave()
                    
                # Vérifier game over
                if self.player.lives <= 0:
                    self.game_over = True
                    
            def draw(self):
                ctx.clearRect(0, 0, 800, 500)
                
                # Fond étoilé
                ctx.fillStyle = "#000022"
                ctx.fillRect(0, 0, 800, 500)
                
                # Étoiles
                ctx.fillStyle = "white"
                for i in range(50):
                    x = (i * 17 + time.time() * 10) % 800
                    y = (i * 13) % 500
                    ctx.fillRect(x, y, 2, 2)
                    
                # Dessiner les éléments
                self.player.draw()
                
                for bullet in self.bullets:
                    bullet.draw()
                    
                for enemy in self.enemies:
                    enemy.draw()
                    
                for power in self.powerups:
                    power.draw()
                    
                for particle in self.particles:
                    particle.draw()
                    
                # Mettre à jour l'affichage
                score_span.textContent = str(self.score)
                lives_span.textContent = str(self.player.lives)
                wave_span.textContent = str(self.wave)
                
            def shoot(self):
                if self.shoot_cooldown <= 0 and not self.game_over:
                    if self.player.triple_shot:
                        self.bullets.append(Bullet(self.player.x, self.player.y - 15))
                        self.bullets.append(Bullet(self.player.x - 10, self.player.y - 10, 0.2))
                        self.bullets.append(Bullet(self.player.x + 10, self.player.y - 10, -0.2))
                    else:
                        self.bullets.append(Bullet(self.player.x, self.player.y - 15))
                    self.shoot_cooldown = 10
                    
        # Initialisation du jeu
        game = Game()
        game.spawn_wave()
        
        # Gestion des touches
        keys = {}
        
        def on_key_down(event):
            keys[event.key] = True
            
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
            
        # Exposer restart_game à JavaScript
        window.restartGame = restart_game
        
        # Lancer le jeu
        timer.set_interval(update_game, 16)  # ~60 FPS
        
    <\/script>
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
    background: linear-gradient(135deg, #0b0b2b 0%, #1a1a3a 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.game-wrapper {
    padding: 20px;
}

.game-container {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.2);
}

.game-header {
    display: flex;
    justify-content: space-between;
    padding: 15px 25px;
    background: rgba(0,0,0,0.5);
    border-radius: 10px;
    margin-bottom: 15px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    text-shadow: 0 0 10px rgba(255,255,255,0.5);
}

.score, .lives, .wave {
    padding: 5px 20px;
    background: rgba(255,255,255,0.1);
    border-radius: 5px;
    border: 1px solid rgba(255,255,255,0.2);
}

#gameCanvas {
    display: block;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(0,255,255,0.3);
    background: #000022;
}

.game-footer {
    margin-top: 15px;
    text-align: center;
    color: white;
}

.controls p {
    margin-bottom: 10px;
    font-size: 16px;
    text-shadow: 0 0 5px cyan;
}

.restart-btn {
    background: linear-gradient(45deg, #ff4444, #ff8844);
    color: white;
    border: none;
    padding: 10px 30px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(255,255,255,0.3);
}

.restart-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(255,68,68,0.4);
}

.game-over {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.95);
    padding: 40px;
    border-radius: 20px;
    text-align: center;
    color: white;
    border: 2px solid #ff4444;
    box-shadow: 0 0 50px #ff4444;
    z-index: 1000;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { box-shadow: 0 0 50px #ff4444; }
    50% { box-shadow: 0 0 80px #ff4444; }
}

.game-over h2 {
    font-size: 48px;
    margin-bottom: 20px;
    color: #ff4444;
    text-shadow: 0 0 20px #ff4444;
}

.game-over p {
    font-size: 24px;
    margin-bottom: 15px;
}

.game-over button {
    background: #ff4444;
    color: white;
    border: none;
    padding: 15px 40px;
    font-size: 20px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    transition: all 0.3s ease;
    border: 1px solid white;
}

.game-over button:hover {
    transform: scale(1.1);
    background: #ff6666;
    box-shadow: 0 0 30px #ff4444;
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
    
    // Code JavaScript (vide car Brython gère tout)
    js: `// Le jeu est écrit en Python dans la balise script type="text/python"`
};