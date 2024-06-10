const wordElement = document.getElementById("current-word");
const inputBox = document.getElementById("input-box");
const scoreDisplay = document.getElementById("current-score");
const timeDisplay = document.getElementById("time-remaining");
const gameOverDisplay = document.getElementById("game-over");
const finalScoreDisplay = document.getElementById("final-score");
const configButton = document.getElementById("config-btn");
const configPanel = document.getElementById("config-panel");
const configForm = document.getElementById("config-form");
const levelSelect = document.getElementById("level");

const wordsArray = [
  "Optimistic",
  "Eclipse",
  "Galaxy",
  "Space",
  "Planet",
  "Universe",
  "Rocket",
  "Comet",
  "Asteroid",
  "Cosmos",
  "Astronaut",
  "Gravity",
  "Orbit",
  "Telescope",
  "Meteor",
  "Satellite",
  "Nebula",
  "Star",
  "Blackhole",
  "Quasar",
  "King Tarun",
];

let currentWord;
let score = 0;
let time = 15;
let level = localStorage.getItem("level") || "moderate";

function getRandomWord() {
  return wordsArray[Math.floor(Math.random() * wordsArray.length)];
}

function addWordToDOM() {
  currentWord = getRandomWord();
  wordElement.innerText = currentWord;
}

function updateScore() {
  score++;
  scoreDisplay.innerText = score;
}

function updateTime() {
  time--;
  timeDisplay.innerText = time;
  if (time === 0) {
    clearInterval(timeInterval);
    endGame();
  }
}

function endGame() {
  gameOverDisplay.classList.add("show");
  finalScoreDisplay.innerText = score;
  inputBox.style.display = "none";
}

function restartGame() {
  score = 0;
  time = 15;
  scoreDisplay.innerText = score;
  timeDisplay.innerText = time;
  gameOverDisplay.classList.remove("show");
  inputBox.style.display = "block";
  addWordToDOM();
  inputBox.value = "";
  inputBox.focus();
  clearInterval(timeInterval);
  timeInterval = setInterval(updateTime, 1000);
}

inputBox.addEventListener("input", (e) => {
  const enteredText = e.target.value;
  if (enteredText === currentWord) {
    addWordToDOM();
    updateScore();
    inputBox.value = "";
    if (level === "complex") {
      time += 2;
    } else if (level === "moderate") {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
});

configButton.addEventListener("click", () => {
  configPanel.classList.toggle("show");
});

configForm.addEventListener("change", (e) => {
  level = e.target.value;
  localStorage.setItem("level", level);
});

// Initialize game
levelSelect.value = level;
addWordToDOM();
inputBox.focus();
let timeInterval = setInterval(updateTime, 1000);
