// projets/jeu-pierre.js

export const project = {
    name: 'Pierre - Papier - Ciseaux',
    html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pierre Papier Ciseaux</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="game">
        <h1>✂️ Pierre Papier Ciseaux</h1>
        
        <div class="score">
            <div class="score-box">
                <span class="score-label">Vous</span>
                <span id="player-score" class="score-value">0</span>
            </div>
            <div class="score-box">
                <span class="score-label">IA</span>
                <span id="computer-score" class="score-value">0</span>
            </div>
        </div>

        <div class="choices">
            <button class="choice-btn" data-choice="pierre">🪨</button>
            <button class="choice-btn" data-choice="papier">📄</button>
            <button class="choice-btn" data-choice="ciseaux">✂️</button>
        </div>

        <div class="result" id="result">
            Cliquez pour jouer !
        </div>

        <button id="reset" class="reset-btn">↺ Nouvelle partie</button>
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

.game {
    background: #e0e5ec;
    padding: 40px;
    border-radius: 50px;
    box-shadow: 20px 20px 30px #a3b1c6, -20px -20px 30px #ffffff;
    text-align: center;
    max-width: 500px;
    width: 90%;
}

h1 {
    color: #4a4e69;
    margin-bottom: 30px;
    font-size: 28px;
}

.score {
    display: flex;
    justify-content: space-around;
    margin-bottom: 40px;
}

.score-box {
    background: #e0e5ec;
    padding: 15px 25px;
    border-radius: 20px;
    box-shadow: 10px 10px 15px #a3b1c6, -10px -10px 15px #ffffff;
}

.score-label {
    display: block;
    color: #4a4e69;
    font-size: 14px;
    margin-bottom: 5px;
}

.score-value {
    font-size: 32px;
    font-weight: 700;
    color: #4c9a8c;
}

.choices {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 30px;
}

.choice-btn {
    width: 80px;
    height: 80px;
    border: none;
    border-radius: 30px;
    background: #e0e5ec;
    box-shadow: 10px 10px 15px #a3b1c6, -10px -10px 15px #ffffff;
    font-size: 40px;
    cursor: pointer;
    transition: 0.1s;
}

.choice-btn:active {
    box-shadow: inset 10px 10px 15px #a3b1c6, inset -10px -10px 15px #ffffff;
    transform: scale(0.95);
}

.result {
    background: #e0e5ec;
    padding: 20px;
    border-radius: 30px;
    box-shadow: inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff;
    color: #4a4e69;
    font-size: 18px;
    margin-bottom: 20px;
    min-height: 60px;
}

.reset-btn {
    background: #e0e5ec;
    border: none;
    padding: 12px 30px;
    border-radius: 30px;
    box-shadow: 5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff;
    color: #4a4e69;
    font-size: 16px;
    cursor: pointer;
}

.reset-btn:active {
    box-shadow: inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff;
}`,
    
    js: `let playerScore = 0;
let computerScore = 0;

const choices = ['pierre', 'papier', 'ciseaux'];
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const resultEl = document.getElementById('result');

document.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const playerChoice = btn.dataset.choice;
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        playRound(playerChoice, computerChoice);
    });
});

function playRound(player, computer) {
    if (player === computer) {
        resultEl.textContent = \`Égalité ! \${player} contre \${computer}\`;
        return;
    }

    const playerWins = 
        (player === 'pierre' && computer === 'ciseaux') ||
        (player === 'papier' && computer === 'pierre') ||
        (player === 'ciseaux' && computer === 'papier');

    if (playerWins) {
        playerScore++;
        resultEl.textContent = \`✅ Gagné ! \${player} bat \${computer}\`;
    } else {
        computerScore++;
        resultEl.textContent = \`❌ Perdu ! \${computer} bat \${player}\`;
    }

    updateScore();
}

function updateScore() {
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
}

document.getElementById('reset').addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    updateScore();
    resultEl.textContent = 'Nouvelle partie !';
});`
};