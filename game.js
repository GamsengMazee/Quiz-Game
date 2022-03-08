const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice__text'));
const progressText =  document.getElementById('progressText');
const progressBarFull =  document.getElementById('progressBarFull');
const scoreText =  document.getElementById('score');
const choice1 = document.getElementById('choice1');
const choice2 = document.getElementById('choice2');
const choice3 = document.getElementById('choice3');
const choice4 = document.getElementById('choice4');
const game = document.getElementById('game');
const loader = document.getElementById('loader')

let currentQuestion = {}
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = {};

//sounds
var correctSound = new Audio('./sounds/success.mp3');
var inCorrectSound = new Audio('./sounds/wrong.mp3')

window.onload = function () {
  bgMusic = new Audio('./sounds/bgMusic.mp3');
  bgMusic.play();
  bgMusic.loop = true;
  bgMusic.volume = 0.1;
}



let questions = [];

fetch('questions.json')
.then((res) => {
  return res.json();
})
.then((loadedQuestions) => {
  questions = loadedQuestions;
  startGame()
})
.catch(error => {
  console.log(error.message)
})
  
//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  scoreText.innerText = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1000)
  setTimeout(() => {
    game.classList.remove('hidden')
  }, 1500)
};

getNewQuestion = () => {
  if (availableQuestions.length  === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question: ${questionCounter}/${questions.length}`;
  //update the progress bar
  progressBarFull.style.width = `${(questionCounter/questions.length) * 100}%`
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    selectedChoice.parentElement.classList.add(classToApply);
    
    if(classToApply === 'correct'){
      scoreIncrement(CORRECT_BONUS)
      //correct audio
      correctSound.play();
      correctSound.volume = 0.5;

    }

    if(classToApply === 'incorrect'){
      //incorrect audio
      inCorrectSound.play();
      inCorrectSound.volume = 0.5;

    } 

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1200);
  });
});

const scoreIncrement =(num) => {
  score  += num;
  scoreText.innerText = score;
}




const selectOptionSound = () => {
  var selectMusic = new Audio('./sounds/optionSelect.mp3')
  selectMusic.play();
  selectMusic.volume = 0.8;
}

choice1.addEventListener('mouseover', selectOptionSound);
choice2.addEventListener('mouseover', selectOptionSound);
choice3.addEventListener('mouseover', selectOptionSound);
choice4.addEventListener('mouseover', selectOptionSound);
