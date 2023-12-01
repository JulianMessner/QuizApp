let htmlQuestions = [
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
    "answer 1": "&lt;iframe&gt;, &lt;frame&gt; und &lt;frameset&gt;",
    "answer 2": "&lt;iframe&gt;",
    "answer 3": "%lt;frame&gt;",
    "answer 4": "&lt;frameset&gt;",
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
    question: "Was ist der Zweck der &lt;br&gt; Tag in HTML?",
    "answer 1": "Erzeugt einen fetten Text",
    "answer 2": "Fügt einen Zeilenumbruch ein",
    "answer 3": "Erzeugt einen Link",
    "answer 4": "Definiert eine Bildquelle",
    "right answer": 2,
  },
];

let cssQuestions = [
  {
    question: "Was ist der Zweck der CSS-Eigenschaft 'margin'?",
    "answer 1": "Legt die Breite eines Elements fest.",
    "answer 2": "Definiert den äußeren Abstand eines Elements.",
    "answer 3": "Steuert die Ausrichtung eines Textes.",
    "answer 4": "Bestimmt die Schriftart eines Elements.",
    "right answer": 2,
  },
  {
    question: "Was bewirkt die CSS-Eigenschaft 'display: flex;'?",
    "answer 1": "Zentriert ein Element horizontal.",
    "answer 2": "Erstellt einen Rahmen um ein Element.",
    "answer 3": "Aktiviert den Flexbox-Layout-Modus.",
    "answer 4": "Ändert die Hintergrundfarbe eines Elements.",
    "right answer": 3,
  },
  {
    question: "Welche Einheit wird in CSS für Schriftgrößen verwendet?",
    "answer 1": "Pixel",
    "answer 2": "Em",
    "answer 3": "Prozent",
    "answer 4": "Inch",
    "right answer": 2,
  },
  {
    question: "Was ist das Pseudo-Element '::before' in CSS?",
    "answer 1": "Ein Selektor für das erste Element in einer Liste.",
    "answer 2": "Ein Platzhalter für den Textinhalt eines Elements.",
    "answer 3": "Ein Effekt, der vor einem Element angezeigt wird.",
    "answer 4": "Ein Stil für den Rand eines Elements.",
    "right answer": 2,
  },
  {
    question: "Wie ändert man die Farbe eines Textes in CSS?",
    "answer 1": "color: red;",
    "answer 2": "background-color: blue;",
    "answer 3": "font-color: green;",
    "answer 4": "text-style: yellow;",
    "right answer": 1,
  },
];

let javascriptQuestions = [
  {
    question: "Was ist JavaScript?",
    "answer 1": "Ein Framework für CSS.",
    "answer 2": "Eine Programmiersprache für Webentwicklung.",
    "answer 3": "Ein Bildbearbeitungstool.",
    "answer 4": "Ein Datenbanksystem.",
    "right answer": 2,
  },
  {
    question: "Was bedeutet 'DOM' in JavaScript?",
    "answer 1": "Data Object Model",
    "answer 2": "Document Oriented Model",
    "answer 3": "Document Object Model",
    "answer 4": "Digital Output Module",
    "right answer": 3,
  },
  {
    question:
      "Welches Schlüsselwort wird in JavaScript verwendet, um eine Funktion zu deklarieren?",
    "answer 1": "function",
    "answer 2": "method",
    "answer 3": "procedure",
    "answer 4": "define",
    "right answer": 1,
  },
  {
    question: "Was ist 'AJAX' in JavaScript?",
    "answer 1": "Ein Animationsframework.",
    "answer 2": "Eine Bildbearbeitungsbibliothek.",
    "answer 3": "Asynchronous JavaScript and XML.",
    "answer 4": "Eine Datenbanksprache.",
    "right answer": 3,
  },
  {
    question: "Welche Schleifenkonstruktion wird in JavaScript verwendet?",
    "answer 1": "if-else",
    "answer 2": "for",
    "answer 3": "switch",
    "answer 4": "select",
    "right answer": 2,
  },
];

let rightAnswers = 0;

let currentQuestion = 0;

let originalHtmlQuestions = [...htmlQuestions];
let originalCssQuestions = [...cssQuestions];
let originalJavascriptQuestions = [...javascriptQuestions];

let audio_success = new Audio("./audio/right.mp3");
let audio_fail = new Audio("./audio/wrong.mp3");

function init() {
  document.getElementById("all-questions").innerHTML = htmlQuestions.length;

  document.getElementById("progress-bar").innerHTML = `0 %`;
  document.getElementById("progress-bar").style.width = `10%`;

  showQuestion();
}

function showQuestion() {
  if (gameIsOver()) {
    showEndScreen();
  } else {
    updateProgressBar();
    updateToNextQuestion();
  }
}

function gameIsOver() {
  return currentQuestion >= htmlQuestions.length;
}

function selectQuestionsArray(tabName) {
    if (tabName === "css") {
      return originalCssQuestions;
    } else if (tabName === "javascript") {
      return originalJavascriptQuestions;
    } else if (tabName === "html") {
      return originalHtmlQuestions;
    }
  }
  
  function updateTabStyles(tabName) {
    document.getElementById("pills-css-tab").classList.toggle("active", tabName === "css");
    document.getElementById("pills-css-tab").classList.toggle("non-active", tabName !== "css");
    
    document.getElementById("pills-javascript-tab").classList.toggle("active", tabName === "javascript");
    document.getElementById("pills-javascript-tab").classList.toggle("non-active", tabName !== "javascript");
    
    document.getElementById("pills-html-tab").classList.toggle("active", tabName === "html");
    document.getElementById("pills-html-tab").classList.toggle("non-active", tabName !== "html");
  }
  
  function changeTab(tabName) {
    restartGame();
    resetAnswerButtons();
  
    let questionsArray = selectQuestionsArray(tabName);
    htmlQuestions = [...questionsArray];
    
    updateTabStyles(tabName);
    init();
  }
  

  function handleCorrectAnswer(selection) {
    document.getElementById(selection).classList.add("bg-success");
    audio_success.play();
    rightAnswers++;
  }
  
  function handleIncorrectAnswer(selection, idOfRightAnswer) {
    document.getElementById(selection).classList.add("bg-danger");
    document.getElementById(idOfRightAnswer).classList.add("bg-success");
    audio_fail.play();
  }
  
  function enableNextButton() {
    document.getElementById("next-button").disabled = false;
  }
  
  function answer(selection) {
    let question = htmlQuestions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer-${question["right answer"]}`;
  
    if (rightAnswerSelected(selectedQuestionNumber)) {
      handleCorrectAnswer(selection);
    } else {
      handleIncorrectAnswer(selection, idOfRightAnswer);
    }
  
    enableNextButton();
  }
  

function rightAnswerSelected(selectedQuestionNumber) {
  let question = htmlQuestions[currentQuestion];
  return selectedQuestionNumber == question["right answer"];
}

function hideQuestionBody() {
  document.getElementById("question-body").style = "display: none";
}

function showEndScreenDetails() {
  document.getElementById("amount-of-questions").innerHTML = htmlQuestions.length;
  document.getElementById("amount-of-right-answers").innerHTML = rightAnswers;
  document.getElementById("header-image").src = "./img/trophy-new.png";
}

function updateProgressBarToEnd() {
  document.getElementById("progress-bar").innerHTML = "100 %";
  document.getElementById("progress-bar").style.width = "100%";
}

function showEndScreen() {
    document.getElementById("end-screen").style = "";
    hideQuestionBody();
    showEndScreenDetails();
    updateProgressBarToEnd();
  }
  


function updateProgressBar() {
    let percent = ((currentQuestion) / htmlQuestions.length) * 100;
    percent = Math.round(percent);
  
    document.getElementById("progress-bar").innerHTML = `${percent} %`;
    document.getElementById("progress-bar").style.width = `${percent}%`;
  }
  

function updateToNextQuestion() {
  let question = htmlQuestions[currentQuestion];

  document.getElementById("question-number").innerHTML = currentQuestion + 1;
  document.getElementById("question-text").innerHTML = question["question"];
  document.getElementById("answer-1").innerHTML = question["answer 1"];
  document.getElementById("answer-2").innerHTML = question["answer 2"];
  document.getElementById("answer-3").innerHTML = question["answer 3"];
  document.getElementById("answer-4").innerHTML = question["answer 4"];
}

function nextQuestion() {
  currentQuestion++;

  document.getElementById("next-button").disabled = true;
  resetAnswerButtons();
  showQuestion();
}

function resetAnswerButtons() {
    for (let i = 1; i <= 4; i++) {
      document.getElementById(`answer-${i}`).classList.remove("bg-danger", "bg-success");
    }
  }
  

function restartGame() {
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("question-body").style = "";
  document.getElementById("header-image").src = "./img/header.png";

  rightAnswers = 0;
  currentQuestion = 0;

  init();
}
