const questions = [
  {
    question: "ما هي عاصمة السودان؟",
    answers: ["الخرطوم", "مدني", "بورتسودان", "كسلا"],
    correct: 0
  },
  {
    question: "كم عدد أيام الأسبوع؟",
    answers: ["5", "6", "7", "8"],
    correct: 2
  },
  {
    question: "ما هو الكوكب المعروف بالكوكب الأحمر؟",
    answers: ["الأرض", "المريخ", "الزهرة", "المشتري"],
    correct: 1
  },
  {
    question: "كم عدد أشهر السنة؟",
    answers: ["10", "11", "12", "13"],
    correct: 2
  },
  {
    question: "ما هو أكبر محيط في العالم؟",
    answers: ["الأطلسي", "الهندي", "الهادئ", "المتجمد"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;
let time = 30;
let timer;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

function startGame() {
  currentQuestion = 0;
  score = 0;
  time = 30;

  if (scoreElement) scoreElement.textContent = score;
  if (timerElement) timerElement.textContent = time;

  showQuestion();

  clearInterval(timer);

  timer = setInterval(() => {
    time--;

    if (timerElement) {
      timerElement.textContent = time;
    }

    if (time <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function showQuestion() {
  if (currentQuestion >= questions.length) {
    endGame();
    return;
  }

  const q = questions[currentQuestion];

  if (questionElement) {
    questionElement.textContent = q.question;
  }

  if (answersElement) {
    answersElement.innerHTML = "";

    q.answers.forEach((answer, index) => {
      const button = document.createElement("button");

      button.textContent = answer;
      button.className = "answer";

      button.addEventListener("click", () => {
        checkAnswer(index);
      });

      answersElement.appendChild(button);
    });
  }
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].correct;

  if (selected === correct) {
    score += 10;

    if (scoreElement) {
      scoreElement.textContent = score;
    }
  }

  currentQuestion++;
  showQuestion();
}

function endGame() {
  clearInterval(timer);

  if (questionElement) {
    questionElement.textContent =
      "انتهت اللعبة! نتيجتك: " + score + " نقطة 🎉";
  }

  if (answersElement) {
    answersElement.innerHTML = "";

    const restartButton = document.createElement("button");
    restartButton.textContent = "العب مرة أخرى 🔄";
    restartButton.className = "restart";

    restartButton.addEventListener("click", startGame);

    answersElement.appendChild(restartButton);
  }
}

startGame();
