/* --- Data: Senest Sete Produkter --- */
// Vi lader den være tom for at vise "Ingen produkter"-beskeden
let produkter = []; 

/* --- Hent elementer --- */
const sidebar = document.getElementById("sidebar");
const backdrop = document.getElementById("backdrop");
const btnLuk = document.getElementById("btn-luk");
const btnShopVidere = document.getElementById("btn-shop-videre");

// VIGTIGT: Vi henter knappen fra headeren via det ID vi tilføjede i Trin 1
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
        // Hvis du senere tilføjer produkter
        for (let produkt of produkter) {
            let html = `
                <div style="display:flex; gap:10px; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:10px;">
                    <img src="${produkt.billede}" style="width:50px;">
                    <div>
                        <h3>${produkt.navn}</h3>
                        <p>${produkt.pris}</p>
                    </div>
                </div>
            `;
            divProduktListe.innerHTML += html;
        }
    }
}

/* --- Events --- */

// Lyt efter klik på posen i headeren
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