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

  names.forEach((name) => {

    const url = `${base}player.html?name=${encodeURIComponent(name)}`;

    // QR Code
    const qr = document.createElement("img");
    qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;

    // Clickable link (NEW)
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
