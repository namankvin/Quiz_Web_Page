const genreSelection = document.getElementById('genre-selection');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const timerElement = document.getElementById('time');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const scoreElement = document.getElementById('score');

let currentGenre = '';
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

const questions = {
  general: [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"], answer: "William Shakespeare" },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], answer: "Pacific Ocean" }
  ],
  science: [
    { question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "NaCl", "O2"], answer: "H2O" },
    { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], answer: "300,000 km/s" },
    { question: "What is the smallest unit of life?", options: ["Atom", "Cell", "Molecule", "Organ"], answer: "Cell" },
    { question: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" }
  ],
  history: [
    { question: "Who was the first President of the United States?", options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"], answer: "George Washington" },
    { question: "In which year did World War II end?", options: ["1945", "1939", "1941", "1950"], answer: "1945" },
    { question: "Who discovered gravity?", options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"], answer: "Isaac Newton" },
    { question: "Which ancient civilization built the pyramids?", options: ["Greeks", "Romans", "Egyptians", "Mayans"], answer: "Egyptians" }
  ],
  movies: [
    { question: "Who directed the movie 'Inception'?", options: ["Steven Spielberg", "Christopher Nolan", "Quentin Tarantino", "James Cameron"], answer: "Christopher Nolan" },
    { question: "Which movie features the character 'Tony Stark'?", options: ["Spider-Man", "Iron Man", "Batman", "Superman"], answer: "Iron Man" },
    { question: "What is the highest-grossing movie of all time?", options: ["Avatar", "Avengers: Endgame", "Titanic", "Star Wars: The Force Awakens"], answer: "Avatar" },
    { question: "Which actor played the role of Jack in 'Titanic'?", options: ["Leonardo DiCaprio", "Brad Pitt", "Tom Cruise", "Johnny Depp"], answer: "Leonardo DiCaprio" }
  ]
};

const genreButtons = document.querySelectorAll('.genre-btn');
for (let i = 0; i < genreButtons.length; i++) {
  genreButtons[i].addEventListener('click', handleGenreButtonClick);
}

function handleGenreButtonClick() {
  currentGenre = this.getAttribute('data-genre');
  genreSelection.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  startQuiz();
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 10;
  timerElement.textContent = timeLeft;

  const currentQuestion = questions[currentGenre][currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = '';

  for (let i = 0; i < currentQuestion.options.length; i++) {
    const button = document.createElement('button');
    button.textContent = currentQuestion.options[i];
    button.addEventListener('click', handleOptionClick);
    optionsElement.appendChild(button);
  }

  nextButton.classList.add('hidden');
  startTimer();
}

function handleOptionClick() {
  const selectedOption = this.textContent;
  const clickedButton = this;
  selectAnswer(selectedOption, clickedButton);
}

function startTimer() {
  timeLeft = 10;
  timerElement.textContent = timeLeft;
  const statusBarProgress = document.getElementById('status-bar-progress');
  statusBarProgress.style.width = '100%';

  timer = setInterval(updateTimer, 1000);

  function updateTimer() {
    timeLeft--;
    timerElement.textContent = timeLeft;

    const progressWidth = (timeLeft / 10) * 100;
    statusBarProgress.style.width = `${progressWidth}%`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      disableOptions();
      showCorrectAnswer();
      nextButton.classList.remove('hidden');
    }
  }
}

function selectAnswer(selectedOption, clickedButton) {
  clearInterval(timer);

  const currentQuestion = questions[currentGenre][currentQuestionIndex];
  const buttons = optionsElement.querySelectorAll('button');

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }

  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].textContent === currentQuestion.answer) {
      buttons[i].classList.add('correct');
    } else if (buttons[i] === clickedButton) {
      buttons[i].classList.add('incorrect');
    }
  }

  if (selectedOption === currentQuestion.answer) {
    score++;
  }

  nextButton.classList.remove('hidden');
}

function disableOptions() {
  const buttons = optionsElement.querySelectorAll('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
}

function showCorrectAnswer() {
  const buttons = optionsElement.querySelectorAll('button');
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].textContent === questions[currentGenre][currentQuestionIndex].answer) {
      buttons[i].classList.add('correct');
    }
  }
}

nextButton.addEventListener('click', handleNextButtonClick);

function handleNextButtonClick() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions[currentGenre].length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  quizContainer.classList.add('hidden');
  resultContainer.classList.remove('hidden');
  scoreElement.textContent = `${score} out of ${questions[currentGenre].length}`;
}

restartButton.addEventListener('click', handleRestartButtonClick);

function handleRestartButtonClick() {
  resultContainer.classList.add('hidden');
  genreSelection.classList.remove('hidden');
  currentQuestionIndex = 0;
  score = 0;
  clearInterval(timer);
}
