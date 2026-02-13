window.project = {
    // Nom affiché dans la sidebar
    name: 'Quiz HTML Infini',
    
    // Code HTML complet
    html: `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz HTML Infini</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="quiz-container">
        <div class="quiz-header">
            <div class="stats">
                <div class="score">Score: <span id="score">0</span></div>
                <div class="streak">🔥 <span id="streak">0</span></div>
            </div>
            <div class="timer" id="timer">⏱️ 10s</div>
        </div>
        
        <div class="question-container">
            <div class="question-number" id="questionNumber">Question #<span id="currentQuestion">1</span></div>
            <h2 class="question" id="question">Chargement...</h2>
        </div>
        
        <div class="options-container" id="options">
            <!-- Les options seront générées ici -->
        </div>
        
        <div class="feedback" id="feedback"></div>
        
        <div class="game-over hidden" id="gameOver">
            <h2>Quiz Terminé!</h2>
            <p>Score final: <span id="finalScore">0</span></p>
            <p>Meilleur score: <span id="bestScore">0</span></p>
            <p>Questions répondues: <span id="totalQuestions">0</span></p>
            <button onclick="restartQuiz()">Nouvelle partie</button>
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

.quiz-container {
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 600px;
    padding: 30px;
}

.quiz-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;
}

.stats {
    display: flex;
    gap: 20px;
}

.score, .streak {
    font-size: 18px;
    font-weight: bold;
    padding: 8px 15px;
    border-radius: 10px;
}

.score {
    background: #667eea;
    color: white;
}

.streak {
    background: #ff6b6b;
    color: white;
}

.timer {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    background: #f0f0f0;
    padding: 8px 20px;
    border-radius: 10px;
}

.timer.warning {
    color: #ff6b6b;
    animation: pulse 1s infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.question-container {
    margin-bottom: 30px;
}

.question-number {
    font-size: 14px;
    color: #999;
    margin-bottom: 10px;
}

.question {
    font-size: 24px;
    color: #333;
    line-height: 1.4;
}

.options-container {
    display: grid;
    gap: 15px;
    margin-bottom: 20px;
}

.option {
    background: #f8f9fa;
    border: 2px solid #e9ecef;
    border-radius: 10px;
    padding: 15px 20px;
    font-size: 16px;
    text-align: left;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.option:hover:not(.disabled) {
    background: #e9ecef;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.option.correct {
    background: #d4edda;
    border-color: #28a745;
    color: #155724;
}

.option.incorrect {
    background: #f8d7da;
    border-color: #dc3545;
    color: #721c24;
}

.option.disabled {
    pointer-events: none;
    opacity: 0.7;
}

.option::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: transparent;
    transition: background 0.3s ease;
}

.option:hover::before:not(.disabled) {
    background: #667eea;
}

.feedback {
    text-align: center;
    font-size: 18px;
    min-height: 40px;
    margin-top: 20px;
    padding: 10px;
    border-radius: 10px;
    transition: all 0.3s ease;
}

.feedback.correct {
    background: #d4edda;
    color: #155724;
}

.feedback.incorrect {
    background: #f8d7da;
    color: #721c24;
}

.game-over {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 40px;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    z-index: 1000;
    max-width: 400px;
    width: 90%;
}

.game-over h2 {
    font-size: 32px;
    color: #333;
    margin-bottom: 20px;
}

.game-over p {
    font-size: 18px;
    color: #666;
    margin-bottom: 10px;
}

.game-over button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 15px 40px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 20px;
    transition: all 0.3s ease;
}

.game-over button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
}

.hidden {
    display: none;
}

@media (max-width: 480px) {
    .quiz-container {
        padding: 20px;
    }
    
    .quiz-header {
        flex-direction: column;
        gap: 10px;
    }
    
    .question {
        font-size: 20px;
    }
    
    .option {
        padding: 12px 15px;
    }
}

/* Animation pour les bonnes réponses */
@keyframes correctFlash {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); background: #d4edda; }
}

.correct-answer {
    animation: correctFlash 0.5s ease;
}
`,
    
    // Code JavaScript
    js: `
// État du jeu
let score = 0;
let streak = 0;
let questionCount = 0;
let bestScore = localStorage.getItem('quizBestScore') || 0;
let timerInterval;
let timeLeft = 10;
let canAnswer = true;
let currentQuestion = null;

// Éléments DOM
const scoreElement = document.getElementById('score');
const streakElement = document.getElementById('streak');
const timerElement = document.getElementById('timer');
const questionElement = document.getElementById('question');
const questionNumberElement = document.getElementById('currentQuestion');
const optionsContainer = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const bestScoreElement = document.getElementById('bestScore');
const totalQuestionsElement = document.getElementById('totalQuestions');

// Afficher le meilleur score
bestScoreElement.textContent = bestScore;

// Banque de templates de questions
const questionTemplates = [
    // Balises de base
    {
        generate: () => ({
            question: "Quelle balise est utilisée pour créer un titre de niveau 1 ?",
            options: ["<h1>", "<head>", "<header>", "<heading>"],
            correct: 0
        })
    },
    {
        generate: () => ({
            question: "Quelle balise définit un paragraphe en HTML ?",
            options: ["<p>", "<para>", "<paragraph>", "<text>"],
            correct: 0
        })
    },
    {
        generate: () => ({
            question: "Quelle balise est utilisée pour créer un lien hypertexte ?",
            options: ["<link>", "<a>", "<href>", "<url>"],
            correct: 1
        })
    },
    {
        generate: () => ({
            question: "Quelle balise affiche une image ?",
            options: ["<picture>", "<img>", "<image>", "<src>"],
            correct: 1
        })
    },
    
    // Attributs
    {
        generate: () => ({
            question: "Quel attribut définit l'URL d'un lien ?",
            options: ["src", "link", "href", "url"],
            correct: 2
        })
    },
    {
        generate: () => ({
            question: "Quel attribut définit la source d'une image ?",
            options: ["src", "source", "img", "href"],
            correct: 0
        })
    },
    {
        generate: () => ({
            question: "Quel attribut rend un champ de formulaire obligatoire ?",
            options: ["required", "mandatory", "must", "obligatoire"],
            correct: 0
        })
    },
    
    // HTML5
    {
        generate: () => ({
            question: "Quelle balise HTML5 est utilisée pour la navigation ?",
            options: ["<navigation>", "<nav>", "<menu>", "<links>"],
            correct: 1
        })
    },
    {
        generate: () => ({
            question: "Quelle balise définit un article indépendant ?",
            options: ["<post>", "<entry>", "<article>", "<content>"],
            correct: 2
        })
    },
    {
        generate: () => ({
            question: "Quelle balise regroupe du contenu dans un formulaire ?",
            options: ["<group>", "<fieldset>", "<formgroup>", "<fields>"],
            correct: 1
        })
    },
    
    // Listes
    {
        generate: () => ({
            question: "Quelle balise crée une liste non ordonnée ?",
            options: ["<ol>", "<ul>", "<list>", "<li>"],
            correct: 1
        })
    },
    {
        generate: () => ({
            question: "Quelle balise crée une liste ordonnée ?",
            options: ["<ol>", "<ul>", "<list>", "<order>"],
            correct: 0
        })
    },
    
    // Tableaux
    {
        generate: () => ({
            question: "Quelle balise crée une ligne dans un tableau ?",
            options: ["<td>", "<tr>", "<th>", "<row>"],
            correct: 1
        })
    },
    {
        generate: () => ({
            question: "Quelle balise définit une cellule d'en-tête dans un tableau ?",
            options: ["<td>", "<tr>", "<th>", "<header>"],
            correct: 2
        })
    },
    
    // Formulaires
    {
        generate: () => ({
            question: "Quelle balise crée un champ de saisie texte ?",
            options: ["<text>", "<input type='text'>", "<field>", "<textarea>"],
            correct: 1
        })
    },
    {
        generate: () => ({
            question: "Quelle balise crée une zone de texte multiligne ?",
            options: ["<input type='text'>", "<textarea>", "<multiline>", "<textbox>"],
            correct: 1
        })
    },
    
    // Sémantique
    {
        generate: () => ({
            question: "Quelle balise définit le pied de page d'un document ?",
            options: ["<bottom>", "<footer>", "<foot>", "<end>"],
            correct: 1
        })
    },
    {
        generate: () => ({
            question: "Quelle balise définit l'en-tête d'un document ?",
            options: ["<head>", "<header>", "<top>", "<heading>"],
            correct: 1
        })
    }
];

// Générer une nouvelle question
function generateQuestion() {
    // Choisir un template aléatoire
    const template = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
    return template.generate();
}

// Mélanger un tableau (algorithme de Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Afficher une question
function displayQuestion() {
    // Générer une nouvelle question
    currentQuestion = generateQuestion();
    questionCount++;
    
    // Mettre à jour l'interface
    questionNumberElement.textContent = questionCount;
    questionElement.textContent = currentQuestion.question;
    
    // Créer les options (mélangées)
    const shuffledOptions = shuffleArray([...currentQuestion.options]);
    const correctAnswerText = currentQuestion.options[currentQuestion.correct];
    const correctIndex = shuffledOptions.indexOf(correctAnswerText);
    
    optionsContainer.innerHTML = '';
    shuffledOptions.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.dataset.index = index;
        button.dataset.correct = (index === correctIndex).toString();
        button.addEventListener('click', () => checkAnswer(button));
        optionsContainer.appendChild(button);
    });
    
    // Réinitialiser le timer
    resetTimer();
    canAnswer = true;
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
}

// Vérifier la réponse
function checkAnswer(selectedButton) {
    if (!canAnswer) return;
    
    const isCorrect = selectedButton.dataset.correct === 'true';
    const allOptions = document.querySelectorAll('.option');
    
    // Désactiver toutes les options
    allOptions.forEach(opt => {
        opt.classList.add('disabled');
        if (opt.dataset.correct === 'true') {
            opt.classList.add('correct');
        }
    });
    
    // Marquer la réponse sélectionnée
    if (isCorrect) {
        selectedButton.classList.add('correct');
        feedbackElement.textContent = '✅ Bonne réponse !';
        feedbackElement.className = 'feedback correct';
        
        // Augmenter le score
        score += 10 + (streak * 5);
        streak++;
        
        // Animation de streak
        if (streak > 1) {
            feedbackElement.textContent += \` (Streak x\${streak} !)\`;
        }
    } else {
        selectedButton.classList.add('incorrect');
        feedbackElement.textContent = '❌ Mauvaise réponse !';
        feedbackElement.className = 'feedback incorrect';
        streak = 0;
    }
    
    // Mettre à jour l'affichage
    scoreElement.textContent = score;
    streakElement.textContent = streak;
    
    // Arrêter le timer
    clearInterval(timerInterval);
    canAnswer = false;
    
    // Passer à la question suivante après un délai
    setTimeout(() => {
        displayQuestion();
    }, 1500);
}

// Timer
function startTimer() {
    timeLeft = 10;
    timerElement.textContent = \`⏱️ \${timeLeft}s\`;
    timerElement.classList.remove('warning');
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = \`⏱️ \${timeLeft}s\`;
        
        if (timeLeft <= 3) {
            timerElement.classList.add('warning');
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (canAnswer) {
                // Temps écoulé
                feedbackElement.textContent = '⏰ Temps écoulé !';
                feedbackElement.className = 'feedback incorrect';
                
                // Montrer la bonne réponse
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.add('disabled');
                    if (opt.dataset.correct === 'true') {
                        opt.classList.add('correct');
                    }
                });
                
                streak = 0;
                streakElement.textContent = streak;
                canAnswer = false;
                
                setTimeout(() => {
                    displayQuestion();
                }, 1500);
            }
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    startTimer();
}

// Game Over
function gameOver() {
    clearInterval(timerInterval);
    
    // Mettre à jour le meilleur score
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('quizBestScore', bestScore);
    }
    
    // Afficher les statistiques
    finalScoreElement.textContent = score;
    bestScoreElement.textContent = bestScore;
    totalQuestionsElement.textContent = questionCount;
    
    gameOverElement.classList.remove('hidden');
}

// Redémarrer le quiz
function restartQuiz() {
    score = 0;
    streak = 0;
    questionCount = 0;
    
    scoreElement.textContent = score;
    streakElement.textContent = streak;
    
    gameOverElement.classList.add('hidden');
    
    displayQuestion();
}

// Initialisation
displayQuestion();

// Exposer la fonction pour le bouton
window.restartQuiz = restartQuiz;

// Gestionnaire d'erreur
window.addEventListener('error', (e) => {
    console.log('Erreur gérée:', e.message);
});
`
};