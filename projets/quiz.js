// projets/quizz-musique.js

export const project = {
    name: 'Quiz musical',
    html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz musical</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="quiz-container">
        <h2>🎵 Devine l'artiste</h2>
        
        <div class="quiz-header">
            <div class="score">Score: <span id="score">0</span></div>
            <div class="question-number">Question <span id="current">1</span>/<span id="total">5</span></div>
        </div>
        
        <div class="question-box" id="question">
            Quel artiste a chanté "Bohemian Rhapsody" ?
        </div>
        
        <div class="answers" id="answers">
            <button class="answer-btn">Queen</button>
            <button class="answer-btn">Led Zeppelin</button>
            <button class="answer-btn">The Beatles</button>
            <button class="answer-btn">Pink Floyd</button>
        </div>
        
        <div class="feedback" id="feedback"></div>
        
        <button id="nextBtn" class="next-btn hidden">Question suivante →</button>
        <button id="restartBtn" class="restart-btn hidden">↺ Rejouer</button>
    </div>
    <script src="script.js"><\/script>
</body>
</html>`,
    
    css: `body {
    margin: 0;
    padding: 0;
    background: #e0e5ec;
    font-family: 'Inter', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.quiz-container {
    background: #e0e5ec;
    padding: 40px;
    border-radius: 50px;
    box-shadow: 20px 20px 30px #a3b1c6, -20px -20px 30px #ffffff;
    max-width: 600px;
    width: 90%;
}

h2 {
    color: #4a4e69;
    text-align: center;
    margin-bottom: 30px;
    font-size: 28px;
}

.quiz-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    color: #4a4e69;
    font-weight: 600;
}

.score, .question-number {
    background: #e0e5ec;
    padding: 10px 20px;
    border-radius: 30px;
    box-shadow: 5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff;
}

.question-box {
    background: #e0e5ec;
    padding: 25px;
    border-radius: 30px;
    box-shadow: inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff;
    margin-bottom: 30px;
    font-size: 18px;
    color: #4a4e69;
    line-height: 1.5;
}

.answers {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-bottom: 20px;
}

.answer-btn {
    background: #e0e5ec;
    border: none;
    padding: 15px;
    border-radius: 30px;
    box-shadow: 8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff;
    font-size: 16px;
    color: #4a4e69;
    cursor: pointer;
    transition: 0.1s;
}

.answer-btn:hover {
    transform: scale(0.98);
}

.answer-btn:active {
    box-shadow: inset 8px 8px 15px #a3b1c6, inset -8px -8px 15px #ffffff;
}

.answer-btn.correct {
    background: #4c9a8c;
    color: white;
    box-shadow: inset 5px 5px 10px #2f5e55, inset -5px -5px 10px #69d6c3;
}

.answer-btn.wrong {
    background: #ff6b6b;
    color: white;
    box-shadow: inset 5px 5px 10px #b34141, inset -5px -5px 10px #ff9595;
}

.answer-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.feedback {
    text-align: center;
    padding: 15px;
    margin: 20px 0;
    border-radius: 30px;
    font-weight: 500;
    min-height: 24px;
}

.next-btn, .restart-btn {
    width: 100%;
    padding: 15px;
    border: none;
    border-radius: 30px;
    background: #4c9a8c;
    color: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff;
    margin-top: 10px;
}

.hidden {
    display: none;
}`,
    
    js: `const questions = [
    {
        question: "Quel artiste a chanté 'Bohemian Rhapsody' ?",
        answers: ["Queen", "Led Zeppelin", "The Beatles", "Pink Floyd"],
        correct: 0
    },
    {
        question: "Quel est le vrai nom de David Bowie ?",
        answers: ["David Jones", "Robert Smith", "John Lennon", "Michael David"],
        correct: 0
    },
    {
        question: "Quel groupe a sorti l'album 'Dark Side of the Moon' ?",
        answers: ["Pink Floyd", "The Who", "Yes", "Genesis"],
        correct: 0
    },
    {
        question: "En quelle année est mort Michael Jackson ?",
        answers: ["2009", "2010", "2008", "2011"],
        correct: 0
    },
    {
        question: "Quel instrument jouait Jimi Hendrix ?",
        answers: ["Guitare", "Batterie", "Piano", "Basse"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let canAnswer = true;

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const scoreEl = document.getElementById('score');
const currentEl = document.getElementById('current');
const totalEl = document.getElementById('total');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');

totalEl.textContent = questions.length;

function loadQuestion() {
    canAnswer = true;
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    currentEl.textContent = currentQuestion + 1;
    
    answersEl.innerHTML = '';
    q.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = answer;
        btn.dataset.index = index;
        btn.addEventListener('click', () => checkAnswer(index));
        answersEl.appendChild(btn);
    });
    
    feedbackEl.textContent = '';
    feedbackEl.style.background = 'transparent';
    nextBtn.classList.add('hidden');
}

function checkAnswer(selected) {
    if (!canAnswer) return;
    
    canAnswer = false;
    const q = questions[currentQuestion];
    const buttons = document.querySelectorAll('.answer-btn');
    
    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === q.correct) {
            btn.classList.add('correct');
        }
        if (index === selected && index !== q.correct) {
            btn.classList.add('wrong');
        }
    });
    
    if (selected === q.correct) {
        score += 10;
        feedbackEl.textContent = '✅ Bravo ! Bonne réponse !';
        feedbackEl.style.color = '#4c9a8c';
    } else {
        feedbackEl.textContent = \`❌ Dommage ! La bonne réponse était : \${q.answers[q.correct]}\`;
        feedbackEl.style.color = '#ff6b6b';
    }
    
    scoreEl.textContent = score;
    
    if (currentQuestion === questions.length - 1) {
        setTimeout(() => {
            feedbackEl.textContent = \`🏆 Quiz terminé ! Score final: \${score} / \${questions.length * 10}\`;
            restartBtn.classList.remove('hidden');
        }, 500);
    } else {
        nextBtn.classList.remove('hidden');
    }
}

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    loadQuestion();
    nextBtn.classList.add('hidden');
});

restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    scoreEl.textContent = score;
    restartBtn.classList.add('hidden');
    loadQuestion();
});

loadQuestion();`
};