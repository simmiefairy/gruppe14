/* --- Data: Kurv og Senest Sete Produkter --- */
let indkøbskurv = [];
let produkter = [
    { 
        navn: "Nilfisk One MBB10P05A1 støvsuger", 
        pris: "649,-", 
        billede: "images/produkt1_copy.png" 
    },
    { 
        navn: "Lenovo Legion R24e 23,8\" Full HD gamingskærm", 
        pris: "599,-", 
        billede: "images/produkt2_copy.png" 
    },
    { 
        navn: "Eico 80X ANNIVERSARY ED induktionskogeplade med integreret emhætte", 
        pris: "7499,-", 
        billede: "images/produkt3_copy.png" 
    }
];

// Indlæs kurven fra localStorage
function indlæsKurv() {
    const gemtKurv = localStorage.getItem("indkøbskurv");
    if (gemtKurv) {
        indkøbskurv = JSON.parse(gemtKurv);
    }
    opdaterKurvDisplay();
}

// Gem kurven til localStorage
function gemKurv() {
    localStorage.setItem("indkøbskurv", JSON.stringify(indkøbskurv));
}

// Tilføj produkt til kurven
function tilføjTilKurv(navn, pris, billede) {
    const eksisterende = indkøbskurv.find(item => item.navn === navn);
    
    if (eksisterende) {
        eksisterende.mængde++;
    } else {
        indkøbskurv.push({
            navn: navn,
            pris: pris,
            billede: billede,
            mængde: 1
        });
    }
    
    gemKurv();
    opdaterKurvDisplay();
    
    // Åbn kurven når noget tilføjes
    if (!sidebar.classList.contains("vis")) {
        skiftMenuStatus();
    }
}

// Fjern produkt fra kurven
function fjernFraKurv(index) {
    indkøbskurv.splice(index, 1);
    gemKurv();
    opdaterKurvDisplay();
}

// Ændre mængde af produkt
function ændreMængde(index, nyMængde) {
    if (indkøbskurv[index]) {
        indkøbskurv[index].mængde = nyMængde;
        if (indkøbskurv[index].mængde <= 0) {
            fjernFraKurv(index);
        } else {
            gemKurv();
            opdaterKurvDisplay();
        }
    }
}

// Opdater kurv display
function opdaterKurvDisplay() {
    const kartTal = indkøbskurv.reduce((sum, item) => sum + item.mængde, 0);
    
    // Opdater knappen i headeren
    faneKurv.textContent = `Indkøbskurv (${kartTal})`;
    
    // Opdater kurvindholdet
    if (indkøbskurv.length === 0) {
        divKurvIndhold.innerHTML = `
            <img src="images/empty-shopping-cart.svg" alt="Tom kurv" class="ikon" style="width: 150px;">
            <h2>DIN INDKØBSKURV ER TOM</h2>
            <p>Shop videre og find lige de produkter du leder efter.</p>
        `;
    } else {
        let html = "";
        let total = 0;
        
        indkøbskurv.forEach((item, index) => {
            const prisNum = parseInt(item.pris.replace(/[^0-9]/g, ""));
            const itemTotal = prisNum * item.mængde;
            total += itemTotal;
            
            html += `
                <div class="kurv-item">
                    <img src="${item.billede}" alt="${item.navn}" class="kurv-billede">
                    <div class="kurv-info">
                        <div class="kurv-navn">${item.navn}</div>
                        <div class="kurv-pris">${item.pris}</div>
                    </div>
                    <div class="kurv-mængde">
                        <button onclick="ændreMængde(${index}, ${item.mængde - 1})" class="mængde-btn">-</button>
                        <span>${item.mængde}</span>
                        <button onclick="ændreMængde(${index}, ${item.mængde + 1})" class="mængde-btn">+</button>
                    </div>
                    <button onclick="fjernFraKurv(${index})" class="fjern-btn">✕</button>
                </div>
            `;
        });
        
        html += `<div class="kurv-total"><strong>Total: ${total},-</strong></div>`;
        divKurvIndhold.innerHTML = html;
    }
}

// ... resten af din kode (funktioner og events) fortsætter herunder ...

/* --- Hent elementer --- */
const sidebar = document.getElementById("sidebar");
const backdrop = document.getElementById("backdrop");
const btnLuk = document.getElementById("btn-luk");
const btnShopVidere = document.getElementById("btn-shop-videre");

const cartTrigger = document.getElementById("cart-trigger");

const faneKurv = document.getElementById("fane-kurv");
const faneSenest = document.getElementById("fane-senest");

const divKurvIndhold = document.getElementById("kurv-indhold");
const divSenestIndhold = document.getElementById("senest-indhold");
const divProduktListe = document.getElementById("produkt-liste");


/* --- Funktioner --- */

// Åbn/Luk funktion
function skiftMenuStatus(e) {
    // Hvis 'e' findes (eventet), så stop linket i at reload siden
    if(e) e.preventDefault();
    
    sidebar.classList.toggle("vis");
    backdrop.classList.toggle("vis");
}

// Skift fane funktion
function skiftFane(valgtFane) {
    if (valgtFane === "kurv") {
        divKurvIndhold.style.display = "block";
        divSenestIndhold.style.display = "none";
        faneKurv.classList.add("aktiv");
        faneSenest.classList.remove("aktiv");
        
    } else if (valgtFane === "senest") {
        divKurvIndhold.style.display = "none";
        divSenestIndhold.style.display = "block";
        faneSenest.classList.add("aktiv");
        faneKurv.classList.remove("aktiv");
        
        opdaterListen();
    }
}

// Generer listen over senest sete
function opdaterListen() {
    divProduktListe.innerHTML = "";

    if (produkter.length === 0) {
        divProduktListe.innerHTML = `
            <div class="tom-besked">
                <span class="emoji-stor">👀</span>
                <h2>Dine senest sete varer</h2>
                <p>Du har ikke kigget på nogen produkter endnu.</p>
            </div>
        `;
    } else {
        // Her bygger vi listen med de rigtige klasser til styling
        for (let produkt of produkter) {
            let html = `
                <div class="senest-kort">
                    <div class="billede-container">
                        <img src="${produkt.billede}" class="senest-billede">
                    </div>
                    <div class="senest-info">
                        <div class="senest-navn">${produkt.navn}</div>
                        <div class="senest-pris">${produkt.pris}</div>
                    </div>
                </div>
            `;
            divProduktListe.innerHTML += html;
        }
    }
}

/* --- Events --- */

if(cartTrigger) {
    cartTrigger.addEventListener("click", skiftMenuStatus);
}

// Luk-knapper
btnLuk.addEventListener("click", skiftMenuStatus);
backdrop.addEventListener("click", skiftMenuStatus);
btnShopVidere.addEventListener("click", skiftMenuStatus); // Shop videre lukker bare kurven

// Faner
faneKurv.addEventListener("click", function() { skiftFane("kurv"); });
faneSenest.addEventListener("click", function() { skiftFane("senest"); });

// Tilføj knapper
document.querySelectorAll(".tilføj-kurv").forEach(button => {
    button.addEventListener("click", function(e) {
        e.preventDefault();
        const produktNavn = this.dataset.productName;
        const produktPris = this.dataset.productPrice;
        const produktBillede = this.dataset.productImage;
        
        if (produktNavn && produktPris && produktBillede) {
            tilføjTilKurv(produktNavn, produktPris, produktBillede);
        }
    });
});

// Indlæs kurven når siden loader
indlæsKurv();