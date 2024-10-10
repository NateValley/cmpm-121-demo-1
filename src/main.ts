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
let moonRate = 0;
const divLabel = "🌕 Full Moons: " + counter + " 🌕";

const div = document.createElement("div");
div.innerHTML = divLabel;
div.style.fontSize = "38px";
app.append(div);

const upgrade = document.createElement("button");
upgrade.innerHTML = "Ponder 💭 (-10 🌕) -> (+1 🌕/s)";
upgrade.style.fontSize = "20px";
app.append(upgrade);

// Incremental moons function
function incrementMoon(rate: number) {
  counter += rate;
  div.innerHTML = "🌕 Full Moons: " + counter + " 🌕";
}

// Every wolf button click adds a moon
button.addEventListener("click", function () {
  incrementMoon(1);
});

upgrade.addEventListener("click", function () {
  if (counter >= 10) {
    counter -= 10;
    moonRate++;
  }
});

let lastTimestamp = 0;
let accumulator = 0;

// Use deltaTime and timestamps to keep track of real time and use that to increment moons every second (1000 ms)
function interval(timestamp: number) {
  const deltaTime = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  accumulator += deltaTime;

  if ((accumulator >= 1000 / moonRate) && moonRate > 0) {
    incrementMoon(1);
    console.log("Moons per sec: " + moonRate);
    accumulator -= 1000 / moonRate;
  }

  if (counter < 10) {
    upgrade.disabled = true;
  } else {
    upgrade.disabled = false;
  }
  requestAnimationFrame(interval);
}

// Trigger requestAnimationFrame() once to start
requestAnimationFrame((timestamp) => {
  lastTimestamp = timestamp;
  interval(timestamp);
});
