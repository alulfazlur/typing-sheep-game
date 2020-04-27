// DISPLAY KAMBING
let sheep = document.getElementById("mySheep");
let sheepStyle = sheep.style;
let pos = 450;
sheepStyle.left = pos + "px";
sheepStyle.position = "relative";
sheepStyle.top = "120px";

let time = 0;
let fieldLeft = 0;
let fieldRight = 850;
let speedForward = 150;

// GAME
window.addEventListener("load", init);

// Available Levels
const levels = {
  easy: 20,
  medium: 10,
  hard: 8
}

// To change level
let currentLevel = levels.easy;
let speedBackward = currentLevel;
let score = 0;
let isPlaying;
let maxScore;

// DOM Elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const highScoreElt = document.querySelector("#high-score");

const easyBtn = document.getElementById("easy");
const mediumBtn = document.getElementById("medium");
const hardBtn = document.getElementById("hard");

const getStart = document.getElementById("start");
const images = document.getElementById("gameover");

const level = document.getElementById("level")
const words = [
  "angular",
  "magic",
  "brew",
  "while",
  "throw",
  "css",
  "break",
  "swing",
  "echo",
  "let",
  "wall",
  "laughter",
  "hash",
  "spinner",
  "beer",
  "ninja",
  "javascript",
  "master",
  "program",
  "coding",
  "hero",
  "learning",
  "work",
  "case",
  "react",
  "dragon",
  "rush",
  "api",
  "init",
  "motion",
  "google",
  "float",
  "damn",
  "block",
  "ranking",
  "nice",
  "machine",
  "perfect",
  "deploy",
  "terminal",
  "array",
  "vue",
  "node",
  "html",
  "front",
  "grid",
  "stack",
  "mac",
  "console",
  "ajax",
  "heroku",
  "loop",
  "sql",
  "php",
  "data",
  "npm",
  "server",
  "bash",
];

function setlevel(e){
  if(e.target === easyBtn){
      currentLevel = levels.easy;
  }else if(e.target === mediumBtn){
      currentLevel = levels.medium;
  }else if(e.target === hardBtn){
      currentLevel = levels.hard;
  }
}

// Initialize Game
function init() {
  wordInput.addEventListener("input", startMatch);
  wordInput.addEventListener("keydown", function (e) {
    if (e.which === 13) {
      startMove();
    }
  });
  showWord(words);
  maxScore = localStorage.getItem("highScoreVal");
  highScoreElt.innerHTML = maxScore;
}

const loseCond = function () {
  images.src = "assets/gameover.png";
  sheep.style.display = "none";
  images.style.display = "inline";
  images.style.marginTop = "0px";
  images.style.opacity = "80%";
  message.innerHTML = "Game Over!🙅🏽";
  audiobg.pause();
  audio.currentTime = 0;
};

const winCond = function () {
  images.src = "assets/win.jpg";
  sheep.style.display = "none";
  images.style.display = "inline";
  images.style.marginTop = "0px";
  images.style.opacity = "80%";
  message.innerHTML = "Wes menang!🙅🏽";
  audiobg.pause();
  audio.currentTime = 0;
};

let high
function startMove() {
  images.style.display = "none";
  sheep.style.display = "flex";
  currentWord.style.display = "flex";
  let count = setInterval(countdown, 1000);
  let timer = setInterval(function () {
    if (sheepStyle.left.replace("px", "") == fieldLeft) {
      loseCond();
      clearInterval(count);
      clearInterval(timer);
    } else if (pos >= fieldRight) {
      winCond();
      clearInterval(count);
      clearInterval(timer);
      high = time;
      if (maxScore <= high) {
        highScoreElt.innerHTML = maxScore;
      } else{
        localStorage.setItem("highScoreVal", high);
        maxScore = localStorage.getItem("highScoreVal");
        highScoreElt.innerHTML = maxScore;
      }
    } else {
      pos--;
      sheepStyle.left = pos + "px";
    }
  }, speedBackward = currentLevel);
}

//Start match
function startMatch() {
  audiobg.play();

  wordInput.value = wordInput.value.toLowerCase();
  if (matchWords()) {
    isPlaying = true;
    showWord(words);
    wordInput.value = "";
  }
}


// Sheep audio
const audiobg = new Audio("./assets/title.mp3");
const audio = new Audio("./assets/kambing.mp3");
const audio1 = new Audio("./assets/kambing1.wav");
const audio2 = new Audio("./assets/kambing2.wav");
const audio3 = new Audio("./assets/kambing3.wav");
const audio4 = new Audio("./assets/kambing4.wav");
const audio5 = new Audio("./assets/kambing5.wav");

const audio_list = [audio, audio1, audio2, audio3, audio4, audio5];

function randAudio(aud) {
  const randIndex = Math.floor(Math.random() * audio_list.length);
  return audio_list[randIndex];
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    let leftNumbers = sheepStyle.left.replace("px", "");
    let left = parseInt(leftNumbers);
    if (left == fieldRight) {
      sheepStyle.left = fieldRight;
    } else {
      pos += speedForward;
      randAudio().play();
    }

    message.innerHTML = "Sek salah!";
    return true;
  } else {
    message.innerHTML = "Wes bener!";
    return false;
  }
}

// Pick and show random word
function showWord(word) {
  const randIndex = Math.floor(Math.random() * words.length);
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
  time++;
  timeDisplay.innerHTML = time;
}

easyBtn.addEventListener('click', setlevel);
mediumBtn.addEventListener('click', setlevel);
hardBtn.addEventListener('click', setlevel);
