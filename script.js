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
    { question: "What is the highest-grossing movie of all time?", options: ["Avatar", "Avengers: Endgame", "Titanic", "Star Wars: The Force Awakens"], answer: "Avengers: Endgame" },
    { question: "Which actor played the role of Jack in 'Titanic'?", options: ["Leonardo DiCaprio", "Brad Pitt", "Tom Cruise", "Johnny Depp"], answer: "Leonardo DiCaprio" }
  ]
};

// Event listeners for genre selection
document.querySelectorAll('.genre-btn').forEach(button => {
  button.addEventListener('click', () => {
    currentGenre = button.getAttribute('data-genre');
    genreSelection.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    startQuiz();
  });
});

// Start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

// Display the current question
function showQuestion() {
  clearInterval(timer); // Clear any existing timer
  timeLeft = 10; // Reset timer
  timerElement.textContent = timeLeft; // Update timer display

  const currentQuestion = questions[currentGenre][currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = '';

  currentQuestion.options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => selectAnswer(option, button));
    optionsElement.appendChild(button);
  });

  nextButton.classList.add('hidden');
  startTimer();
}

// Start the timer for each question
// Start the timer for each question
function startTimer() {
  timeLeft = 10;
  timerElement.textContent = timeLeft;

  // Reset status bar width
  const statusBarProgress = document.getElementById('status-bar-progress');
  statusBarProgress.style.width = '100%';

  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    // Update status bar width
    const progressWidth = (timeLeft / 10) * 100;
    statusBarProgress.style.width = `${progressWidth}%`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      disableOptions();
      showCorrectAnswer();
      nextButton.classList.remove('hidden');
    }
  }, 1000);
}

// Handle answer selection
function selectAnswer(selectedOption, clickedButton) {
  clearInterval(timer); // Stop timer once an answer is selected

  const currentQuestion = questions[currentGenre][currentQuestionIndex];
  const buttons = optionsElement.querySelectorAll('button');

  // Disable all buttons
  buttons.forEach(button => {
    button.disabled = true;
  });

  // Highlight correct and incorrect answers
  buttons.forEach(button => {
    if (button.textContent === currentQuestion.answer) {
      button.classList.add('correct');
    } else if (button === clickedButton) {
      button.classList.add('incorrect');
    }
  });

  // Update score if the answer is correct
  if (selectedOption === currentQuestion.answer) {
    score++;
  }

  nextButton.classList.remove('hidden');
}

// Disable all answer options
function disableOptions() {
  const buttons = optionsElement.querySelectorAll('button');
  buttons.forEach(button => {
    button.disabled = true;
  });
}

// Show correct answer when time runs out
function showCorrectAnswer() {
  const buttons = optionsElement.querySelectorAll('button');
  buttons.forEach(button => {
    if (button.textContent === questions[currentGenre][currentQuestionIndex].answer) {
      button.classList.add('correct');
    }
  });
}

// Move to the next question
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions[currentGenre].length) {
    showQuestion();
  } else {
    endQuiz();
  }
});

// End the quiz and show results
function endQuiz() {
  quizContainer.classList.add('hidden');
  resultContainer.classList.remove('hidden');
  scoreElement.textContent = `${score} out of ${questions[currentGenre].length}`;
}

// Restart the quiz
restartButton.addEventListener('click', () => {
  resultContainer.classList.add('hidden');
  genreSelection.classList.remove('hidden');
  currentQuestionIndex = 0;
  score = 0;
  clearInterval(timer);
});