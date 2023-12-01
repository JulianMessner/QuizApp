let rightAnswers = 0;
let currentQuestion = 0;
let audioApplause = new Audio("./audio/applause.mp3");

let originalHtmlQuestions = [...htmlQuestions];
let originalCssQuestions = [...cssQuestions];
let originalJavascriptQuestions = [...javascriptQuestions];

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
  let originalHtmlQuestions = [...htmlQuestions];
  let originalCssQuestions = [...cssQuestions];
  let originalJavascriptQuestions = [...javascriptQuestions];

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
  document .getElementById("pills-javascript-tab").classList.toggle("non-active", tabName !== "javascript");

  document.getElementById("pills-html-tab").classList.toggle("active", tabName === "html");
  document.getElementById("pills-html-tab").classList.toggle("non-active", tabName !== "html");
}


function changeTab(tabName) {
    restartGame();
    resetAnswerButtons();
  
    let questionsArray;
  
    if (tabName === "css") {
      questionsArray = originalCssQuestions;
    } else if (tabName === "javascript") {
      questionsArray = originalJavascriptQuestions;
    } else if (tabName === "html") {
      questionsArray = originalHtmlQuestions;
    }
  
    updateTabStyles(tabName);
    htmlQuestions = [...questionsArray];
    stopApplauseSound();
    init();
  }


function handleCorrectAnswer(selection) {
  let audio_success = new Audio("./audio/right.mp3");
  document.getElementById(selection).classList.add("bg-success");
  audio_success.play();
  rightAnswers++;
}


function handleIncorrectAnswer(selection, idOfRightAnswer) {
  let audio_fail = new Audio("./audio/wrong.mp3");
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
  document.getElementById("amount-of-questions").innerHTML =
    htmlQuestions.length;
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
  playApplauseSound();
}


function playApplauseSound(){
    audioApplause.play();
}


function stopApplauseSound() {
    audioApplause.pause();
    audioApplause.currentTime = 0;
}


function updateProgressBar() {
  let percent = (currentQuestion / htmlQuestions.length) * 100;
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
    document
      .getElementById(`answer-${i}`)
      .classList.remove("bg-danger", "bg-success");
  }
}


function restartGame() {
  stopApplauseSound();
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("question-body").style = "";
  document.getElementById("header-image").src = "./img/header.png";

  rightAnswers = 0;
  currentQuestion = 0;

  init();
}