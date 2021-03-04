
let countdown;
const timerDisplay= document.querySelector(".display__time-left")
const timerEndDisplay= document.querySelector(".display__end-time")
const buttons = document.querySelectorAll('[data-time]');
function timer(seconds){
    clearInterval(countdown);
    const now= Date.now();
    const then= now + seconds*1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
// console.log({now,seconds,then});
countdown = setInterval(()=>{
    const secondsLeft = Math.round((then-Date.now())/1000);
    if(secondsLeft<0){
        clearInterval(countdown);
        return;
    }
    displayTimeLeft(secondsLeft);
},1000)
}

function displayTimeLeft(seconds){
    const min= Math.floor(seconds/60);
    const remainderSeconds=seconds%60;
    const display=`${min}:${remainderSeconds<10?'0':"" }${remainderSeconds}`
    document.title=display;
    timerDisplay.textContent=display;
}

function displayEndTime(timeStamp){
    const end= new Date(timeStamp);
    const hour= end.getHours();
    const minutes= end.getMinutes();
    // const seconds= end.getSeconds();
    const adjustedHour=hour>12?hour-12:hour;
    timerEndDisplay.textContent=`${adjustedHour}:${minutes<10?'0':""}${minutes}`
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
//   console.log(mins);
  timer(mins * 60);
  this.reset();
});