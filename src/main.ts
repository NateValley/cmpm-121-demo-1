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

const div = document.createElement("div");
div.innerHTML = "🌕 Full Moons: " + counter + " 🌕";
div.style.fontSize = "38px";
app.append(div);

const rate = document.createElement("div");
rate.innerHTML = moonRate + " 🌕/s (Auto)";
rate.style.fontSize = "28px";
app.append(rate);

// Initialization and monitoring Ponders
const upgrade1 = document.createElement("button");
upgrade1.innerHTML = "Ponder 💭 (-10 🌕) -> (+0.1 🌕/s)";
upgrade1.style.fontSize = "20px";
app.append(upgrade1);

let ponderCount = 0;
const ponders = document.createElement("div");
ponders.innerHTML = "💭 Ponders: " + ponderCount + " 💭";
ponders.style.fontSize = "24px";
app.append(ponders);

// Initialization and monitoring Self-Reflections
const upgrade2 = document.createElement("button");
upgrade2.innerHTML = "Self-Reflect 🪞 (-100 🌕) -> (+2.0 🌕/s)";
upgrade2.style.fontSize = "20px";
app.append(upgrade2);

let reflectionCount = 0;
const reflections = document.createElement("div");
reflections.innerHTML = "🪞 Self-Reflections: " + reflectionCount + " 🪞";
reflections.style.fontSize = "24px";
app.append(reflections);

// Initialization and monitoring Ego-Deaths
const upgrade3 = document.createElement("button");
upgrade3.innerHTML = "Ego-Death ☠️ (-1000 🌕) -> (+50 🌕/s)";
upgrade3.style.fontSize = "20px";
app.append(upgrade3);

let deathCount = 0;
const deaths = document.createElement("div");
deaths.innerHTML = "☠️ Ego-Deaths: " + deathCount + " ☠️";
deaths.style.fontSize = "24px";
app.append(deaths);

// Incremental moons function
function incrementMoon(rate: number) {
  counter += rate;
  div.innerHTML = "🌕 Full Moons: " + counter + " 🌕";
}

// Every wolf button click adds a moon
button.addEventListener("click", function () {
  incrementMoon(1);
});

upgrade1.addEventListener("click", function () {
  moonRate += 0.1;
  buy(10, ponderCount);
  ponderCount++;
  ponders.innerHTML = "💭 Ponders: " + ponderCount + " 💭";
  upgrade1.innerHTML = "Ponder 💭 (-" + (10 + 10 * ponderCount * 1.15) + " 🌕) -> (+0.1 🌕/s)";
});

upgrade2.addEventListener("click", function () {
  moonRate += 2.0;
  buy(100, reflectionCount);
  reflectionCount++;
  reflections.innerHTML = "🪞 Self-Reflections: " + reflectionCount + " 🪞";
  "Self-Reflect 🪞 (-" + + 100 + 100 * reflectionCount * 1.15 + " 🌕) -> (+2.0 🌕/s)"
});

upgrade3.addEventListener("click", function () {
  moonRate += 50;
  buy(1000, deathCount);
  deathCount++;
  deaths.innerHTML = "☠️ Ego-Deaths: " + deathCount + " ☠️";
  upgrade3.innerHTML = "Ego-Death ☠️ ( -" + 1000 + 1000 * deathCount * 1.15 + " 🌕) -> (+50 🌕/s)"
});

let lastTimestamp = 0;
let accumulator = 0;

// Use deltaTime and timestamps to keep track of real time and use that to increment moons every second (1000 ms)
function interval(timestamp: number) {
  const deltaTime = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  accumulator += deltaTime;

  if (accumulator >= 1000 / moonRate && moonRate > 0) {
    incrementMoon(1);
    console.log("Moons per sec: " + moonRate);
    accumulator -= 1000 / moonRate;
  }

  if (counter < 10 + 10 * 1.15 * ponderCount) {
    upgrade1.disabled = true;
  } else {
    upgrade1.disabled = false;
  }

  if (counter < 100 + 100 * 1.15 * reflectionCount) {
    upgrade2.disabled = true;
  } else {
    upgrade2.disabled = false;
  }

  if (counter < 1000 + 1000 * 1.15 * deathCount) {
    upgrade3.disabled = true;
  } else {
    upgrade3.disabled = false;
  }

  requestAnimationFrame(interval);
}

// Trigger requestAnimationFrame() once to start
requestAnimationFrame((timestamp) => {
  lastTimestamp = timestamp;
  interval(timestamp);
});

function buy(cost: number, counts: number) {
  counter -= cost + cost * 1.15 * counts;
  div.innerHTML = "🌕 Full Moons: " + counter + " 🌕";
  rate.innerHTML = moonRate.toFixed(1) + " 🌕/s (Auto)";
}