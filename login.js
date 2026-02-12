// ------------------------------
// Simulerede brugere (array + objekter)
// ------------------------------
let users = [
  {
    id: 1,
    email: "kunde@power.dk",
    phone: "12345678",
    password: "1234",
    name: "Power Kunde"
  }
];

// ------------------------------
// Variabler
// ------------------------------
let selectedUser = null;

// Panel DOM-elementer
let step1Panel = document.getElementById("step1Panel");
let step2Panel = document.getElementById("step2Panel");

let continueBtnPanel = document.getElementById("continueBtnPanel");
let loginBtnPanel = document.getElementById("loginBtnPanel");
let dropbtn = document.querySelector(".dropbtn");
let loginLogoutLink = document.getElementById("loginLogoutLink");

// Tilføj event listeners
if (continueBtnPanel) {
  continueBtnPanel.addEventListener("click", handleContinue);
}

if (loginBtnPanel) {
  loginBtnPanel.addEventListener("click", handleLogin);
}

// Enter-genveje for input-felterne
document.getElementById("identifierPanel").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    handleContinue();
  }
});

document.getElementById("passwordPanel").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    handleLogin();
  }
});

// ------------------------------
// Handler funktioner
// ------------------------------

// TRIN 1 – Find bruger
function handleContinue() {
  let input = document.getElementById("identifierPanel").value;
  let error1Panel = document.getElementById("error1Panel");

  error1Panel.textContent = "";
  selectedUser = users.find(u => u.email === input || u.phone === input);

  if (selectedUser) {
    step1Panel.style.display = "none";
    step2Panel.style.display = "block";
  } else {
    error1Panel.textContent = "Indtast e-mail eller telefonnummer";    
    error1Panel.style.color = "#ef6637";
    error1Panel.style.fontSize = "14px";
    error1Panel.style.marginTop = "-5px";
  }
}

// TRIN 2 – Tjek adgangskode
function handleLogin() {
  let password = document.getElementById("passwordPanel").value;
  let error2Panel = document.getElementById("error2Panel");

  error2Panel.textContent = "";

  if (selectedUser && selectedUser.password === password) {
    // Opdater dropbtn med brugernavn
    if (dropbtn) {
      dropbtn.textContent = selectedUser.name;
    }
    
    // Opdater login/logout link
    if (loginLogoutLink) {
      loginLogoutLink.textContent = "Log ud";
    }
    
    // Luk login panel
    document.getElementById("loginPanel").style.display = "none";
    document.getElementById("loginPanelOverlay").style.display = "none";
    
    // Reset form
    step1Panel.style.display = "block";
    step2Panel.style.display = "none";
    document.getElementById("identifierPanel").value = "";
    document.getElementById("passwordPanel").value = "";
  } else {
    error2Panel.textContent = "Forkert adgangskode";
    error2Panel.style.color = "#ef6637";
    error2Panel.style.fontSize = "14px";
    error2Panel.style.marginTop = "-5px";
  }
}

// Handler for Log ind / Log ud link
function handleLoginLogout(event) {
  event.preventDefault();
  
  if (selectedUser) {
    // Brugeren er logget ind – log ud
    logout();
  } else {
    // Brugeren er ikke logget ind – åbn login panel
    openLoginPanel(event);
  }
}

// Logout funktion
function logout() {
  // Nulstil brugeren
  selectedUser = null;
  
  // Skift knap tilbage til "Log ind"
  if (dropbtn) {
    dropbtn.textContent = "MyPower";
  }
  if (loginLogoutLink) {
    loginLogoutLink.textContent = "Log ind";
  }
  
  // Vis loginPanel igen hvis brugeren vil logge ind igen
  document.getElementById("loginPanel").style.display = "block";
  document.getElementById("loginPanelOverlay").style.display = "block";
}

// ------------------------------
// Sidepanel funktioner
// ------------------------------
function openLoginPanel(event) {
  event.preventDefault();
  const panel = document.getElementById('loginPanel');
  const overlay = document.getElementById('loginPanelOverlay');
  panel.classList.add('open');
  overlay.classList.add('open');
}

function closeLoginPanel() {
  const panel = document.getElementById('loginPanel');
  const overlay = document.getElementById('loginPanelOverlay');
  panel.classList.remove('open');
  overlay.classList.remove('open');
}
