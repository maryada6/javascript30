//selecting elements 
const player=document.querySelector(".player");
const video= player.querySelector(".viewer")
const progress=player.querySelector(".progress")
const progressBar=player.querySelector(".progress__filled")
const toggle= player.querySelector(".player__button")
const skipButtons= player.querySelectorAll("[data-skip]")
const  ranges=player.querySelectorAll(".player__slider")


function togglePlay(){
    (video.paused)?video.play():video.pause();

}

function updateButton(){
   const icon = this.paused ? '►' : '❚ ❚';
//   console.log(icon);
  toggle.textContent = icon;
}

function skip(){
    video.currentTime+= parseFloat(this.dataset.skip);

}

function handleChangeUpdate(){
    video[this.name]=this.value
}

function handleProgress(){
    const progressPercentage=(video.currentTime/video.duration)*100;
    progressBar.style.flexBasis=`${progressPercentage}%`;
}

function scrub(e)
{
    const scrublength= (e.offsetX/progress.offsetWidth)*video.duration;
     video.currentTime= scrublength;
}

video.addEventListener("play",updateButton)
video.addEventListener("timeupdate",handleProgress)
video.addEventListener("pause",updateButton)
video.addEventListener("click",togglePlay)
toggle.addEventListener("click",togglePlay)
skipButtons.forEach((skipButton)=>skipButton.addEventListener("click",skip))
ranges.forEach((range)=>range.addEventListener("change",handleChangeUpdate))
ranges.forEach((range)=>range.addEventListener("mousemove",handleChangeUpdate))
let mousedownflag= false;
progress.addEventListener("click",scrub)
progress.addEventListener("mousemove",(e)=>{
    mousedownflag && scrub(e)} )
progress.addEventListener("mousedown",()=>mousedownflag=true)
progress.addEventListener("mouseup",()=>mousedownflag=false)

