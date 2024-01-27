let time = document.querySelector("#time");
let dateInput = document.querySelector("#alarmDate");
let timeInput = document.querySelector("#alarmTime");
let btn = document.querySelector("#setAlarm");
let contain = document.querySelector("#alarms");
let interval;
let maxValue = 3;
let count = 0;
let alarmTimesArray = [];

function timeChangeFunction() {
  let current = new Date();
  let hours = current.getHours();
  let minutes = String(current.getMinutes()).padStart(2, "0");
  let Seconds = String(current.getSeconds()).padStart(2, "0");
  let period = "AM";
  if (hours >= 12) {
    period = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  }
  hours = String(hours).padStart(2, "0");
  time.textContent = `${hours}:${minutes}:${Seconds} ${period}`;
}

//this function will help to set alarm
function alarmSetFunction() {
  let now = new Date();
  let selectedDate = new Date(dateInput.value + "T" + timeInput.value);

  //now set condition for selectDate in respect of date.
  if (selectedDate <= now) {
    alert(`Please select a future date and time.`);
    //to reload page again
    window.location.reload();
    return;
}
//now condition is for array
if (alarmTimesArray.includes(selectedDate.toString())) {
    alert(`you cannot set multiple alarms for the same time.`);
    return;
}

if (count < maxValue) {
    let timeUntilAlarm = selectedDate - now;
    let alarmDiv = document.createElement("element");
    alarmDiv.classList.add("alarm");
    alarmDiv.innerHTML = `
    <span>
    ${selectedDate.toLocaleString()}
    </span>
    <button class="delete-alarm" style="border-radius:10px;background-color:red;color:white;font-size:1rem">Delete</button>
    `;

    
    //to delete single alarm list from record
    alarmDiv.querySelector(".delete-alarm").addEventListener("click", () => {
        alarmDiv.remove();
        count--;
        clearTimeout(interval);
        const idx = alarmTimesArray.indexOf(selectedDate.toString());
        if (idx !== -1) {
            alarmTimesArray.splice(idx, 1);
        }
    });
    interval = setTimeout(() => {
        alert("Time to Wake up!");
        alarmDiv.remove();
        count--;
        const alarmIndex = alarmTimesArray.indexOf(selectedDate.toString());
        if (alarmIndex !== -1) {
            alarmTimesArray.splice(alarmIndex, 1);
        }
    }, timeUntilAlarm);
    //here js element is visible to user after appendChild function use
    contain.appendChild(alarmDiv);
    count++;
    alarmTimesArray.push(selectedDate.toString());
} else {
    alert("you can only set a maximum of 3 alarms.");
    
}
}

function showAlarmFunction() {
  let alarms = contain.querySelectorAll(".alarm")
  alarms.forEach((alarm) => {
    let deleteButton = alarm.querySelector(".delete-alarm");
    deleteButton.addEventListener("click", () => {
      alarmDiv.remove();
      count--;
      clearTimeout(interval);
      const alarmIndex = alarmTimesArray.indexOf(selectedDate.toString());
      if (alarmIndex !== -1) {
        alarmTimesArray.splice(alarmIndex, 1);
      }
    });
  });
  
}

//call all the function(
showAlarmFunction();
setInterval(timeChangeFunction, 1000);
btn.addEventListener("click",alarmSetFunction);
timeChangeFunction();
