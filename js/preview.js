// js/preview.js

document.addEventListener('DOMContentLoaded', () => {
    initPreview();
});

function initPreview() {
    // Récupère les données
    const data = localStorage.getItem('preview_data');
    if (!data) {
        showError('Aucun projet à afficher');
        return;
    }

    try {
        const { html, css, js } = JSON.parse(data);
        
        // Extrait le titre
        const title = extractTitle(html) || 'projet.html';
        document.getElementById('projectTitle').textContent = title;
        
        // Génère le rendu
        renderPreview(html, css, js);
        
    } catch (e) {
        showError('Erreur de chargement');
        console.error(e);
    }

    // Bouton retour
    document.getElementById('back-btn').addEventListener('click', () => {
        window.close();
        // Fallback si window.close ne fonctionne pas
        setTimeout(() => window.location.href = 'codage.html', 100);
    });

    // Bouton téléchargement
    document.getElementById('download-btn').addEventListener('click', downloadZip);
}

function renderPreview(html, css, js) {
    const iframe = document.getElementById('preview-iframe');
    
    // Nettoie l'iframe
    iframe.srcdoc = ''; 
    
    // Construit le document complet
    const fullDocument = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>${css}</style>
</head>
<body>
    ${html}
    <script>${js}<\/script>
</body>
</html>`;
    
    iframe.srcdoc = fullDocument;
}

function extractTitle(html) {
    const match = html.match(/<title>(.*?)<\/title>/i);
    return match ? match[1] : 'projet.html';
}

function showError(message) {
    const iframe = document.getElementById('preview-iframe');
    iframe.srcdoc = `<div style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-family: system-ui;
        color: #ff6b6b;
        background: #f5f5f5;
    ">❌ ${message}</div>`;
}

// js/preview.js - Correction ZIP

async function downloadZip() {
    const data = localStorage.getItem('preview_data');
    if (!data) {
        alert('❌ Aucun projet à télécharger');
        return;
    }
    
    try {
        const { html, css, js } = JSON.parse(data);
        const title = extractTitle(html) || 'projet';
        const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'projet';
        
        // Charge JSZip depuis CDN
        if (!window.JSZip) {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js');
        }
        
        const zip = new JSZip();
        
        // Nettoie les chemins dans le HTML
        const cleanHtml = html
            .replace(/<link rel="stylesheet" href="style\.css">/, '<link rel="stylesheet" href="style.css">')
            .replace(/<script src="script\.js"><\/script>/, '<script src="script.js"><\/script>');
        
        zip.file('index.html', cleanHtml);
        zip.file('style.css', css || '/* vide */');
        zip.file('script.js', js || '// vide');
        
        const content = await zip.generateAsync({ 
            type: 'blob',
            compression: 'DEFLATE',
            compressionOptions: { level: 6 }
        });
        
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${safeTitle}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Feedback
        const btn = document.getElementById('download-btn');
        btn.style.color = '#4c9a8c';
        setTimeout(() => btn.style.color = '', 500);
        
    } catch (e) {
        console.error('Erreur ZIP:', e);
        alert('❌ Erreur lors de la création du ZIP: ' + e.message);
    }
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}