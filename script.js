const questions = [
  // المستوى السهل
  {
    level: "سهل",
    question: "ما هي عاصمة السودان؟",
    answers: ["الخرطوم", "مدني", "كسلا", "بورتسودان"],
    correct: 0
  },
  {
    level: "سهل",
    question: "كم عدد أشهر السنة؟",
    answers: ["10", "11", "12", "13"],
    correct: 2
  },
  {
    level: "سهل",
    question: "كم عدد أيام الأسبوع؟",
    answers: ["5", "6", "7", "8"],
    correct: 2
  },

  // المستوى المتوسط
  {
    level: "متوسط",
    question: "ما هو أكبر محيط في العالم؟",
    answers: ["الأطلسي", "الهندي", "الهادئ", "المتجمد"],
    correct: 2
  },
  {
    level: "متوسط",
    question: "كم عدد الكواكب في المجموعة الشمسية؟",
    answers: ["7", "8", "9", "10"],
    correct: 1
  },
  {
    level: "متوسط",
    question: "ما هو أسرع حيوان بري؟",
    answers: ["الأسد", "الفهد", "الحصان", "النمر"],
    correct: 1
  },

  // المستوى الصعب
  {
    level: "صعب",
    question: "ما هو العنصر الكيميائي الذي رمزه Au؟",
    answers: ["الفضة", "الحديد", "الذهب", "النحاس"],
    correct: 2
  },
  {
    level: "صعب",
    question: "كم عدد عظام جسم الإنسان البالغ تقريبًا؟",
    answers: ["106", "206", "306", "406"],
    correct: 1
  },
  {
    level: "صعب",
    question: "ما هو أكبر كوكب في المجموعة الشمسية؟",
    answers: ["الأرض", "زحل", "المشتري", "نبتون"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;
let time = 30;
let lives = 3;
let streak = 0;
let timer;

// جلب أعلى نتيجة محفوظة
let highScore = Number(localStorage.getItem("highScore")) || 0;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

function startGame() {
  currentQuestion = 0;
  score = 0;
  time = 30;
  lives = 3;
  streak = 0;

  updateScore();

  clearInterval(timer);

  showQuestion();

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

function updateScore() {
  if (scoreElement) {
    scoreElement.textContent = score;
  }
}

function showQuestion() {
  if (currentQuestion >= questions.length) {
    endGame();
    return;
  }

  const q = questions[currentQuestion];

  questionElement.innerHTML = `
    <div style="font-size:14px;opacity:.7;margin-bottom:10px">
      المستوى: ${q.level}
    </div>

    ${q.question}

    <div style="font-size:15px;margin-top:12px">
      ❤️ الأرواح: ${"❤️".repeat(lives)}
    </div>
  `;

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

function checkAnswer(selected) {
  const correct = questions[currentQuestion].correct;

  // منع الضغط أكثر من مرة
  const buttons = document.querySelectorAll(".answer");

  buttons.forEach(button => {
    button.disabled = true;
  });

  if (selected === correct) {

    streak++;

    // النقاط الأساسية
    let points = 10;

    // مكافأة الإجابات المتتالية
    if (streak >= 3) {
      points += 5;
    }

    score += points;

    updateScore();

  } else {

    // إجابة خاطئة
    lives--;
    streak = 0;

    if (lives <= 0) {
      setTimeout(() => {
        endGame();
      }, 500);

      return;
    }
  }

  currentQuestion++;

  setTimeout(() => {
    showQuestion();
  }, 500);
}

function endGame() {
  clearInterval(timer);

  // حفظ أعلى نتيجة
  if (score > highScore) {
    highScore = score;

    localStorage.setItem(
      "highScore",
      highScore
    );
  }

  questionElement.innerHTML = `
    🎉 انتهت اللعبة!

    <div style="margin-top:20px;font-size:28px">
      ${score} نقطة ⭐
    </div>

    <div style="margin-top:15px">
      أعلى نتيجة: ${highScore} 🏆
    </div>
  `;

  answersElement.innerHTML = "";

  const restartButton = document.createElement("button");

  restartButton.textContent = "العب مرة أخرى 🔄";

  restartButton.className = "restart";

  restartButton.addEventListener(
    "click",
    startGame
  );

  answersElement.appendChild(restartButton);
}

startGame();
