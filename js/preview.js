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

async function downloadZip() {
    const data = localStorage.getItem('preview_data');
    if (!data) return;
    
    const { html, css, js } = JSON.parse(data);
    const title = extractTitle(html) || 'projet';
    
    try {
        // Utilisation de JSZip via CDN
        const JSZip = window.JSZip;
        if (!JSZip) {
            // Charge JSZip dynamiquement
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js');
        }
        
        const zip = new JSZip();
        
        // Ajoute les fichiers
        zip.file('index.html', html);
        zip.file('style.css', css);
        zip.file('script.js', js);
        
        // Génère et télécharge
        const content = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.replace(/\.html$/, '') || 'projet'}.zip`;
        a.click();
        URL.revokeObjectURL(url);
        
    } catch (e) {
        console.error('Erreur ZIP:', e);
        alert('❌ Erreur lors de la création du ZIP');
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