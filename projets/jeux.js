// projets/quiz-nature.js

window.project = {
    name: '🌿 Quiz sur la nature',
    html: `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Nature</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="quiz-container">
        <h1>🌍 Quiz Nature</h1>
        <div class="question" id="question">Question</div>
        <div class="options" id="options"></div>
        <div class="score" id="score">Score: 0</div>
        <button id="next" style="display: none;">Suivant</button>
    </div>
    <script src="script.js"><\/script>
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
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #74b9ff, #00b894);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.quiz-container {
    background: white;
    border-radius: 20px;
    padding: 40px;
    max-width: 600px;
    width: 100%;
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}

h1 {
    text-align: center;
    color: #2d3436;
    margin-bottom: 30px;
    font-size: 32px;
}

.question {
    font-size: 20px;
    color: #2d3436;
    margin-bottom: 20px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 10px;
    text-align: center;
}

.options {
    display: grid;
    gap: 10px;
    margin-bottom: 20px;
}

.option-btn {
    padding: 15px;
    border: none;
    background: #f8f9fa;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;
    text-align: left;
}

.option-btn:hover {
    background: #74b9ff;
    color: white;
    transform: translateX(5px);
}

.option-btn.correct {
    background: #00b894;
    color: white;
}

.option-btn.incorrect {
    background: #d63031;
    color: white;
}

.option-btn:disabled {
    cursor: not-allowed;
    opacity: 0.7;
}

.score {
    font-size: 18px;
    font-weight: bold;
    color: #2d3436;
    text-align: center;
    margin: 20px 0;
}

#next {
    width: 100%;
    padding: 15px;
    background: #00b894;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
}

#next:hover {
    background: #00a187;
    transform: scale(1.02);
}
`,
    js: `
const questions = [
    {
        question: "Quel est l'océan le plus profond ?",
        options: ["Atlantique", "Indien", "Pacifique", "Arctique"],
        correct: 2
    },
    {
        question: "Combien de cœurs a un poulpe ?",
        options: ["1", "2", "3", "4"],
        correct: 2
    },
    {
        question: "Quel est le plus grand animal sur Terre ?",
        options: ["Éléphant", "Baleine bleue", "Requin baleine", "Girafe"],
        correct: 1
    },
    {
        question: "Le bambou est-il un arbre ?",
        options: ["Oui", "Non", "C'est une herbe", "C'est un champignon"],
        correct: 2
    },
    {
        question: "Combien de temps vit une abeille ouvrière ?",
        options: ["6 mois", "6 semaines", "6 jours", "6 ans"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const scoreEl = document.getElementById('score');
const nextBtn = document.getElementById('next');

function loadQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    
    optionsEl.innerHTML = '';
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => checkAnswer(index);
        optionsEl.appendChild(btn);
    });
    
    nextBtn.style.display = 'none';
}

function checkAnswer(selected) {
    const correct = questions[currentQuestion].correct;
    const buttons = document.querySelectorAll('.option-btn');
    
    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === correct) {
            btn.classList.add('correct');
        } else if (index === selected && selected !== correct) {
            btn.classList.add('incorrect');
        }
    });
    
    if (selected === correct) {
        score += 10;
        scoreEl.textContent = \`Score: \${score}\`;
    }
    
    if (currentQuestion < questions.length - 1) {
        nextBtn.style.display = 'block';
    } else {
        setTimeout(() => {
            alert(\`🎉 Terminé ! Score final: \${score}/50\`);
        }, 500);
    }
}

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    loadQuestion();
});

// Initialisation
loadQuestion();
scoreEl.textContent = 'Score: 0';

console.log('✅ Quiz nature chargé !');
`
};
