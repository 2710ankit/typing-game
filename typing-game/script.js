const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingBtn = document.getElementById("setting-btn");
const settings = document.getElementById("setting");
const settingsForm = document.getElementById("setting-form");
const difficultySelect = document.getElementById("difficulty");
const startButton = document.getElementById("start-button");

//list of words
const words = ["apple", "steer", "eight", "drags", "loving","asdasd","12312"];

//init word
let randomWord;
let score = 0;
let time = 10;
let difficulty =difficultySelect.value;
var timeInterval;


//start button function
function letsStart(){
  
  addWordToDOM();
  endgameEl.style.display = "none";
  if(difficulty==null){
    alert("Please Enter Difficulty");
  }
  if (difficulty === "hard") {
    timeInterval= setInterval(updateTime,500);
    console.log("hard");
  } else if (difficulty === "medium") {
    timeInterval= setInterval(updateTime,1000);
    console.log("med");

  } else {
    timeInterval= setInterval(updateTime,200);
    console.log("easy");

  }
}



//generate random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}


//add word to dom
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}


//update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}


//update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";
  if (time <= 0) {
    clearInterval(timeInterval);
    gameOver();
    return;
  }
}


//game over
function gameOver() {
  endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Restart</button>
    `;
  endgameEl.style.display = "flex";
}



//When correct word is typed
text.addEventListener("input",wordTyped);

function wordTyped(){
  const textTyped=text.value;
  if (textTyped === randomWord) {
    addWordToDOM();
    updateScore();
    //clear
    text.value = "";
    if (difficulty === "hard") {
      time += 1000;
    } else if (difficulty === "medium") {
      time += 100;
    } else {
      time += 10;
    }

    updateTime();
  }

}




startButton.addEventListener("click", letsStart);
//setting
settingBtn.addEventListener("click", () => settings.classList.toggle("hide"));
//setting select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
