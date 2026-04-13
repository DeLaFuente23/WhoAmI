async function startGame() {
  const input = document.getElementById("players").value;

  if (!input) {
    alert("Please enter at least one player.");
    return;
  }

  const names = input.split(",").map(n => n.trim()).filter(n => n);

  // Load characters
  const res = await fetch("characters.json");
  let characters = await res.json();

  // Shuffle characters
  characters = characters.sort(() => Math.random() - 0.5);

  if (characters.length < names.length) {
    alert("Not enough characters for all players!");
    return;
  }

  const list = document.getElementById("links");
  list.innerHTML = "";

  names.forEach((name, i) => {
    const char = characters[i];

    const url = `player.html?name=${encodeURIComponent(name)}&char=${encodeURIComponent(char)}`;

    // QR Code
    const qr = document.createElement("img");
    qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;

    const label = document.createElement("p");
    label.innerText = name;

    const li = document.createElement("li");
    li.appendChild(label);
    li.appendChild(qr);

    list.appendChild(li);
  });
}

function resetGame() {
  document.getElementById("players").value = "";
  document.getElementById("links").innerHTML = "";
}
