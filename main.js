const timerBlocks = document.querySelectorAll('.timer-block');
const startBtn = document.querySelector('.timer-button');
const clearBtn = document.querySelector('.timer-clear-button');

const maxSecMin = 60;
const maxHours = 24;
const daysInMonths = [2, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Количество дней в каждом месяце
const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const maxMonths = daysInMonths.length;
const maxYears = Infinity;

let intervalId;
let timeValues = [0, 0, 0, 0, 1]; // [seconds, minutes, hours, days, months] (изначальный месяц - январь)
let flag = false;

const startTimer = () => {
   intervalId = setInterval(updateTimer, 1000);
   toggleButtonState('Stop');
   flag = true;
};

const updateTimer = () => {
   timeValues[0]++; // Увеличение секунд
   for (let i = 0; i < timeValues.length; i++) {
      const maxLimit = getMaxLimit(i);
      if (timeValues[i] === maxLimit) {
         timeValues[i] = 0;
         if (i < timeValues.length - 1) {
            timeValues[i + 1]++; // Увеличение следующего значения
         } else {
            stopTimer();
            handleTimerCompletion();
            return;
         }
      }
      timerBlocks[i].textContent = timeValues[i]; // Обновление значения блока таймера
   }
   updateMonthName(timeValues[4]);
};

const getMaxLimit = (index) => {
   switch (index) {
      case 0: // Секунды
         return maxSecMin;
      case 1: // Минуты
         return maxSecMin;
      case 2: // Часы
         return maxHours;
      case 3: // Дни
         return daysInMonths[timeValues[4] - 1];
      case 4: // Месяцы
         return maxMonths;
      default:
         return Infinity;
   }
};

const stopTimer = () => {
   clearInterval(intervalId);
   flag = false;
};

const toggleTimer = () => {
   if (flag) {
      stopTimer();
      toggleButtonState('Continue');
   } else {
      startTimer();
   }
};

const resetTimer = () => {
   stopTimer();
   timeValues = [0, 0, 0, 0, 1]; // Сброс в изначальное состояние (январь)
   for (let i = 0; i < timerBlocks.length; i++) {
      timerBlocks[i].textContent = '0';
   }
   updateMonthName(timeValues[4]);
};

const toggleButtonState = (text) => {
   startBtn.textContent = text;
};

const handleTimerCompletion = () => {
   resetTimer();
   toggleButtonState('Start');
};

const updateMonthName = (monthIndex) => {
   const monthName = monthNames[monthIndex - 1];
   document.querySelector('.month-name').textContent = monthName;
};

startBtn.addEventListener('click', toggleTimer);
clearBtn.addEventListener('click', resetTimer);
