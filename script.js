async function startGame() {
  const input = document.getElementById("players").value;
  const names = input.split(",").map(n => n.trim());

  // Load characters
  const res = await fetch("characters.json");
  let characters = await res.json();

  // Shuffle characters
  characters = characters.sort(() => Math.random() - 0.5);

  const list = document.getElementById("links");
  list.innerHTML = "";

  names.forEach((name, i) => {
    const char = characters[i];

    const link = document.createElement("a");
    link.href = `player.html?name=${encodeURIComponent(name)}&char=${encodeURIComponent(char)}`;
    link.innerText = `${name}'s link`;

    const li = document.createElement("li");
    li.appendChild(link);
    list.appendChild(li);
  });
}
