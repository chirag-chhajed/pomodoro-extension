let buttons = document.querySelectorAll('button')
let timeframeSelect = false
let sessionSelect = false
const btnContainer1 = document.querySelector(".btn-container-1")
const btnContainer2 = document.querySelector(".btn-container-2")
const btnContainer = document.querySelector(".btn-container")
const resetBtn = document.getElementById("reset")
const btmText = document.querySelector(".bottom-text")
const playBtn = document.getElementById("play")
const timer = document.getElementById("base-timer-label")
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

let i = 0;
const timeFrame = [25*60,50*60]
let TIME_LIMIT = timeFrame[i]
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

buttons.forEach(function(btn){
    btn.addEventListener("click",function(e){
        if(btn.classList.contains("twentyfive") || btn.classList.contains("fiftyten")){
           console.log(btn.innerText)
            timeframeSelect = true
        };
        if(btn.classList.contains("twentyfive")){
          TIME_LIMIT = timeFrame[0]
        }
        if(btn.classList.contains("fiftyten")){
          TIME_LIMIT = timeFrame[1]
        }

        if(btn.classList.contains("number")){
            console.log(btn.innerText)
            sessionSelect = true
        }
        if(btn.classList.contains("play")){
           if(timeframeSelect == true && sessionSelect == true){
            console.log("play")
            btnContainer1.style.visibility = "visible"
            btnContainer2.style.visibility = "hidden"
            btnContainer.style.visibility = "hidden"
            resetBtn.style.visibility = "visible"
            btmText.style.visibility = "hidden"
            playBtn.src = "/assets/fontawesome-free-6.2.0-desktop/svgs/solid/pause.svg"
            startTimer();

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
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
           }
           if(timeframeSelect == false || sessionSelect == false){
            console.log("select both")
            error.innerHTML = "Select both of them"
           }
        }
        if(btn.classList.contains("minimize")){
            document.querySelector(".pomodoro").style.height = "125px"
            document.querySelector(".pomodoro").style.width = "200px"
        }
    })
})
