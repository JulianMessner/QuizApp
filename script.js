let questions = [
  {
    question: "Wer hat HTML erfunden?",
    "answer 1": "Robbie Williams",
    "answer 2": "Lady Gaga",
    "answer 3": "Tim Berners-Lee",
    "answer 4": "Justin Timberlake",
    "right answer": 3,
  },
  {
    question: "Was bedeutet das HTML Tag &lt;a&gt;?",
    "answer 1": "Text Fett",
    "answer 2": "Container",
    "answer 3": "Ein Link",
    "answer 4": "Kursiv",
    "right answer": 3,
  },
  {
    question: "Wie bindet man eine Website in eine Website ein?",
    "answer 1": "&lt;iframe&gt;, &lt;frame&gt;, and &lt;frameset&gt;",
    "answer 2": "&lt;iframe&gt;",
    "answer 3": "%lt;frame&gt;",
    "answer 4": "&lt;frameset&gt",
    "right answer": 2,
  },
  {
    question: "Welche Dateiendung hat eine HTML-Datei?",
    "answer 1": ".htl",
    "answer 2": ".htlm",
    "answer 3": ".html",
    "answer 4": ".ht",
    "right answer": 3,
  },
  {
    question: "Was bedeutet CSS?",
    "answer 1": "Counter Strike: Source",
    "answer 2": "Computer Style Sheets",
    "answer 3": "Creative Style System",
    "answer 4": "Cascading Style Sheets",
    "right answer": 4,
  },
  {
    question: "Wie kann man in JavaScript eine Variable deklarieren?",
    "answer 1": "var myVar;",
    "answer 2": "let myVar;",
    "answer 3": "const myVar;",
    "answer 4": "Alle der oben genannten",
    "right answer": 4,
  },
  {
    question:
      "Was ist der Zweck der 'document.getElementById()' Methode in JavaScript?",
    "answer 1": "Elemente nach ihrer Klasse auswählen",
    "answer 2": "Elemente nach ihrem Tag-Namen auswählen",
    "answer 3": "Ein Element nach seiner ID auswählen",
    "answer 4": "Alle der oben genannten",
    "right answer": 3,
  },
];

let rightAnswers = 0;

let currentQuestion = 0;

let audio_success = new Audio("./audio/right.mp3");
let audio_fail = new Audio("./audio/wrong.mp3");

function init() {
  document.getElementById("all-questions").innerHTML = questions.length;

  showQuestion();
}

function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
  } else {
    updatePrograssBar();
    updateToNextQuestion();
  }
}

function gameIsOver(){
    return currentQuestion >= questions.length;
}



function answer(selection) {
  let question = questions[currentQuestion];
  let selectedQuestionNumber = selection.slice(-1);
  let idOfRightAnswer = `answer-${question["right answer"]}`;

  if (rightAnswerSelected(selectedQuestionNumber)) {
    document.getElementById(selection).classList.add("bg-success");
    audio_success.play();
    rightAnswers++;
  } else {
    document.getElementById(selection).classList.add("bg-danger");
    document.getElementById(idOfRightAnswer).classList.add("bg-success");
    audio_fail.play();
  }
  document.getElementById("next-button").disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber){
    let question = questions[currentQuestion];
    return selectedQuestionNumber == question["right answer"];
}


function showEndScreen() {
    document.getElementById("end-screen").style = "";
    document.getElementById("question-body").style = "display: none";
  
    document.getElementById("amount-of-questions").innerHTML = questions.length;
    document.getElementById("amount-of-right-answers").innerHTML = rightAnswers;
    document.getElementById("header-image").src = "./img/trophy.png";
  }


function updatePrograssBar(){
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
  
    document.getElementById("progress-bar").innerHTML = `${percent} %`;
    document.getElementById("progress-bar").style.width = `${percent}%`;
}


function updateToNextQuestion() {
  let question = questions[currentQuestion];

  document.getElementById("question-number").innerHTML = currentQuestion + 1;
  document.getElementById("question-text").innerHTML = question["question"];
  document.getElementById("answer-1").innerHTML = question["answer 1"];
  document.getElementById("answer-2").innerHTML = question["answer 2"];
  document.getElementById("answer-3").innerHTML = question["answer 3"];
  document.getElementById("answer-4").innerHTML = question["answer 4"];
}


function nextQuestion() {
  currentQuestion++; //z.B. von 0 auf 1 erhöht

  document.getElementById("next-button").disabled = true;
  resetAnswerButtons();
  showQuestion();
}


function resetAnswerButtons() {
  document.getElementById("answer-1").classList.remove("bg-danger");
  document.getElementById("answer-1").classList.remove("bg-success");
  document.getElementById("answer-2").classList.remove("bg-danger");
  document.getElementById("answer-2").classList.remove("bg-success");
  document.getElementById("answer-3").classList.remove("bg-danger");
  document.getElementById("answer-3").classList.remove("bg-success");
  document.getElementById("answer-4").classList.remove("bg-danger");
  document.getElementById("answer-4").classList.remove("bg-success");
}


function restartGame() {
  document.getElementById("end-screen").style = "none";
  document.getElementById("question-body").style = "";
  document.getElementById("header-image").src = "./img/pencil.jpg";

  rightAnswers = 0;
  currentQuestion = 0;

  init();
}