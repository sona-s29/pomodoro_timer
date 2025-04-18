const timeDisplay = document.getElementById("timeDisplay");
const startPauseBtn = document.getElementById("startPauseBtn");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");
const modeText = document.getElementById("modeText");
const dots = document.querySelectorAll(".dot");
const progress = document.querySelector(".ring-progress");

let isRunning = false;
let isWork = true;
let timer;
let totalTime = 25 * 60; // 25 minutes
let timeLeft = totalTime;

const radius = 110;
const circumference = 2 * Math.PI * radius;

progress.style.strokeDasharray = circumference;
progress.style.strokeDashoffset = circumference;

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const offset = circumference - (timeLeft / totalTime) * circumference;
  progress.style.strokeDashoffset = offset;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  playIcon.style.display = "none";
  pauseIcon.style.display = "inline";

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      switchMode();
      startTimer();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
  playIcon.style.display = "inline";
  pauseIcon.style.display = "none";
}

function switchMode() {
  isWork = !isWork;
  totalTime = isWork ? 25 * 60 : 5 * 60;
  timeLeft = totalTime;
  modeText.textContent = isWork ? "Work" : "Break";

  const color = isWork ? "var(--work-color)" : "var(--break-color)";
  progress.style.stroke = color;
  progress.style.filter = `drop-shadow(0 0 6px ${color})`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[isWork ? 0 : 1].classList.add("active");

  updateDisplay();
}

startPauseBtn.onclick = () => {
  isRunning ? pauseTimer() : startTimer();
};

updateDisplay();
