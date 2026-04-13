async function startGame() {
  const input = document.getElementById("players").value;

  if (!input) {
    alert("Please enter at least one player.");
    return;
  }

  const names = input.split(",").map(n => n.trim()).filter(n => n);

  const list = document.getElementById("links");
  list.innerHTML = "";

  const base = window.location.origin + window.location.pathname.replace("index.html", "");

  const totalPlayers = names.length;

  names.forEach((name, i) => {

    // 🔥 UPDATED URL (includes player index + total players)
    const url = `${base}player.html?name=${encodeURIComponent(name)}&player=${i}&total=${totalPlayers}`;

    // QR Code
    const qr = document.createElement("img");
    qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(url)}`;

    // Clickable link (for host)
    const link = document.createElement("a");
    link.href = url;
    link.innerText = name;
    link.target = "_blank";

    const li = document.createElement("li");
    li.appendChild(link);
    li.appendChild(document.createElement("br"));
    li.appendChild(qr);

    list.appendChild(li);
  });
}

function resetGame() {
  document.getElementById("players").value = "";
  document.getElementById("links").innerHTML = "";
}
