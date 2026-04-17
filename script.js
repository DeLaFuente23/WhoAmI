const playersInput = document.getElementById("players");
const playerList = document.getElementById("player-list");
const linksList = document.getElementById("links");
const scrollCue = document.getElementById("scroll-cue");

let players = [];

function renderEmptyState() {
  linksList.innerHTML = '<li class="empty-state">Your generated player cards will appear here after you start a round.</li>';
}

function renderPlayers() {
  if (players.length === 0) {
    playerList.innerHTML = '<li class="name-empty">Your player list will appear here.</li>';
    return;
  }

  playerList.innerHTML = "";

  players.forEach((name, index) => {
    const item = document.createElement("li");
    item.className = "name-item";

    const tag = document.createElement("span");
    tag.className = "name-tag";
    tag.innerText = name;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.type = "button";
    removeBtn.innerText = "-";
    removeBtn.setAttribute("aria-label", `Remove ${name}`);
    removeBtn.addEventListener("click", () => removePlayer(index));

    item.appendChild(tag);
    item.appendChild(removeBtn);
    playerList.appendChild(item);
  });
}

function addPlayer() {
  const name = playersInput.value.trim();

  if (!name) {
    return;
  }

  players.push(name);
  playersInput.value = "";
  renderPlayers();
  playersInput.focus();
}

function removePlayer(index) {
  players.splice(index, 1);
  renderPlayers();
}

async function startGame() {
  if (players.length === 0) {
    alert("Please add at least one player.");
    return;
  }

  linksList.innerHTML = "";

  const base = window.location.origin + window.location.pathname.replace("index.html", "");
  const totalPlayers = players.length;

  players.forEach((name, i) => {
    const url = `${base}player.html?name=${encodeURIComponent(name)}&player=${i}&total=${totalPlayers}`;

    const qr = document.createElement("img");
    qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(url)}`;
    qr.alt = `QR code for ${name}`;
    qr.loading = "lazy";

    const qrFrame = document.createElement("div");
    qrFrame.className = "qr-frame";
    qrFrame.appendChild(qr);

    const link = document.createElement("a");
    link.href = url;
    link.innerText = name;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const badge = document.createElement("div");
    badge.className = "player-badge";
    badge.innerText = `Player ${i + 1}`;

    const note = document.createElement("p");
    note.className = "link-note";
    note.innerText = "Tap the name to open the page or scan the QR code.";

    const card = document.createElement("li");
    card.className = "player-card";
    card.appendChild(badge);
    card.appendChild(link);
    card.appendChild(note);
    card.appendChild(qrFrame);

    linksList.appendChild(card);
  });

  scrollCue.classList.add("visible");
}

function scrollToResults() {
  document.getElementById("results").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function resetGame() {
  players = [];
  playersInput.value = "";
  scrollCue.classList.remove("visible");
  renderPlayers();
  renderEmptyState();
}

document.getElementById("add-player-btn").addEventListener("click", addPlayer);

playersInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addPlayer();
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/WhoAmI/service-worker.js")
    .then(() => console.log("SW registered"))
    .catch((err) => console.error("SW failed:", err));
}

renderPlayers();
renderEmptyState();
