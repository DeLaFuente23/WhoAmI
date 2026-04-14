function renderEmptyState() {
  const list = document.getElementById("links");
  list.innerHTML = '<li class="empty-state">Your generated player cards will appear here after you start a round.</li>';
}

async function startGame() {
  const input = document.getElementById("players").value;

  if (!input) {
    alert("Please enter at least one player.");
    return;
  }

  const names = input.split(",").map((name) => name.trim()).filter((name) => name);

  if (names.length === 0) {
    alert("Please enter valid player names.");
    return;
  }

  const list = document.getElementById("links");
  list.innerHTML = "";

  const base = window.location.origin + window.location.pathname.replace("index.html", "");
  const totalPlayers = names.length;

  names.forEach((name, i) => {
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

    list.appendChild(card);
  });
}

function resetGame() {
  document.getElementById("players").value = "";
  renderEmptyState();
}

renderEmptyState();
