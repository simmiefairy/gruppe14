// ==========================================
// 1. DATA HÅNDTERING
// ==========================================

let lister = JSON.parse(localStorage.getItem('powerLister')) || [];
// Variabel til at huske hvilken liste der redigeres lige nu
let redigeresNuId = null;

// SLETTET: Koden der automatisk oprettede en liste hvis den var tom.
// Nu starter vi helt tomt, hvis brugeren ikke har lavet noget endnu.

function gemData() {
    localStorage.setItem('powerLister', JSON.stringify(lister));
}

// ==========================================
// 2. OPSTART
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('lists-container');
    if (container) renderLists();
    
    opdaterKnapperPaForsiden();
    setupInputListeners();
});

function setupInputListeners() {
    // Lyttere for Opret Panel
    const createInput = document.getElementById('list-name-input');
    if (createInput) {
        createInput.addEventListener('input', function() {
            document.getElementById('list-name-error').style.display = 'none';
            this.style.borderColor = '#ccc';
        });
        createInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') gemNyListe(); });
    }

    // Lyttere for Rediger Panel
    const editInput = document.getElementById('edit-list-name');
    if (editInput) {
        editInput.addEventListener('input', function() {
            document.getElementById('edit-list-error').style.display = 'none';
            this.style.borderColor = '#ccc';
        });
        editInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') gemRedigeretListe(); });
    }
}

// ==========================================
// 3. FUNKTIONER TIL FORSIDEN
// ==========================================
function tilfojTilFavorit(id, navn, pris, btn) {
    // SIKKERHEDSNET: Hvis brugeren klikker hjerte, men ingen lister findes,
    // så opretter vi en automatisk, så varen ikke forsvinder ud i den blå luft.
    if (lister.length === 0) {
        lister.push({ id: Date.now(), navn: 'Favoritter', produkter: [] });
    }

    let standardListe = lister[0]; // Lægger altid i første liste

    const eksisterer = standardListe.produkter.find(p => p.id === id);
    const icon = btn.querySelector('i');

    if (!eksisterer) {
        standardListe.produkter.push({ id, navn, pris });
        btn.classList.add('active');
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
    } else {
        standardListe.produkter = standardListe.produkter.filter(p => p.id !== id);
        btn.classList.remove('active');
        icon.classList.add('fa-regular');
        icon.classList.remove('fa-solid');
    }
    gemData();
}

function opdaterKnapperPaForsiden() {
    // Hvis der ingen lister er, kan ingen knapper være aktive
    if (lister.length === 0) return;

    const knapper = document.querySelectorAll('.fav-btn');
    if (knapper.length === 0) return;
    
    const standardListe = lister[0];

    knapper.forEach(btn => {
        const id = btn.getAttribute('onclick').split("'")[1]; 
        const findes = standardListe.produkter.some(p => p.id === id);
        const icon = btn.querySelector('i');
        
        if (findes) {
            btn.classList.add('active');
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
        } else {
            // Sørg for at nulstille, hvis varen blev fjernet fra listen manuelt
            btn.classList.remove('active');
            icon.classList.add('fa-regular');
            icon.classList.remove('fa-solid');
        }
    });
}

// ==========================================
// 4. VISNING AF LISTER (RENDER)
// ==========================================
function renderLists() {
    const container = document.getElementById('lists-container');
    if (!container) return; 
    container.innerHTML = ''; 

    // Hvis ingen lister findes, viser vi bare ingenting (eller en lille besked hvis du vil)
    if (lister.length === 0) {
        // Her kan du evt. skrive container.innerHTML = "<p>Ingen lister endnu...</p>";
        // Men lige nu lader vi den være helt tom som ønsket.
        return; 
    }

    lister.forEach((liste, index) => {
        const antal = liste.produkter.length;
        const totalPris = liste.produkter.reduce((sum, item) => sum + item.pris, 0);

        const wrapper = document.createElement('div');
        wrapper.className = 'list-wrapper';

        let contentHTML = '';
        
        if (antal === 0) {
            contentHTML = `
                <div class="empty-state">
                    <div style="position:relative; display:inline-block;">
                        <i class="fa-solid fa-box-open box"></i>
                        <div style="position:absolute; top:-10px; left:0; right:0; text-align:center;">
                             <i class="fa-regular fa-heart heart"></i>
                        </div>
                    </div>
                    <p class="empty-text">Du har ikke tilføjet nogen produkter endnu.</p>
                    <button class="edit-btn" onclick="abnRedigerPanel(${liste.id})">Ændre favoritliste</button>
                </div>
            `;
        } else {
            let productRows = liste.produkter.map(p => `
                <div class="product-item">
                    <div class="product-placeholder-img"><i class="fa-solid fa-image"></i></div>
                    <div class="product-info">
                        <span class="product-name">${p.navn}</span>
                        <span class="product-price">${p.pris},-</span>
                    </div>
                    <button onclick="sletProdukt(${liste.id}, '${p.id}')" style="border:none; background:none; cursor:pointer; color:#999;">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </div>
            `).join('');
            
            contentHTML = `
                <div style="text-align:left; max-width:800px; margin:0 auto;">
                    ${productRows}
                    <div style="text-align:center; margin-top:20px;">
                        <button class="edit-btn" onclick="abnRedigerPanel(${liste.id})">Ændre favoritliste</button>
                    </div>
                </div>
            `;
        }

        wrapper.innerHTML = `
            <div class="list-header" onclick="toggleListe(${index})">
                <div class="list-info">
                    <span class="list-name">${liste.navn}</span>
                    <span class="list-meta">${antal} Produkter</span>
                    <span class="list-meta">${totalPris},-</span>
                </div>
                <i class="fa-solid fa-chevron-down arrow-icon" id="arrow-${index}"></i>
            </div>
            <div class="list-content ${index === 0 ? 'show' : ''}" id="content-${index}">
                ${contentHTML}
            </div>
        `;

        container.appendChild(wrapper);
        
        // Åbn altid den første liste automatisk, hvis der er nogen
        if(index === 0) {
            const arrow = document.getElementById(`arrow-${index}`);
            if(arrow) arrow.classList.add('open');
        }
    });
}

function toggleListe(index) {
    const content = document.getElementById(`content-${index}`);
    const arrow = document.getElementById(`arrow-${index}`);
    if (content.classList.contains('show')) {
        content.classList.remove('show');
        arrow.classList.remove('open');
    } else {
        content.classList.add('show');
        arrow.classList.add('open');
    }
}

function sletProdukt(listeId, produktId) {
    const liste = lister.find(l => l.id === listeId);
    if (liste) {
        liste.produkter = liste.produkter.filter(p => p.id !== produktId);
        gemData(); renderLists(); 
    }
}

// ==========================================
// 5. OPRET NY LISTE (PANEL)
// ==========================================
function abnOpretPanel() {
    const input = document.getElementById('list-name-input');
    input.value = '';
    document.getElementById('list-name-error').style.display = 'none';
    input.style.borderColor = '#ccc';

    document.getElementById('overlay').classList.add('show');
    document.getElementById('create-list-panel').classList.add('open');
    setTimeout(() => input.focus(), 100);
}

function lukOpretPanel() {
    document.getElementById('overlay').classList.remove('show');
    document.getElementById('create-list-panel').classList.remove('open');
}

function gemNyListe() {
    const input = document.getElementById('list-name-input');
    const navn = input.value.trim();
    if (navn === "") {
        document.getElementById('list-name-error').style.display = 'block';
        input.style.borderColor = '#e00';
        input.focus();
        return; 
    }
    lister.push({ id: Date.now(), navn: navn, produkter: [] });
    gemData(); renderLists(); lukOpretPanel();
}

// ==========================================
// 6. REDIGER / SLET LISTE (PANEL)
// ==========================================

function abnRedigerPanel(id) {
    const liste = lister.find(l => l.id === id);
    if (!liste) return;

    redigeresNuId = id; 

    const input = document.getElementById('edit-list-name');
    const toggle = document.getElementById('delete-toggle');
    const errorMsg = document.getElementById('edit-list-error');

    input.value = liste.navn;
    toggle.checked = false; 
    errorMsg.style.display = 'none';
    input.style.borderColor = '#ccc';

    document.getElementById('overlay').classList.add('show');
    document.getElementById('edit-list-panel').classList.add('open');
    
    setTimeout(() => input.focus(), 100);
}

function lukRedigerPanel() {
    document.getElementById('overlay').classList.remove('show');
    document.getElementById('edit-list-panel').classList.remove('open');
    redigeresNuId = null;
}

function gemRedigeretListe() {
    if (!redigeresNuId) return;

    const input = document.getElementById('edit-list-name');
    const toggle = document.getElementById('delete-toggle');
    const navn = input.value.trim();

    if (toggle.checked) {
        lister = lister.filter(l => l.id !== redigeresNuId);
        gemData();
        renderLists();
        lukRedigerPanel();
        return;
    }

    if (navn === "") {
        document.getElementById('edit-list-error').style.display = 'block';
        input.style.borderColor = '#e00';
        input.focus();
        return;
    }

    const index = lister.findIndex(l => l.id === redigeresNuId);
    if (index !== -1) {
        lister[index].navn = navn;
        gemData();
        renderLists();
        lukRedigerPanel();
    }
}