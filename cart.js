/* --- Data: Senest Sete Produkter --- */
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