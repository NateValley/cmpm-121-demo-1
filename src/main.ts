import "./style.css";

// GLOBAL VARIABLES

let counter = 0;
let moonRate = 0;
let lastTimestamp = 0;
let accumulator = 0;
const exponentialGrowth = 1.15;
const milliseconds = 1000;

// HTML ELEMENTS

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "dark side....";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const gameButton = "🐺";
const clickButton = document.createElement("button");
clickButton.innerHTML = gameButton;
clickButton.style.fontSize = "56px";
app.append(clickButton);

const moonCounter = document.createElement("div");
moonCounter.innerHTML = "🌕 Full Moons: " + counter + " 🌕";
moonCounter.style.fontSize = "38px";
app.append(moonCounter);

const rate = document.createElement("div");
rate.innerHTML = moonRate + " 🌕/s (Auto)";
rate.style.fontSize = "28px";
app.append(rate);

// Upgrades Container
const upgradesContainer = document.createElement("div");
upgradesContainer.style.display = "flex";
upgradesContainer.style.flexDirection = "column";
upgradesContainer.style.width = "800px";
upgradesContainer.style.gap = "20px";
upgradesContainer.style.marginTop = "40px";
app.append(upgradesContainer);

// Ponder Container
const ponderContainer = document.createElement("div");

// Norms Container
const normsContainer = document.createElement("div");

// Self-Reflections Container
const reflectionContainer = document.createElement("div");

// Ego Deaths Container
const deathsContainer = document.createElement("div");

// Self-Actualization Container
const actualContainer = document.createElement("div");

// Create Upgrade 1 (Ponder) Button and Stats Label
const upgrade1 = document.createElement("button");
const desc1 = document.createElement("div");
const stats1 = document.createElement("div");

const ponderImage = document.createElement("img");
ponderImage.src = "src/assets/ponder.jpg";
app.append(ponderImage);

// Create Upgrade 2 (Break the Norm) Button and Stats Label
const upgrade2 = document.createElement("button");
const desc2 = document.createElement("div");
const stats2 = document.createElement("div");

const normImage = document.createElement("img");
normImage.src = "src/assets/normbreaker.jpg";
app.append(normImage);

// Create Upgrade 3 (Self-Reflection) Button and Stats Label
const upgrade3 = document.createElement("button");
const desc3 = document.createElement("div");
const stats3 = document.createElement("div");

const reflectImage = document.createElement("img");
reflectImage.src = "src/assets/self-reflect.jpg";
app.append(reflectImage);

// Create Upgrade 4 (Ego Death) Button and Stats Label
const upgrade4 = document.createElement("button");
const desc4 = document.createElement("div");
const stats4 = document.createElement("div");

const egoDeathImage = document.createElement("img");
egoDeathImage.src = "src/assets/egoDeath.jpg";
app.append(egoDeathImage);

// Create Upgrade 5 (Self-Actualization) Button and Stats Label
const upgrade5 = document.createElement("button");
const desc5 = document.createElement("div");
const stats5 = document.createElement("div");

const actualizationImage = document.createElement("img");
actualizationImage.src = "src/assets/self-actualization.jpg";
app.append(actualizationImage);

interface Item {
  button: HTMLButtonElement;
  buttonLabel: string;
  name: string;
  cost: number;
  rate: number;
  count: number;
  stats: HTMLDivElement;
  desc: HTMLDivElement;
  descLabel: string;
  container: HTMLDivElement;
  image: HTMLImageElement;
}

const availableItems: Item[] = [
  {
    button: upgrade1,
    buttonLabel: "Ponder 💭",
    name: "💭 Ponders",
    cost: 10,
    rate: 0.1,
    count: 0,
    stats: stats1,
    desc: desc1,
    descLabel: "Think on your life for 10 lunar cycles...",
    container: ponderContainer,
    image: ponderImage,
  },
  {
    button: upgrade2,
    buttonLabel: "Break the Norm 📵",
    name: "📵 Norms Broken",
    cost: 50,
    rate: 5,
    count: 0,
    stats: stats2,
    desc: desc2,
    descLabel: "Take a break from being a sheep.",
    container: normsContainer,
    image: normImage,
  },
  {
    button: upgrade3,
    buttonLabel: "Self-Reflect 🪞",
    name: "🪞 Self-Reflections",
    cost: 120,
    rate: 80,
    count: 0,
    stats: stats3,
    desc: desc3,
    descLabel: "Take 100 lunar cycles to reflect on your life..",
    container: reflectionContainer,
    image: reflectImage,
  },
  {
    button: upgrade4,
    buttonLabel: "Ego Death ☠️",
    name: "☠️ Ego Deaths",
    cost: 1000,
    rate: 100,
    count: 0,
    stats: stats4,
    desc: desc4,
    descLabel: "Transcend yourself for a while..",
    container: deathsContainer,
    image: egoDeathImage,
  },
  {
    button: upgrade5,
    buttonLabel: "Self-Actualization 🧙",
    name: "🧙 Times Reached",
    cost: 100000,
    rate: 600,
    count: 0,
    stats: stats5,
    desc: desc5,
    descLabel: "FREE YOURSELF!",
    container: actualContainer,
    image: actualizationImage,
  },
];

// Incremental moons function
function incrementMoon(rate: number) {
  counter += rate;
  moonCounter.innerHTML = "🌕 Full Moons: " + counter.toFixed(1) + " 🌕";
}

// Every wolf button click adds a moon
clickButton.addEventListener("click", function () {
  incrementMoon(1);
});

for (let i = 0; i < availableItems.length; i++) {
  // Containers Set up
  availableItems[i].container.style.display = "flex";
  availableItems[i].container.style.justifyContent = "space-between";
  availableItems[i].container.style.alignItems = "center";
  upgradesContainer.append(availableItems[i].container);

  // Button, description and stats style format
  availableItems[i].button.style.fontSize = "20px";
  availableItems[i].container.appendChild(availableItems[i].button);

  availableItems[i].desc.innerHTML = availableItems[i].descLabel;
  availableItems[i].container.appendChild(availableItems[i].desc);

  availableItems[i].stats.style.fontSize = "20px";
  availableItems[i].container.appendChild(availableItems[i].stats);

  // Initialize button and stats labels
  availableItems[i].button.innerHTML =
    availableItems[i].buttonLabel + "(-" + availableItems[i].cost + "🌕)";
  availableItems[i].stats.innerHTML =
    availableItems[i].name +
    ": " +
    availableItems[i].count +
    "<br>(" +
    availableItems[i].rate +
    " 🌕/s)";

  availableItems[i].image.classList.add("hidden");

  // Event listeners for all upgrades
  availableItems[i].button.addEventListener("click", function () {
    moonRate += availableItems[i].rate;
    buy(availableItems[i].cost, availableItems[i].count);
    availableItems[i].count++;
    availableItems[i].stats.innerHTML =
      availableItems[i].name +
      ": " +
      availableItems[i].count +
      "<br>(" +
      availableItems[i].rate +
      " 🌕/s)";
    availableItems[i].button.innerHTML =
      availableItems[i].buttonLabel +
      " (-" +
      (
        availableItems[i].cost *
        Math.pow(exponentialGrowth, availableItems[i].count)
      ).toFixed(1) +
      " 🌕)";

    availableItems[i].image.classList.remove("hidden");
    availableItems[i].image.classList.add("flash");

    setTimeout(() => {
      availableItems[i].image.classList.remove("flash");
      availableItems[i].image.classList.add("hidden");
    }, 500);
  });
}

// Use deltaTime and timestamps to keep track of real time and use that to increment moons every second (1000 ms)
function interval(timestamp: number) {
  const deltaTime = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  accumulator += deltaTime;

  // Disable upgrade depending on corresponding count
  for (let i = 0; i < availableItems.length; i++) {
    if (
      counter <
      availableItems[i].cost *
        Math.pow(exponentialGrowth, availableItems[i].count)
    ) {
      availableItems[i].button.disabled = true;
    } else {
      availableItems[i].button.disabled = false;
    }
  }

  if (moonRate > 0) {
    const secondsPassed = accumulator / milliseconds;
    const moonsToAdd = secondsPassed * moonRate;
    incrementMoon(moonsToAdd);
    console.log("Moons per sec: " + moonRate.toFixed(1));
    accumulator = 0;
  }

  requestAnimationFrame(interval);
}

// Trigger requestAnimationFrame() once to start
requestAnimationFrame((timestamp) => {
  lastTimestamp = timestamp;
  interval(timestamp);
});

function buy(cost: number, counts: number) {
  counter -= cost * Math.pow(exponentialGrowth, counts);
  moonCounter.innerHTML = "🌕 Full Moons: " + counter.toFixed(1) + " 🌕";
  rate.innerHTML = moonRate.toFixed(1) + " 🌕/s (Auto)";
}
