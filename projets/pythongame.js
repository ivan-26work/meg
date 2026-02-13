window.project = {
    // Nom affiché dans la sidebar
    name: 'Vrai ou Faux',
    
    // Code HTML complet
    html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Vrai ou Faux</title>
    <script src="https://cdn.jsdelivr.net/npm/brython@3.12.3/brython.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/brython@3.12.3/brython_stdlib.js"></script>
    <link rel="stylesheet" href="style.css">
</head>
<body onload="brython()">
    <div class="game-container">
        <h1 class="title">🤔 Vrai ou Faux ?</h1>
        
        <div class="score-container">
            <div class="score">Score: <span id="score">0</span></div>
            <div class="best-score">🏆 Record: <span id="bestScore">0</span></div>
        </div>
        
        <div class="question-container">
            <div class="category" id="category">Culture générale</div>
            <div class="question" id="question">Chargement...</div>
        </div>
        
        <div class="answer-buttons">
            <button id="trueBtn" class="answer-btn true-btn">✅ VRAI</button>
            <button id="falseBtn" class="answer-btn false-btn">❌ FAUX</button>
        </div>
        
        <div class="feedback" id="feedback"></div>
        
        <div class="progress">
            Question <span id="currentQ">1</span>/<span id="totalQ">10</span>
        </div>
        
        <div id="gameOver" class="game-over hidden">
            <h2>🎮 Partie terminée !</h2>
            <p>Score final: <span id="finalScore">0</span>/10</p>
            <p id="message"></p>
            <button onclick="window.restartGame()">🔄 Rejouer</button>
        </div>
    </div>
    
    <script type="text/python">
        from browser import document, window, timer
        import random
        import json
        
        # Récupérer les éléments
        score_span = document["score"]
        best_span = document["bestScore"]
        category_div = document["category"]
        question_div = document["question"]
        feedback_div = document["feedback"]
        current_q_span = document["currentQ"]
        total_q_span = document["totalQ"]
        game_over_div = document["gameOver"]
        final_score_span = document["finalScore"]
        message_p = document["message"]
        true_btn = document["trueBtn"]
        false_btn = document["falseBtn"]
        
        # Questions (vrai/faux)
        questions = [
            # Culture générale
            {"category": "🌍 Culture", "question": "La Terre est plate.", "answer": False},
            {"category": "🌍 Culture", "question": "L'eau bout à 100°C au niveau de la mer.", "answer": True},
            {"category": "🌍 Culture", "question": "Le Mont Blanc est le plus haut sommet d'Europe.", "answer": True},
            {"category": "🌍 Culture", "question": "Le désert du Sahara est le plus grand désert chaud du monde.", "answer": True},
            
            # Sciences
            {"category": "🔬 Sciences", "question": "Les humains ont 5 sens uniquement.", "answer": False},
            {"category": "🔬 Sciences", "question": "L'ADN signifie acide désoxyribonucléique.", "answer": True},
            {"category": "🔬 Sciences", "question": "Les étoiles filantes sont des étoiles qui tombent.", "answer": False},
            {"category": "🔬 Sciences", "question": "Le soleil est une étoile.", "answer": True},
            
            # Histoire
            {"category": "📜 Histoire", "question": "La Bastille a été prise en 1789.", "answer": True},
            {"category": "📜 Histoire", "question": "Napoléon est mort à Sainte-Hélène.", "answer": True},
            {"category": "📜 Histoire", "question": "La guerre de 100 ans a duré exactement 100 ans.", "answer": False},
            
            # Animaux
            {"category": "🐾 Animaux", "question": "Les chauves-souris sont aveugles.", "answer": False},
            {"category": "🐾 Animaux", "question": "Les dauphins sont des poissons.", "answer": False},
            {"category": "🐾 Animaux", "question": "Les pandas mangent principalement du bambou.", "answer": True},
            
            # Nourriture
            {"category": "🍕 Nourriture", "question": "La pizza est originaire d'Italie.", "answer": True},
            {"category": "🍕 Nourriture", "question": "Le chocolat blanc contient du cacao.", "answer": False},
            {"category": "🍕 Nourriture", "question": "Les frites sont belges.", "answer": True},
            
            # Sport
            {"category": "⚽ Sport", "question": "Le football se joue à 11 contre 11.", "answer": True},
            {"category": "⚽ Sport", "question": "Les Jeux Olympiques ont lieu tous les 2 ans.", "answer": False},
            {"category": "⚽ Sport", "question": "Le marathon fait 42,195 km.", "answer": True},
            
            # Technologie
            {"category": "💻 Tech", "question": "Le langage Python est nommé d'après un serpent.", "answer": False},
            {"category": "💻 Tech", "question": "Internet et le Web, c'est la même chose.", "answer": False},
            {"category": "💻 Tech", "question": "Les emails existent depuis avant le Web.", "answer": True},
            
            # Géographie
            {"category": "🗺️ Géo", "question": "Paris est la capitale de la France.", "answer": True},
            {"category": "🗺️ Géo", "question": "Le Japon est composé de plus de 6000 îles.", "answer": True},
            {"category": "🗺️ Géo", "question": "La Russie est le plus grand pays du monde.", "answer": True},
            
            # Art
            {"category": "🎨 Art", "question": "La Joconde est exposée au Louvre.", "answer": True},
            {"category": "🎨 Art", "question": "Van Gogh a vendu beaucoup de tableaux de son vivant.", "answer": False},
            {"category": "🎨 Art", "question": "Le cinéma a été inventé par les frères Lumière.", "answer": True}
        ]
        
        class Game:
            def __init__(self):
                self.score = 0
                self.current_q = 0
                self.total_q = 10
                self.questions = random.sample(questions, self.total_q)
                self.answered = False
                self.best_score = int(localStorage.getItem("vraiFaux_best") or 0)
                best_span.textContent = str(self.best_score)
                
            def show_question(self):
                if self.current_q < self.total_q:
                    q = self.questions[self.current_q]
                    category_div.textContent = q["category"]
                    question_div.textContent = q["question"]
                    current_q_span.textContent = str(self.current_q + 1)
                    total_q_span.textContent = str(self.total_q)
                    self.answered = False
                    feedback_div.textContent = ""
                    feedback_div.className = "feedback"
                    
                    # Réactiver les boutons
                    true_btn.disabled = False
                    false_btn.disabled = False
                    true_btn.style.opacity = "1"
                    false_btn.style.opacity = "1"
                else:
                    self.game_over()
                    
            def check_answer(self, answer):
                if self.answered:
                    return
                    
                self.answered = True
                q = self.questions[self.current_q]
                
                # Désactiver les boutons
                true_btn.disabled = True
                false_btn.disabled = True
                true_btn.style.opacity = "0.5"
                false_btn.style.opacity = "0.5"
                
                if answer == q["answer"]:
                    # Bonne réponse
                    self.score += 1
                    feedback_div.textContent = "✅ Bravo ! Bonne réponse !"
                    feedback_div.className = "feedback correct"
                    
                    # Animation
                    if answer:
                        true_btn.style.background = "#4CAF50"
                    else:
                        false_btn.style.background = "#4CAF50"
                else:
                    # Mauvaise réponse
                    feedback_div.textContent = f"❌ Dommage ! La réponse était {'VRAI' if q['answer'] else 'FAUX'}"
                    feedback_div.className = "feedback incorrect"
                    
                    # Montrer la bonne réponse
                    if q["answer"]:
                        true_btn.style.background = "#4CAF50"
                        false_btn.style.background = "#f44336"
                    else:
                        true_btn.style.background = "#f44336"
                        false_btn.style.background = "#4CAF50"
                
                score_span.textContent = str(self.score)
                
                # Passer à la question suivante
                self.current_q += 1
                timer.set_timeout(self.next_question, 1500)
                
            def next_question(self):
                # Remettre les couleurs par défaut
                true_btn.style.background = ""
                false_btn.style.background = ""
                true_btn.style.background = "#4CAF50"
                false_btn.style.background = "#f44336"
                
                if self.current_q < self.total_q:
                    self.show_question()
                else:
                    self.game_over()
                    
            def game_over(self):
                # Sauvegarder le meilleur score
                if self.score > self.best_score:
                    self.best_score = self.score
                    localStorage.setItem("vraiFaux_best", str(self.best_score))
                    best_span.textContent = str(self.best_score)
                
                # Afficher message personnalisé
                if self.score == 10:
                    message = "🎉 Parfait ! T'as tout juste ! T'es un génie !"
                elif self.score >= 8:
                    message = "🌟 Super score ! T'es très fort !"
                elif self.score >= 5:
                    message = "👍 Pas mal ! Continue comme ça !"
                else:
                    message = "💪 Essaie encore, tu vas y arriver !"
                
                message_p.textContent = message
                final_score_span.textContent = str(self.score)
                game_over_div.classList.remove("hidden")
                
        # Initialiser le jeu
        game = Game()
        game.show_question()
        
        # Gestionnaire de clics
        def on_true_click(event):
            game.check_answer(True)
            
        def on_false_click(event):
            game.check_answer(False)
            
        def restart_game():
            nonlocal game
            game = Game()
            game.show_question()
            game_over_div.classList.add("hidden")
            
        true_btn.bind("click", on_true_click)
        false_btn.bind("click", on_false_click)
        window.restartGame = restart_game
        
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
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.game-container {
    background: white;
    border-radius: 30px;
    padding: 40px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    max-width: 600px;
    width: 100%;
    text-align: center;
}

.title {
    color: #333;
    margin-bottom: 30px;
    font-size: 36px;
}

.score-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    background: #f0f0f0;
    padding: 15px 25px;
    border-radius: 50px;
    font-size: 20px;
    font-weight: bold;
}

.score {
    color: #667eea;
}

.best-score {
    color: #ff6b6b;
}

.question-container {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 30px;
    border-radius: 20px;
    margin-bottom: 30px;
    box-shadow: 0 10px 30px rgba(102,126,234,0.4);
}

.category {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 15px;
    opacity: 0.9;
}

.question {
    font-size: 24px;
    line-height: 1.4;
    font-weight: bold;
}

.answer-buttons {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
}

.answer-btn {
    flex: 1;
    padding: 20px;
    font-size: 28px;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: white;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.answer-btn:disabled {
    cursor: not-allowed;
    opacity: 0.7;
}

.true-btn {
    background: #4CAF50;
    box-shadow: 0 10px 20px rgba(76, 175, 80, 0.3);
}

.true-btn:hover:not(:disabled) {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(76, 175, 80, 0.4);
}

.false-btn {
    background: #f44336;
    box-shadow: 0 10px 20px rgba(244, 67, 54, 0.3);
}

.false-btn:hover:not(:disabled) {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(244, 67, 54, 0.4);
}

.feedback {
    font-size: 20px;
    padding: 15px;
    border-radius: 50px;
    margin-bottom: 20px;
    min-height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.feedback.correct {
    background: #d4edda;
    color: #155724;
    border: 2px solid #c3e6cb;
}

.feedback.incorrect {
    background: #f8d7da;
    color: #721c24;
    border: 2px solid #f5c6cb;
}

.progress {
    font-size: 18px;
    color: #666;
}

.game-over {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 40px;
    border-radius: 30px;
    text-align: center;
    box-shadow: 0 30px 60px rgba(0,0,0,0.3);
    z-index: 1000;
    max-width: 400px;
    width: 90%;
    border: 5px solid linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.game-over h2 {
    font-size: 32px;
    color: #333;
    margin-bottom: 20px;
}

.game-over p {
    font-size: 20px;
    color: #666;
    margin-bottom: 15px;
}

.game-over #message {
    color: #667eea;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 25px;
}

.game-over button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 15px 40px;
    font-size: 20px;
    font-weight: bold;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 10px 20px rgba(102,126,234,0.4);
}

.game-over button:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(102,126,234,0.5);
}

.hidden {
    display: none;
}

@media (max-width: 500px) {
    .game-container {
        padding: 20px;
    }
    
    .title {
        font-size: 28px;
    }
    
    .question {
        font-size: 20px;
    }
    
    .answer-btn {
        font-size: 20px;
        padding: 15px;
    }
    
    .score-container {
        font-size: 16px;
    }
}
`,
    
    // Code JavaScript (vide car Brython gère tout)
    js: ``
};