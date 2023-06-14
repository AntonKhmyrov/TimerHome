const timerBlockSeconds = document.querySelector('.timer-block.seconds');
const timerBlockMinutes = document.querySelector('.timer-block.minutes');
const timerBlockHours = document.querySelector('.timer-block.hours');
const startBtn = document.querySelector('.timer-button');
const clearBtn = document.querySelector('.timer-clear-button');
let intervalId;
let seconds = 0;
let maxSeconds = 60;
let minutes = 0;
let maxMinutes = 60;
let hours = 0;
let maxHours = 1;
let flag = false;

function startTimer() {
   intervalId = setInterval(() => {
      if (seconds < maxSeconds) {
         seconds++;
         timerBlockSeconds.textContent = seconds;
      }
      if (seconds === maxSeconds) {
         seconds = 0;
         minutes++;
         timerBlockMinutes.textContent = minutes;
      }
      if (minutes === maxMinutes) {
         minutes = 0;
         hours++;
         timerBlockHours.textContent = hours;
      }
      if (hours === maxHours) {
         alert(`Прошел ${hours} час`)
         hours = 0;
         timerBlockSeconds.textContent = '0';
         timerBlockMinutes.textContent = '0';
         timerBlockHours.textContent = '0';
         startBtn.textContent = 'Start';
         clearInterval(intervalId);
      }
   }, 1000);
}

function stopTimer() {
   clearInterval(intervalId);
}

function toggleTimer() {
   if (flag) {
      stopTimer();
      startBtn.textContent = 'Continue';
   } else {
      startTimer();
      startBtn.textContent = 'Stop';
   }
   flag = !flag;
}

function clearTimer() {
   stopTimer();
   seconds = 0;
   minutes = 0;
   hours = 0;
   timerBlockSeconds.textContent = '0';
   timerBlockMinutes.textContent = '0';
   timerBlockHours.textContent = '0';
   startBtn.textContent = 'Start';
   flag = false;
}

startBtn.addEventListener('click', toggleTimer);
clearBtn.addEventListener('click', clearTimer);