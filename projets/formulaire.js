// projets/formulaire.js

export const project = {
    name: 'Formulaire de contact',
    html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulaire de contact</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="form-container">
        <h2>📬 Contactez-nous</h2>
        
        <form id="contactForm">
            <div class="form-group">
                <label for="name">Nom complet</label>
                <input type="text" id="name" placeholder="Jean Dupont" required>
            </div>
            
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="jean@exemple.com" required>
            </div>
            
            <div class="form-group">
                <label for="subject">Sujet</label>
                <input type="text" id="subject" placeholder="Demande d'information" required>
            </div>
            
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" rows="4" placeholder="Votre message..." required></textarea>
            </div>
            
            <button type="submit" class="submit-btn">Envoyer ✈️</button>
        </form>
        
        <div id="successMessage" class="success-message hidden">
            ✅ Message envoyé avec succès !
        </div>
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

.form-container {
    background: #e0e5ec;
    padding: 40px;
    border-radius: 50px;
    box-shadow: 20px 20px 30px #a3b1c6, -20px -20px 30px #ffffff;
    max-width: 500px;
    width: 90%;
}

h2 {
    color: #4a4e69;
    margin-bottom: 30px;
    text-align: center;
    font-size: 28px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 8px;
    color: #4a4e69;
    font-weight: 500;
    font-size: 14px;
}

input, textarea {
    width: 100%;
    padding: 14px 18px;
    border: none;
    border-radius: 30px;
    background: #e0e5ec;
    box-shadow: inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff;
    font-size: 16px;
    color: #4a4e69;
    font-family: 'Inter', sans-serif;
    box-sizing: border-box;
}

input:focus, textarea:focus {
    outline: none;
    box-shadow: inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff, 0 0 0 2px #4c9a8c40;
}

textarea {
    resize: vertical;
    min-height: 100px;
}

.submit-btn {
    width: 100%;
    padding: 16px;
    border: none;
    border-radius: 30px;
    background: #4c9a8c;
    color: white;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff;
    margin-top: 20px;
    transition: 0.1s;
}

.submit-btn:active {
    box-shadow: inset 8px 8px 15px #2f5e55, inset -8px -8px 15px #69d6c3;
}

.success-message {
    margin-top: 20px;
    padding: 15px;
    background: #4c9a8c20;
    border-radius: 30px;
    color: #4c9a8c;
    text-align: center;
    font-weight: 500;
    border: 1px solid #4c9a8c40;
}

.hidden {
    display: none;
}

::placeholder {
    color: #8a9cb0;
    font-style: italic;
}`,
    
    js: `const form = document.getElementById('contactForm');
const successMsg = document.getElementById('successMessage');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupère les valeurs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simule l'envoi
    console.log('📨 Formulaire envoyé :', { name, email, subject, message });
    
    // Affiche message succès
    successMsg.classList.remove('hidden');
    
    // Réinitialise le formulaire
    form.reset();
    
    // Cache le message après 3 secondes
    setTimeout(() => {
        successMsg.classList.add('hidden');
    }, 3000);
});

// Validation en temps réel (optionnel)
document.getElementById('email').addEventListener('input', function() {
    const isValid = this.value.includes('@') && this.value.includes('.');
    this.style.boxShadow = isValid 
        ? 'inset 5px 5px 10px #a3b1c6, inset -5px -5px 10px #ffffff' 
        : 'inset 5px 5px 10px #ff6b6b80, inset -5px -5px 10px #ffffff';
});`
};