import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My cool and mysterious game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const gameButton = "🐺";

const button = document.createElement("button");
button.innerHTML = gameButton;
button.style.fontSize = "56px";
app.append(button);

let counter = 0;
const divLabel = "🌕 Full Moons: " + counter + " 🌕";

const div = document.createElement("div");
div.innerHTML = divLabel;
div.style.fontSize = "38px";
app.append(div);

function incrementMoon() {
  counter++;
  div.innerHTML = "🌕 Full Moons: " + counter + " 🌕";
}

// Every button click adds a moon
button.addEventListener("click", function () {
  incrementMoon();
});

let lastTimestamp = 0;
let accumulator = 0;

function interval(timestamp: number) {
  const deltaTime = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  accumulator += deltaTime;

  if (accumulator >= 1000) {
    incrementMoon();
    accumulator -= 1000;
  }

  requestAnimationFrame(interval);
}

requestAnimationFrame((timestamp) => {
  lastTimestamp = timestamp;
  interval(timestamp)
});