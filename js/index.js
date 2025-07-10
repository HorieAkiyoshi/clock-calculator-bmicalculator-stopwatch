const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const clock = setInterval(()=>{

    let dateToday = new Date();
    let hr = dateToday.getHours();
    let min = dateToday.getMinutes();
    let sec = dateToday.getSeconds();

    if(hr < 10)hr = "0" + hr; 
    if(min < 10)min = "0" + min; 
    if(sec < 10)sec = "0" + sec; 

    hours.textContent = hr;
    minutes.textContent = min; 
    seconds.textContent = sec; 
})

// Calculator
function insertoToDisplay(id){
    document.getElementById("display").value += id; 
}

function calculatorClean(){
    document.getElementById("display").value = "";
}

function calculatorBack(){
    const display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

function calculatorResult(){
    const display = document.getElementById("display");
    try{
        display.value = eval(display.value);
    }catch{
        display.value = "Error";
    }
}

//BMI Calculate
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value/100;

    const bmi = (weight / (height * height)).toFixed(2);

    const value = document.getElementById("value");

    document.getElementById("infos").classList.remove("hidden")

    value.classList.add("attention");
    value.textContent = bmi.replace("." , ",");

    let description = "";

    if(bmi < 18){
        description = 'You are underweight!';
    }else if(bmi >= 18 && bmi < 25){
        description = 'You are at your ideal weight.';
        value.classList.remove("attention");
        value.classList.add("normal");
    }else if(bmi >= 25 && bmi < 30){
        description = 'You are overweight.'
    }else if(bmi >= 30 && bmi < 35 ){
        description = 'You are moderately obese!'
    }else if(bmi >= 35 && bmi < 40){
        description = 'You are severely obese!!'
    }else{
        description = 'You are morbidly obese!!!'
    }

    document.getElementById("description").textContent = description;
})

//Stopwacth
const timerEl = document.getElementById("timer");
const marksList = document.getElementById("marks-list");
let intervalId = 0;
let timer = 0;
let marks = [];

const formatTimer = (time) =>{
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const hundredths = time % 100;

    return `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}:${hundredths.toString().padStart(2,'0')}`;
}

const addMarkToList = (markIndex, markTime) =>{
    marksList.innerHTML += `<p>${markIndex}: ${formatTimer(markTime)}</p>`;
}

const markTime = ()=>{
    marks.push(timer);
    addMarkToList(marks.length, timer);
}

const toggleTimer = ()=>{
    const button = document.getElementById("power");
    const action = button.getAttribute("action");

    clearInterval(intervalId);

    if(action == 'start' || action == 'continue'){
        intervalId = setInterval(()=>{
            timer +=1;
            setTimer(timer)
        },10);
        button.setAttribute('action','pause')
        button.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }else if(action == 'pause'){
        button.setAttribute('action','continue')
        button.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

const resetTimer = ()=>{
    clearInterval(intervalId);
    timer=0;
    marks= [];
    setTimer(timer);
    marksList.innerHTML = '';
    const button = document.getElementById("power");
    button.setAttribute("action",'start');
    button.innerHTML = '<i class="fa-solid fa-play"></i>';
}

const setTimer = (time) =>{
    timerEl.innerText = formatTimer(time);
}

document.getElementById('power').addEventListener('click',toggleTimer);
document.getElementById('mark').addEventListener('click',markTime);
document.getElementById('reset').addEventListener('click',resetTimer);

