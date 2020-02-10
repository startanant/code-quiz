const myQuestions = [
    {
        question: "What's the capital of Canada?",
        answers: {
          a: "Toronto",
          b: "Ottawa",
          c: "Vancouver"
        },
        correctAnswer: "b"
    },
    {
      question: "Who invented JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich"
      },
      correctAnswer: "c"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm"
      },
      correctAnswer: "c"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "d"
    }
];
const quizContainer = document.getElementById('quiz');
var numCorrect = 0;
var subtract = 0;

function buildQuiz(){
    // variable to store the HTML output
    const output = [];
  
    // for each question..
    // arr.forEach(callback(currentValue [, index [, array]])[, thisArg])
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
  
        // variable to store the list of possible answers
        const answers = [];
  
        // and for each available answer...
        for(letter in currentQuestion.answers){
  
          // ...add an HTML radio button
          answers.push(
            `<label>
              <input class="radio" type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
  
        // add this question and its answers to the output
        if(questionNumber == 0) {
            output.push(
                `<div class="slide active-slide">
                  <div class="question"> ${currentQuestion.question} </div>
                  <div class="answers"> ${answers.join("")} </div>
                </div>`
              );
        } else {
            output.push(
                `<div class="slide">
                  <div class="question"> ${currentQuestion.question} </div>
                  <div class="answers"> ${answers.join("")} </div>
                </div>`
              );
        }
        
      }
    );
  
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
}

function verifyAnswer()
{
    currentQuestionNumber = this.name.substring(8);
    currentQuestion = myQuestions[currentQuestionNumber];
    userAnswer = this.value;
    if (userAnswer == currentQuestion.correctAnswer) {
        //alert('correct answer');
        numCorrect++;
        //alert("score "+numCorrect);
    } else {
        //alert('wrong answer');
        subtractTime();
    }

    showNextSlide();
}

function showSlide(n) {
    if (n == 999) {
        quizContainer.innerHTML = `Enter your name. 
        Your score is ${numCorrect} 
        <input type="text" id="name"><button onclick="saveScore()">Save</button>`;
        
    } else {
        if(currentSlide == slides.length){
            stopClock = 1;
            showScore();
        }
        else{
            slides[currentSlide].classList.remove('active-slide');
            if(n < slides.length) {
                slides[n].classList.add('active-slide');
            } else {
                stopClock = 1;
                showScore();
            }
            currentSlide = n;
        }
    }
    
}

function saveScore() {
    var name = document.getElementById("name").value;
    let scoreList = localStorage.scoreList ? JSON.parse( localStorage.scoreList ) : [];
    scoreList.push(name+" "+numCorrect);
    localStorage.scoreList = JSON.stringify(scoreList);
    displayScores();
}

function displayScores() {
    var clock = document.getElementById('clockdiv');
    clock.innerHTML="";
    let scoreList = localStorage.scoreList ? JSON.parse( localStorage.scoreList ) : [];
    quizContainer.innerHTML = '<b>Scores<b> <br>';
    scoreList.forEach(score => {
        quizContainer.innerHTML += `${score} <br>`;
    });
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}
  
function showPreviousSlide() {
    showSlide(currentSlide - 1);
}

function showScore() {
    showSlide(999);
}

// display quiz right away
buildQuiz();

// Pagination
// const previousButton = document.getElementById("previous");
// const nextButton = document.getElementById("next");
const hiScore = document.getElementById("hi-score");
//hiScore.style.visibility = 'hidden';
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

// on submit, show results
//submitButton.addEventListener('click', showResults);
// previousButton.addEventListener("click", showPreviousSlide);
// nextButton.addEventListener("click", showNextSlide);


document.querySelectorAll('.radio').forEach(radio => {
    radio.addEventListener('click', verifyAnswer);
});

//timer
//var timeInMinutes = 0;
var timeInSeconds = 20;
var currentTime = Date.parse(new Date());
//var deadline = new Date(currentTime + timeInMinutes*60*1000);
var deadline = new Date(currentTime + timeInSeconds*1000);
var stopClock = 0;

function subtractTime()
{
    subtract = 5*1000;
}

function getTimeRemaining(endtime){
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
}
function initializeClock(id, endtime){
    var clock = document.getElementById(id);
    var timeinterval = setInterval(function(){
      if(stopClock) {
        clearInterval(timeinterval);
        clock.innerHTML="";
      }
      if(subtract>0){
        endtime = Date.parse(endtime) - subtract;
        if(endtime <= 0) {
            alert("time up");
            clearInterval(timeinterval);
            clock.innerHTML="";
            showScore();
        } else {
            endtime = new Date(endtime);
            subtract = 0;
        }
        
      }
      if(Date.parse(endtime) > 0) {
        var t = getTimeRemaining(endtime);
        clock.innerHTML = 'Time remaining: ' + t.minutes  +
                    ': ' + t.seconds;
      }
      
        if(t.total<=0){
        alert("time up");
        clearInterval(timeinterval);
        clock.innerHTML="";
        showScore();
        }
    },1000);
}
initializeClock('clockdiv', deadline);

