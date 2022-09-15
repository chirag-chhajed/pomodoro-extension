let buttons = document.querySelectorAll('button')
let timeframeSelect = false
let sessionSelect = false
const btnContainer1 = document.querySelector(".btn-container-1")
const btnContainer2 = document.querySelector(".btn-container-2")
const btnContainer = document.querySelector(".btn-container")
const resetBtn = document.getElementById("reset")
const btmText = document.querySelector(".bottom-text")
const playBtn = document.getElementById("play")

buttons.forEach(function(btn){
    btn.addEventListener("click",function(e){
        if(btn.classList.contains("twentyfive") || btn.classList.contains("fiftyten")){
           console.log(btn.innerText)
            timeframeSelect = true
        };
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