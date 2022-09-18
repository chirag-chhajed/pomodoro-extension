let buttons = document.querySelectorAll("button");
const audio = document.querySelector("audio"),
  playBtn = document.querySelector(".play"),
  pauseBtn = document.querySelector(".pause"),
  resetBtn = document.querySelector(".reset");
(timer = document.getElementById("base-timer-label")),
  (FULL_DASH_ARRAY = 283),
  (WARNING_THRESHOLD = 10),
  (ALERT_THRESHOLD = 5);

let buttonSelect = false;
const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "green",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "green",
    threshold: ALERT_THRESHOLD,
  },
};
// btn.pare = `<button class="play"><img id="play" src="/assets/fontawesome-free-6.2.0-desktop/svgs/solid/play.svg"></button>`
// playBtn.innerHTML = `<img id="play" src="/assets/fontawesome-free-6.2.0-desktop/svgs/solid/play.svg">`
let i = 0;
const timeFrame = [25 * 60, 5 * 60, 15 * 60];
let TIME_LIMIT = timeFrame[i];
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

buttons.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    if (btn.classList.contains("work")) {
      console.log("work");
      buttonSelect = true;
      TIME_LIMIT = timeFrame[0];
      timer.innerHTML = "25:00";
      clearInterval(timerInterval);
      playBtn.style.zIndex = "1";
      pauseBtn.style.zIndex = "-1";
    }
    if (btn.classList.contains("shortbreak")) {
      console.log("shortbreak");
      buttonSelect = true;
      TIME_LIMIT = timeFrame[1];
      timer.innerHTML = "05:00";
      clearInterval(timerInterval);
      playBtn.style.zIndex = "1";
      pauseBtn.style.zIndex = "-1";
    }
    if (btn.classList.contains("longbreak")) {
      console.log("longbreak");
      buttonSelect = true;
      TIME_LIMIT = timeFrame[2];
      timer.innerHTML = "15:00";
      clearInterval(timerInterval);
      playBtn.style.zIndex = "1";
      pauseBtn.style.zIndex = "-1";
    }
    if (btn.classList.contains("play")) {
      startTimer();
      playBtn.style.zIndex = "-1";
      pauseBtn.style.zIndex = "1";
      text.style.display = "none";
      reset.style.visibility = "visible";
    }
    if (btn.classList.contains("reset")) {
      TIME_LIMIT = timeFrame[0];
      timer.innerHTML = "25:00";
      resetBtn.style.visibility = "hidden";
      playBtn.style.zIndex = "1";
      pauseBtn.style.zIndex = "-1";
      clearInterval(timerInterval);
    }
    if (btn.classList.contains("pause")) {
      playBtn.style.zIndex = "1";
      pauseBtn.style.zIndex = "-1";
      clearInterval(timerInterval);
    }
    if (btn.classList.contains("setting")) {
      timer.contentEditable = true;
      TIME_LIMIT = timer.nodeValue;
    }
  });
});
function onTimesUp() {
  clearInterval(timerInterval);
  audio.play();
}
function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML =
      formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
